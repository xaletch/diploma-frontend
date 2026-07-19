import { Button, Card, CardContent } from "@/shared/ui"
import { LockIcon, SearchIcon, TrashIcon, UsersGroupIcon } from "@/shared/icons";

export const EditorActions = () => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10">
      <Card className="bg-white rounded-2xl">
        <CardContent className="p-1.5 flex items-center">
          <Button variant={"transparent"} size={"icon_36"} className="hover:bg-card rounded-10! [&_svg:not([class*='size-'])]:size-5.5">
            <TrashIcon />
          </Button>
          <Button variant={"transparent"} size={"icon_36"} className="hover:bg-card rounded-10! [&_svg:not([class*='size-'])]:size-5.5">
            <LockIcon />
          </Button>
          <Button variant={"transparent"} size={"icon_36"} className="hover:bg-card rounded-10! [&_svg:not([class*='size-'])]:size-5.5">
            <UsersGroupIcon />
          </Button>
          <Button variant={"transparent"} size={"icon_36"} className="hover:bg-card rounded-10! [&_svg:not([class*='size-'])]:size-5.5">
            <SearchIcon />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
