import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { ReactNode } from "react";

interface RDialogProps {
  triggerComponent?: ReactNode;
  dialogHeader?: {
    title: string;
    description?: string;
  } | null;
  dialogBody?: ReactNode;
  dialogFooter?: ReactNode;
  contentClassName?: string;
}

const RDialog: React.FC<RDialogProps> = ({
  triggerComponent,
  dialogHeader = null,
  dialogBody = null,
  dialogFooter = null,
  contentClassName = "max-w-fit",
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerComponent ? (
          triggerComponent
        ) : (
          <Button variant="outline" className="w-fit">
            Open Dialog
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className={contentClassName}>
        {dialogHeader && (
          <DialogHeader>
            <DialogTitle>{dialogHeader.title}</DialogTitle>
            {dialogHeader.description && (
              <DialogDescription>{dialogHeader.description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {dialogBody}
        {dialogFooter && <DialogFooter>{dialogFooter}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default RDialog;
