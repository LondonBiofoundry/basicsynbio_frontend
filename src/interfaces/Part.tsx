export interface Part {
  id: string; // stores uuid of the part
  accessor?: string; // used to index collections
  label: string; // stores the human-readable label of part
  seq?: string; // stores the sequence
  collection?: string; // stores the collection origin if part comes from standard input
  description?: string; // stores the description if part comes from standard input
  type?: string; // stores origin type of part, user input / standard input
  base64?: string;
  multiple?: boolean;
  index?: number;
  binaryString?: string;
}
