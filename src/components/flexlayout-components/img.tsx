import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { IconUpload, IconX } from "@tabler/icons-react";
import { useApp } from "@/store";
import { ButtonGroup } from "../ui/button-group";

type ImgProps = { node_id: string, v_id: string };

export default function Img({ node_id, v_id }: ImgProps) {
    const entry = useApp(x => x.images[node_id]);
    const setImage = useApp(x => x.setImage);
    const clearImage = useApp(x => x.clearImage);

    const openPicker = () => fileInputRef.current?.click();

    const handleFile = (file: File) => {
        if (entry?.objectUrl) URL.revokeObjectURL(entry.objectUrl);
        const url = URL.createObjectURL(file);
        setImage(node_id, url, url);
    }

    useEffect(() => {
        return () => {
            const obj = useApp.getState().images[node_id]?.objectUrl;
            if (obj) URL.revokeObjectURL(obj);  
            clearImage(node_id);
        };
    }, [node_id]);

    const src = entry?.src || null;
    const removeImg = () => {
        if (entry?.objectUrl) URL.revokeObjectURL(entry.objectUrl);
        clearImage(node_id);
    }

    const fileInputRef = useRef<HTMLInputElement>(null);
    return (
        <div key={v_id} className="h-full w-full flex items-center justify-center">
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                }}
            />
            {!src ? (
                <div className="flex flex-col items-center justify-center gap-4">
                    <Button className="w-18" variant={"outline"} onClick={openPicker}> 
                        <IconUpload className="text-primary"/>
                    </Button> 
                    Upload an image to display.
                </div>
            ) : (
                <div className="h-full w-full min-h-0 overflow-hidden group">
                    <img
                        src={src}
                        alt="Uploaded Image"
                        className="h-full w-full object-contain"
                        draggable={false}
                    />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100">
                        <ButtonGroup className="bg-background rounded-[8px]">
                            <Button variant={"outline"} onClick={openPicker}>
                                <IconUpload size={12} />
                            </Button> 
                            <Button variant={"outline"} onClick={removeImg}>
                                <IconX />
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            )}
        </div>
    );
}