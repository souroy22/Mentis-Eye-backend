import User from "../../models/user.model";

const getUserData = async (username: string) => {
  const user = await User.findOne({ username });
  const newUserData: any = JSON.parse(JSON.stringify(user));
  return newUserData ? newUserData : null;
};

export default getUserData;
