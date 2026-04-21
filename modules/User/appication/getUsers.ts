import { getUsers } from "../intraestructure/userApi";

export const fetchUsers = async () => {
  return await getUsers();
};