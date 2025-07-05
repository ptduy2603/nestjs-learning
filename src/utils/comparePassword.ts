import * as bcrypt from 'bcryptjs';

export const comparePassword = async (
  rawPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  if (!rawPassword.trim() || !hashedPassword.trim()) {
    return false;
  }

  try {
    const isMatch = await bcrypt.compare(rawPassword, hashedPassword);
    return isMatch;
  } catch (error: any) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};
