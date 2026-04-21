import { Tariff } from "../domain/Tariff";
import { TariffRepository } from "../domain/TariffRepository";

export class TariffApi implements TariffRepository {
  async getAll(): Promise<Tariff[]> {
    const response = await fetch("https://tu-api.com/tariffs");
    const data = await response.json();
    return data;
  }
}