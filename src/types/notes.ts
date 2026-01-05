export interface CreateNoteRequest {
  title?: string;
  content: string;
  projectId?: string;
  crewMemberId?: string;
  walkieTalkieId?: string;
  departmentId?: string;
  isPinned?: boolean;
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  crewMemberId?: string;
  walkieTalkieId?: string;
  departmentId?: string;
  isPinned?: boolean;
}

export interface Note {
  id: string;
  title: string | null;
  content: string;
  projectId: string | null;
  crewMemberId: string | null;
  walkieTalkieId: string | null;
  departmentId: string | null;
  authorId: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  author?: any;
  project?: any;
  crewMember?: any;
  walkieTalkie?: any;
  department?: any;
}
