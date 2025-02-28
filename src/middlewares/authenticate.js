import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function checkAuthentication(req) {
  if (req.headers.authorization) {
      const authHeader = req.headers.authorization.split(' ');

      if (!/^Bearer$/i.test(authHeader[0])) {
          throw new Error('Invalid token');
      }

      const token = authHeader[1];
      const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET || 'CAT');

      return tokenDecoded;
  } else {
      throw new Error('Invalid token');
  }
}

async function authenticate(req, res, next) {
  try {
    const authData = await checkAuthentication(req);

    if (!authData) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    req.userInfo = authData; 

    next();
  } catch (error) {
    console.error("Erro na autenticação:", error.message);
    res.status(401).json({ message: error.message });
  }
}

export { authenticate };
