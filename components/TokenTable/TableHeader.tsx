'use client'

import { TableHead, TableHeader as ShadcnTableHeader, TableRow } from "@/components/ui/table"
import { TableColumn } from "@/types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

interface TableHeaderProps {
    columns: TableColumn[];
    currentSort: string | null;
    sortDirection: 'asc' | 'desc';
    onSort: (columnId: string) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ columns, onSort, currentSort, sortDirection }) => {
    return (
        <ShadcnTableHeader>
            <TableRow className="hover:bg-transparent border-gray-800">
                {columns.map((col) => (
                    <TableHead key={col.id} className="text-xs font-medium text-muted-foreground">
                        <div className={/* Right align numbers usually */ col.id === 'price' || col.id === 'marketCap' ? "flex justify-end" : "flex items-center"}>
                            {col.sortable ? (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="-ml-3 h-8 data-[state=open]:bg-accent"
                                    onClick={() => onSort(col.id)}
                                >
                                    <span>{col.label}</span>
                                    {/* Visual indicator for sort could go here */}
                                    <ArrowUpDown className="ml-2 h-3 w-3" />
                                </Button>
                            ) : (
                                <span>{col.label}</span>
                            )}
                        </div>
                    </TableHead>
                ))}
            </TableRow>
        </ShadcnTableHeader>
    );
};
