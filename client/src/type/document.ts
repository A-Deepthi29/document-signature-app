export interface DocumentType {
  _id: string;
  fileName: string;
  filePath: string;
  status: "Pending" | "Signed";
  createdAt: string;
  x?: number;
  y?: number;
}