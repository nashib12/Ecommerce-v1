import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import DataContext from "../../Context/DataContext";
import { useLenis } from "lenis/react";
import CloseIcon from "../../../public/Icons/close.png";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidV4 } from "uuid";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import FileUploadIcon from "../../../public/Icons/cloud-computing.png";
import PlusIcon from "../../../public/Icons/plus.png";

const QUICK_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const QUICK_COLORS = [
  { name: "White", hex: "#ffffff" },
  { name: "Black", hex: "#111111" },
  { name: "Gray", hex: "#6b7280" },
  { name: "Red", hex: "#ef4444" },
  { name: "Orange", hex: "#f97316" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Green", hex: "#22c55e" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Purple", hex: "#8b5cf6" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Teal", hex: "#14b8a6" },
  { name: "Beige", hex: "#d4a373" },
];

function AddProduct() {
  const { addProduct, setAddProduct, category } = useContext(DataContext);
  const lenis = useLenis();

  useEffect(() => {
    if (addProduct) {
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
  }, [lenis, addProduct]);

  if (!addProduct) return;

  return (
    <section
      id="add-product"
      className="bg-black/60 fixed top-0 left-0 right-0 bottom-0"
    >
      <div className="mt-12 h-fit max-w-4xl mx-auto px-8 py-8 bg-gray-200 border-2 border-gray-300 rounded-md">
        <div className="relative">
          <h2 className="text-xl font-semibold tracking-wide">
            Add New Products
          </h2>
          <button
            onClick={() => setAddProduct(false)}
            className="absolute top-0 right-0 cursor-pointer"
          >
            <img
              src={CloseIcon}
              alt="close button icon"
              className="h-7 w-7 object-contain"
            />
          </button>
        </div>
        <AddProductForm category={category} setAddProduct={setAddProduct} />
      </div>
    </section>
  );
}

export default AddProduct;

function AddProductForm({ category, setAddProduct }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    trigger,
    formState: { errors },
  } = useForm();
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [colorError, setColorError] = useState("");
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const addSize = (data) => {
    const value = (data ?? sizeInput).trim().toUpperCase();
    if (!value) return;
    if (sizes.includes(value)) {
      setSizeError("Size Already Added.");
      return;
    }
    setSizes((prev) => [...prev, value]);
    setSizeError("");
    if (!data) setSizeInput("");
  };

  const removeSize = (index) => {
    setSizes((prev) => prev.filter((_, i) => i !== index));
  };

  const addColor = (nameOverride, hexOverride) => {
    const name = nameOverride ?? colorInput.trim();
    const hex = hexOverride ?? null;
    if (!name) return;
    if (colors.some((curr) => curr.name.toLowerCase() === name.toLowerCase())) {
      setColorError("Color Already Exists");
      return;
    }
    setColors((prev) => [...prev, { name, hex }]);
    setColorError("");
    if (!nameOverride) return setColorInput("");
  };

  const removeColor = (index) => {
    setColors((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    if (sizes.length === 0) {
      return setSizeError("Add at least one size.");
    }
    if (colors.length === 0) {
      return setSizeError("Add at least one color.");
    }

    const product = {
      id: uuidV4(),
      category: data.category,
      title: data.title,
      description: data.description,
      productImage: data.productImage,
      productSize: sizes,
      productColor: colors,
      productPrice: data.productPrice,
    };
    console.log(product);
    reset();
    setColors([]);
    setSizes([]);
    setColorInput("");
    setSizeInput("");
    setSizeError("");
    setColorError("");
    setAddProduct(false);
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <label htmlFor="title">Product Name</label>
              <input
                id="title"
                type="text"
                className="outline-none border h-11 w-full rounded-sm px-4 my-2"
                placeholder="Enter the name of product"
                {...register("title", {
                  required: "Product Title is required.",
                })}
              />
              {errors.title && (
                <p className="text-sm text-red-600">* {errors.title.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex flex-col">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="my-2 h-11 px-4 rounded-sm outline-none border"
                >
                  <option value="">Select</option>
                  {category.map((item) => (
                    <option key={item.id} value={item.value}>
                      {item.value}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-sm text-red-600">
                    * {errors.category.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="proce">Price in USD:</label>
                <input
                  type="number"
                  placeholder="0.01"
                  className="h-11 w-full outline-none border rounded-sm px-4 my-2"
                  {...register("productPrice", {
                    required: "Price cannot be empty",
                  })}
                />
                {errors.productPrice && (
                  <p className="text-red-600 text-sm">
                    * {errors.productPrice.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="description">Description</label>
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
            <Controller
              name="productImage"
              control={control}
              rules={{
                required: "Image is required.",
              }}
              render={({ field }) => (
                <div>
                  <label>Add product image</label>
                  <div className="flex gap-12 my-2">
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        inputRef.current.click();
                      }}
                      className="h-24 w-24 border-2 rounded-md flex flex-col gap-2 items-center justify-center text-xs cursor-pointer"
                    >
                      <img
                        src={FileUploadIcon}
                        alt="file upload icon"
                        className="h-10 w-10 object-contain"
                      />
                      Click to upload
                    </button>
                    <input
                      type="file"
                      ref={inputRef}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          field.onChange(file);
                          const imageUrl = URL.createObjectURL(file);
                          setPreview(imageUrl);
                        }
                      }}
                    />
                    {preview && (
                      <div className="flex items-center justify-center border h-24 w-24 rounded-md overflow-hidden">
                        <img
                          src={preview}
                          alt="image previes"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  {errors.productImage && (
                    <p className="text-red-600 text-sm">
                      * {errors.productImage.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div>
            <div className="mb-6">
              <p className="mb-1">Add Product Size</p>
              <p className="mb-3 text-sm text-gray-400">
                Add one size at a time or click quick-add button below.
              </p>
              <div className="flex gap-2 h-11 mb-3">
                <input
                  value={sizeInput}
                  onChange={(event) => {
                    setSizeInput(event.target.value);
                    setSizeError("");
                  }}
                  type="text"
                  className="h-full outline-none border rounded-sm px-4"
                />
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    addSize();
                  }}
                  className="flex items-center justify-center gap-2 w-fit px-2 h-full border rounded-sm cursor-pointer text-sm"
                >
                  <img
                    src={PlusIcon}
                    alt="plus icon"
                    className="h-5 w-5 object-contain"
                  />
                  Add Size
                </button>
              </div>
              <p className="mb-3">Quick Add:</p>
              <div className="flex gap-3 mb-3">
                {QUICK_SIZES.map((item) => (
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      addSize(item);
                    }}
                    key={item}
                    className="h-11 w-fit px-2 flex items-center justify-center border rounded-sm cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
              {sizes.length === 0 ? (
                <p className="text-sm text-gray-500">No sizes added yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {sizes.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-center gap-2 text-sm h-11 px-2 w-fit rounded-sm bg-blue-500 text-white"
                      >
                        {item}{" "}
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            removeSize(index);
                          }}
                          className="cursor-pointer border opacity-50 hover:opacity-100 p-1 rounded-sm"
                        >
                          <img
                            src={CloseIcon}
                            alt="close button icon"
                            className="h-4 w-4 obkect-contain invert"
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              {sizeError && (
                <p className="text-sm text-red-600">* {sizeError}</p>
              )}
            </div>
            <div className="mb-6">
              <p className="mb-1">Add Product Colour</p>
              <p className="mb-3 text-sm text-gray-400">
                Add one colour at a time or click quick-add button below.
              </p>
              <div className="flex gap-2 h-11 mb-3">
                <input
                  value={colorInput}
                  onChange={(event) => {
                    setColorInput(event.target.value);
                    setColorError("");
                  }}
                  type="text"
                  className="h-full outline-none border rounded-sm px-4"
                />
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    addColor();
                  }}
                  className="flex items-center justify-center gap-2 w-fit px-2 h-full border rounded-sm cursor-pointer text-sm"
                >
                  <img
                    src={PlusIcon}
                    alt="plus icon"
                    className="h-5 w-5 object-contain"
                  />
                  Add Size
                </button>
              </div>
              <p className="mb-3">Quick Add:</p>
              <div className="flex gap-3 mb-3">
                {QUICK_COLORS.map((item) => (
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      addColor(item.name);
                    }}
                    key={item.name}
                    style={{ background: item.hex }}
                    className="h-6 w-6 rounded-full cursor-pointer shrink-0"
                  ></button>
                ))}
              </div>
              {colors.length === 0 ? (
                <p className="text-sm text-gray-500">No sizes added yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {colors.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-center gap-2 text-sm h-11 px-2 w-fit rounded-sm bg-blue-500 text-white"
                      >
                        {item.name}{" "}
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            removeColor(index);
                          }}
                          className="cursor-pointer border opacity-50 hover:opacity-100 p-1 rounded-sm"
                        >
                          <img
                            src={CloseIcon}
                            alt="close button icon"
                            className="h-4 w-4 obkect-contain invert"
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              {colorError && (
                <p className="text-sm text-red-600">* {colorError}</p>
              )}
            </div>
            <button className="h-11 w-full cursor-pointer bg-black text-white border rounded-sm">
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function TipTapEditor({ value, onChange, error }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
      {error && <p className="text-sm text-red-600">* {error.message}</p>}
    </>
  );
}

{
  /* <div className='mb-3'>
<label htmlFor="Product Image">Add product image</label>
<button type='button' onClick={(event) =>{ event.preventDefault(); fileInput?.current.click()}} className='h-24 w-24 border-2 rounded-md flex flex-col gap-2 items-center justify-center text-xs cursor-pointer my-2'><img src={FileUploadIcon} alt="file upload icon" className='h-10 w-10 object-contain' />Click to Upload</button>
<input type="file" ref={fileInput} className='hidden' {...register("productImage",{required:"Field must not be empty."})} />
{errors.productImage && <p className='text-red-600 text-sm'>* {errors.productImage.message}</p>}
</div> */
}
{
  /* <div className='mb-3'>
<label>Add product image</label>
<label className='h-24 w-24 border-2 rounded-md flex flex-col gap-2 items-center justify-center text-xs cursor-pointer my-2'>
<img src={FileUploadIcon} alt="file upload icon" className='h-10 w-10 object-contain' />Click to Upload
<input type="file" className='hidden' {...register("productImage",{required:"Field must not be empty.", validate:(files) => files.length === 1 || "Only one file is allowed",})} />
</label>
{errors.productImage && <p className='text-red-600 text-sm'>* {errors.productImage.message}</p>}
</div> */
}
