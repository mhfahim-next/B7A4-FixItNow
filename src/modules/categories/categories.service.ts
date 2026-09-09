import { prisma } from "../../lib/prisma";
import { ICategoryCreate } from "./categories.interface";


const addCategory = async (categoryData: ICategoryCreate) => {
    const isExist = await prisma.category.findUnique({
        where: {
            name: categoryData.name,
        },
    });

    if (isExist) {
        throw new Error("Category already exists");
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