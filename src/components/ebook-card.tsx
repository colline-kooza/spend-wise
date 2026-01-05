import { BookOpen, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { Ebook } from "./ebook-list";

interface EbookCardProps {
  ebook: Ebook;
}

export function EbookCard({ ebook }: EbookCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-xl">
      {/* Book Thumbnail */}
      <div className="relative aspect-[3/4] w-full bg-muted">
        <Image
          src={ebook.thumbnail || "/placeholder.svg"}
          alt={`${ebook.title} cover`}
          width={1080}
          height={1080}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Book Details */}
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-balance">
              {ebook.title}
            </h2>
            {ebook.isFree && (
              <Badge variant="secondary" className="text-xs font-semibold">
                FREE
              </Badge>
            )}
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            {ebook.description}
          </p>
        </div>

        {/* Chapters */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <BookOpen className="h-5 w-5" />
            Core Chapters
          </h3>
          <div className="grid gap-3">
            {ebook.chapters.map((chapter, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
              >
                <h4 className="mb-1.5 font-semibold text-card-foreground">
                  {chapter.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {chapter.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-3">
          <Button asChild variant="default" size="lg">
            <Link
              href={ebook.bookWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Website
            </Link>
          </Button>
          {!ebook.isFree && ebook.buyLink && (
            <Button asChild variant="outline" size="lg">
              <Link
                href={ebook.buyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Purchase Book
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
