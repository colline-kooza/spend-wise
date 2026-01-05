"use server";

import { revalidatePath } from "next/cache";

import { getAuthUser } from "@/auth-lib/auth";
import db from "@/lib/prisma";

export async function updateProfileImage(imageUrl: string) {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  await db.user.update({
    where: { id: user.id },
    data: { image: imageUrl },
  });

  revalidatePath("/dashboard/profile");
  return { success: true };
}

export async function updatePersonalInfo(data: {
  firstName: string;
  lastName: string;
}) {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      // Update the full name as well if it exists or is a composite
      name: `${data.firstName} ${data.lastName}`,
    },
  });

  revalidatePath("/dashboard/profile");
  return { success: true };
}

export async function updateProfessionalInfo(data: {
  jobTitle: string;
  bio: string;
}) {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      jobTitle: data.jobTitle,
      bio: data.bio,
    },
  });

  revalidatePath("/dashboard/profile");
  return { success: true };
}
