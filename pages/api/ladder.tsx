import { api } from "./api";

export const getLadder = () => {
  const id = "Ritual";
  const path = `ladders/${id}`;
  return api(path);
};
