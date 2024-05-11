import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  BoldIcon,
  CheckSquare,
  Heading1,
  Heading2,
  Heading3,
  ItalicIcon,
  ListOrdered,
  StrikethroughIcon,
  TextIcon,
  TextQuote,
  UnderlineIcon,
} from "lucide-react";
import { useEditor } from "novel";
import type { SelectorItem } from "./node-selector";

export const TextButtonsBar = () => {
  const { editor } = useEditor();
  if (!editor) return null;

  const items: SelectorItem[] = [
    {
      name: "bold",
      isActive: (editor) => editor.isActive("bold"),
      command: (editor) => editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: (editor) => editor.isActive("italic"),
      command: (editor) => editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: (editor) => editor.isActive("underline"),
      command: (editor) => editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      isActive: (editor) => editor.isActive("strike"),
      command: (editor) => editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
  ];

  const nodeItems: SelectorItem[] = [
    {
      name: "Text",
      icon: TextIcon,
      command: (editor) => editor.chain().focus().clearNodes().run(),
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: (editor) =>
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList"),
    },
    {
      name: "Heading 1",
      icon: Heading1,
      command: (editor) =>
        editor.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
      isActive: (editor) => editor.isActive("heading", { level: 1 }),
    },
    {
      name: "Heading 2",
      icon: Heading2,
      command: (editor) =>
        editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
      isActive: (editor) => editor.isActive("heading", { level: 2 }),
    },
    {
      name: "Heading 3",
      icon: Heading3,
      command: (editor) =>
        editor.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
      isActive: (editor) => editor.isActive("heading", { level: 3 }),
    },
    {
      name: "To-do List",
      icon: CheckSquare,
      command: (editor) =>
        editor.chain().focus().clearNodes().toggleTaskList().run(),
      isActive: (editor) => editor.isActive("taskItem"),
    },
    {
      name: "Bullet List",
      icon: ListOrdered,
      command: (editor) =>
        editor.chain().focus().clearNodes().toggleBulletList().run(),
      isActive: (editor) => editor.isActive("bulletList"),
    },
    {
      name: "Numbered List",
      icon: ListOrdered,
      command: (editor) =>
        editor.chain().focus().clearNodes().toggleOrderedList().run(),
      isActive: (editor) => editor.isActive("orderedList"),
    },
    {
      name: "Quote",
      icon: TextQuote,
      command: (editor) =>
        editor.chain().focus().clearNodes().toggleBlockquote().run(),
      isActive: (editor) => editor.isActive("blockquote"),
    },
  ];

  return (
    <div className="mb-2 border-b pb-2">
      <div className="flex flex-col lg:flex-row lg:h-10 lg:gap-2 ">
          <ToggleGroup className="flex justify-start gap-2  " type="multiple">
            {items.map((item, index) => (
              <ToggleGroupItem
                key={index}
                size="sm"
                className=""
                onClick={() => item.command(editor)}
                value={item.name}
              >
                <item.icon className="h-4 w-4" />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Separator orientation="vertical" className="hidden lg:block" />
          <Separator orientation="horizontal" className="lg:hidden block" />
          <ToggleGroup className="flex justify-start gap-2 flex-wrap" type="single">
            {nodeItems.map((item, index) => (
              <ToggleGroupItem
                key={index}
                size="sm"
                className=""
                onClick={() => item.command(editor)}
                value={item.name}
              >
                <item.icon className="h-4 w-4" />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
      </div>
    </div>
  );
};
