import { cn } from "@/shared/utils";
import { Button } from "../../button"
import { ChevronIcon, DotsVerticalIcon } from "@/shared/icons";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface IPaginationActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  current: boolean;
  children?: React.ReactNode;
}

type IPaginationProps = PaginationMeta;

const PaginationAction = ({ current, children, ...props }: IPaginationActionProps) => {
  return <Button
    {...props}
    variant={"pagination"}
    size={"icon_44"}
    className={cn("", current ? "bg-primary text-white hover:bg-primary/90" : "")}
  >{children}</Button>
}

export const Pagination = ({ total_pages, page, limit, has_next, has_prev }: IPaginationProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => setCurrentPage(page), [page]);

  const navigateTo = (targetPage: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ to: ".", search: (p: any) => ({ ...p, page: targetPage, limit }) });
  };

  const getPageNumbers = (): (number | "...")[] => {
    if (total_pages <= 4) {
      return Array.from({ length: total_pages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];

    if (currentPage > 2) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(total_pages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < total_pages - 2) pages.push("...");

    pages.push(total_pages);

    return pages;
  };
  
  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        {has_prev && (
          <PaginationAction
            current={false}
            disabled={!has_prev}
            onClick={() => navigateTo(currentPage - 1)}
          >
            <ChevronIcon className="rotate-180" width={20} height={20} />
          </PaginationAction>
        )}
        
        {getPageNumbers().map((item, idx) =>
          item === "..." ? (
            <Button
              key={`dots-${idx}`}
              variant={"pagination"}
              size={"icon_44"}
            >
              <DotsVerticalIcon className="rotate-90" width={18} height={18} />
            </Button>
          ) : (
            <PaginationAction
              key={item}
              current={currentPage === item}
              onClick={() => navigateTo(item)}
            >
              {item}
            </PaginationAction>
          )
        )}
  
        {has_next && (
          <PaginationAction
            current={false}
            disabled={!has_next}
            onClick={() => navigateTo(currentPage + 1)}
          >
            <ChevronIcon width={20} height={20} />
          </PaginationAction>
        )}
      </div>
    </div>
  )
}
