import useEmblaCarousel from "embla-carousel-react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ArrowLeftImg from "../../public/Icons/arrow.png";
import ArrowRightImg from "../../public/Icons/right-arrow.png";
import StarImg from "../../public/Icons/star.png";
import PlusImg from "../../public/Icons/plus.png";
import MinusImg from "../../public/Icons/minus.png";
import QuestionImg from "../../public/Icons/help.png";
import ShareImg from "../../public/Icons/share.png";
import DeliveryImg from "../../public/Icons/free-delivery.png";
import BoxImg from "../../public/Icons/box.png";
import { Tooltip } from "react-tooltip";
import StarRating from "../Components/StarRating";
import PaymentImg1 from "../../public/Images/Logo/aex.svg";
import PaymentImg2 from "../../public/Images/Logo/esewa.png";
import PaymentImg3 from "../../public/Images/Logo/khalti.png";
import PaymentImg4 from "../../public/Images/Logo/mastercard.svg";
import PaymentImg5 from "../../public/Images/Logo/paypal.svg";
import Review from "../Components/ProductDetails/Review";
import Questions from "../Components/ProductDetails/Questions";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../Context/DataContext";
import { toast } from "react-toastify";
import ProductCard from "../Components/ProductCard";
import DOMPurify from 'dompurify'
import CartContext from "../Context/CartContext";
import Loader from "../Components/Loader";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";


 const PaymentPartner = [
    { id: 1, img: PaymentImg1 },
    { id: 2, img: PaymentImg2 },
    { id: 3, img: PaymentImg3 },
    { id: 4, img: PaymentImg4 },
    { id: 5, img: PaymentImg5 },
  ];

function ProductDetails() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [detailsId, setDetalsId] = useState("description");
  const { slug } = useParams();
  const { quantity, dispatch } = useContext(CartContext);
  const { featuredProduct, deliveryFee } = useContext(DataContext);

  const { data: product = [], isPending: loading, isError } = useQuery({
    queryKey: ['products', slug],
    queryFn: () => api.get(`/product/${slug}`).then(response => response.data.data),
    enabled: !!slug,
  });

  // embla api starts here
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [emblaThumbRef, emblaThumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    align: "start",
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaApi || !emblaThumbApi) return;
      emblaApi.scrollTo(index);
      emblaThumbApi.scrollTo(index);
    },
    [emblaApi, emblaThumbApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi || !emblaThumbApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    emblaThumbApi.scrollTo(index);
  }, [emblaApi, emblaThumbApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollNext = () => emblaApi?.scrollNext();
  const scrollPrev = () => emblaApi?.scrollPrev();

  // embla api ends here

  // size and collor filter starts
  const [ selectedColorId, setSelectedColorId ] = useState(null);
  const [ selectedSizeId, setSelectedSizeId ] = useState(null);

  const availableSizesForColor = (colorId) => {
    return product.variants.filter( v => v.color_id === colorId ).map(v => v.size_id);
  };

  const availableColorsForSizes = (sizeId) => {
    return product.variants.filter( v => v.size_id === sizeId ).map(v => v.color_id);
  };

  const handleColorSelect = (colorId) => {
    setSelectedColorId(colorId);
    const validSizes = availableSizesForColor(colorId);
    if (selectedSizeId && validSizes.includes(selectedSizeId)) {
      return ;
    }
     setSelectedSizeId(validSizes[0] ?? null);
  };

  const handleSizeSelect = (sizeId) => {
    setSelectedSizeId(sizeId);
    const validColors = availableColorsForSizes(sizeId);
    if ( selectedColorId && validColors.includes(selectedColorId)) {
      return;
    }
    setSelectedColorId(validColors[0] ?? null);
  }

  
  const activeVariant = useMemo(() => {
    if (!selectedColorId && !selectedSizeId ) return;
    const selectedVariant = product.variants.find( 
      v => v.color_id === selectedColorId && v.size_id === selectedSizeId 
    );
    return selectedVariant;
  }, [selectedColorId, selectedSizeId, product.variants]);
  
  useEffect(() => {
    if (!product.variants) return;
    const first = product.variants.find(v => v.stock > 0) ?? product.variants[0];
    setSelectedColorId(first.color_id);
    setSelectedSizeId(first.size_id);
  }, [product.variants]);
  // size and collor filter ends

  const navigate = useNavigate();
  
  const handleProductAdd = ({ color, size, quantity, id, productName, img, price, buttonClicked, variantId }) => {
    if (!color || !size || quantity <= 0) {
      return toast.error("Choose the product color, size and quantity.");
    }
    dispatch({
      type: "products/addToCart",
      payload: {
        productId: id,
        productColor: color,
        productSize: size,
        quantity,
        productName: productName,
        productImage: img,
        productPrice: price,
        subTotal: quantity * price,
        variantId,  
      },
    });
    
    toast.success(`${productName} successfully added to the cart`);

    if (buttonClicked === "buyNow") {
      navigate("/check-out");
    }

  };

  if(loading) {
     return<Loader />;
  }
  if (isError) {
    return <p>Product not found</p>;
  }

  return (
    <>
      <section
        id="product-details"
        className="max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12"
      >
        <div className="md:px-6 md:py-6 md:bg-gray-100 md:shadow-md">
          <div
            className="md:grid grid-cols-[auto_1fr] gap-12"
            data-lenis-prevent
          >
            <div className="md:sticky md:top-8 md:self-start md:w-100 mb-6 md:mb-0">
              <div className="overflow-hidden relative group" ref={emblaRef}>
                <div className="flex md:-ml-4">
                  {product.image?.map((item) => (
                    <div key={`SLI-${item.id}`} className="flex-[0_0_100%] min-w-0 pl-4">
                      <img
                        src={item.image_url}
                        alt="product-details image"
                        className="h-80 md:h-100 w-full object-cover rounded-lg md:rounded-xl"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={scrollPrev}
                  className="hidden cursor-pointer bg-black h-10 w-10 rounded-full group-hover:flex items-center justify-center shadow-sm absolute left-3 top-1/2 -translate-y-1/2"
                >
                  <img
                    src={ArrowLeftImg}
                    alt="arrow left icon"
                    className="h-5 w-5 object-contain invert"
                  />
                </button>
                <button
                  onClick={scrollNext}
                  className="hidden cursor-pointer bg-black h-10 w-10 rounded-full group-hover:flex items-center justify-center shadow-sm absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <img
                    src={ArrowRightImg}
                    alt="arrow right icon"
                    className="h-5 w-5 object-contain invert"
                  />
                </button>
              </div>
              {/* Thumbnail */}
              <div
                className="hidden md:block overflow-hidden w-full"
                ref={emblaThumbRef}
              >
                <div className="flex mt-6">
                  {product.image?.map((item, index) => (
                    <div
                      key={`TUM-${item.id}`}
                      className="min-w-0 pl-[0.8rem] flex-[0_0_33.333%]"
                    >
                      <button
                        onClick={() => onThumbClick(index)}
                        type="button"
                        className={`cursor-pointer ${selectedIndex === index ? "border" : ""} rounded-md`}
                      >
                        <img
                          src={item.image_url}
                          alt="product details thumbnails"
                          className="h-26 w-26 object-cover rounded-md"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Product Details*/}
            <div>
              <div className="flex items-end justify-between mb-3 md:mb-6">
                <h2 className="text-2xl md:text-5xl tracking-wide md:leading-14 font-semibold">
                  {product.name}
                </h2>
                <button
                  data-tooltip-id="add-to-wishlist"
                  data-tooltip-place="left"
                  className="cursor-pointer bg-white shadow-sm h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center group hover:bg-black transition-colors duration-300 ease-in-out "
                >
                  <img
                    src={StarImg}
                    alt="star icon"
                    className="h-4 w-4 md:h-6 md:w-6 object-contain transition-colors duration-300 ease-in-out group-hover:invert"
                  />
                </button>
                <Tooltip id="add-to-wishlist">
                  <span className="text-white">Add to wishlist</span>
                </Tooltip>
              </div>
              <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6 md:mb-12">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl md:text-3xl text-gray-500 tracking-wider">
                    {product.sale_price > 0 ? (
                      <>
                        <span className="line-through">
                          $ { activeVariant ? activeVariant.price : product.base_price}
                        </span>{" "}
                        <span className="text-red-500">
                          {" "}
                          $ {activeVariant ? activeVariant.sales_amount : product.sales_amount}
                        </span>
                      </>
                    ) : (
                      <span>
                        $ {activeVariant ? activeVariant.price : product.base_price}
                      </span>
                    )}
                  </h2>
                  <div className={`border rounded text-sm font-semibold tracking-wide h-fit w-fit px-2 py-1 text-white ${activeVariant?.stock_status === 'Low Stock' && 'bg-yellow-500 border-yellow-500' || activeVariant?.stock_status === 'In stock' && 'bg-green-500 border-green-500' || activeVariant?.stock_status === 'Out of stock' && 'bg-red-500 border-red-500'}`}>
                    { activeVariant?.stock_status}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StarRating />
                  <span>(0 reviews)</span>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-lg md:text-2xl mb-3">Color:</p>
                <div className="flex gap-3">
                  { product.colors?.length !== 0 && product.colors?.map((color) => {
                          const isAvailable = selectedSizeId ? availableColorsForSizes(selectedSizeId).includes(color.id) : true;
                         return <>
                          <button
                            key={`CLO-${color.id}`}
                            data-tooltip-id={color.value}
                            onClick={() => isAvailable && handleColorSelect(color.id)}
                            style={{ background: color.meta.hex_code }}
                            className={`h-10 w-10 rounded-full ${selectedColorId === color.id ? "ring-2 ring-offset-2" : ""} ${!isAvailable ? 'cursor-not-allowed  opacity-40' : 'cursor-pointer'}`}
                          ></button>
                          <Tooltip id={color.value}>
                            <span>{color.value}</span>
                          </Tooltip>
                        </>
                        })
                  }
                </div>
              </div>
              <div className="mb-6">
                <p className="text-lg md:text-2xl mb-3">Size:</p>
                <div className="flex gap-3">
                  {product.siz?.length !== 0 && product.size?.map((item) => (
                        <>
                          <button
                            key={`SZ-${item.id}`}
                            data-tooltip-id={item.value}
                            onClick={() => handleSizeSelect(item.id)}
                            className={`flex uppercase items-center justify-center h-10 w-10  ${selectedSizeId === item.id ? "bg-black text-white" : "border"} rounded-sm cursor-pointer`}
                          >
                            {item.value}
                          </button>
                          <Tooltip id={item.value}>{item.value}</Tooltip>
                        </>
                      ))
                    }
                </div>
              </div>
              <div className="mb-6">
                <p className="text-lg md:text-2xl mb-3">Quantity</p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 mb-6 h-12">
                  <div className="grid grid-cols-3 bg-gray-100 border text-xl h-full items-center">
                    <button
                      onClick={() => dispatch({ type: "products/removeItem" })}
                      className="flex items-center justify-center border-r cursor-pointer h-full"
                    >
                      {" "}
                      <img
                        src={MinusImg}
                        alt="minus button icon"
                        className="h-4 w-4 object-contain"
                      />
                    </button>
                    <span className="text-center">{quantity}</span>
                    <button 
                      onClick={() => dispatch({ type: "products/addItem" })}
                      className="flex items-center justify-center border-l h-full cursor-pointer"
                    >
                      <img
                        src={PlusImg}
                        alt="minus button icon"
                        className="h-4 w-4 object-contain"
                      />
                    </button>
                  </div>
                  <button
                    onClick={() =>{
                      const selectedSize = product.size.find(curr => curr.id === selectedSizeId);
                      const selectedColor = product.colors.find(curr => curr.id === selectedColorId);
                      handleProductAdd({
                        size: selectedSize.value,
                        color: selectedColor.value,
                        id: product.id,
                        quantity,
                        productName: product.name,
                        img:  product.primary_image.image_url,
                        price: activeVariant.sales_amount > 0 ? activeVariant.sales_amount : activeVariant.price,
                        variantId: activeVariant.id,
                      });
                    }}
                    className={`col-span-2 md:col-span-3 bg-gray-200 w-full h-full ${quantity <= 0 ? "cursor-not-allowed" : "cursor-pointer"}  flex items-center justify-center text-lg tracking-wide`}
                  >
                    Add to Cart
                  </button>
                </div>

                <button
                  onClick={() => {
                    const selectedSize = product.size.find(curr => curr.id === selectedSizeId);
                    const selectedColor = product.colors.find(curr => curr.id === selectedColorId);
                    handleProductAdd({
                      buttonClicked: "buyNow",
                      size: selectedSize.value,
                      color: selectedColor.value,
                      id: product.id,
                      quantity,
                      productName: product.name,
                      img: product.primary_image.image_url,
                      price: activeVariant.sales_amount > 0 ? activeVariant.sales_amount : activeVariant.price,
                      variantId: activeVariant.id,
                    });
                  }}
                  className={`w-full h-12 flex items-center justify-center bg-black text-white ${quantity <= 0 ? "cursor-not-allowed" : "cursor-pointer hover:bg-gray-200 hover:text-black"}  text-xl tracking-wide transition-colors duration-300 ease-in-out`}
                >
                  Buy Now
                </button>
              </div>
              <div className="mb-6 flex items-center gap-6 md:gap-12 text-lg">
                <button className="cursor-pointer flex items-center gap-2">
                  <img
                    src={QuestionImg}
                    alt="question button icon"
                    className="h-8 w-8 object contain"
                  />
                  Ask a question
                </button>
                <button className="cursor-pointer flex items-center gap-2">
                  <img
                    src={ShareImg}
                    alt="share button icon"
                    className="h-5 w-5 object contain"
                  />
                  Share
                </button>
              </div>
              <div className="py-6 border-t border-gray-300">
                <div className="flex gap-2 md:gap-4 items-center mb-3 md:mb-6 md:text-xl">
                  <img
                    src={DeliveryImg}
                    alt="deliver icon"
                    className="h-8 w-8 md:h-10 md:w-10 object-contain"
                  />
                  <p>Estimated Delivery:</p>
                  <p className="text-gray-500">6 - 12 April, 2026</p>
                </div>
                <div className="flex gap-2 md:gap-4 items-center mb-6 md:text-xl">
                  <img
                    src={BoxImg}
                    alt="box icon"
                    className="h-6 w-6 md:h-8 md:w-8 object-contain"
                  />
                  <p>Free Shipping & return:</p>
                  <p className="text-gray-500">On all orders over ${ deliveryFee[0]?.free_shipping_threshold}</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 bg-gray-300 py-3">
                  <div className="grid grid-cols-3 md:flex gap-6">
                    {PaymentPartner.map((item) => (
                      <img
                        key={item.id}
                        src={item.img}
                        alt="payment partner brand logo"
                        className="h-8 w-16 object-contain"
                      />
                    ))}
                  </div>
                  <p>Guaranteed safe & secure payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* description and additional info section */}
      <section
        id="product-description"
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        <div className="md:px-12 md:py-12 md:bg-gray-100 md:shadow-md">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-lg md:text-xl font-semibold border-b-2 border-gray-400 mb-3 md:mb-6">
            <button
              onClick={() => setDetalsId("description")}
              className={`cursor-pointer flex pb-2 ${detailsId === "description" ? "border-b border-gray-400 " : "border-0 text-gray-400"}`}
            >
              Description
            </button>
            <button
              onClick={() => setDetalsId("additional")}
              className={`cursor-pointer flex pb-2 ${detailsId === "additional" ? "border-b border-gray-400 " : "border-0 text-gray-400"}`}
            >
              Additional Information
            </button>
            <button
              onClick={() => setDetalsId("reviews")}
              className={`cursor-pointer flex pb-2 ${detailsId === "reviews" ? "border-b border-gray-400 " : "border-0 text-gray-400"}`}
            >
              Reviews (0)
            </button>
            <button
              onClick={() => setDetalsId("questions")}
              className={`cursor-pointer flex pb-2 ${detailsId === "questions" ? "border-b border-gray-400 " : "border-0 text-gray-400"}`}
            >
              Questions
            </button>
          </div>
          {detailsId === "description" && (
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product.description)}} />
          )}
          {detailsId === "additional" && (
            <AdditionalInfo
              size={product.size}
              color={product.colors}
            />
          )}
          {detailsId === "reviews" && <Review />}
          {detailsId === "questions" && <Questions />}
        </div>
      </section>

      {/* related product section */}
      <section
        id="related products"
        className="max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12"
      >
        <h2 className="text-3xl font-semibold tracking-wide mb-12">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 md:gap-6">
          {featuredProduct.slice(0, 4).map((item) => (
            <div key={item.id}>
              <ProductCard
                id={item.id}
                title={item.title}
                image={item.itemImage}
                coverImage={item.itemCover}
                price={item.price}
                tag={item.tag}
                originalPrice={item.originalPrice}
                discount={item.discount}
                slug={item.slug}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default ProductDetails;

function AdditionalInfo({ size, color }) {
  return (
    <ul className="text-lg leading-8">
      <li className="mb-3 text-gray-400">
        Size:{" "}
        {size.map((item) => (
          <span key={`SZ-ARR-${item.id}`} className="text-black font-semibold">
            {item.value},&nbsp;
          </span>
        ))}
      </li>
      <li className=" text-gray-400">
        Color:{" "}
        {color.map((item) => (
          <span key={`CLR-ARR-${item.id}`} className="text-black font-semibold">
            {item.value},&nbsp;
          </span>
        ))}
      </li>
    </ul>
  );
}

