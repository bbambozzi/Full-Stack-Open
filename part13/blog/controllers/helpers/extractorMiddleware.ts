import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../../utils/config";

interface RequestWithToken extends Request {
  decodedToken?: any;
}

const extractorMiddleware = (
  req: RequestWithToken,
  res: Response,
  next: NextFunction
) => {
  const auth = req.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    try {
      const decodedToken = jwt.verify(auth.substring(7), SECRET);
      if (typeof decodedToken == "string") {
        throw Error("Invalid token");
      }
      req.decodedToken = decodedToken;
      next();
    } catch (e) {
      res.status(401).json({ e });
    }
  } else {
    res.status(401).json({ e: "token is missing" });
    return;
  }
};

export { extractorMiddleware, RequestWithToken };
