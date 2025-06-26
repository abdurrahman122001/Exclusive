import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import languageModel from "../../../../../utils/languageModel";
import MegaMenu from "./MegaMenu";

export default function Navbar({ className }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const categoryList = websiteSetup?.payload?.productCategories || [];
  const [langCntnt, setLangCntnt] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(null);

  // Track hover state over nav and mega menu
  const hoverNav = useRef(false);
  const hoverMenu = useRef(false);
  const closeTimer = useRef();

  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);

  // ---- CATEGORY HOVER HANDLERS ----
  const handleCategoryEnter = (slug) => {
    clearTimeout(closeTimer.current);
    hoverNav.current = true;
    setActiveSlug(slug);
    setMenuOpen(true);
  };
  const handleCategoryLeave = () => {
    hoverNav.current = false;
    closeTimer.current = setTimeout(() => {
      // Only close if not hovering MegaMenu
      if (!hoverMenu.current) {
        setMenuOpen(false);
        setActiveSlug(null);
      }
    }, 100);
  };

  // ---- MEGA MENU HOVER HANDLERS ----
  const handleMenuEnter = () => {
    clearTimeout(closeTimer.current);
    hoverMenu.current = true;
    setMenuOpen(true);
  };
  const handleMenuLeave = () => {
    hoverMenu.current = false;
    closeTimer.current = setTimeout(() => {
      if (!hoverNav.current) {
        setMenuOpen(false);
        setActiveSlug(null);
      }
    }, 100);
  };

  // For About/Contact
  const handleNonCategoryEnter = () => {
    clearTimeout(closeTimer.current);
    hoverNav.current = false;
    hoverMenu.current = false;
    setMenuOpen(false);
    setActiveSlug(null);
  };

  return (
    <div className="relative w-full">
      <nav
        className={`w-full border-b border-gray-200 bg-white sticky top-0 z-40 ${className || ""}`}
      >
        <div className="w-full flex justify-center">
          <ul className="flex items-center space-x-7 py-3">
            {categoryList.map((cat) => (
              <li
                key={cat.id}
                className="relative"
                onMouseEnter={() => handleCategoryEnter(cat.slug)}
                onMouseLeave={handleCategoryLeave}
              >
                <Link
                  href={{
                    pathname: "/products",
                    query: { category: cat.slug },
                  }}
                  passHref
                >
                  <a
                    className={`text-[15px] md:text-lg lg:text-xl font-medium text-qblack px-1 py-1 border-b-2 border-transparent hover:border-qpurple transition-all duration-200 ${activeSlug === cat.slug && menuOpen ? "text-qpurple" : ""}`}
                    style={{ minWidth: "max-content" }}
                  >
                    {cat.name}
                  </a>
                </Link>
              </li>
            ))}
            {/* Static About & Contact Us */}
            <li onMouseEnter={handleNonCategoryEnter}>
              <Link href="/about" passHref>
                <a className="text-[15px] md:text-lg lg:text-xl font-medium text-qblack px-1 py-1 border-b-2 border-transparent hover:border-qpurple transition-all duration-200">
                  {langCntnt?.About || "About"}
                </a>
              </Link>
            </li>
            <li onMouseEnter={handleNonCategoryEnter}>
              <Link href="/contact" passHref>
                <a className="text-[15px] md:text-lg lg:text-xl font-medium text-qblack px-1 py-1 border-b-2 border-transparent hover:border-qpurple transition-all duration-200">
                  {langCntnt?.Contact_Us || "Contact Us"}
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* MegaMenu */}
      {menuOpen && activeSlug && (
        <MegaMenu
          slug={activeSlug}
          onMouseEnter={handleMenuEnter}
          onMouseLeave={handleMenuLeave}
        />
      )}
    </div>
  );
}
