"use server";
import { ActionError } from "@/api/types/error";
import { actionClient } from "@/lib/safe-action";
import { messages } from "@/constants/messages";
import { loginSchema } from "@/schemas/auth";
import { signIn, signOut } from "next-auth/react";
export const signInAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        // redirectTo: "/",
        mode: "sign-in",
        ...data,
      });
      console.log("loginAction", response);
      return messages.success.auth.login.title;
    } catch {
      // console.log("error instanceof AuthError", error instanceof AuthError);
      throw new ActionError(messages.error.auth.invalidCredential);
    }
  });

export const signOutAction = actionClient.action(async () => {
  try {
    await signOut();
  } catch {
    // const t = await getTranslations("Messages");
    // console.log(error)
    // throw new Error(t("error.network"));
  }
});
