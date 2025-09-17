import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "text-3xl font-semibold tracking-tight",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
      h5: "text-lg font-semibold",
      h6: "text-base font-semibold",
      p: "text-sm font-bold",
      span: "text-base font-bold",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    color: {
      default: "text-themeBlack",
      primary: "text-themePrimary",
      secondary: "text-secondaryText",
      muted: "text-muted-foreground",
      warning: "text-themeOrange",
      destructive: "text-themeBoldGrey",
    },
  },
  defaultVariants: {
    variant: "p",
    weight: "bold",
    align: "left",
    color: "default",
  },
});
type TypographyVariants = VariantProps<typeof typographyVariants>;

interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    TypographyVariants {
  asChild?: boolean;
  as?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant,
      weight,
      align,
      color,
      asChild = false,
      as: Tag = "p",
      ...props
    },
    ref
  ) => {

    const Comp = asChild ? Slot : Tag;
    return (
      <Comp
        className={cn(
          typographyVariants({
            variant,
            weight,
            align: align,
            color,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Typography.displayName = "Typography";

export { Typography, typographyVariants };
