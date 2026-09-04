import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

const generateToken = (userId: string): string => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
    );
    return token;
}

const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        return decoded as JwtPayload;
    } catch (error) {
        return null;
    }
};

export {
    generateToken,
    verifyToken
};