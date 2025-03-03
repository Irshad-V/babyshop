

const userModel = require("../../models/userModel");
const paypal = require("../../config/paypal");

// Payment Controller
const paymentController = async (req, res) => {
   

    try {
        const { cartItems, totalPrice, totalQty } = req.body; // Items array from frontend
        const user = await userModel.findOne({ _id: req.userId }); // Fetch user data
       

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // PayPal payment object
        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: 'http://localhost:5000/success',
                cancel_url: 'http://localhost:3000/cancel',
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map(item => ({
                            name: item.productId.productName,
                            sku: item.productId._id, 
                            price: (item.productId.sellingPrice).toFixed(2), 
                            currency: 'USD', 
                            quantity: item.quantity,
                        })),
                    },
                    amount: {
                        currency: 'USD',
                        total: totalPrice.toFixed(2), 
                    },
                    description: 'This is the payment description.',
                },
            ],
        };

   
        paypal.payment.create(create_payment_json, (error, payment) => {
            if (error) {
                console.error('PayPal Error: ', error);
                return res.status(500).json({ error: error.response.message || error.message });
            } else {
                // Find the approval URL to send to the frontend
                const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
               
                res.json({ success: true, approvalUrl });
            }
        });
    } catch (error) {
        console.error("Error in payment controller: ", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = paymentController;
 