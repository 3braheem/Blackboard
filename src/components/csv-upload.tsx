import Papa from 'papaparse';
import { useRef } from 'react';
import { IconUpload } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/store';

import type { Dataset } from '../types';

type CsvUploadProps = { className?: string };

const handleFile = (file: File) => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (results) => {
      const dataset = { name: file.name, rows: results.data as Record<string, string | number | null>[] } as Dataset;
      console.log('Parsed dataset:', dataset);
      // useApp(x => x.setDataset(dataset));
      // useApp(x => x.setHasUploaded(true));
    },
    error: (error) => {
      console.error(`Error parsing CSV file: ${file}`, error);
      alert("placeholder");
    }
  })
}

export default function CsvUpload({ className }: CsvUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
        <Button className={className}
                onClick={() => fileInputRef.current?.click()}>
            <IconUpload className="text-background"/>
            <input
                type="file"
                accept=".csv,text/csv"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
            />
        </Button>
    </>
  )
}
