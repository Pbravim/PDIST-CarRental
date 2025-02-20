import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function generateTokenFromUuid(req) {
  const uuid = req.headers.authorization;

  if (!uuid) {
    throw new Error("UUID header is missing");
  }

  const payload = {
    userId: uuid,
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const options = {
    expiresIn: "4h",
  };

  try {
    const token = jwt.sign(payload, secret, options);
    console.log("Token gerado com sucesso:", token);
    return token;
  } catch (error) {
    console.error("Erro ao gerar o token:", error.message);
    throw new Error("Erro ao gerar o token");
  }
}

export { generateTokenFromUuid };
