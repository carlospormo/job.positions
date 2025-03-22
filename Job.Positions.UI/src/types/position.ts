export interface Position {
    positionNumber: number;
    title: string;
    statusId: number;
    departmentId: number;
    budget: number;
    department?:string,
    status?:string,
    recruiter?:string,
    recruiterId:number
}

export const createDefaultPosition = (): Position => ({
    positionNumber: 0,
    title: "",
    statusId: 0, // Default status
    departmentId: 0, // Default department
    budget: 0, // Default budget value,
    department:"",
    status:"",
    recruiter:"",
    recruiterId:0
});

export const departments = [
    { id: 1, name: "Human Resources" },
    { id: 2, name: "Engineering" },
    { id: 3, name: "Sales" },
    { id: 4, name: "Marketing" },
    { id: 5, name: "Finance" },
  ];

export const statuses = [
    { id: 1, name: "Active" },
    { id: 2, name: "Inactive" },
  ];

  export const recruiters = [
    { id: 1, name: "Carlos" },
    { id: 2, name: "Andres" },
  ];