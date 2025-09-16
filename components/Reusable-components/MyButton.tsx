import { Button } from "../ui/button";
import { IMyButton } from "@/interfaces/ui/button";
import { cn } from "@/lib/utils";
import { Arrow } from "@radix-ui/react-select";
import { getTranslations } from "next-intl/server";

async function MyButton({
  text,
  variant = "default",
  Icon,
  classes,
  size = "lg",
}: IMyButton) {
  const t = await getTranslations();
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "text-secondary-900 bg-background hover:bg-background transition-smooth px-8 py-4 text-lg",
        classes,
      )}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {t(text)}
    </Button>
  );
}

export default MyButton;
