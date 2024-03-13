import { Request, Response } from "express";
import User from "../models/user.model";
import getUserData from "../services/utils/getUser.util";
import verifyPassword from "../services/utils/verifyPassword.util";
import genarateToken from "../services/utils/generateToken.util";
import destroyToken from "../services/utils/destroyToken.util";

type USER_TYPE = {
  name: string;
  username: string;
};

const authControllers = {
  signup: async (req: Request, res: Response) => {
    try {
      const { name, username, password } = req.body;
      const isExist = await getUserData(username);
      if (isExist !== null) {
        return res
          .status(400)
          .json({ error: "This mail id is already exist." });
      }
      let newUser = new User({ name, username, password });
      newUser = await newUser.save();
      const user: USER_TYPE = {
        name: newUser.name,
        username: newUser.username,
      };
      const token = await genarateToken({
        id: newUser._id,
        username: user.username,
      });
      return res.status(200).json({
        user,
        token,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong!" });
      }
    }
  },
  signin: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const isExist = await getUserData(username);
      if (isExist === null) {
        return res.status(404).json({ error: "This mailid doesn't exists" });
      }
      const match = await verifyPassword(password, isExist.password);
      if (!match) {
        return res
          .status(401)
          .json({ error: "EmailId or password doesn't match" });
      }
      const user: USER_TYPE = {
        name: isExist.name,
        username: isExist.email,
      };
      const token = await genarateToken({
        id: isExist._id,
        username: user.username,
      });
      return res.status(200).json({
        user,
        token,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: error.message });
      }
    }
  },
  signout: async (req: Request, res: Response) => {
    try {
      await destroyToken(req);
      return res.status(200).json({ msg: "Successfully logged out!" });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong" });
      }
    }
  },
};

export default authControllers;
