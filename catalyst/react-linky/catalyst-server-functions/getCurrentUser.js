const catalyst = require('zcatalyst-sdk-node');

module.exports = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const userManagement = app.userManagement();
        const currentUser = await userManagement.getCurrentUser();

        console.log('Current user:', currentUser);

        res.status(200).json({
            success: true,
            user: currentUser,
            message: 'User details retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting user details:', error);

        if (error.message && error.message.includes('unauthorized')) {
            res.status(401).json({
                success: false,
                error: 'User not authenticated',
                message: 'Please login to access this resource'
            });
        } else {
            res.status(500).json({
                success: false,
                error: error.message || 'Internal server error',
                message: 'Failed to retrieve user details'
            });
        }
    }
};
