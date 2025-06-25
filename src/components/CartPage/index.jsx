import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";
import PageTitle from "../Helpers/PageTitle";
import ProductsTable from "./ProductsTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../../utils/auth";
import apiRequest from "../../../utils/apiRequest";
import { toast } from "react-toastify";
import { fetchCart } from "../../store/Cart";
import Link from "next/link";
import isAuth from "../../../Middleware/isAuth";
import languageModel from "../../../utils/languageModel";

function CardPage() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [getCarts, setGetCarts] = useState(null);
  const [langCntnt, setLangCntnt] = useState(null);
  const [removingId, setRemovingId] = useState(null); // NEW STATE

  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);

  // Make deleteItem async for loader to work properly
  const deleteItem = async (id) => {
    setRemovingId(id); // Set id before delete
    if (auth()) {
      try {
        await apiRequest.deleteCartItem({
          id: id,
          token: auth().access_token,
        });
        toast.warn("Removed from Cart", { autoClose: 1000 });
        dispatch(fetchCart());
      } catch (err) {
        console.log(err);
      }
    }
    setRemovingId(null); // Reset after delete
  };

  useEffect(() => {
    if (cart && cart.cartProducts.length > 0) {
      const cartsItems = cart.cartProducts.map((item) => {
        return {
          ...item,
          totalPrice: item.product.offer_price
            ? item.product.offer_price * parseInt(item.qty)
            : item.product.price * parseInt(item.qty),
        };
      });
      setGetCarts(cartsItems);
    } else {
      setGetCarts([]);
    }
  }, [cart]);

  const serverReqIncreseQty = (id) => {
    if (auth()) {
      apiRequest.incrementQyt(id, auth().access_token);
      if (getCarts && getCarts.length > 0) {
        const updateCart = getCarts.map((cart) => {
          if (cart.id === id) {
            const updatePrice = cart.product.offer_price || cart.product.price;
            const updateQty = cart.qty + 1;
            return {
              ...cart,
              totalPrice: updatePrice * updateQty,
              qty: cart.qty + 1,
            };
          }
          return cart;
        });
        setGetCarts(updateCart);
      }
    }
  };

  const serverReqDecreseQyt = (id) => {
    if (auth()) {
      apiRequest.decrementQyt(id, auth().access_token);
      if (getCarts && getCarts.length > 0) {
        const updateCart = getCarts.map((cart) => {
          if (cart.id === id) {
            const updatePrice = cart.product.offer_price || cart.product.price;
            const updateQty = cart.qty - 1;
            return {
              ...cart,
              totalPrice: updatePrice * updateQty,
              qty: cart.qty - 1,
            };
          }
          return cart;
        });
        setGetCarts(updateCart);
      }
    }
  };

  const clearCart = async () => {
    if (auth()) {
      setGetCarts([]);
      await apiRequest.clearCart({
        token: auth().access_token,
      });
      dispatch(fetchCart());
    } else {
      return false;
    }
  };

  return (
    <>
      {getCarts && getCarts.length === 0 ? (
        <div className="cart-page-wrapper w-full pt-12 pb-28 min-h-[60vh]">
          <div className="container mx-auto px-2">
            <BreadcrumbCom
              paths={[
                { name: langCntnt && langCntnt.home, path: "/" },
                { name: langCntnt && langCntnt.cart, path: "/cart" },
              ]}
            />
            <EmptyCardError />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white pb-28 min-h-[60vh]">
          <div className="w-full">
            <PageTitle
              title={langCntnt && langCntnt.Your_cart}
              breadcrumb={[
                { name: langCntnt && langCntnt.home, path: "/" },
                { name: langCntnt && langCntnt.cart, path: "/cart" },
              ]}
            />
          </div>
          <div className="w-full pt-8">
            <div className="container mx-auto px-2">
              <ProductsTable
                incrementQty={serverReqIncreseQty}
                decrementQty={serverReqDecreseQyt}
                deleteItem={deleteItem}
                cartItems={getCarts && getCarts}
                className="mb-8"
                removingId={removingId} // pass loader id
              />
              {/* Responsive actions */}
              <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-5 mt-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <button onClick={clearCart} type="button" className="w-full sm:w-auto">
                    <span className="block text-sm font-semibold text-qred mb-1 sm:mb-0">
                      {langCntnt && langCntnt.Clear_Cart}
                    </span>
                  </button>
                  <Link href="/cart" passHref>
                    <div className="w-full sm:w-[140px] rounded-full h-[50px] bg-[#F6F6F6] flex justify-center items-center cursor-pointer">
                      <span className="text-sm font-semibold">
                        {langCntnt && langCntnt.Update_Cart}
                      </span>
                    </div>
                  </Link>
                  <Link href="/checkout" passHref>
                    <div className="w-full sm:w-[220px] md:w-[300px] h-[50px] flex justify-center items-center cursor-pointer">
                      <div className="transition-common bg-qpurple hover:bg-qpurplelow/10 border border-transparent hover:border-qpurple hover:text-qpurple text-white flex justify-center items-center w-full h-full rounded-full">
                        <span className="text-sm font-semibold">
                          {langCntnt && langCntnt.Proceed_to_Checkout}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default isAuth(CardPage);
