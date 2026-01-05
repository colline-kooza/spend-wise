// Types for Walkie Talkie Assignments

export interface CreateWalkieAssignmentRequest {
  walkieTalkieId: string;
  crewMemberId?: string;
  assignedToId?: string;
  assignedToName?: string;
  returnDate?: Date;
  notes?: string;
}

export interface UpdateWalkieAssignmentRequest {
  returnDate?: Date;
  notes?: string;
}

export interface ExtendAssignmentRequest {
  assignmentId: string;
  newReturnDate: Date;
  notes?: string;
}

export interface ReturnAssignmentRequest {
  assignmentId: string;
  notes?: string;
}

export interface WalkieAssignment {
  id: string;
  walkieTalkieId: string;
  walkieTalkie?: {
    id: string;
    serialNumber: string;
    model?: string;
    frequency?: string;
    status: string;
    condition?: string;
    project?: {
      id: string;
      name: string;
    };
    department?: {
      id: string;
      name: string;
      color?: string;
    };
  };
  assignedToId?: string;
  assignedTo?: {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    name?: string;
  };
  crewMemberId?: string;
  crewMember?: {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    role?: string;
    department?: {
      id: string;
      name: string;
      color?: string;
    };
  };
  assignedToName?: string;
  department?: string;
  checkoutDate: Date;
  returnDate?: Date;
  isReturned?: boolean;
  returnedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface AssignmentFilters {
  search?: string;
  departmentId?: string;
  crewMemberId?: string;
  status?: "active" | "returned" | "overdue";
  walkieTalkieId?: string;
}

export type AssignmentStatus = "active" | "returned" | "overdue" | "cancelled";
