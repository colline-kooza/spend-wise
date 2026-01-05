export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

export interface WalkieTalkie {
  id: string;
  serialNumber: string;
  label?: string;
  innerLabel?: string;
  status: "available" | "assigned" | "maintenance" | "inactive";
  notes?: string;
  departmentId?: string;
  department?: {
    id: string;
    name: string;
    color?: string;
    code?: string;
  };
  createdAt: string;
  updatedAt: string;
  assignments?: WalkieTalkieAssignment[];
}

export interface WalkieTalkieAssignment {
  id: string;
  walkieTalkieId: string;
  assignedToId?: string;
  assignedToName?: string;
  assignedTo?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  crewMemberId?: string;
  crewMember?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  department?: string;
  checkoutDate: string;
  returnDate?: string;
  expectedReturnDate?: string;
  notes?: string;
  createdAt: string;
}

export interface CreateWalkieTalkieRequest {
  serialNumber: string;
  label?: string;
  innerLabel?: string;
  status?: "available" | "assigned" | "maintenance" | "inactive";
  notes?: string;
  departmentId?: string;
  assignedToCrewId?: string;
  expectedReturnDate?: string | Date;
  assignedReturnDate?: string | Date;
}

export interface UpdateWalkieTalkieRequest {
  serialNumber?: string;
  label?: string;
  innerLabel?: string;
  status?: "available" | "assigned" | "maintenance" | "inactive";
  notes?: string;
  departmentId?: string;
  assignedToCrewId?: string;
  assignedReturnDate?: string | Date; // For closing active assignment
  expectedReturnDate?: string | Date;
}
