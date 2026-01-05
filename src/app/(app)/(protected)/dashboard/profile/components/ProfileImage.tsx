"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/lib/auth";
import { Upload, Camera } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateProfileImage } from "../actions";

interface ProfileImageProps {
  user: User;
}

export function ProfileImage({ user }: ProfileImageProps) {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState(user.image || "");

  const handleImageUpdate = () => {
    // Ideally this would open a file picker, upload to storage, then get a URL.
    // For now, we'll simulate an update or ask for a URL if we had a dialog.
    // Since we don't have a storage provider, we will just show a toast.
    toast.info("Image upload functionality requires a storage provider setup.", {
        description: "This implementation assumes a simulation."
    });
    
    // Example of how it would work if we had a URL
    // startTransition(async () => {
    //   try {
    //     await updateProfileImage("https://example.com/new-image.jpg");
    //     toast.success("Profile image updated");
    //   } catch (error) {
    //     toast.error("Failed to update image");
    //   }
    // });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>
          Update your profile picture to be recognized by your team.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-6">
        <Avatar className="h-24 w-24 border-2 border-muted">
          <AvatarImage src={user.image || ""} alt={user.name} />
          <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={isPending}
              onClick={handleImageUpdate}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload New
            </Button>
            {/* <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive/90">
              Remove
            </Button> */}
          </div>
          <p className="text-xs text-muted-foreground">
            Recommended: Square JPG, PNG, or GIF, at least 1000x1000 pixels.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
