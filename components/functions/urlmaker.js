import { BASE_URL } from "../constants/consturl";
export const urlmaker = (addedPart = "") => {
  return BASE_URL + addedPart;
};
