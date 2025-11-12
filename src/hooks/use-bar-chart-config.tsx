import type { ChartConfig } from "@/components/ui/chart";

type useBarChartConfigOpts = {
    numericalKeys: string[];
}

export function useBarChartConfig({ numericalKeys }: useBarChartConfigOpts): ChartConfig | null {
    if (numericalKeys.length > 4) return null;
    let config = numericalKeys.reduce<ChartConfig>((acc, key, i) => {
            acc[key] = { label: key, color: `var(--chart-${i+1})` };
            return acc;
    }, {});
    return config;
}