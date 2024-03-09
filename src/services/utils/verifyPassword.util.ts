import bcrypt from "bcrypt";

const verifyPassword = async (password: string, hashedPassword: string) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

export default verifyPassword;
