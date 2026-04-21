import { Tariff } from "./Tariff";

export interface TariffRepository {
  getAll(): Promise<Tariff[]>;
}