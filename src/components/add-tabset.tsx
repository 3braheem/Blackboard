import {Actions, BorderNode, DockLocation, Model, TabSetNode} from 'flexlayout-react';
import { IconPlus } from '@tabler/icons-react';
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
    DropdownMenuSubTrigger
  } from "@/components/ui/dropdown-menu"

export default function AddTabset({ model, tabSetNode }: { model: Model; tabSetNode: TabSetNode | BorderNode }) {
    const handleSelect = (e: any, name: string, component: string) => {
        e.stopPropagation();
        model.doAction(
            Actions.addNode(
                { type: "tab", name: name, component: component },
                tabSetNode.getId(),
                DockLocation.RIGHT,
                -1,
                true
            ) 
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button key="add-dropdown">
                    <IconPlus className="text-card hover:text-primary" size={12}/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>New Tab</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={(e) => {handleSelect(e, "Markdown", "md")}}>
                        Markdown              
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Charts</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>    
                                <DropdownMenuItem onSelect={(e) => {handleSelect(e, "Line Chart", "lc")}}>
                                    Line Chart            
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => {handleSelect(e, "Bar Chart", "bc")}}>
                                    Bar Chart            
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => {handleSelect(e, "Scatterplot", "sc")}}>
                                    Scatterplot           
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => {handleSelect(e, "Pie Chart", "pc")}}>
                                    Pie Chart            
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => {handleSelect(e, "Area Chart", "ac")}}>
                                    Area Chart            
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem onSelect={(e) => {handleSelect(e, "Image", "img")}}>
                        Image            
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(e) => {handleSelect(e, "Table", "tb")}}>
                        Table              
                    </DropdownMenuItem> 
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}