const TableRowsSkeleton = ({ rows = 5, columns = 5 }) => {
    return Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse">
            {Array.from({ length: columns }).map((__, columnIndex) => (
                <td key={columnIndex} className="px-6 py-4">
                    <div className="h-4 rounded-full bg-slate-100" />
                </td>
            ))}
        </tr>
    ));
};

export default TableRowsSkeleton;
