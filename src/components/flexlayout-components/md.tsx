import { useApp } from '@/store';
import "@/tiptap.css";
import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight, common } from 'lowlight';

import 'highlight.js/styles/atom-one-dark.css';

type MdProps = { node_id: string, v_id: string };

const lowlight = createLowlight(common);
const MyCodeBlock = CodeBlockLowlight.extend({
    renderHTML({ HTMLAttributes }) {
      return [
        'pre',
        { ...HTMLAttributes, spellcheck: 'false', 'data-gramm': 'false' },
        ['code', 0],
      ]
    },
  })

export default function Md( { node_id, v_id }: MdProps ) {
    const md = useApp(x => x.mdx[node_id]);
    const setMdx = useApp(x => x.setMdx);
    const ensureMdx = useApp(x => x.ensureMdx);

    useEffect(() => {
        ensureMdx(node_id);
    }, [ensureMdx, node_id]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            MyCodeBlock.configure({ lowlight }),
            Markdown
        ],
        content: md,
        onUpdate: ({ editor }) => {
          const markdown = editor.getMarkdown(); 
          setMdx(node_id, markdown);
        }
      });

    return (
        <div key={v_id} className="h-full w-full min-h-0 overflow-hidden group">
            { md !== undefined && (
                <div className="h-full w-full flex flex-col">
                    <div></div>
                    <div className="flex-1 overflow-auto p-4 text-left">
                        {editor && <EditorContent editor={editor} className="tiptap-scope h-full w-full"/>}
                    </div>
                </div>
            )}
        </div>
    );
}
