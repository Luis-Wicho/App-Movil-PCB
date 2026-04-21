import { Tariff } from "../../domain/entities/Tariff";
import { TariffRepository } from "../../domain/repositories/TariffRepository";

export class TariffApi implements TariffRepository {
  async getAll(): Promise<Tariff[]> {
    const response = await fetch("https://tu-api.com/tariffs");
    const data = await response.json();
    return data;
  }
}