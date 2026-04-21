import { Tariff } from "../../domain/entities/Tariff";
import { TariffRepository } from "../../domain/repositories/TariffRepository";

export const getTariffs = async (repo: TariffRepository): Promise<Tariff[]> => {
  return await repo.getAll();
};
