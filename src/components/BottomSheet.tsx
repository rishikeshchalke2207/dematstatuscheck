import { ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomSheet({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-40">
      <div className="absolute inset-0 bg-foreground/40 animate-fade-in" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto bg-card rounded-t-[24px] animate-slide-up">
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-grip-border" />
        </div>
        {children}
      </div>
    </div>
  );
}
