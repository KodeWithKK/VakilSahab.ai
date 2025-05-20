"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/db/config";
import { lawyerInfo, LawyerInfoInsert, users } from "@/db/schema";

export interface LawyerInfoInsertPayload
  extends Omit<LawyerInfoInsert, "userId"> {
  phoneNumber: string;
}

export const insertLawyerInfo = async (data: LawyerInfoInsertPayload) => {
  const { userId } = await auth();
  if (!userId) return null;

  const lawyerInsertPromise = db.insert(lawyerInfo).values({ ...data, userId });
  const userUpdatePromise = db
    .update(users)
    .set({ role: "LAWYER", phoneNumber: data.phoneNumber })
    .where(eq(users.id, userId));

  await Promise.all([lawyerInsertPromise, userUpdatePromise]);
};
