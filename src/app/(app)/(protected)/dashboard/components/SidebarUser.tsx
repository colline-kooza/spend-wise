"use client";

import { Activity, CreditCard, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { signOut } from "@/auth-lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SidebarUserProps {
  isCollapsed: boolean;
  userName: string;
  userEmail: string;
  userImage?: string | null;
  activeTier?: string;
}

export function SidebarUser({
  isCollapsed,
  userName,
  userEmail,
  userImage,
  activeTier,
}: SidebarUserProps) {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/login");
    toast.success("Logout successful");
  }

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "h-11 rounded-lg",
                isCollapsed ? "w-11 px-0" : "w-full justify-start gap-3 px-3",
                "hover:bg-sidebar-accent text-muted-foreground"
              )}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={userImage || "/avatar-placeholder.png"}
                  alt={userName}
                />
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              {!isCollapsed && (
                <div className="flex min-w-0 flex-1 flex-col items-start">
                  <span className="truncate text-sm font-medium">
                    {userName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {userEmail}
                  </span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>

        {isCollapsed && <TooltipContent side="right">Account</TooltipContent>}
      </Tooltip>

      <DropdownMenuContent
        className="w-56"
        align="end"
        side={isCollapsed ? "right" : "top"}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/user-activity">
            <Activity className="mr-2 h-4 w-4" />
            User Activity
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            className="flex cursor-pointer items-center justify-between"
            href="/dashboard/billing"
          >
            <div className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </div>
            {activeTier && (
              <span className="rounded border border-purple-200 bg-purple-100 px-1.5 py-0.5 text-[10px] font-semibold text-purple-700 uppercase">
                {activeTier}
              </span>
            )}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <button onClick={handleLogout} className="w-full text-left">
          <DropdownMenuItem className="cursor-pointer text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
