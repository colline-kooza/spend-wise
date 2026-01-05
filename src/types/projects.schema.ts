import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(255),
  description: z.string().optional(),
  status: z.enum(["active", "completed", "archived"]).default("active"),
});

export const updateProjectSchema = createProjectSchema.partial().extend({
  id: z.string(),
});

export const projectDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  ownerId: z.string(),
});

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;
export type UpdateProjectFormValues = z.infer<typeof updateProjectSchema>;
export type ProjectDetail = z.infer<typeof projectDetailSchema>;
