import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    // Set JWT as HTTP only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        
        // secure: true, i only want to have that if we are in 
        //production because we don't have https in development
        secure: process.env.NODE_ENV !== 'development',

        sameSite: 'strict', // this will prevent attacks 

        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
}

export default generateToken;