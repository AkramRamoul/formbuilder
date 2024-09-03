"use server";
class UserNotFoundError extends Error {}
import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs/server";
import { create } from "domain";
import { redirect } from "next/navigation";

export async function GetFormStats() {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
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

export async function createForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  const { name, description } = data;
  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description: description ?? "",
      createdAt: new Date(),
    },
  });

  if (!form) {
    throw new Error("Something went wrong");
  }
  return form.id;
}

export async function GetForms() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetFormById(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
}
export async function UpdateFormContent(id: number, jsonContent: string) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishForm(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  return await prisma.form.update({
    data: {
      published: true,
    },
    where: {
      userId: user.id,
      id,
    },
  });
}

export const GetFormByUrl = async (url: string) => {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareURL: url,
    },
  });
};

export const SubmitForm = async (formUrl: string, content: string) => {
  return await prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmission: {
        create: {
          content: content,
        },
      },
    },
    where: {
      shareURL: formUrl,
    },
  });
};

export const GetFormWithSubmissions = async (id: number) => {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
    include: {
      FormSubmission: true,
    },
  });
};
