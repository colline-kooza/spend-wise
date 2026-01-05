export type ContributorRole = "viewer" | "editor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface ProjectCollaborator {
  id: string;
  projectId: string;
  userId: string;
  user: User;
  role: ContributorRole;
  status: "active" | "removed" | "suspended";
  addedAt: Date;
  updatedAt: Date;
  invitedBy?: string;
  removedAt?: Date;
  removedBy?: string;
}

export interface ProjectInvitation {
  id: string;
  projectId: string;
  email: string;
  role: ContributorRole;
  inviterId: string;
  inviter: User;
  status: "pending" | "accepted" | "declined" | "expired" | "cancelled";
  token: string;
  createdAt: Date;
  expiresAt: Date;
  respondedAt?: Date;
  message?: string;
  user?: User;
  userId?: string;
}

export interface SearchUserResult {
  id: string;
  name: string;
  email: string;
  image?: string;
  isCollaborator: boolean;
}

export interface ContributorActionResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
export interface InvitationPageData {
  id: string;
  projectId: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
  expiresAt: Date;
  message?: string | null;
  project: {
    id: string;
    name: string;
    description?: string | null;
  };
  inviter: {
    id: string;
    name: string | null;
    email: string;
    image?: string;
  };
}
