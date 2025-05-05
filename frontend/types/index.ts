export interface UserBase {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  role: "USER" | "LAWYER" | "ADMIN";
}

export interface User extends UserBase {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInsert extends UserBase {}
export interface UserUpdate extends Omit<UserBase, "role" | "id"> {}
