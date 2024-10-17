import { hash } from 'bcrypt';

export const genHash = async (string: string) => hash(string, 10);
