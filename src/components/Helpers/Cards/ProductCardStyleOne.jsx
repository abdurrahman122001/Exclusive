import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiRequest from "../../../../utils/apiRequest";
import auth from "../../../../utils/auth";
import settings from "../../../../utils/settings";
import { fetchCart } from "../../../store/Cart";
import { fetchCompareProducts } from "../../../store/compareProduct";
import { fetchWishlist } from "../../../store/wishlistData";
import CheckProductIsExistsInFlashSale from "../../Shared/CheckProductIsExistsInFlashSale";
import ProductView from "../../SingleProductPage/ProductView";
import Compair from "../icons/Compair";
import QuickViewIco from "../icons/QuickViewIco";
import Star from "../icons/Star";
import ThinLove from "../icons/ThinLove";
import Image from "next/image";
import languageModel from "../../../../utils/languageModel";
import LoginContext from "../../Contexts/LoginContexts";
import { FaSpinner } from "react-icons/fa"; // <-- IMPORT SPINNER ICON

const HeartIcon = ({ filled }) => (
  filled ? (
    <svg width="20" height="20" fill="#E8413A" viewBox="0 0 20 20"><path d="M10 18l-1.45-1.32C4.4 12.36 2 10.28 2 7.5 2 5.42 3.92 4 6.08 4c1.34 0 2.65.66 3.42 1.72C10.87 4.66 12.18 4 13.52 4 15.68 4 17.6 5.42 17.6 7.5c0 2.78-2.4 4.86-6.55 9.18L10 18z" /></svg>
  ) : (
    <svg width="20" height="20" fill="none" stroke="#E8413A" viewBox="0 0 20 20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18l-1.45-1.32C4.4 12.36 2 10.28 2 7.5 2 5.42 3.92 4 6.08 4c1.34 0 2.65.66 3.42 1.72C10.87 4.66 12.18 4 13.52 4 15.68 4 17.6 5.42 17.6 7.5c0 2.78-2.4 4.86-6.55 9.18L10 18z" /></svg>
  )
);
const CartIcon = () => (
  <svg className="mr-2" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61l1.38-7.72H6" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const Redirect = ({ message, linkTxt }) => (
  <div className="flex space-x-2 items-center">
    <span className="text-sm text-qgray">{message && message}</span>
    <Link href="/cart">
      <span className="text-xs border-b border-blue-600 text-blue-600 mr-2 cursor-pointer">
        {linkTxt && linkTxt}
      </span>
    </Link>
  </div>
);

export default function ProductCardStyleOne({ datas }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { wishlistData } = useSelector((state) => state.wishlistData);
  const wishlist = wishlistData && wishlistData.wishlists;
  const wishlisted = wishlist && wishlist.data.find((id) => id.product.id === datas.id);

  const [arWishlist, setArWishlist] = useState(null);
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [isProductInFlashSale, setData] = useState(null);
  const loginPopupBoard = useContext(LoginContext);

  useEffect(() => {
    if (websiteSetup) {
      const getId = websiteSetup.payload.flashSaleProducts.find(
        (item) => parseInt(item.product_id) === parseInt(datas.id)
      );
      setData(!!getId);
    }
  }, [websiteSetup, datas.id]);

  const [quickViewModal, setQuickView] = useState(false);
  const [quickViewData, setQuickViewData] = useState(null);
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);

  useEffect(() => {
    if (quickViewModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [quickViewModal]);

  useEffect(() => {
    setArWishlist(!!wishlisted);
  }, [wishlisted]);

  const discount =
    datas.offer_price && datas.price && Number(datas.price) > Number(datas.offer_price)
      ? Math.round(
        100 - (Number(datas.offer_price) / Number(datas.price)) * 100
      )
      : null;

  const varients = datas && datas.variants.length > 0 && datas.variants;
  const [getFirstVarients, setFirstVarients] = useState(
    varients && varients.map((v) => v.active_variant_items[0])
  );
  const [price, setPrice] = useState(null);
  const [offerPrice, setOffer] = useState(null);

  const [addToCartLoading, setAddToCartLoading] = useState(false);

  useEffect(() => {
    if (varients) {
      const prices = varients.map((v) =>
        v.active_variant_items.length > 0 && v.active_variant_items[0].price
          ? v.active_variant_items[0].price
          : 0
      );
      if (datas.offer_price) {
        const sumOfferPrice = parseFloat(
          prices.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0) +
          parseFloat(datas.offer_price)
        );
        setPrice(datas.price);
        setOffer(sumOfferPrice);
      } else {
        const sumPrice = parseFloat(
          prices.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0) +
          parseFloat(datas.price)
        );
        setPrice(sumPrice);
        setOffer(null);
      }
    } else {
      setPrice(datas && datas.price ? parseFloat(datas.price) : null);
      setOffer(datas && datas.offer_price ? parseFloat(datas.offer_price) : null);
    }
  }, [datas, varients]);

  const addToWishlist = (id) => {
    if (auth()) {
      setArWishlist(true);
      apiRequest.addToWishlist({ id: id, token: auth().access_token });
      dispatch(fetchWishlist());
    } else {
      loginPopupBoard.handlerPopup(true);
    }
  };
  const removeToWishlist = (id) => {
    if (auth()) {
      setArWishlist(false);
      apiRequest.removeToWishlist({ id: id, token: auth().access_token });
      dispatch(fetchWishlist());
    } else {
      router.push("/login");
    }
  };

  const addToCart = (id) => {
    setAddToCartLoading(true);
    const data = {
      id: id,
      token: auth() && auth().access_token,
      quantity: 1,
      variants:
        getFirstVarients &&
        getFirstVarients.length > 0 &&
        getFirstVarients.map((v) => (v ? parseInt(v.product_variant_id) : null)),
      variantItems:
        getFirstVarients &&
        getFirstVarients.length > 0 &&
        getFirstVarients.map((v) => (v ? v.id : null)),
    };
    if (auth()) {
      if (varients) {
        const variantQuery = data.variants.map((value) =>
          value ? `variants[]=${value}` : `variants[]=-1`
        );
        const variantString = variantQuery.map((value) => value + "&").join("");
        const itemsQuery = data.variantItems.map((value) =>
          value ? `items[]=${value}` : `items[]=-1`
        );
        const itemQueryStr = itemsQuery.map((value) => value + "&").join("");
        const uri = `token=${data.token}&product_id=${data.id}&${variantString}${itemQueryStr}quantity=${data.quantity}`;
        apiRequest
          .addToCard(uri)
          .then((res) => {
            toast.success(
              <Redirect
                message={langCntnt && langCntnt.Item_added}
                linkTxt={langCntnt && langCntnt.Go_To_Cart}
              />,
              { autoClose: 5000 }
            );
            setAddToCartLoading(false);
          })
          .catch((err) => {
            toast.error(
              err.response &&
              err.response.data.message &&
              err.response.data.message
            );
            setAddToCartLoading(false);
          });
        dispatch(fetchCart());
      } else {
        const uri = `token=${data.token}&product_id=${data.id}&quantity=${data.quantity}`;
        apiRequest
          .addToCard(uri)
          .then((res) => {
            toast.success(
              <Redirect
                message={langCntnt && langCntnt.Item_added}
                linkTxt={langCntnt && langCntnt.Go_To_Cart}
              />,
              { autoClose: 5000 }
            );
            setAddToCartLoading(false);
          })
          .catch((err) => {
            toast.error(
              err.response &&
              err.response.data.message &&
              err.response.data.message
            );
            setAddToCartLoading(false);
          });
        dispatch(fetchCart());
      }
    } else {
      localStorage.setItem(
        "data-hold",
        JSON.stringify({ type: "add-to-cart", ...data })
      );
      loginPopupBoard.handlerPopup(true);
      setAddToCartLoading(false);
    }
  };

  const { currency_icon } = settings();
  const [imgSrc, setImgSrc] = useState(null);

  const loadImg = (value) => {
    setImgSrc(value);
  };

  return (
    <div className="group relative pb-10 bg-white rounded-3xl shadow border border-gray-200 overflow-hidden transition hover:shadow-xl w-full h-[400px] flex flex-col pb-4">
      {/* Discount Badge */}
      {discount && (
        <span className="absolute top-3 left-3 z-10 bg-[#E8413A] text-white text-xs font-semibold rounded px-2 py-1">
          {discount}%
        </span>
      )}

      {/* Wishlist Icon */}
      <button
        onClick={() =>
          arWishlist
            ? removeToWishlist(wishlisted?.id)
            : addToWishlist(datas.id)
        }
        className="absolute top-3 right-3 z-10 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
      >
        <HeartIcon filled={arWishlist} />
      </button>

      {/* Image */}
      <div className="relative w-full h-[320px] flex items-center rounded-full justify-center bg-gray-50">
        <Link
          href={{
            pathname: "/single-product",
            query: { slug: datas.slug },
          }}
          passHref
          legacyBehavior
        >
          <a className="relative block w-full h-[320px] cursor-pointer">
            <Image
              src={datas.image}
              alt={datas.title}
              layout="fill"
              objectFit="cover"
              className="transition"
              priority
              onError={() => setImgSrc("/placeholder.png")}
            />
          </a>
        </Link>
        {/* Add to Cart Button: appears only on hover */}
        <button
          onClick={() => addToCart(datas.id)}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[90%] py-2 mb-3 rounded bg-black/70 text-white text-base font-semibold opacity-0 group-hover:opacity-100 transition hover:bg-qpurple flex items-center justify-center"
          style={{
            backdropFilter: "blur(2px)",
          }}
          disabled={addToCartLoading}
        >
          <span className="flex items-center justify-center">
            <CartIcon />
            {addToCartLoading ? (
              <>
                ADDING...
                <FaSpinner className="ml-2 animate-spin" size={20} />
              </>
            ) : (
              "ADD TO CART"
            )}
          </span>
        </button>
      </div>

      {/* Product Title */}
      <Link
        href={{
          pathname: "/single-product",
          query: { slug: datas.slug },
        }}
        passHref
      >
        <a>
          <div className="px-3 pt-4 pb-1 font-semibold text-sm leading-tight text-gray-800 line-clamp-2 hover:text-qpurple transition">
            {datas.title}
          </div>
        </a>
      </Link>

      {/* Price Row */}
      <div className="px-3 pb-6 flex items-center space-x-2 mt-auto">
        {offerPrice && offerPrice > 0 && offerPrice < price ? (
          <>
            <span className="text-gray-400 line-through text-sm">
              {currency_icon}
              {price}
            </span>
            <span className="text-[#E8413A] font-bold text-base">
              {currency_icon}
              {offerPrice}
            </span>
          </>
        ) : (
          <span className="text-[#E8413A] font-bold text-base">
            {currency_icon}
            {price}
          </span>
        )}
      </div>
      <div className="h-4" />
    </div>
  );
}
