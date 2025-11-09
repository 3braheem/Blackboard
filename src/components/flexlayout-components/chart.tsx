import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

import type { Dataset } from "@/types";

type ChartProps = { node_id: string, v_id: string, type: string, data: Dataset | null };

export default function Chart({ node_id, v_id, type, data }: ChartProps) {
    const keys = data?.rows[0] ? Object.keys(data.rows[0]) : [];
    let config: ChartConfig = keys.reduce<ChartConfig>((acc, key) => {
            acc[key] = { label: key };
            return acc;
    }, {});

    const keyss = keys.slice(2, 4);
        
    return (
        <ChartContainer config={config} className="min-h-[200px] w-full pt-8 px-4">
            <BarChart accessibilityLayer data={data?.rows} >
                <CartesianGrid vertical={false} />
                <XAxis 
                    dataKey={keys[1]}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                 />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                {keyss.map((key, index) => (
                    <Bar dataKey={key} fill={`var(--chart-${index}`} />
                ))}
            </BarChart>
        </ChartContainer>
    );
}
