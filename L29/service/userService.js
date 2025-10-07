import { PrismaClient } from "../../prisma/generated/prisma/index.js";

const prisma = new PrismaClient();

export const fetchAllUsers = async () => {
  return await prisma.user.findMany();
};

export const addUser = async (email, name) => {
  return await prisma.user.create({
    data: { email, name },
  });
};

export const deleteUser = async (id) => {
  await prisma.user.delete({ where: { id: Number(id) } });
  return "User deleted";
};
