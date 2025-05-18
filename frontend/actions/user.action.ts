"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db/config";
import {
  userInsertSchema,
  users,
  userUpdateSchema,
  type UserInsert,
  type UserUpdate,
} from "@/db/schema";

export const addUser = async (user: UserInsert) => {
  const { data, success } = userInsertSchema.safeParse(user);

  if (!success) throw new Error("Invalid user data");
  await db.insert(users).values(data);
};

export const updateUser = async (userId: string, user: UserUpdate) => {
  const { data, success } = userUpdateSchema.safeParse(user);

  if (!success) throw new Error("Invalid user data");
  await db.update(users).set(data).where(eq(users.id, userId));
};

export const deleteUser = async (userId: string) => {
  await db.delete(users).where(eq(users.id, userId));
};
