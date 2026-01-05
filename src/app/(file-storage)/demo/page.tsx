// app/demo/page.tsx
"use client";

import { Download, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FileWithMetadata } from "@/components/ui/dropzone";
import { Dropzone } from "@/components/ui/dropzone";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DemoPage() {
  const [s3Files, setS3Files] = useState<FileWithMetadata[]>([]);
  const [r2Files, setR2Files] = useState<FileWithMetadata[]>([]);
  const [activeProvider, setActiveProvider] = useState<
    "aws-s3" | "cloudflare-r2"
  >("aws-s3");

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return "🖼️";
    if (type.includes("pdf")) return "📄";
    if (type.includes("word")) return "📝";
    if (type.includes("zip")) return "📦";
    return "📁";
  };

  const currentFiles = activeProvider === "aws-s3" ? s3Files : r2Files;

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">File Upload Demo</h1>
        <p className="text-muted-foreground">
          Test file uploads with AWS S3 and Cloudflare R2 using our reusable
          dropzone component.
        </p>
      </div>

      <Tabs
        value={activeProvider}
        onValueChange={(v) => setActiveProvider(v as any)}
        className="mb-8"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="aws-s3">AWS S3</TabsTrigger>
          <TabsTrigger value="cloudflare-r2">Cloudflare R2</TabsTrigger>
        </TabsList>

        <TabsContent value="aws-s3" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>AWS S3 Upload</span>
                <Badge variant="secondary">Reliable & Mature</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Dropzone
                provider="aws-s3"
                variant="default"
                maxFiles={10}
                maxSize={1024 * 1024 * 50} // 50MB
                onFilesChange={setS3Files}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cloudflare-r2" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Cloudflare R2 Upload</span>
                <Badge variant="secondary">Cost Effective</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Dropzone
                provider="cloudflare-r2"
                variant="default"
                maxFiles={10}
                maxSize={1024 * 1024 * 50} // 50MB
                onFilesChange={setR2Files}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* File Management Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Uploaded Files ({currentFiles.length})</span>
            <Badge variant="outline">
              {activeProvider === "aws-s3" ? "AWS S3" : "Cloudflare R2"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentFiles.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No files uploaded yet. Use the dropzone above to upload files.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Type</TableHead>
                  <TableHead>Filename</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <span className="text-2xl">
                        {getFileIcon(file.file.type)}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate font-medium">
                      {file.file.name}
                    </TableCell>
                    <TableCell>{formatFileSize(file.file.size)}</TableCell>
                    <TableCell>
                      {file.error ? (
                        <Badge variant="destructive">Error</Badge>
                      ) : file.uploading ? (
                        <Badge variant="secondary">Uploading</Badge>
                      ) : file.isDeleting ? (
                        <Badge variant="secondary">Deleting</Badge>
                      ) : (
                        <Badge variant="default">Completed</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {file.uploading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {file.progress}%
                          </span>
                        </div>
                      ) : file.error ? (
                        <span className="text-sm text-destructive">Failed</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Complete
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {file.objectUrl &&
                          file.file.type.startsWith("image/") && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                window.open(file.objectUrl, "_blank")
                              }
                              disabled={file.uploading || file.isDeleting}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = file.objectUrl!;
                            link.download = file.file.name;
                            link.click();
                          }}
                          disabled={file.uploading || file.isDeleting}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            // This would call the removeFile function from the Dropzone component
                            // For demo purposes, we'll show how it would work
                            console.log("Delete file:", file.id);
                          }}
                          disabled={file.uploading || file.isDeleting}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Stats Card */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{currentFiles.length}</div>
            <p className="text-xs text-muted-foreground">Total Files</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {formatFileSize(
                currentFiles.reduce((total, file) => total + file.file.size, 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">Total Size</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {currentFiles.filter((f) => !f.uploading && !f.error).length}
            </div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
