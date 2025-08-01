import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ThinBag from "../../../Helpers/icons/ThinBag";
import Middlebar from "./Middlebar";
import Navbar from "./Navbar";
import TopBar from "./TopBar";

export default function Header({ drawerAction, settings, contact }) {
  const { cart } = useSelector((state) => state.cart);
  const [cartItems, setCartItem] = useState(null);
  useEffect(() => {
    cart && setCartItem(cart.cartProducts);
  }, [cart]);

  return (
    <header className="header-section-wrapper relative print:hidden">
      <TopBar contact={contact && contact} className="quomodo-shop-top-bar" />
      <Middlebar
        settings={settings && settings}
        className="quomodo-shop-middle-bar lg:block hidden"
      />
      <div className="quomodo-shop-drawer lg:hidden block w-full h-[60px] bg-white">
        <div className="w-full h-full flex justify-between items-center px-5">
          <div onClick={drawerAction}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <div className="w-[200px] h-full relative">
            <Link href="/" passHref>
              <a>
                {settings && (
                  <Image
                    layout="fill"
                    objectFit="scale-down"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL + settings.logo}`}
                    alt="logo"
                  />
                )}
              </a>
            </Link>
          </div>
          <div className="cart relative cursor-pointer text-qblack">
            <Link href="/cart">
              <span>
                <ThinBag className={`fill-current`} />
              </span>
            </Link>
            <span className="w-[18px] h-[18px] rounded-full text-white bg-qpurple absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
              {cartItems ? cartItems.length : 0}
            </span>
          </div>
        </div>
      </div>
      {/* Important: Full width + relative so mega menu always centers */}
      <div className="w-full relative z-50">
        <Navbar className="quomodo-shop-nav-bar lg:block hidden" />
      </div>
    </header>
  );
}
