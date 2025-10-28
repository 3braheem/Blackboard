import { IconPlus, IconSwitch, IconTrash } from '@tabler/icons-react';
import {Actions, DockLocation, Layout, Model, TabSetNode} from 'flexlayout-react';

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
            { type: "tabset", weight: 50, children: [{ type: "tab", name: "A", component: "a" }] },
            { type: "tabset", weight: 50, children: [{ type: "tab", name: "B", component: "b" }] }    
        ]
    }
};

const model = Model.fromJson(json);

export default function PostDataBody() {
    const factory = (node: any) => {
        switch (node.getComponent()) {
            case "a":
                return <div style={{padding: 10}}>This is component A.</div>;
            case "b":
                return <div style={{padding: 10}}>This is component B.</div>;
            default:
                return <div style={{padding: 10}}>Add a new component.</div>;
        }
    };

    const onRenderTabSet = (tabNode: TabSetNode, rv: any) => {
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
                          tabNode.getId(),
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
                        Actions.deleteTabset(tabNode.getId())
                    );
                }}
                title="Delete Tab">
                <IconTrash className="text-card" size={12}/>
            </button>
        ]
    } 

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
