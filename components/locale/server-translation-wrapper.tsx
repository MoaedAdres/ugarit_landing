import { getTranslations } from "next-intl/server";
import type { AllTranslationKeys } from "@/types/i18n-types";
import type { JSX } from "react";

interface ServerTranslationWrapperProps {
  translationKey: AllTranslationKeys;
  values?: Record<string, any>;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default async function ServerTranslationWrapper({
  translationKey,
  values,
  className,
  as: Component = "span",
}: ServerTranslationWrapperProps) {
  const t = await getTranslations();

  return (
    <Component className={className}>{t(translationKey, values)}</Component>
  );
}
