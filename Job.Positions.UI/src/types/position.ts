export interface Position {
    positionNumber: string;
    title: string;
    status: string;
    department: string;
    budget: number;
}

export const createDefaultPosition = (): Position => ({
    positionNumber: "",
    title: "",
    status: "Active", // Default status
    department: "General", // Default department
    budget: 0, // Default budget value
});
  