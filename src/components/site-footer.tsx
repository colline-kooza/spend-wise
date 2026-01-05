import { Github, Linkedin, RssIcon, Youtube } from "lucide-react";

import { SITE_INFO, SOURCE_CODE_GITHUB_URL } from "@/config/site";
import { cn } from "@/lib/utils";

import { Icons } from "./icons";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before mx-auto border-x border-edge pt-4 md:max-w-3xl">
        {/* Main Sites Section */}
        <div className="mb-4 px-4 text-center">
          <p className="mb-2 font-mono text-sm text-muted-foreground">
            My Projects & Platforms
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <a
              className="link"
              href="https://desishub.com"
              target="_blank"
              rel="noopener"
            >
              Desishub Technologies
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              className="link"
              href="https://nextjsacademy.com"
              target="_blank"
              rel="noopener"
            >
              Nextjs Academy
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              className="link"
              href="https://reactuicomponents.com"
              target="_blank"
              rel="noopener"
            >
              React UI Components
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              className="link"
              href="https://wesendall.com"
              target="_blank"
              rel="noopener"
            >
              WeSendAll
            </a>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="mb-4 px-4 text-center">
          <div className="flex justify-center gap-6">
            <a
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              href="https://www.youtube.com/@JBWEBDEVELOPER"
              target="_blank"
              rel="noopener"
            >
              <Youtube className="size-4" />
              <span>YouTube (13.3K)</span>
            </a>
            <a
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              href="https://linkedin.com/in/jbwebdeveloper"
              target="_blank"
              rel="noopener"
            >
              <Linkedin className="size-4" />
              <span>LinkedIn</span>
            </a>
            <a
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              href="https://github.com/jbwebdeveloper"
              target="_blank"
              rel="noopener"
            >
              <Github className="size-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <p className="mb-1 px-4 text-center font-mono text-sm text-balance text-muted-foreground">
          Building tech, teaching devs, monetizing skills
        </p>

        <p className="mb-4 px-4 text-center font-mono text-sm text-balance text-muted-foreground">
          Built by{" "}
          <a
            className="link"
            href="https://jb.desishub.com"
            target="_blank"
            rel="noopener"
          >
            JB (Muke Johnbaptist)
          </a>
          {/* . The source code is available on{" "}
          <a
            className="link"
            href={SOURCE_CODE_GITHUB_URL}
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          . */}
        </p>

        <p className="mb-4 px-4 text-center font-mono text-xs text-muted-foreground">
          © {currentYear} JB Web Developer • Last updated: {currentDate}
        </p>

        {/* <div
          className={cn(
            "screen-line-before screen-line-after flex w-full before:z-1 after:z-1",
            "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56"
          )}
        >
          <div className="mx-auto flex items-center justify-center gap-3 border-x border-edge bg-background px-4">
            <a
              className="flex font-mono text-xs font-medium text-muted-foreground"
              href={`${SITE_INFO.url}/llms.txt`}
              target="_blank"
              rel="noopener noreferrer"
            >
              llms.txt
            </a>

            <Separator />

            <a
              className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              href={`${SITE_INFO.url}/rss`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RssIcon className="size-4" />
              <span className="sr-only">RSS</span>
            </a>

            <Separator />

            <a
              className="flex text-muted-foreground transition-colors hover:text-foreground"
              href={
                process.env.NEXT_PUBLIC_DMCA_URL ||
                "https://www.dmca.com/ProtectionPro.aspx"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.dmca className="h-5 w-auto" />
              <span className="sr-only">DMCA.com Protection Status</span>
            </a>
          </div>
        </div> */}
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}

function Separator() {
  return <div className="flex h-11 w-px bg-edge" />;
}
