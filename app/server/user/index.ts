import { Prisma, User } from "@prisma/client";
import { db } from "../../utils/prisma";

export const findSingleUser = async (user: Partial<User>) => {
  return await db.user.findFirst({
    where: {
      ...user
    }
  });
};

export const createUser = async (user: Prisma.UserCreateInput) => {
  console.log("user", user);
  return await db.user.create({
    data: {
      ...user
    }
  });
};
