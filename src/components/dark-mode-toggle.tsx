import { useApp } from '../store'
import { IconSun, IconMoon } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

export default function DarkModeToggle() {
    const mode = useApp(x => x.mode);
    const toggleMode = useApp(x => x.toggleMode);
    return (
        <Button 
            className="bg-transparent hover:bg-transparent"
            onClick={toggleMode}
        >
        {mode === 'dark' ? 
            <IconSun className="text-primary"/> : 
            <IconMoon className="text-primary"/>
        }
        </Button> 
    );
}
