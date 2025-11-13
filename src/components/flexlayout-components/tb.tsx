import type { Dataset, Row } from "@/types";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type PaginationState,
    type ColumnDef,
    type SortingState,
    type VisibilityState,
  } from "@tanstack/react-table"
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useMemo, useRef, useState } from "react";
import useAutoPageSize from "@/hooks/use-auto-page-size";
import { IconArrowLeft, IconArrowRight, IconArrowsUpDown, IconChartColumn } from "@tabler/icons-react";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";

type TbProps = { node_id: string, v_id: string, data: Dataset | null };

const buildColumns = (rows: Row[]): ColumnDef<Row>[] => {
    const keys = Array.from(
        rows.reduce<Set<string>>((acc, r) => {
            Object.keys(r).forEach(k => acc.add(k));
            return acc;
        }, new Set<string>())
    );

    const cols: ColumnDef<Row>[] = keys.map((key) => {
        return {
            accessorKey: key,
            header: ({ column }) => {
                return (
                    <div>
                        <button
                            className="flex flex-row items-center gap-2"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            <span className="capitalize italic">{key}</span>
                            <IconArrowsUpDown size={12}/>
                        </button>
                    </div>
                );
              },
            cell: ({ getValue }) => {
                const v = getValue<any>();
                return <span className="text-left">{v === null || v === undefined ? "—" : String(v)}</span>;
            },
        }
    });
    return cols;
}
export default function Tb({ node_id, v_id, data }: TbProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

    const dataset = useMemo(() => data?.rows ?? [], [data]);
    const columns = buildColumns(dataset);

    const table = useReactTable<Row>({
        data: dataset,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        autoResetPageIndex: false,
        state: {
            sorting,
            columnVisibility,
            pagination,
        },
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLTableSectionElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    useAutoPageSize({
        container: containerRef,
        header: headerRef,
        body: bodyRef,
        setPageSize: (size: number) => {
            setPagination((p) => {
                const total = table.getFilteredRowModel().rows.length; 
                const pageCount = Math.max(1, Math.ceil(total / size));
                const safeIndex = Math.min(p.pageIndex, pageCount - 1);
                return { pageIndex: safeIndex, pageSize: size };
            });
        },
        minRowHeight: 20,
    });

    return (
        <div ref={containerRef} className="min-h-0 relative h-full">
        <div className="group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 group-has-[button[data-state='open']]:opacity-100 z-999">
                <ButtonGroup className="bg-background rounded-[8px]">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                <IconChartColumn />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal>
                        <DropdownMenuContent side="bottom" align="end">
                            {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                        </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenu>
                        <Button
                        variant="outline"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        >
                            <IconArrowLeft />
                        </Button>
                        <Button
                        variant="outline"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        >
                            <IconArrowRight />
                        </Button>
                </ButtonGroup>
            </div>
            <div ref={bodyRef}>
            <Table className="overflow-hidden">
                <TableHeader ref={headerRef}>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="hover:bg-foreground">
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead key={header.id} className="p-4 text-primary text-[18px]">
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"} 
                        className="hover:bg-foreground"
                    >
                        {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="p-4 text-left">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </div>
        </div>
        <div className="bg-foreground rounded-b-[8px] p-2 px-4 text-xs text-right text-muted/50 select-none h-fill">
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </div>
        </div>
    );
}
