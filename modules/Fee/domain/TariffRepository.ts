import { Tariff } from "../entities/Tariff";

export interface TariffRepository {
  getAll(): Promise<Tariff[]>;
}