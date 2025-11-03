import {Actions, BorderNode, Model, TabNode, TabSetNode} from 'flexlayout-react';
import { IconSwitch } from '@tabler/icons-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { useApp } from '@/store';


export default function TabsetConfig({ model, tabSetNode }: { model: Model; tabSetNode: TabSetNode | BorderNode }) {
    const active = (tabSetNode.getSelectedNode?.() as TabNode)
        ?? (tabSetNode.getChildren?.()[0] as TabNode);
    const comp = active.getComponent?.();

    const handleSelect = (e: any, name: string, component: string) => {
        e.stopPropagation();
        model.doAction(
            Actions.updateNodeAttributes(
                active.getId(),
                { type: "tab", name: name, component: component }
            ) 
        );
        useApp(x => x.setVersion(x.version + 1));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button key="config-dropdown">
                    <IconSwitch className="text-card hover:text-primary" size={12}/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Configure</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem> Data </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className={comp === "md" ? "bg-accent" : "bg-none"} onSelect={(e) => {handleSelect(e, "Markdown", "md")}}>
                        Markdown              
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Charts</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>    
                                <DropdownMenuItem className={comp === "lc" ? "bg-accent" : "bg-none"}  onSelect={(e) => {handleSelect(e, "Line Chart", "lc")}}>
                                    Line Chart            
                                </DropdownMenuItem>
                                <DropdownMenuItem className={comp === "bc" ? "bg-accent" : "bg-none"} onSelect={(e) => {handleSelect(e, "Bar Chart", "bc")}}>
                                    Bar Chart            
                                </DropdownMenuItem>
                                <DropdownMenuItem className={comp === "sc" ? "bg-accent" : "bg-none"} onSelect={(e) => {handleSelect(e, "Scatterplot", "sc")}}>
                                    Scatterplot           
                                </DropdownMenuItem>
                                <DropdownMenuItem className={comp === "pc" ? "bg-accent" : "bg-none"} onSelect={(e) => {handleSelect(e, "Pie Chart", "pc")}}>
                                    Pie Chart            
                                </DropdownMenuItem>
                                <DropdownMenuItem className={comp === "ac" ? "bg-accent" : "bg-none"}  onSelect={(e) => {handleSelect(e, "Area Chart", "ac")}}>
                                    Area Chart            
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem className={comp === "img" ? "bg-accent" : "bg-none"} onSelect={(e) => {handleSelect(e, "Image", "img")}}>
                        Image            
                    </DropdownMenuItem>
                    <DropdownMenuItem className={comp === "tb" ? "bg-accent" : "bg-none"} onSelect={(e) => {handleSelect(e, "Table", "tb")}}>
                        Table              
                    </DropdownMenuItem> 
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}