import React, { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import DataContext from "../../Context/DataContext";
import { useLenis } from "lenis/react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import CLoseIcon from "../../../public/Icons/close.png";
import { useForm, Controller } from "react-hook-form";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { v4 as uuid4 } from "uuid";

function AddCategory() {
  const { addCategory, setAddCategory } = useContext(DataContext);
  const lenis = useLenis();

  useEffect(() => {
    if (addCategory) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "auto";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "auto";
    };
  }, [lenis, addCategory]);

  if (!addCategory) return null;

  return createPortal(
    <section
      id="add-category"
      className="fixed top-0 right-0 left-0 bottom-0 bg-black/60"
    >
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 h-fit w-100 py-6 rounded-md">
        <div className="relative">
          <h2 className="text-xl font-semibold tracking-wide mb-6">
            Add New Category
          </h2>
          <button
            onClick={() => setAddCategory(false)}
            className="absolute cursor-pointer top-0 right-0"
          >
            <img
              src={CLoseIcon}
              alt="close button icon"
              className="h-7 w-7 object-contain"
            />
          </button>
        </div>
        <AddCategoryForm setAddCategory={setAddCategory} />
      </div>
    </section>,
    document.getElementById("modalRoot"),
  );
}

export default AddCategory;

function AddCategoryForm({ setAddCategory }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    mode : "onSubmit",
    defaultValues: {
      id: "",
      title: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    const category = {id : uuid4(), title: data.title, description: data.description};
    console.log(category);
    reset();
    setAddCategory(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input
            type="text"
            className={`my-1 h-11 w-full border rounded-sm px-4 ${errors.title ? " border-red-500" : " outline-blue-500"}`}
            placeholder="Enter Category title..."
            {...register("title", { required: "Title cannot be empty" })}
          />
          {errors.title && (
            <p className="text-sm text-red-600">* {errors.title.message}</p>
          )}
        </div>
        <div className="mt-4">
          <label>Description</label>
          <Controller
            name="description"
            control={control}
            rules={{
              validate: (value) => {
                if (!value) return "Description is required";
                const text = value?.replace(/<[^>]*>/g, "").trim();
                return text.length > 0 || "Description cannot be empty";
              },
            }}
            render={({ field }) => (
              <TipTapEditor
                value={field.value}
                onChange={(html) => {
                    field.onChange(html);
                    trigger("description");
                }}
                error={errors.description}
              />
            )}
          />
        </div>
        <button type="submit" className="mt-4 cursor-pointer h-11 w-full bg-black text-white border rounded-sm">Add Category</button>
      </form>
    </>
  );
}

function TipTapEditor({ value, onChange, error}) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate: ({ editor }) => {
          onChange(editor.getHTML());
        }
    })

    return(
        <>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
        {error && <p className="text-sm text-red-600">* {error.message}</p>}
        </>
    )
}

function MenuBar({editor}) {
    if(!editor) return null;

    const btn = (action, label, isActive) => {
        return (<button onClick={action} className={` ${isActive ? "outline-2" : "outline-none"} h-11 border rounded-xs w-fit px-2`}>
            {label}
        </button>);
    }

    return  ( <div>
        {btn((event) => {editor.chain().focus().toggleBold().run(), event.preventDefault()}, 'B', editor.isActive('bold'))}
    </div>)

}

function QuillEditor({ value, onChange, error }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;
    if (editorRef.current.classList.contains("ql-container")) return;
    const toolbarOptions = [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ];

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });

    if (value) {
      quill.root.innerHTML = value;
    }

    quill.on("text-change", () => {
      const html = quill.root.innerHTML;
      onChange(html);
    });

    quillRef.current = quill;

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");

        const toolbar = editorRef.current?.previousSibling;
        if (toolbar?.classList.contains("ql-toolbar")) {
          toolbar.remove();
        }

        if (editorRef.current) {
          editorRef.current.innerHTML = "";
        }
        quillRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!quillRef.current) return;
    const currentHTML = quillRef.current.root.innerHTML;
    if (value !== currentHTML) {
      quillRef.current.root.innerHTML = value || "";
    }
  }, [value]);

  return (
    <>
      <div ref={editorRef} style={{ height: "300px" }} />
      {error && <p className="text-sm text-red-600">* {error.message}</p>}{" "}
    </>
  );
}