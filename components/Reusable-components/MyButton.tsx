import { Button } from "../ui/button";
import { IMyButton } from "@/interfaces/ui/button";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

async function MyButton({
  text,
  variant = "default",
  Icon,
  classes,
  size = "lg",
  iconClasses = "h-5 w-5",
  ...props
}: IMyButton) {
  const t = await getTranslations();
  return (
    <Button
      variant={variant}
      size={size}
      {...props}
      className={cn(
        "text-secondary-900 shadow-md bg-background transition-smooth px-8 py-4 text-lg",
        classes,
      )}
    >
      {Icon && <Icon className={iconClasses} />}
      {text && t(text)}
    </Button>
  );
}

export default MyButton;
