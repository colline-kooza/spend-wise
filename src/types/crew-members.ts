export interface CrewMember {
  id: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  role?: string | null;
  departmentId?: string | null;
  department?: {
    id: string;
    name: string;
    code?: string;
    color?: string;
  } | null;
  projectId: string;
  organizationId?: string | null;
  walkieTalkieAssignments?: Array<{
    id: string;
    walkieTalkieId: string;
    walkieTalkie?: {
      serialNumber: string;
      model?: string;
      status: string;
      label?: string;
      innerLabel?: string;
    };
    checkoutDate: Date;
    returnDate?: Date | null;
    notes?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCrewMemberRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  role?: string;
  departmentId?: string;
  walkieId?: string;
}

export interface UpdateCrewMemberRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  departmentId?: string;
  walkieId?: string;
}

export interface CrewMembersResponse {
  crewMembers: CrewMember[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
