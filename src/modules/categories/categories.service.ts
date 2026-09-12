import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { ICategoryCreate } from "./categories.interface";
import httpStatus  from "http-status";

const addCategory = async (categoryData: ICategoryCreate) => {
    const isExist = await prisma.category.findUnique({
        where: {
            name: categoryData.name,
        },
    });

    if (isExist) {
      throw new AppError(httpStatus.CONFLICT, "Category already exists");
        // throw new Error("Category already exists");
    }
  const result = await prisma.category.create({
    data: categoryData,
  });
  return result;    
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

export const categoryService = {
  addCategory,
  getAllCategories,
};