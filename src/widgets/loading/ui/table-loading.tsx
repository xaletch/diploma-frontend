import { Skeleton, Table, TableBody, TableHeader, TableRow } from "@/shared/ui";

interface TableLoadingProps {
  rows?: number;
}

export const TableLoading = ({ rows=3 }: TableLoadingProps) => {
  return (
    <Table className="mt-8">

      <TableHeader className="rounded-none">
        <TableRow className="hover:bg-transparent! px-5">
          {Array.from({ length: rows }).map((_, idx) => <Skeleton key={idx} className={`max-w-45 h-6 rounded-lg ${idx === rows - 1 ? "bg-transparent" : ""}`} />)}
        </TableRow>
      </TableHeader>

      <TableBody className="bg-transparent! mt-2 peer-hover:rounded-t-3xl!">
        <Skeleton className="h-18 rounded-none" />
        <Skeleton className="h-18 rounded-none" />
        <Skeleton className="h-18 rounded-none" />
      </TableBody>

    </Table>
  )
}
