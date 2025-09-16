import * as z from "zod";

export const requiredPasswordValidation = (params?: {
  error?: string;
  invalidError?: string;
}) => {
  const { error, invalidError } = params ?? {};
  return requiredStringValidation({
    error,
    minLength: 2,
    minLengthError: "كلمة المرور مطلوبة (8 أحرف على الأقل)",
  });
};

export const requiredStringValidation = (params?: {
  error?: string;
  minLength?: number;
  minLengthError?: string;
  maxLength?: number;
  maxLengthError?: string;
  nullable?: boolean;
}) => {
  const { error, minLength, minLengthError, maxLength, maxLengthError } =
    params ?? {};

  let schema = z.string({
    required_error: error ?? "هذا الحقل مطلوب",
  });

  if (minLength !== undefined) {
    schema = schema.min(
      minLength,
      minLengthError ?? `يجب أن يحتوي النص على الأقل ${minLength} حرف`,
    );
  } else {
    schema = schema.min(1, error ?? "هذا الحقل مطلوب");
  }

  if (maxLength !== undefined) {
    schema = schema.max(
      maxLength,
      maxLengthError ?? `يجب ألا يتجاوز النص ${maxLength} حرف`,
    );
  }

  return schema;
};

const ALLOWED_EMAIL_REGEX = /^[\w.-]+@(gmail\.com|outlook\.com)$/i;
export const isValidAllowedEmail = (email: string): boolean => {
  return ALLOWED_EMAIL_REGEX.test(email);
};

export const requiredEmailValidation = (params?: {
  error?: string;
  invalidError?: string;
}) => {
  const { error, invalidError } = params ?? {};
  return requiredStringValidation({ error: error ?? "البريد الإلكتروني مطلوب" })
    .email(
      invalidError ??
        "يجب أن يكون بريدًا إلكترونيًا صالحًا (مثل: user@gmail.com)",
    )
    .refine(isValidAllowedEmail, {
      message:
        "يُسمح فقط باستخدام بريد إلكتروني من نوع @gmail.com أو @outlook.com",
    });
};
