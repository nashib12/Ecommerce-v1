import useEmblaCarousel from "embla-carousel-react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ProductDetailImg1 from "../../public/Images/ProductImg/Details/p1.webp";
import ProductDetailImg2 from "../../public/Images/ProductImg/Details/p2.jpg";
import ProductDetailImg3 from "../../public/Images/ProductImg/Details/p3.jpg";
import ProductDetailImg4 from "../../public/Images/ProductImg/Details/p4.jpg";
import ProductDetailImg5 from "../../public/Images/ProductImg/Details/p5.jpg";
import ProductDetailImg6 from "../../public/Images/ProductImg/Details/p7.jpg";
import ProductDetailImg7 from "../../public/Images/ProductImg/Details/p8.jpg";
import ProductDetailImg8 from "../../public/Images/ProductImg/Details/p9.jpg";
import ProductDetailImg9 from "../../public/Images/ProductImg/Details/p10.jpg";
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
import Description from "../Components/ProductDetails/Description";
import Review from "../Components/ProductDetails/Review";
import Questions from "../Components/ProductDetails/Questions";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../Context/DataContext";

function ProductDetails() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [detailsId, setDetalsId] = useState("description");
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
      console.log("thumbnail clicked");
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

  const slide = [
    { id: 1, image: ProductDetailImg1 },
    { id: 2, image: ProductDetailImg2 },
    { id: 3, image: ProductDetailImg3 },
    { id: 4, image: ProductDetailImg4 },
    { id: 5, image: ProductDetailImg5 },
    { id: 6, image: ProductDetailImg6 },
    { id: 7, image: ProductDetailImg7 },
    { id: 8, image: ProductDetailImg8 },
    { id: 9, image: ProductDetailImg9 },
  ];

  const paymentPartner = [
    { id: 1, img: PaymentImg1 },
    { id: 2, img: PaymentImg2 },
    { id: 3, img: PaymentImg3 },
    { id: 4, img: PaymentImg4 },
    { id: 5, img: PaymentImg5 },
  ];
  const { slug } = useParams();
  const { featuredProduct, dispatch, quantity, productColor, productSize } =
    useContext(DataContext);

  const navigate = useNavigate();
  const selectedProduct = useMemo(() => {
    if (!featuredProduct || featuredProduct.length === 0) return null;
    return featuredProduct?.find((prev) => prev.slug === slug);
  }, [slug, featuredProduct]);

  const handleProductAdd = ({
    color,
    size,
    quantity,
    id,
    productName,
    img,
    price,
    buttonClicked,
  }) => {
    if (!color || !size || quantity <= 0) return;
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
      },
    });
    if (buttonClicked === "buyNow") {
      navigate("/check-out");
    }
  };
  if (!selectedProduct) return null;
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
                  {slide.map((item) => (
                    <div key={item.id} className="flex-[0_0_100%] min-w-0 pl-4">
                      <img
                        src={item.image}
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
                  {slide.map((item, index) => (
                    <div
                      key={item.id}
                      className="min-w-0 pl-[0.8rem] flex-[0_0_33.333%]"
                    >
                      <button
                        onClick={() => onThumbClick(index)}
                        type="button"
                        className={`cursor-pointer ${selectedIndex === index ? "border" : ""} rounded-md`}
                      >
                        <img
                          src={item.image}
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
                  {selectedProduct.title}
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
                <h2 className="text-xl md:text-3xl text-gray-500 tracking-wider">
                  {selectedProduct.originalPrice ? (
                    <>
                      <span className="line-through">
                        $ {selectedProduct.originalPrice}
                      </span>{" "}
                      <span className="text-red-500">
                        {" "}
                        $ {selectedProduct.price}
                      </span>
                    </>
                  ) : (
                    <span>$ {selectedProduct.price}</span>
                  )}
                </h2>
                <div className="flex items-center gap-4">
                  <StarRating />
                  <span>(0 reviews)</span>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-lg md:text-2xl mb-3">Color:</p>
                <div className="flex gap-3">
                  {selectedProduct.color
                    ? selectedProduct.color.map((item) => (
                        <>
                          <button
                            key={item}
                            data-tooltip-id={item}
                            onClick={() =>
                              dispatch({
                                type: "products/setColor",
                                payload: item,
                              })
                            }
                            style={{ background: item }}
                            className={`cursor-pointer transition-transform duration-300 ease-in hover:scale-95 h-10 w-10 rounded-full ${item === productColor ? "border-2" : "border-0"}`}
                          ></button>
                          <Tooltip id={item}>
                            <span>{item}</span>
                          </Tooltip>
                        </>
                      ))
                    : ""}
                </div>
              </div>
              <div className="mb-6">
                <p className="text-lg md:text-2xl mb-3">Size:</p>
                <div className="flex gap-3">
                  {selectedProduct.size
                    ? selectedProduct.size.map((item) => (
                        <>
                          <button
                            key={item}
                            data-tooltip-id={item}
                            onClick={() =>
                              dispatch({
                                type: "products/setSize",
                                payload: item,
                              })
                            }
                            className={`flex uppercase items-center justify-center h-10 w-10 md:h-12 md:w-12 ${item === productSize ? "border-3 border-black" : "border border-gray-500"} hover:border-black rounded-md cursor-pointer md:text-lg`}
                          >
                            {item}
                          </button>
                          <Tooltip id={item}>{item}</Tooltip>
                        </>
                      ))
                    : ""}
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
                    onClick={() =>
                      handleProductAdd({
                        size: productSize,
                        color: productColor,
                        id: selectedProduct.id,
                        quantity,
                        productName: selectedProduct.title,
                        img: selectedProduct.productImage,
                        price: selectedProduct.price,
                      })
                    }
                    className={`col-span-2 md:col-span-3 bg-gray-200 w-full h-full ${quantity <= 0 ? "cursor-not-allowed" : "cursor-pointer"}  flex items-center justify-center text-lg tracking-wide`}
                  >
                    Add to Cart
                  </button>
                </div>

                <button
                  onClick={() =>
                    handleProductAdd({
                      buttonClicked: "buyNow",
                      size: productSize,
                      color: productColor,
                      id: selectedProduct.id,
                      quantity,
                      productName: selectedProduct.title,
                      img: selectedProduct.productImage,
                      price: selectedProduct.price,
                    })
                  }
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
                  <p className="text-gray-500">On all orders over $200.00</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 bg-gray-300 py-3">
                  <div className="grid grid-cols-3 md:flex gap-6">
                    {paymentPartner.map((item) => (
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
        className="max-w-7xl mx-auto px-6 md:px-12 pb-12"
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
            <Description description={selectedProduct.description} />
          )}
          {detailsId === "additional" && (
            <AdditionalInfo
              size={selectedProduct.size}
              color={selectedProduct.color}
            />
          )}
          {detailsId === "reviews" && <Review />}
          {detailsId === "questions" && <Questions />}
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
          <span key={item} className="text-black font-semibold">
            {item},&nbsp;
          </span>
        ))}
      </li>
      <li className=" text-gray-400">
        Color:{" "}
        {color.map((item) => (
          <span key={item} className="text-black font-semibold">
            {item},&nbsp;
          </span>
        ))}
      </li>
    </ul>
  );
}
