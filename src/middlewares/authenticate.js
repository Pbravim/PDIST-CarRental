import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateTokenFromUuid } from "./jwt.js";

dotenv.config();

async function checkAuthentication(req) {
    if (!req.headers.authorization) {
        throw new Error("Authorization header is missing");
    }

    const authHeader = req.headers.authorization.split(" ");

    if (authHeader.length !== 2 || authHeader[0].toLowerCase() !== "bearer") {
        console.error("Token mal formatado ou ausente:", authHeader);
        throw new Error("Invalid token format");
    }

    const token = await generateTokenFromUuid(req);

    try {
        const secret = process.env.JWT_SECRET;
        const tokenDecoded = jwt.verify(token, secret);
        console.log("Token decodificado:", tokenDecoded);
        return tokenDecoded;
    } catch (error) {
        console.error("Erro na verificação do token:", error.message);
        throw new Error("Invalid token");
    }
}

async function authenticate(req, res, next) {
  try {
    const authData = await checkAuthentication(req);

    if (!authData) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    req.user = authData; 

    next();
  } catch (error) {
    console.error("Erro na autenticação:", error.message);
    res.status(401).json({ message: error.message });
  }
}

export { authenticate };
