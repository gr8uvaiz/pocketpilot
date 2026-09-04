import prisma from "../config/prisma";

import { User } from "../types";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

const register = async (userData: User) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const passwordHash = await hashPassword(userData.password);
  const user = await prisma.user.create({
    data: {
      ...userData,
      password: passwordHash,
    },
  });
  if (!user) {
    throw new Error("User creation failed");
  }

  const token = generateToken(user.id);

  return { ...user, token, password: undefined };
};

const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);

  return { ...user, token, password: undefined };
};

const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

export { register, login, getMe };
