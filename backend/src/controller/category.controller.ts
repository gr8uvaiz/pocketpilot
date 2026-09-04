import { createCategory, getCategoriesPaginated } from "../services";

import { Request, Response } from "express";

import asyncHandler from "express-async-handler";

const createCategoryController = asyncHandler(async (req: Request, res: Response) => {
    const categoryData = req.body;
    const userId = req?.userId;
    const category = await createCategory(categoryData, userId);
    res.status(201).json(category);
});

const getCategoriesPaginatedController = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const categories = await getCategoriesPaginated(page, limit, req?.userId);
    res.status(200).json(categories);
});

export {
    createCategoryController,
    getCategoriesPaginatedController
}
