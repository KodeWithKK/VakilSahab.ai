"use server";

import axios from "axios";

import { UserInsert, UserUpdate } from "@/types";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addUser = async (user: UserInsert) => {
  return axios.post(`${BACKEND_BASE}/api/user`, user);
};

export const updateUser = async (userId: string, user: UserUpdate) => {
  return axios.put(`${BACKEND_BASE}/api/user/${userId}`, user);
};

export const deleteUser = async (userId: string) => {
  return axios.delete(`${BACKEND_BASE}/api/user/${userId}`);
};
