'use client'

import { TableHead, TableHeader as ShadcnTableHeader, TableRow } from "@/components/ui/table"
import { TableColumn } from "@/types";

interface TableHeaderProps {
    columns: TableColumn[];
    currentSort: string | null;
    sortDirection: 'asc' | 'desc';
    onSort: (columnId: string) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ columns, onSort, currentSort, sortDirection }) => {
    return (
        <ShadcnTableHeader>
            <TableRow className="hover:bg-transparent border-gray-800 h-10">
                {columns.map((col) => (
                    <TableHead key={col.id} className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                            {col.sortable ? (
                                <div
                                    className="flex items-center gap-1 cursor-pointer hover:text-gray-300 transition-colors"
                                    onClick={() => onSort(col.id)}
                                >
                                    <span>{col.label}</span>
                                    {/* Only show icon if sorted or hovered (optional polish) */}
                                </div>
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
