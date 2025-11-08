import React, { useLayoutEffect, useRef } from "react";

type Options = {
    container: React.RefObject<HTMLElement | null>;
    header: React.RefObject<HTMLElement | null>;
    body: React.RefObject<HTMLElement | null>;
    setPageSize: (size: number) => void;
    minRowHeight: number;
};

export default function useAutoPageSize({ container, header, body, setPageSize, minRowHeight }: Options) {
    const globalRO = useRef<ResizeObserver | null>(null);
    const bodyRO = useRef<ResizeObserver | null>(null);

    useLayoutEffect(() => {
        const node = container.current;
        if (!node) return;

        const computePageSize = () => {
            const totalH = node.clientHeight;
            const headerH = header.current?.getBoundingClientRect().height || 0;

            const row = body.current?.querySelector("tbody tr") as HTMLElement || null;
            const rowH = row?.getBoundingClientRect().height || minRowHeight;

            const availableH = Math.max(0, totalH - headerH);
            const pageSize = Math.floor(availableH / rowH);
            setPageSize(pageSize);
        }

        globalRO.current?.disconnect();
        globalRO.current = new ResizeObserver(computePageSize);
        globalRO.current.observe(node);

        if (body.current) {
            bodyRO.current?.disconnect();
            bodyRO.current = new ResizeObserver(computePageSize);
            bodyRO.current.observe(body.current);
        }

        const t = requestAnimationFrame(computePageSize);

        return () => {
            globalRO.current?.disconnect();
            bodyRO.current?.disconnect();
            cancelAnimationFrame(t);
        };
    }, [container, header, body, setPageSize]);
}