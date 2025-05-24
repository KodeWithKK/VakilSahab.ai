import { table } from "console";
import { relations } from "drizzle-orm";
import {
  foreignKey,
  integer,
  jsonb,
  pgTable,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import * as z from "zod";

/* ------ TABLES ------ */
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  photo: text("photo").notNull(),
  phoneNumber: text("phone_number"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  role: text("role").notNull().default("USER"),
});

export const lawyerInfo = pgTable(
  "lawyer_info",
  {
    userId: text("user_id").primaryKey(),
    specialization: text("specialization").notNull(),
    experienceInYears: real("experience").notNull(),
    consultationFees: integer("consultation_fees").notNull(),
    rating: real("rating").default(0),
    reviewCount: integer("review_count").default(0),
    bio: text("bio"),
    services: jsonb("servies"),
  },
  (table) => [
    foreignKey({ columns: [table.userId], foreignColumns: [users.id] })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ],
);

/* ------ RELATIONSHIPS ------ */
export const userRelations = relations(users, ({ one }) => ({
  lawyerInfo: one(lawyerInfo, {
    fields: [users.id],
    references: [lawyerInfo.userId],
  }),
}));

export const lawyerInfoRelations = relations(lawyerInfo, ({ one }) => ({
  user: one(users, {
    fields: [lawyerInfo.userId],
    references: [users.id],
  }),
}));

/* ------ SCHEMAS ------ */
export const userInsertSchema = createInsertSchema(users);
export const userUpdateSchema = createUpdateSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const lawyerInfoUpdateSchema = createUpdateSchema(lawyerInfo);
export const lawyerInfoInsertSchema = createInsertSchema(lawyerInfo);

export type UserInsert = z.infer<typeof userInsertSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type LawyerInfoInsert = z.infer<typeof lawyerInfoInsertSchema>;
export type LawyerInfoUpdate = z.infer<typeof lawyerInfoUpdateSchema>;
