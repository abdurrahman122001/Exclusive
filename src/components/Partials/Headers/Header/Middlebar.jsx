import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../../../../../utils/apiRequest";
import { fetchWishlist } from "../../../../store/wishlistData";
import Cart from "../../../Cart";
import SearchBox from "../../../Helpers/SearchBox";
import languageModel from "../../../../../utils/languageModel";
import DefaultUser from "../../../../contexts/DefaultUser";
import { ShoppingCart, UserRound, Heart, Headphones, Headset } from "lucide-react";

function AccountDropdown({ defaultImage, user, auth, logout }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setProfileOpen((v) => !v)}
        className="flex items-center outline-none focus:ring-0"
        type="button"
        tabIndex={0}
        aria-label="User menu"
      >
        <div className="w-[52px] h-[52px] rounded-full bg-qyellow flex justify-center items-center overflow-hidden relative">
          {auth && user && user.image ? (
            <Image
              layout="fill"
              objectFit="cover"
              src={process.env.NEXT_PUBLIC_BASE_URL + user.image}
              alt="user"
            />
          ) : auth && defaultImage ? (
            <Image
              layout="fill"
              objectFit="cover"
              src={process.env.NEXT_PUBLIC_BASE_URL + defaultImage}
              alt="user"
            />
          ) : (
            <UserRound size={22} className="text-[#6E6D79]" />
          )}
        </div>
        {auth && user && (
          <div className="ml-2 flex flex-col space-y-1">
            <h3 className="text-md text-qblack font-semibold leading-none">
              {user.name}
            </h3>
            <p className="text-sm text-qgray leading-none">{user.phone}</p>
          </div>
        )}
      </button>
      {profileOpen && (
        <div className="w-[210px] bg-white absolute right-0 top-[60px] z-[9999] border-t-4 border-qpurple flex flex-col rounded-lg shadow-xl">
          <div className="p-4">
            <ul className="flex flex-col space-y-4">
              {auth ? (
                <>
                  <li>
                    <Link href="/profile#dashboard">
                      <a
                        className="text-qgray hover:text-qblack hover:font-semibold block"
                        onClick={() => setProfileOpen(false)}
                      >
                        Account
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/tracking-order">
                      <a
                        className="text-qgray hover:text-qblack hover:font-semibold block"
                        onClick={() => setProfileOpen(false)}
                      >
                        Track Order
                      </a>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                      className="text-qred hover:font-semibold text-left w-full"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">
                      <a
                        className="text-qgray hover:text-qblack hover:font-semibold block"
                        onClick={() => setProfileOpen(false)}
                      >
                        Login
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/tracking-order">
                      <a
                        className="text-qgray hover:text-qblack hover:font-semibold block"
                        onClick={() => setProfileOpen(false)}
                      >
                        Track Order
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <a
                        className="text-qgray hover:text-qblack hover:font-semibold block"
                        onClick={() => setProfileOpen(false)}
                      >
                        Contact
                      </a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Middlebar({ className, settings }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const { wishlistData } = useSelector((state) => state.wishlistData);
  const wishlists = wishlistData && wishlistData.wishlists;
  const { compareProducts } = useSelector((state) => state.compareProducts);
  const { cart } = useSelector((state) => state.cart);

  const router = useRouter();
  const dispatch = useDispatch();
  const value = useContext(DefaultUser);

  const [user, setUser] = useState(null);
  const [defaultImage, setDefaultImage] = useState(null);
  const [auth, setAuth] = useState(null);
  const [cartItems, setCartItem] = useState(null);
  const [langCntnt, setLangCntnt] = useState(null);

  useEffect(() => {
    setUser(value.user);
  }, [value]);
  useEffect(() => {
    if (websiteSetup && !defaultImage) {
      setDefaultImage(websiteSetup.payload?.defaultProfile?.image);
    }
  }, [websiteSetup, defaultImage]);
  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);
  useEffect(() => {
    cart && setCartItem(cart.cartProducts);
  }, [cart]);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);

  const logout = () => {
    if (auth) {
      apiRequest.logout(auth.access_token);
      localStorage.removeItem("auth");
      localStorage.removeItem("active-user");
      dispatch(fetchWishlist());
      router.push("/login");
    }
  };

  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <div className="relative">
              <Link href="/" passHref>
                <a rel="noopener noreferrer">
                  {settings && (
                    <Image
                      width="153"
                      height="44"
                      objectFit="scale-down"
                      src={`${process.env.NEXT_PUBLIC_BASE_URL + settings.logo}`}
                      alt="logo"
                    />
                  )}
                </a>
              </Link>
            </div>

            {/* ---- Large Search Input in Middle ---- */}
            <div className="flex-1 flex justify-center px-6">
              <div className="w-full max-w-3xl">
                <SearchBox
                  className="w-full h-[44px] px-5 rounded-full flex items-center"
                  inputClassName="bg-transparent w-full border-0 outline-none px-2 h-[44px] text-sm"
                  iconClassName="text-qgray"
                  placeholder="Search"
                />
              </div>
            </div>
            {/* ---- End Search Input ---- */}

            {/* Right menu */}
            <div className="flex space-x-6 items-center relative">
              {/* Compare */}
              <div className="compaire relative">
                {auth ? (
                  <Link href="/products-compaire" passHref>
                    <a
                      rel="noopener noreferrer"
                      className="flex space-x-4 items-center"
                    >
                      <span className="cursor-pointer text-[#6E6D79]">
                        <Headset size={22} className="text-[#6E6D79]" />
                      </span>
                      <span className="text-base text-qgray font-medium">
                        Help
                      </span>
                    </a>
                  </Link>
                ) : (
                  <Link href="/login" passHref>
                    <a
                      rel="noopener noreferrer"
                      className="flex space-x-4 items-center"
                    >
                      <span className="cursor-pointer text-[#6E6D79]">
                        <Headset size={22} className="text-[#6E6D79]" />
                      </span>
                      <span className="text-base text-qgray font-medium capitalize">
                        Help
                      </span>
                    </a>
                  </Link>
                )}
                {/* <span className="w-[18px] h-[18px] rounded-full  absolute -top-1.5 left-4 flex justify-center items-center text-[9px]">
                  {compareProducts ? compareProducts.products.length : 0}
                </span> */}
              </div>

              {/* Wishlist */}
              <div className="favorite relative">
                <Link href="/wishlist" passHref>
                  <a rel="noopener noreferrer" className="flex space-x-4 items-center">
                    <Heart
                      size={22}
                      className="text-[#6E6D79]"
                      fill="none"
                      stroke="currentColor"
                      style={{ fill: "none" }}
                    />
                    <span className="text-base text-qgray font-medium capitalize">
                      {langCntnt && langCntnt.Wishlist}
                    </span>
                  </a>
                </Link>
                <span className="w-[18px] h-[18px] rounded-full  absolute -top-1.5 left-4 flex justify-center items-center text-[9px]">
                  {wishlists ? wishlists.data.length : 0}
                </span>
              </div>

              {/* Cart */}
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <Link href="/cart" passHref>
                    <a rel="noopener noreferrer" className="flex space-x-4 items-center">
                      <span className="cursor-pointer text-[#6E6D79]">
                        <ShoppingCart
                          size={22}
                          className="text-[#6E6D79]"
                          fill="none"
                          stroke="currentColor"
                          style={{ fill: "none" }} />
                      </span>
                      <span className="text-base text-qgray font-medium">
                        Cart
                      </span>
                    </a>
                  </Link>
                  <span className="w-[18px] h-[18px] rounded-full  absolute -top-1.5 left-4 flex justify-center items-center text-[9px]">
                    {cartItems ? cartItems.length : 0}
                  </span>
                </div>
                <Cart className="absolute -right-[45px] top-14 z-50 hidden group-hover:block rounded" />
              </div>

              {/* Account Dropdown */}
              <AccountDropdown
                defaultImage={defaultImage}
                user={user}
                auth={auth}
                logout={logout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
