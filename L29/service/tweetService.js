import { PrismaClient } from "../../prisma/generated/prisma/index.js";

const prisma = new PrismaClient();

export const addTweet = async (userId, body) => {
  return await prisma.tweet.create({
    data: { userId: Number(userId), body },
  });
};

export const updateTweet = async (id, userId, body) => {
  const tweet = await prisma.tweet.findFirst({
    where: { id: Number(id), userId: Number(userId) },
  });

  if (!tweet) return "Tweet not found or unauthorized";

  await prisma.tweet.update({
    where: { id: Number(id) },
    data: { body },
  });
  return "Tweet updated";
};

export const fetchAllTweets = async () => {
  return await prisma.tweet.findMany({
    select: {
      body: true,
      createdAt: true,
      user: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};
