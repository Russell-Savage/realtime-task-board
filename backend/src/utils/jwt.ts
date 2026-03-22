import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev';

interface JWTPayload {
    userId: string;
    email: string;
}

export function signToken(userId: string, email: string): string {
    return jwt.sign({ userId, email }, JWT_SECRET, {
        expiresIn: '7d'
    });
}

export function verifyToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
        return null;
    }
}