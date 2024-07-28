"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function setRole(formData: FormData) {
  // Check that the user trying to set the role is an admin
  if (!checkRole("admin")) {
    return { message: "Not Authorized" };
  }

  try {
    const res = await clerkClient().users.updateUser(
      formData.get("id") as string,
      {
        publicMetadata: { role: "moderator" },
      }
    );
    revalidatePath('/')
  } catch (err) {
    return { message: err };
  }
}
export async function removeRole(formData: FormData) {
  // Check that the user trying to set the role is an admin
  if (!checkRole("admin")) {
    return { message: "Not Authorized" };
  }

  try {
    const res = await clerkClient().users.updateUser(
      formData.get("id") as string,
      {
        publicMetadata: { },
      }
    );
    revalidatePath('/')
  } catch (err) {
    return { message: err };
  }
}