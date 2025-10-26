import { useApp } from '../store'
import DarkModeToggle from './dark-mode-toggle'
import { IconFile, IconSettings } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

function PostDataPage() {
  return (
    <>
      <header className="absolute top-4 left-0 flex w-full justify-between items-center px-12 border-t-2 border-b-2 border-dashed border-border">
        <div className="py-1 text-primary/80 text-[24px] font-serif">Add Title...</div>
        <div className="flex flex-row items-center justify-center">
          <DarkModeToggle />
          <Button className="bg-transparent hover:bg-transparent px-0"><IconFile className="text-primary" /></Button>
          <Button className="bg-transparent hover:bg-transparent px-0"><IconSettings className="text-primary" /></Button>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center gap-16 mt-20">
      <footer className="absolute bottom-4 left-0 flex w-full justify-between items-center px-12">
        <div className="flex-none select-none text-[20px] font-display text-display/75">© 2025</div>
        <div className="flex-none select-none text-[20px] font-display text-display/75">BLACKBOARD</div>
      </footer>
      
    </div>
    </>
  )
}

export default PostDataPage
