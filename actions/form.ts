"use server";
class UserNotFoundError extends Error {}
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
export async function GetFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  const stats = prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });
  const visits = (await stats)._sum.visits || 0;
  const submissions = (await stats)._sum.submissions || 0;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissionRate,
    submissions,
    bounceRate,
  };
}
