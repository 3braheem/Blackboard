import { IconPaperclip } from '@tabler/icons-react';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import CsvUpload from './csv-upload';
import DarkModeToggle from './dark-mode-toggle';

function PreDataPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 mt-20">
      <h1 className="scroll-m-20 select-none text-center text-[128px] font-display text-display">BLACKBOARD</h1>
      <div>
        <Empty className="border-2 border-dashed border-border bg-foreground w-124 h-56 inset-shadow-sm inset-shadow-secondary/10">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-accent mt-2">
              <IconPaperclip className="text-secondary"/>
            </EmptyMedia>
            <EmptyTitle className="text-text text-md font-serif tracking-wide">Upload a CSV File</EmptyTitle>
            <EmptyDescription className="text-sm text-muted">
              You haven’t chosen a file yet, upload a csv to begin making your dashboard.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="mb-2">
            <CsvUpload className="w-64 bg-secondary hover:bg-display"/> 
          </EmptyContent>
        </Empty>
      </div>
      <div className="absolute bottom-8">
        <DarkModeToggle />
      </div>
    </div>
  )
}

export default PreDataPage