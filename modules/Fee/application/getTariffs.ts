import { Tariff } from "../domain/Tariff";
import { TariffRepository } from "../domain/TariffRepository";

export const getTariffs = async (repo: TariffRepository): Promise<Tariff[]> => {
  return await repo.getAll();
};
