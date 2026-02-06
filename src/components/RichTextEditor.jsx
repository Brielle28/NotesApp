import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value == null) return;

    const currentHtml = editor.getHTML();
    if (currentHtml === value) return;

    editor.commands.setContent(value, false);
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="w-full h-24 rounded bg-white/50 border border-gray-200" />
    );
  }

  const buttonBase =
    "px-2 py-1 rounded text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors";

  const buttonActive = "bg-gray-300";

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white/70">
      <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1 text-xs">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${buttonBase} ${
            editor.isActive("bold") ? buttonActive : ""
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${buttonBase} ${
            editor.isActive("italic") ? buttonActive : ""
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${buttonBase} ${
            editor.isActive("bulletList") ? buttonActive : ""
          }`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${buttonBase} ${
            editor.isActive("orderedList") ? buttonActive : ""
          }`}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={`${buttonBase} ${
            editor.isActive("taskList") ? buttonActive : ""
          }`}
        >
          Todo
        </button>
      </div>
      <div className="px-2 py-1">
        <EditorContent editor={editor} className="tiptap text-sm" />
      </div>
    </div>
  );
};

export default RichTextEditor;

