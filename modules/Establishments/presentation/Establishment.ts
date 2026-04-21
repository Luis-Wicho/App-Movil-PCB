export interface Establishment {
  id: number;
  expediente: string;
  name: string;
  owner: string;
  status: "liberado" | "pendiente" | "inactivo";
  giro: string;
  size: "chico" | "mediano" | "grande";
}