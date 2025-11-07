import type { Dataset, Row } from "@/types";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
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
import { useMemo, useState } from "react";
import { IconArrowLeft, IconArrowRight, IconArrowsUpDown, IconColumns } from "@tabler/icons-react";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";

type TbProps = { node_id: string, v_id: string };

const data = {
    name: "products",
    rows: [
      {
        "id": "P001",
        "name": "Laptop",
        "price": null,
        "inStock": true
      } as Row,
      {
        "id": "P002",
        "name": "Mouse",
        "price": 29.99,
        "inStock": true
      } as Row,
      {
        "id": "P003",
        "name": "Keyboard",
        "price": 79.99,
        "inStock": false
      } as Row,
      {
        "id": "P001",
        "name": "Laptop",
        "price": null,
        "inStock": true
      } as Row,
      {
        "id": "P002",
        "name": "Mouse",
        "price": 29.99,
        "inStock": true
      } as Row,
      {
        "id": "P003",
        "name": "Keyboard",
        "price": 79.99,
        "inStock": false
      } as Row
    ]
} as Dataset;
data.rows = data.rows.concat(data.rows).concat(data.rows).concat(data.rows).concat(data.rows);

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
                            <IconArrowsUpDown size={12}/>
                            <span className="capitalize">{key}</span>
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
export default function Tb({ node_id, v_id }: TbProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

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
        state: {
            sorting,
            columnVisibility,
        },
        initialState: {
            pagination: { pageSize: 12 }   // or 50, 100, etc
        },
    });

    return (
        <div className="h-3/5">
        <div className="group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 group-has-[button[data-state='open']]:opacity-100 z-999">
                <ButtonGroup className="bg-background rounded-[8px]">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                <IconColumns />
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
            <Table className="overflow-hidden">
                <TableHeader>
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
        <div className="bg-foreground rounded-[8px] absolute bottom-4 right-4 p-2 text-xs text-muted/50 select-none">
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </div>
        </div>
    );
}
