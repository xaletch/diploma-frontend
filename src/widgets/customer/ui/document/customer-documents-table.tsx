import type { ICustomerDocument } from "@/entities/customers"
import { AddFillIcon } from "@/shared/icons"
import { Card, CardDescription, CardHeader, CardTitle, Pagination } from "@/shared/ui"
import { Link } from "@tanstack/react-router"

interface ICustomerDocumentsTableProps {
  documents: ICustomerDocument[];
  meta: PaginationMeta;
}

export const CustomerDocumentsTable = ({ documents, meta }: ICustomerDocumentsTableProps) => {
  return (
    <div className="space-y-8 mt-8">
      <div className="grid grid-cols-4 gap-2.5">

        <Link to={"create"}>
          <Card className="h-31 flex bg-primary/20 border-2 border-dashed border-primary cursor-pointer">
            <CardHeader className="flex items-center justify-center flex-1">
              <CardTitle className="flex items-center justify-center gap-2 text-lg">
                <AddFillIcon width={22} height={22}/>
                Новая заметка
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>

        {documents.map((doc, idx) => (
          <Link to={doc.id} key={idx}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <p className="text-xss opacity-50">{doc.created.date} {doc.created.time}</p>
                  {/* <Badge variant={"online_p"}>{}</Badge> */}
                </div>
                <CardTitle>{doc.name ?? "Без названия"}</CardTitle>
                <CardDescription className="opacity-50">{doc.description ?? "-"}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}



      </div>

      {meta.total_pages > 1 && <Pagination {...meta} />}
    </div>
  )
}

      // <Table>
      //   <TableHeader>
      //     <TableRow>
      //       <TableHead>Название</TableHead>
      //       <TableHead>Описание</TableHead>
      //       <TableHead>Дата создания</TableHead>
      //       <TableHead>Статус</TableHead>
      //       <TableHead />
      //     </TableRow>
      //   </TableHeader>

      //   <TableBody className="relative">
      //     {/* {isFetching && <LazyBlur />}
      //     {customers?.length ? 
      //       customers.map((employee, index) => ( */}
      //         <React.Fragment>
      //           <TableRow onClick={() => console.log({ to: `{employee.id}` })}>
      //             <TableCell>Карточка клиента</TableCell>
      //             <TableCell>Описание карточки клиента</TableCell>
      //             <TableCell>06.06.2025 19:58</TableCell>
      //             <TableCell><Badge variant={"online_p"}>новая</Badge></TableCell>
      //             <TableCellActions>
      //               <Link to={`employee.id`}>
      //                 <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
      //                   <ChevronRightIcon width={17} height={17} />
      //                 </Button>
      //               </Link>
      //             </TableCellActions>
      //           </TableRow>
      //           {/* {index !== customers.length - 1 && <TableSeparator />} */}
      //         </React.Fragment>
      //       {/* )) : ( */}
      //         <TableRow>
      //           <TableNotFound>Нет данных</TableNotFound>
      //         </TableRow>
      //       {/* ) */}
      //     {/* } */}
      //   </TableBody>
      // </Table>