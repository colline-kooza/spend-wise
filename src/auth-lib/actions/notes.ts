"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/prisma";
import type { CreateNoteRequest, UpdateNoteRequest } from "@/types/notes";
import { getAuthUser } from "../auth";
import { getActiveProjectCookie } from "./active-project";
import { logActivity } from "./activity-log";

// Helper function to verify project access
async function verifyProjectAccess(projectId: string, userId: string) {
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { ownerId: true },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.ownerId !== userId) {
    throw new Error("You don't have permission to access this project");
  }

  return project;
}

export async function createNote(
  projectId: string,
  userId: string,
  data: CreateNoteRequest
) {
  const project = await getActiveProjectCookie();
  const activeProjectId = project?.id || "";

  try {
    if (!userId) {
      return {
        success: false,
        data: null,
        error: "Authentication required",
      };
    }

    await verifyProjectAccess(projectId, userId);

    if (!data.content || data.content.trim() === "") {
      return {
        success: false,
        data: null,
        error: "Note content is required",
      };
    }

    const note = await db.note.create({
      data: {
        title: data.title || null,
        content: data.content.trim(),
        projectId: activeProjectId,
        crewMemberId: data.crewMemberId || null,
        walkieTalkieId: data.walkieTalkieId || null,
        departmentId: data.departmentId || null,
        authorId: userId,
        isPinned: data.isPinned || false,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        crewMember: {
          include: {
            department: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
        walkieTalkie: {
          include: {
            department: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
        department: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });

    await logActivity(
      activeProjectId,
      userId,
      "CREATE",
      "NOTE",
      note.id,
      `Created note: ${note.content.substring(0, 50)}${
        note.content.length > 50 ? "..." : ""
      }`
    );

    revalidatePath("/dashboard");
    return {
      success: true,
      data: note,
      message: "Note created successfully",
    };
  } catch (error) {
    console.error("❌ Error creating note:", error);

    if (error instanceof Error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }

    return {
      success: false,
      data: null,
      error: "Failed to create note. Please try again.",
    };
  }
}

export async function getNotes(
  projectId: string,
  userId: string,
  filters?: {
    search?: string;
    isPinned?: boolean;
    crewMemberId?: string;
    walkieTalkieId?: string;
    departmentId?: string;
  }
) {
  try {
    if (!userId) {
      return {
        success: false,
        error: "Authentication required",
        data: [],
      };
    }

    const where: any = {
      AND: [
        {
          OR: [{ projectId: projectId }, { authorId: userId }],
        },
      ],
    };

    if (filters?.search) {
      where.AND.push({
        OR: [
          {
            title: {
              contains: filters.search,
              mode: "insensitive" as const,
            },
          },
          {
            content: {
              contains: filters.search,
              mode: "insensitive" as const,
            },
          },
        ],
      });
    }

    if (filters?.isPinned !== undefined) {
      where.AND.push({ isPinned: filters.isPinned });
    }

    if (filters?.crewMemberId) {
      where.AND.push({ crewMemberId: filters.crewMemberId });
    }

    if (filters?.walkieTalkieId) {
      where.AND.push({ walkieTalkieId: filters.walkieTalkieId });
    }

    if (filters?.departmentId) {
      where.AND.push({ departmentId: filters.departmentId });
    }

    const notes = await db.note.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        crewMember: {
          include: {
            department: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
        walkieTalkie: {
          include: {
            department: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
        department: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    });

    return {
      success: true,
      data: notes,
    };
  } catch (error) {
    console.error("❌ Error fetching notes:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }

    return {
      success: false,
      error: "Failed to fetch notes. Please try again.",
      data: [],
    };
  }
}

export async function getNoteById(
  noteId: string,
  projectId: string,
  userId: string
) {
  try {
    if (!userId) {
      return {
        success: false,
        error: "Authentication required",
        data: null,
      };
    }

    await verifyProjectAccess(projectId, userId);

    const note = await db.note.findUnique({
      where: { id: noteId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        crewMember: {
          include: {
            department: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
        walkieTalkie: {
          include: {
            department: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
        department: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });

    if (!note) {
      return {
        success: false,
        error: "Note not found",
        data: null,
      };
    }

    if (note.projectId !== projectId) {
      return {
        success: false,
        error: "Note does not belong to this project",
        data: null,
      };
    }

    return {
      success: true,
      data: note,
    };
  } catch (error) {
    console.error("❌ Error fetching note:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }

    return {
      success: false,
      error: "Failed to fetch note. Please try again.",
      data: null,
    };
  }
}

export async function updateNote(
  noteId: string,
  projectId: string,
  userId: string,
  data: UpdateNoteRequest
) {
  try {
    if (!userId) {
      return {
        success: false,
        data: null,
        error: "Authentication required",
      };
    }

    await verifyProjectAccess(projectId, userId);

    const note = await db.note.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      return {
        success: false,
        data: null,
        error: "Note not found",
      };
    }

    if (note.projectId !== projectId) {
      return {
        success: false,
        data: null,
        error: "Note does not belong to this project",
      };
    }

    if (data.content !== undefined && data.content.trim() === "") {
      return {
        success: false,
        data: null,
        error: "Note content cannot be empty",
      };
    }

    const updated = await db.note.update({
      where: { id: noteId },
      data: {
        title: data.title !== undefined ? data.title : note.title,
        content:
          data.content !== undefined ? data.content.trim() : note.content,
        crewMemberId:
          data.crewMemberId !== undefined
            ? data.crewMemberId
            : note.crewMemberId,
        walkieTalkieId:
          data.walkieTalkieId !== undefined
            ? data.walkieTalkieId
            : note.walkieTalkieId,
        departmentId:
          data.departmentId !== undefined
            ? data.departmentId
            : note.departmentId,
        isPinned: data.isPinned !== undefined ? data.isPinned : note.isPinned,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        crewMember: {
          include: {
            department: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
        walkieTalkie: {
          include: {
            department: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
        department: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });

    await logActivity(
      projectId,
      userId,
      "UPDATE",
      "NOTE",
      noteId,
      `Updated note`
    );

    revalidatePath("/dashboard");
    return {
      success: true,
      data: updated,
      message: "Note updated successfully",
    };
  } catch (error) {
    console.error("❌ Error updating note:", error);

    if (error instanceof Error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }

    return {
      success: false,
      data: null,
      error: "Failed to update note. Please try again.",
    };
  }
}

export async function deleteNote(
  noteId: string,
  projectId: string,
  userId: string
) {
  try {
    if (!userId) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    await verifyProjectAccess(projectId, userId);

    const note = await db.note.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      return {
        success: false,
        error: "Note not found",
      };
    }

    if (note.projectId !== projectId) {
      return {
        success: false,
        error: "Note does not belong to this project",
      };
    }

    // FIX: Remove duplicate delete - only delete once!
    await db.note.delete({
      where: { id: noteId },
    });

    await logActivity(
      projectId,
      userId,
      "DELETE",
      "NOTE",
      noteId,
      `Deleted note`
    );

    revalidatePath("/dashboard");
    return {
      success: true,
      message: "Note deleted successfully",
    };
  } catch (error) {
    console.error("❌ Error deleting note:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "Failed to delete note. Please try again.",
    };
  }
}

export async function togglePinNote(
  noteId: string,
  projectId: string,
  userId: string,
  isPinned: boolean
) {
  try {
    if (!userId) {
      return {
        success: false,
        error: "Authentication required",
        data: null,
      };
    }

    await verifyProjectAccess(projectId, userId);

    const note = await db.note.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      return {
        success: false,
        error: "Note not found",
        data: null,
      };
    }

    if (note.projectId !== projectId) {
      return {
        success: false,
        error: "Note does not belong to this project",
        data: null,
      };
    }

    const updated = await db.note.update({
      where: { id: noteId },
      data: { isPinned },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        crewMember: {
          include: {
            department: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
        walkieTalkie: {
          include: {
            department: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
        department: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });

    revalidatePath("/dashboard");
    return {
      success: true,
      data: updated,
      message: isPinned ? "Note pinned" : "Note unpinned",
    };
  } catch (error) {
    console.error("❌ Error toggling pin:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }

    return {
      success: false,
      error: "Failed to update note. Please try again.",
      data: null,
    };
  }
}
