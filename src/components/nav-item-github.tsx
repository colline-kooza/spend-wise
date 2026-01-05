/* eslint-disable @next/next/no-img-element */
import React from "react";

import { Button } from "@/components/ui/button";
import { SOURCE_CODE_GITHUB_URL } from "@/config/site";

import { Icons } from "./icons";

export function NavItemGitHub() {
  return (
    <Button variant="outline" size="icon" asChild>
      <a
        href={SOURCE_CODE_GITHUB_URL}
        target="_blank"
        rel="noopener"
        className="block"
      >
        <img
          className="h-auto w-32 rounded-full"
          alt="yOUTUBE"
          src="/youtube.webp"
          fetchPriority="high"
        />
      </a>
    </Button>
  );
}
