const userModel = require("../models/userModel");

const uploadPermission = async (userId) => {
    try {
        const user = await userModel.findById(userId);

        if (user && user.Role === 'ADMIN') {
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error in uploadPermission:', error);
        return false;
    }
}

module.exports = uploadPermission;
