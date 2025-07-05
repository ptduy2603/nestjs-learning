import * as bcrypt from 'bcryptjs';

export const hashPassword = async (
  password: string,
): Promise<string | undefined> => {
  if (!password.trim()) {
    return;
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword || '';
  } catch (error: unknown) {
    console.error('Error hashing password:', error);
  }
};
