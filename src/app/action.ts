"use server";

import { cookies } from "next/headers";

export async function getCookies(cookieName: string) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName);
  return cookie;
}

export async function setCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value);
}
