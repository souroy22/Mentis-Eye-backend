import { Request, Response } from "express";
import User from "../models/user.model";

const userController = {
  getUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.user.user.id, {
        _id: 0,
        password: 0,
      });
      return res
        .status(200)
        .json({ user: { name: user?.name, username: user?.username } });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong!" });
      }
    }
  },
};

export default userController;
