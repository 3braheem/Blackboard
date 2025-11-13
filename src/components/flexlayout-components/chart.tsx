import type { Dataset } from "@/types";
import Bc from "./bc";

type ChartProps = {
    node_id: string,
    v_id: string,
    data: Dataset | null,
    type: string
}

export default function Chart({ node_id, v_id, data, type }: ChartProps) {
    const rows = data?.rows || [];
    const keys = data?.rows[0] ? Object.keys(data.rows[0]) : [];
    
    const numericalKeys = keys.filter(x => data?.rows.some(r => typeof r[x] === "number"));
    const catKeys = keys.filter(x => data?.rows.some(r => typeof r[x] !== "number"));

    switch (type) {
        case "bar":
            return <Bc numKeys={numericalKeys} catKeys={catKeys} rows={rows} />;
    }
}