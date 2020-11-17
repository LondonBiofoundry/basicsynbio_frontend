import { SeqViz } from "seqviz";

export default function MySeqViz() {
    return(
        <SeqViz
            name="J23100"
            seq="TTGACGGCTAGCTCAGTCCTAGGTACAGTGCTAGC"
            annotations={[{ name: "promoter", start: 0, end: 34, direction: 1 }]}
        />
    )
}