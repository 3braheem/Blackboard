import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { useBarChartConfig } from "@/hooks/use-bar-chart-config";
import type { Row } from "@/types";

type BcProps = { strKeys: string[], numKeys: string[], rows: Row[] };

export default function Bc({ numKeys, strKeys, rows }: BcProps) {
    const myNumKeys = numKeys.slice(0, 4);
    const myStrKeys = strKeys[1];
    const config = useBarChartConfig({ numericalKeys: myNumKeys });

    if (!config) return <div className="p-4 text-sm text-muted-foreground">Must select at most 4 numerical columns.</div>;
    return (
        <ChartContainer config={config} className="h-3/4 w-full pt-8 pr-4 my-chart">
            <BarChart accessibilityLayer data={rows} >
                <CartesianGrid vertical={false} />
                <XAxis 
                    dataKey={myStrKeys}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                 />
                 <YAxis />
                <ChartTooltip cursor={{ fill: "var(--color-foreground)" }} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                {myNumKeys.map((key) => (
                    <Bar dataKey={key} fill={`var(--color-${key})`} radius={4} isAnimationActive={false} />
                ))}
            </BarChart>
        </ChartContainer>
    );
}
