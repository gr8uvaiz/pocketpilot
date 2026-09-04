import prisma from "../config/prisma";

import { Category } from '../types';

const createCategory = async (categoryData: Category, userId?: string) => {
    if (!userId) {
        throw new Error('User ID is required to create a category');
    }

    const existingCategory = await prisma.category.findFirst({
        where: {
            name: categoryData.name,
            userId: userId
        }
    });

    if (existingCategory) {
        throw new Error('Category with this name already exists for the user');
    }

    const category = await prisma.category.create({
        data: {
            ...categoryData,
            userId
        }
    });
    if (!category) {
        throw new Error('Category creation failed');
    }
    return category;
}

const getCategoriesPaginated = async (page: number, limit: number, userId?: string) => {
    const offset = (page - 1) * limit;
    const categories = await prisma.category.findMany({
        skip: offset,
        take: limit,
        where: {
            userId: userId
        }
    });
    return categories;
};

export {
    createCategory,
    getCategoriesPaginated
}