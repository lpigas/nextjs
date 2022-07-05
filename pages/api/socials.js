// import { socials } from "../../constants/data/socials";
import { passData } from "./passData";
export default function handler(req, res) {
  req.method === "GET" && res.status(200).json(passData);
}
