import * as z from "zod";
import { requiredEmailValidation, requiredPasswordValidation } from ".";

export const SignInSchema = z.object({
  email: requiredEmailValidation(),
  password: requiredPasswordValidation(),
});

export type SignInFormData = z.infer<typeof SignInSchema>;
