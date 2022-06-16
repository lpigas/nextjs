import { socials } from "../../constants/data/socials";
export default function handler(req, res) {
  req.method === "GET" && res.status(200).json(socials);
}
