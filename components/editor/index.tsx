"use client";
import type { ForwardedRef } from "react";
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    toolbarPlugin,
    type MDXEditorMethods,
    type MDXEditorProps,
    ConditionalContents,
    ChangeCodeMirrorLanguage,
    UndoRedo,
    BoldItalicUnderlineToggles,
    ListsToggle,
    CreateLink,
    InsertImage,
    InsertTable,
    InsertThematicBreak,
    InsertCodeBlock,
    linkPlugin,
    linkDialogPlugin,
    tablePlugin,
    imagePlugin,
    codeBlockPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
} from "@mdxeditor/editor";
import { basicDark } from "cm6-theme-basic-dark";
import "@mdxeditor/editor/style.css";

import "./dark-editor.css";
import { useTheme } from "next-themes";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface Props {
    value: string;
    fieldChange: (value: string) => void;
    editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const Editor = ({ value, fieldChange, editorRef, ...props }: Props) => {
    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme === "dark" ? [basicDark] : [];
    return (
        <MDXEditor
            key={resolvedTheme}
            markdown={value}
            className="background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border grid"
            onChange={fieldChange}
            plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                tablePlugin(),
                imagePlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
                codeMirrorPlugin({
                    codeBlockLanguages: {
                        css: "css",
                        txt: "txt",
                        sql: "sql",
                        html: "html",
                        saas: "saas",
                        scss: "scss",
                        bash: "bash",
                        json: "json",
                        js: "javascript",
                        ts: "typescript",
                        "": "unspecified",
                        tsx: "TypeScript (React)",
                        jsx: "JavaScript (React)",
                    },
                    autoLoadLanguageSupport: true,
                    codeMirrorExtensions: theme,
                }),
                diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                toolbarPlugin({
                    toolbarContents: () => (
                        <ConditionalContents
                            options={[
                                {
                                    when: (editor) =>
                                        editor?.editorType === "codeblock",
                                    contents: () => (
                                        <ChangeCodeMirrorLanguage />
                                    ),
                                },
                                {
                                    fallback: () => (
                                        <>
                                            <UndoRedo />
                                            <Separator />
                                            <BoldItalicUnderlineToggles />
                                            <Separator />
                                            <ListsToggle />
                                            <Separator />
                                            <CreateLink />
                                            <InsertImage />
                                            <Separator />
                                            <InsertTable />
                                            <InsertThematicBreak />
                                            <InsertCodeBlock />
                                        </>
                                    ),
                                },
                            ]}
                        />
                    ),
                }),
            ]}
            {...props}
            ref={editorRef}
        />
    );
};

export default Editor;
