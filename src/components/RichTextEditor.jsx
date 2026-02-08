import { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Underline from "@tiptap/extension-underline";
import { LuList, LuListOrdered } from "react-icons/lu";

const sortTaskLists = (node) => {
  if (!node || typeof node !== "object") return node;

  const sortedNode = { ...node };

  if (Array.isArray(sortedNode.content)) {
    sortedNode.content = sortedNode.content.map(sortTaskLists);

    if (sortedNode.type === "taskList") {
      const unchecked = [];
      const checked = [];

      sortedNode.content.forEach((child) => {
        if (child?.type === "taskItem" && child.attrs) {
          if (child.attrs.checked) {
            checked.push(child);
          } else {
            unchecked.push(child);
          }
        } else {
          unchecked.push(child);
        }
      });

      sortedNode.content = [...unchecked, ...checked];
    }
  }

  return sortedNode;
};

const RichTextEditor = ({ value, onChange }) => {
  const isSortingRef = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      if (isSortingRef.current) {
        isSortingRef.current = false;
        const finalHtml = editor.getHTML();
        onChange?.(finalHtml);
        return;
      }

      const doc = editor.getJSON();
      const sortedDoc = sortTaskLists(doc);

      const original = JSON.stringify(doc);
      const sorted = JSON.stringify(sortedDoc);

      if (original !== sorted) {
        isSortingRef.current = true;
        editor.commands.setContent(sortedDoc, false);
        return;
      }

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

  const applyMark = (type) => {
    if (!editor) return;

    const chain = editor.chain().focus();

    // Always toggle: turns format on if off, off if on. Works for both
    // selected text and for cursor (so you can disable format to continue typing plain).
    if (type === "bold") {
      chain.toggleBold().run();
      return;
    }
    if (type === "italic") {
      chain.toggleItalic().run();
      return;
    }
    if (type === "underline") {
      chain.toggleUnderline().run();
      return;
    }
    if (type === "strike") {
      chain.toggleStrike().run();
    }
  };

  const buttonBase =
    "px-[6px] py-[2px] rounded-md text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-colors";

  const buttonActive = "bg-gray-300 text-gray-900";

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white/70">
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1 text-xs">
        <button
          type="button"
          onClick={() => applyMark("bold")}
          className={`${buttonBase} ${
            editor.isActive("bold") ? buttonActive : ""
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => applyMark("italic")}
          className={`${buttonBase} ${
            editor.isActive("italic") ? buttonActive : ""
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => applyMark("underline")}
          className={`${buttonBase} ${
            editor.isActive("underline") ? buttonActive : ""
          }`}
        >
          U
        </button>
        <button
          type="button"
          onClick={() => applyMark("strike")}
          className={`${buttonBase} ${
            editor.isActive("strike") ? buttonActive : ""
          }`}
        >
          S
        </button>
        <span className="mx-1 h-4 w-px bg-gray-300" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${buttonBase} ${
            editor.isActive("bulletList") ? buttonActive : ""
          }`}
        >
          <LuList size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${buttonBase} ${
            editor.isActive("orderedList") ? buttonActive : ""
          }`}
        >
          <LuListOrdered size={14} />
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

