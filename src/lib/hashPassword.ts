import bcrypt from "bcrypt";
const saltAndHashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export default saltAndHashPassword;
