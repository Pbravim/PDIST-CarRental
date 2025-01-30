import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import HttpError from '../../../utils/customErrors/httpError.js';

dotenv.config();

    async function checkAuthentication(req) {
        if (req.headers.authorization) {
            const authHeader = req.headers.authorization.split(' ');

            if (!/^Bearer$/i.test(authHeader[0])) {
                throw new HttpError(401, 'Invalid token');
            }

            const token = authHeader[1];
            const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET || '123');

            return tokenDecoded;
        } else {
            throw new HttpError(401, 'Invalid token');
        }
    }


async function authenticate(req, res, next) {
    try {
        const authId = await checkAuthentication(req);

        if (!authId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        if (!req.session) {
            req.session = {};
        }

        req.session.auth = authId;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Authentication failed' });
    }
}

export { authenticate };
