import { useApp } from '../store';
import { IconPaperclip, IconUpload, IconMoon } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

function PreDataPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-24 mt-28">
      <h1 className="scroll-m-20 text-center text-8xl font-extrabold tracking-tight text-balance text-primary">BLACKBOARD</h1>
      <div>
        <Empty className="border-2 border-dashed border-border w-124 h-56">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-accent mt-2">
              <IconPaperclip className="text-secondary"/>
            </EmptyMedia>
            <EmptyTitle className="text-foreground text-md">Upload a CSV File</EmptyTitle>
            <EmptyDescription className="text-sm py-0 my-0">
              You haven’t chosen a file yet, upload a csv to begin making your dashboard.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="mb-2">
            <Button className="w-64 bg-linear-to-r from-secondary to-secondary/70 hover:bg-secondary/80">
              <IconUpload className="text-background"/>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
      <div className="absolute bottom-8">
        <Button variant="ghost" className="hover:bg-background">
          <IconMoon className="text-primary"/>
        </Button> 
      </div>
    </div>
  )
}

export default PreDataPage
