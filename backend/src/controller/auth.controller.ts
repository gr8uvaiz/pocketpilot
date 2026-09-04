import { getMe, login, register } from "../services";

import { Request, Response } from "express";

import asyncHandler from "express-async-handler";

const setAuthCookie = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const registerController = asyncHandler(async (req: Request, res: Response) => {
  const userData = req.body;
  const user = await register(userData);
  if (!user?.id) {
    res.status(400).json({ message: "User registration failed" });
    return;
  }
  setAuthCookie(res, user.token);
  res.status(201).json(user);
  return;
});

const loginController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await login(email, password);
  if (!user?.id) {
    res.status(400).json({ message: "Invalid email or password" });
    return;
  }
  setAuthCookie(res, user.token);
  res.status(200).json(user);
  return;
});

const logoutController = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
});

const getMeController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;
  const user = await getMe(userId);
  if (!user?.id) {
    res.status(400).json({ message: "Invalid email or password" });
    return;
  }
  res.status(200).json(user);
  return;
});

export {
  registerController,
  loginController,
  logoutController,
  getMeController,
};
