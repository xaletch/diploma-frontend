import "./style/editor-theme.css";

import EditorJS, { type OutputData } from '@editorjs/editorjs';
import EditorjsList from '@editorjs/list';
import Quote from '@editorjs/quote';
import Header from '@editorjs/header';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/shared/hooks';
import { useCustomerUpdateDocumentMutation } from "@/entities/customers";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils";

interface IEditorProps {
  customer_id: string;
  document_id: string;
  name: string | null;
  data: OutputData | undefined;
}

export const Editor = ({ customer_id, document_id, name, data }: IEditorProps) => {
  const ref = useRef<EditorJS | null>(null);
  const documentRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState(name ?? "");
  const [outputData, setOutputData] = useState<OutputData | null>(null);
  const [document] = useCustomerUpdateDocumentMutation();
const isFirstRun = useRef(true);
  useEffect(() => {
    if (!documentRef.current) return;

    const editor = new EditorJS({
      holderId : "editorjs",

      data,

      tools: {
        header: {
          class: Header,
          inlineToolbar : true
        },
        List: {
          class: EditorjsList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
        },
        quote: Quote,
      },
      autofocus: name?.length ? true : false,

      onChange: async (api) => {
        const output = await api.saver.save();
        setOutputData(output);
      },

    });
    
    ref.current = editor;
    
    editor.isReady.then(() => {
      if (!name?.trim()) {
        inputRef.current?.focus();
      }
    });
    
    return () => {
      editor.isReady.then(() => { editor.destroy(); ref.current = null });
    };
  }, []);

  const debounce = useDebounce(outputData, 3500);
  const titleDebounce = useDebounce(title, 3500);

  const updateDocument = useCallback(async (content: OutputData | null, name?: string) => {
    try {
      const res = await document(
        {
          customer_id,
          document_id,
          body: { name, content }
        }
      ).unwrap();

      console.log(res);
    }
    catch (error) {
      console.error("Не удалось обновить документ", error);
      toast.error(getErrorMessage(error));
    }
  }, [customer_id, document, document_id]);

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    ref.current?.focus();
  }


  /**
    !=====! УБРАТЬ В БУДУЩЕМ КОСТЫЛЬ !=====! 
  **/
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    console.log("debounce", debounce);
    updateDocument(debounce, titleDebounce);
  }, [debounce, titleDebounce, updateDocument]);

  return (
    <div>
      <div className="max-w-162.5 mx-auto">
        <input
          ref={inputRef}
          value={title}
          onKeyDown={handleTitleKeyDown}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название заметки"
          className="w-full border-none bg-transparent text-5xl font-bold outline-none placeholder:text-primary/50"
        />
      </div>
      <div ref={documentRef} id='editorjs'></div>
      
      {/* {isLoading && (
        <div className="fixed bottom-8 right-8">
          <Spinner className="opacity-50" />
        </div>
      )} */}
    </div>
  );
}
