import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import { ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { useBarChartConfig } from "@/hooks/use-bar-chart-config";
import type { Row } from "@/types";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { IconAxisX, IconAxisY } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

type BcProps = { catKeys: string[], numKeys: string[], rows: Row[] };

export default function Bc({ numKeys, catKeys, rows }: BcProps) {
    const [selectedX, setSelectedX] = useState<string>(catKeys[0]);
    const [selectedY, setSelectedY] = useState<string[]>(numKeys.sort());
    const config = useBarChartConfig({ numericalKeys: numKeys });

    function setItem(arr: string[], item: string, checked: boolean, unique: boolean): string[] {
        if (unique) return checked ? [item] : [];
        return checked ? [...arr, item] : arr.filter(x => x !== item);
    }
    
    const handleToggle = (axis: string, key: string, checked: boolean) => {
        axis === "x" ?
            setSelectedX(prev => setItem([prev], key, checked, true)[0])
        :
            setSelectedY(prev => setItem(prev, key, checked, false));
    };

    if (!config) return <div className="p-4 text-sm text-muted-foreground">Must select at most 4 numerical columns.</div>;
    return (
        <div className="flex flex-col justify-start items-start h-full group">
        <h2 className="pt-4 px-8 text-[24px] text-primary focus:bg-foreground w-full">
            <input
                className="w-full bg-transparent focus:outline-none"
                placeholder="Title"
            />
        </h2>
        <h3 className="py-1 px-8 text-[16px] text-muted/80 focus:bg-foreground italic w-full">
            <input
                className="w-full bg-transparent focus:outline-none"
                placeholder="Subtitle"
            />
        </h3>
        <Separator className="my-4" />
        <ChartContainer config={config} className="h-4/5 w-full pt-4 pr-4 my-chart">
            <BarChart accessibilityLayer data={rows} >
                <CartesianGrid vertical={false} />
                <XAxis 
                    dataKey={selectedX}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    //tickFormatter={(value) => value.toUpperCase()}
                 />
                 <YAxis type="number" />
                <ChartTooltip cursor={{ fill: "var(--color-foreground)" }} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                {selectedY.map((key) => (
                    <Bar dataKey={key} fill={`var(--color-${key})`} radius={4} isAnimationActive={false} />
                ))}
            </BarChart>
        </ChartContainer>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100">
            <ButtonGroup className="bg-background rounded-[8px]">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            <IconAxisY />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                    <DropdownMenuContent side="bottom" align="end">
                        {numKeys
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column}
                                    className="capitalize"
                                    checked={selectedY.includes(column)}
                                    onCheckedChange={(checked) =>
                                        handleToggle("y", column, !!checked)
                                    }
                                >
                                    {column}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                    </DropdownMenuContent>
                    </DropdownMenuPortal>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            <IconAxisX />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                    <DropdownMenuContent side="bottom" align="end">
                        {catKeys
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column}
                                    className="capitalize"
                                    checked={selectedX.includes(column)}
                                    onCheckedChange={(checked) =>
                                        handleToggle("x", column, !!checked)
                                    }
                                >
                                    {column}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                    </DropdownMenuContent>
                    </DropdownMenuPortal>
                </DropdownMenu>
            </ButtonGroup>
        </div>
        </div>
    );
}
