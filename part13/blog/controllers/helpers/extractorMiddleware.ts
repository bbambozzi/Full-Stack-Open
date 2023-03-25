import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../../utils/config";
import { User } from "../../models/models";

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
      if (typeof decodedToken == "string" || !userIsValid(decodedToken.id)) {
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

const userIsValid = async (userId: string): Promise<Boolean> => {
  return (await User.findByPk(userId))?.toJSON()?.isDisabled ? true : false;
};

export { extractorMiddleware, RequestWithToken };
