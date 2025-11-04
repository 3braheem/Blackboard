import { useApp } from '@/store';
import "@/tiptap.css";
import {
    MDXEditor,
    type MDXEditorMethods,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    linkPlugin,
    tablePlugin,
    codeBlockPlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    UndoRedo,
    Separator,
    BoldItalicUnderlineToggles,
    CodeToggle,
    ListsToggle,
    InsertCodeBlock,
    sandpackPlugin,
    InsertSandpack,
    CreateLink,
    BlockTypeSelect,
  } from '@mdxeditor/editor';

// import '@mdxeditor/editor/style.css'
import { useRef, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';

type MdProps = { node_id: string, v_id: string };

export default function Md( { node_id, v_id }: MdProps ) {
    const editorRef = useRef<MDXEditorMethods>(null);
    const md = useApp(x => x.mdx[node_id]);
    const setMdx = useApp(x => x.setMdx);
    const ensureMdx = useApp(x => x.ensureMdx);

    useEffect(() => {
        ensureMdx(node_id);
    }, [ensureMdx, node_id]);

    const editor = useEditor({
        extensions: [StarterKit, Markdown],
        content: md,
        onUpdate: ({ editor }) => {
          const value = editor.getJSON();
          const markdown = editor.getMarkdown(); 
          setMdx(node_id, markdown);
        }
      });

    return (
        <div key={v_id} className="h-full w-full min-h-0 overflow-hidden group">
            { md !== undefined && (
            //    <MDXEditor
            //    ref={editorRef}
            //    className="mdx-scope h-full"
            //    contentEditableClassName="prose max-w-none"
            //    markdown={md}
            //    onChange={(next) => setMdx(node_id, next)}
            //    plugins={[
            //        toolbarPlugin({
            //            toolbarClassName: "my-toolbar",
            //            toolbarContents: () => (
            //                 <div className="flex items-center">
            //                     <UndoRedo />
            //                     <Separator />
            //                     <CreateLink />
            //                     <BoldItalicUnderlineToggles />
            //                     <CodeToggle />
            //                     <ListsToggle /> 
            //                     <Separator />
            //                     <InsertCodeBlock />
            //                     <BlockTypeSelect />
            //                 </div>
            //             ),   
            //         }),     
            //         headingsPlugin(),
            //         listsPlugin(),
            //         quotePlugin(),
            //         thematicBreakPlugin(),
            //         linkPlugin(),
            //         tablePlugin(),
            //         codeBlockPlugin(),
            //         markdownShortcutPlugin(), 
            //       ]}
            //     />
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
