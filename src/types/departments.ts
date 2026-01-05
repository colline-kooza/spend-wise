export interface Department {
  id: string;
  name: string;
  code?: string;
  description?: string;
  color?: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  walkieTalkies?: WalkieTalkie[];
}

export interface WalkieTalkie {
  id: string;
  serialNumber: string;
  model?: string;
  frequency?: string;
  status: string;
  condition?: string;
  notes?: string;
  departmentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDepartmentRequest {
  name: string;
  code?: string;
  description?: string;
  color?: string;
}

export interface UpdateDepartmentRequest {
  name?: string;
  code?: string;
  description?: string;
  color?: string;
}

export interface DepartmentFilters {
  status?: string;
  search?: string;
}
