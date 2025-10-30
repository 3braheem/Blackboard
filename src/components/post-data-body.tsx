import { IconChartArea, IconChartBar, IconChartDots, IconChartLine, IconChartPie, IconImageInPicture, IconPencil, IconPlus, IconQuestionMark, IconSwitch, IconTable, IconTrash } from '@tabler/icons-react';
import {Actions, DockLocation, Layout, Model, TabNode, TabSetNode} from 'flexlayout-react';

const json = {
    global: {
        "tabSetEnableDrop": false,
		"tabSetEnableSingleTabStretch": true,
		"tabSetMinWidth": 100,
		"tabSetMinHeight": 100,
        "tabSetEnableClose": true,
        "tabSetEnableMaximize": false
    },
    borders: [],
    layout: {
        type: "row",
        weight: 100,
        children: [
            { type: "tabset", weight: 50, children: [{ type: "tab", name: "Markdown", component: "md" }] },
            { type: "tabset", weight: 50, children: [{ type: "tab", name: "Line Chart", component: "lc" }] },   
            { type: "tabset", weight: 50, children: [{ type: "tab", name: "Bar Chart", component: "bc" }] },    
            { type: "tabset", weight: 50, children: [{ type: "tab", name: "Scatter Chart", component: "sc" }] },    
            { type: "tabset", weight: 50, children: [{ type: "tab", name: "Pie Chart", component: "pc" }] },    
            { type: "tabset", weight: 50, children: [{ type: "tab", name: "Area Chart", component: "ac" }] },    
            { type: "tabset", weight: 50, children: [{ type: "tab", name: "Image", component: "img" }] },    
            { type: "tabset", weight: 50, children: [{ type: "tab", name: "Table", component: "tb" }] }    
        ]
    }
};

const model = Model.fromJson(json);

const iconForNode = (node: TabNode) => {
    const type = node.getComponent?.();
    switch (type) {
        case "md":
            return <IconPencil size={12} />;
        case "lc":
            return <IconChartLine size={12} />;
        case "bc":
            return <IconChartBar size={12} />;
        case "sc":
            return <IconChartDots size={12} />;
        case "pc":
            return <IconChartPie size={12} />;
        case "ac":
            return <IconChartArea size={12} />;
        case "img":
            return <IconImageInPicture size={12} />;
        case "tb":
            return <IconTable size={12} />;
        default:
            return <IconQuestionMark size={12} />;
    }
}

const onRenderTabSet = (tabSetNode: TabSetNode, rv: any) => {
    const active = (tabSetNode.getSelectedNode?.() as TabNode)
        ?? (tabSetNode.getChildren?.()[0] as TabNode);
    const icon = iconForNode(active);

    rv.leading = (
        <div className="flex items-center text-card pl-2 pr-1 py-4">
            {icon}
        </div>
    );
    rv.buttons = [
        // Settings
        <button key="settings"
            onClick={(e) => {
                e.stopPropagation();
                console.log("Settings clicked");
            }}
            title="Settings">
            <IconSwitch className="text-card" size={12}/>
        </button>,

        // Add Tab
        <button key="add"
            onClick={(e) => {
                e.stopPropagation();
                model.doAction(
                    Actions.addNode(
                        { type: "tab", name: "New", component: "a" },
                        tabSetNode.getId(),
                        DockLocation.RIGHT,
                        -1,
                        true
                    ) 
                    ); 
            }}
            title="Add Tabset">
            <IconPlus className="text-card" size={12}/>
        </button>,

        // Delete Tab
        <button key="delete"
            onClick={(e) => {
                e.stopPropagation();
                model.doAction(
                    Actions.deleteTabset(tabSetNode.getId())
                );
            }}
            title="Delete Tab">
            <IconTrash className="text-card" size={12}/>
        </button>
    ];
}

export default function PostDataBody() {
    const factory = (node: any) => {
        switch (node.getComponent()) {
            case "md":
                return <div style={{padding: 10}}>This is markdown.</div>;
            case "lc":
                return <div style={{padding: 10}}>This is a line chart.</div>;
            case "bc":
                return <div style={{padding: 10}}>This is a bar chart.</div>;
            case "sc":
                return <div style={{padding: 10}}>This is a scatterplot.</div>;
            case "pc":
                return <div style={{padding: 10}}>This is a pie chart.</div>;
            case "ac":
                return <div style={{padding: 10}}>This is an area chart.</div>;
            case "img":
                return <div style={{padding: 10}}>This is an image.</div>;
            case "tb":
                return <div style={{padding: 10}}>This is a table.</div>;
            default:
                return <div style={{padding: 10}}>Add a new component.</div>;
        }
    };
     
    return (
        <div className="absolute inset-0 fl-scope">
            <Layout 
                model={model} 
                factory={factory} 
                onRenderTabSet={onRenderTabSet} 
                icons={{ closeTabset: () => null}}
                realtimeResize 
            />
        </div>
    );
}
