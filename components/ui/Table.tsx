import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (value: any, item: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyState?: ReactNode;
  onRowClick?: (item: T) => void;
}

export function Table<T>({
  data,
  columns,
  isLoading,
  emptyState,
  onRowClick,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        {emptyState || (
          <div className="text-gray-500">No items to display</div>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn(
                onRowClick && 'cursor-pointer hover:bg-gray-50'
              )}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                >
                  {column.cell
                    ? column.cell(item[column.accessorKey], item)
                    : item[column.accessorKey] as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface TableActionsProps {
  children: ReactNode;
}

export function TableActions({ children }: TableActionsProps) {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        {/* Left side content */}
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-3">
        {children}
      </div>
    </div>
  );
}

interface TableFilterProps {
  children: ReactNode;
}

export function TableFilter({ children }: TableFilterProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        {children}
      </div>
    </div>
  );
}
