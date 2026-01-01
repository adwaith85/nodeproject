import jwt from 'jsonwebtoken';
import Usermodel from '../model/userModel.js';

const JWT_SECRET = 'qwerty';

export const LoginCheck = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token missing or malformed' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded; // Optionally attach the user payload to the request object

        // Update user status to Login as a heartbeat
        await Usermodel.findOneAndUpdate({ email: decoded.email }, { status: "Login" });

        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
