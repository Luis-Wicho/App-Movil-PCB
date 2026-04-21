const API_URL = "http://10.0.2.2:3000/api/users";

export const getUsers = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};