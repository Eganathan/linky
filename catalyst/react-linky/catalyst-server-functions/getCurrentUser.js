const catalyst = require('zcatalyst-sdk-node');

module.exports = async (req, res) => {
    try {
        // Initialize Catalyst app with the request
        const app = catalyst.initialize(req);
        
        // Get user management instance
        const userManagement = app.userManagement();
        
        // Get current user details using async/await
        const currentUser = await userManagement.getCurrentUser();
        
        console.log('Current user:', currentUser);
        
        // Return successful response
        res.status(200).json({
            success: true,
            user: currentUser,
            message: 'User details retrieved successfully'
        });
        
    } catch (error) {
          console.log('Current user:', error.message);
        console.error('Error getting user details:', error);

        // Check if user is not authenticated
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
