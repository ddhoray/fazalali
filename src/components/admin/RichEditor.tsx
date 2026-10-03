import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useEffect, useState } from "react";
import {
  Bold,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MediaPicker } from "./AdminUi";

export function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const [picker, setPicker] = useState(false);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit.configure({ link: false }), Link.configure({ openOnClick: false }), Image],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[420px] px-6 py-5 text-[17px] leading-[1.8] outline-none [&_a]:text-omeros [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-omeros [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-2xl [&_h3]:mt-4 [&_h3]:font-display [&_h3]:text-xl [&_img]:my-4 [&_img]:w-full [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-6",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Load new content when switching documents
  useEffect(() => {
    if (editor && value !== editor.getHTML() && !editor.isFocused) editor.commands.setContent(value, { emitUpdate: false });
  }, [value, editor]);

  if (!editor) return <div className="min-h-[480px] border border-border bg-background" />;

  const B = ({ on, active, children, label }: { on: () => void; active?: boolean; children: React.ReactNode; label: string }) => (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={on}
      className={cn("flex size-8 items-center justify-center hover:bg-muted", active && "bg-omeros-soft text-omeros")}
    >
      {children}
    </button>
  );

  const words = editor.getText().trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="border border-border bg-background">
      <div className="sticky top-14 z-10 flex flex-wrap items-center gap-0.5 border-b border-border bg-background/95 px-2 py-1.5 backdrop-blur [&_svg]:size-4">
        <B label="Heading" on={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 /></B>
        <B label="Subheading" on={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}><Heading3 /></B>
        <span className="mx-1 h-5 w-px bg-border" />
        <B label="Bold" on={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold /></B>
        <B label="Italic" on={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic /></B>
        <B label="Strike" on={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}><Strikethrough /></B>
        <B
          label="Link"
          active={editor.isActive("link")}
          on={() => {
            const prev = editor.getAttributes("link").href as string | undefined;
            const url = window.prompt("Link URL", prev ?? "https://");
            if (url === null) return;
            if (!url) editor.chain().focus().unsetLink().run();
            else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
        >
          <Link2 />
        </B>
        <span className="mx-1 h-5 w-px bg-border" />
        <B label="Bullets" on={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List /></B>
        <B label="Numbers" on={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered /></B>
        <B label="Quote" on={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote /></B>
        <B label="Divider" on={() => editor.chain().focus().setHorizontalRule().run()}><Minus /></B>
        <B label="Image" on={() => setPicker(true)}><ImageIcon /></B>
        <span className="mx-1 h-5 w-px bg-border" />
        <B label="Undo" on={() => editor.chain().focus().undo().run()}><Undo2 /></B>
        <B label="Redo" on={() => editor.chain().focus().redo().run()}><Redo2 /></B>
        <span className="ml-auto px-2 text-xs text-muted-foreground">
          {words} words · {Math.max(1, Math.round(words / 220))} min read
        </span>
      </div>
      <EditorContent editor={editor} />
      <MediaPicker open={picker} onOpenChange={setPicker} onPick={(m) => editor.chain().focus().setImage({ src: m.url, alt: m.alt }).run()} />
    </div>
  );
}
