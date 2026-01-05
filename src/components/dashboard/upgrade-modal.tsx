"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  planName?: string;
  onUpgrade?: () => void;
  activeTier?: string;
}

export function UpgradeModal({
  isOpen,
  onClose,
  title = "Upgrade your plan",
  description = "You've reached the limits of your current plan. Upgrade to unlock more features.",
  planName = "Pro",
  onUpgrade,
  activeTier,
}: UpgradeModalProps) {
  const router = useRouter();

  const handleUpgrade = () => {
    router.push("/dashboard/billing");
    onUpgrade?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="mx-auto bg-purple-100 p-3 rounded-full mb-4 w-fit">
            <Zap className="h-6 w-6 text-purple-600" />
          </div>
          {activeTier && (
             <div className="flex justify-center mb-3">
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200 uppercase tracking-wide">
                  Current: {activeTier}
                </span>
             </div>
          )}
          <DialogTitle className="text-center text-xl">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-slate-50 p-4 rounded-lg border">
            <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wider">
              Unlock with {planName}:
            </h4>
            <ul className="space-y-2.5">
              {[
                "Unlimited projects",
                "Unlimited walkie talkies",
                "Team collaborators",
                "Advanced analytics",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-purple-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:justify-center gap-2">
          <Button
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium"
            size="lg"
          >
            Upgrade to {planName}
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full text-muted-foreground"
          >
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
