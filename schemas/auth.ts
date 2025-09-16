import * as z from "zod";
import { requiredEmailValidation, requiredPasswordValidation } from ".";

export const loginSchema = z.object({
  email: requiredEmailValidation(),
  password: requiredPasswordValidation(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
