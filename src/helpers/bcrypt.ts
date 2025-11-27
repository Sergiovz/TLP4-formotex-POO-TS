import bcrypt from "bcrypt";

export const encryptSync = (password: string, saltRounds: number): string => {
  return bcrypt.hashSync(password, saltRounds);
};

export const compareSync = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};
