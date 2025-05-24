"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/db/config";
import { lawyerInfo, LawyerInfoInsert, users } from "@/db/schema";

export interface LawyerInfoInsertPayload
  extends Omit<LawyerInfoInsert, "userId"> {
  phoneNumber: string;
}

export const getLawyersInfo = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const lawyers = await db.query.lawyerInfo.findMany({
    columns: {
      userId: false,
    },
    with: {
      user: {
        columns: {
          createdAt: false,
          updatedAt: false,
          role: false,
        },
      },
    },
    where: eq(lawyerInfo.userId, userId),
  });

  return lawyers.map((lawyer) => {
    const { user, ...lawyerInfo } = lawyer;
    return {
      ...user,
      ...lawyerInfo,
      services: lawyerInfo.services
        ? JSON.parse(lawyerInfo.services as string)
        : [],
    };
  });
};

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
