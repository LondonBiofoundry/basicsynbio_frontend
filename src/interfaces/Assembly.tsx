import { Part } from "./Part";

export interface Assembly {
  id: string;
  parts: Part[];
  name: string;
  description: string;
}
