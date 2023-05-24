import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

export const checkPassword = async (password: string, hash: string) =>
  bcrypt.compare(password, hash);
