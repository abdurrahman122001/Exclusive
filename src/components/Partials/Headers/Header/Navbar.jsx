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

  const closeTimer = useRef();

  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);

  const handleCategoryEnter = (slug) => {
    clearTimeout(closeTimer.current);
    setActiveSlug(slug);
    setMenuOpen(true);
  };
  const handleCategoryLeave = () => {
    closeTimer.current = setTimeout(() => {
      setMenuOpen(false);
      setActiveSlug(null);
    }, 120);
  };

  // New: When mouse leaves the whole navbar, close menu
  const handleNavMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setMenuOpen(false);
      setActiveSlug(null);
    }, 120);
  };

  // New: When mouse enters the navbar, clear close timer
  const handleNavMouseEnter = () => {
    clearTimeout(closeTimer.current);
  };

  return (
    // Important: wrap the nav in a relative container
    <div className="relative w-full">
      <nav
        className={`w-full border-b border-gray-200 bg-white sticky top-0 z-40 ${className || ""}`}
        onMouseLeave={handleNavMouseLeave}
        onMouseEnter={handleNavMouseEnter}
      >
        <div className="w-full flex justify-center">
          <ul className="flex items-center space-x-7 py-3">
            {categoryList.map((cat) => (
              <li
                key={cat.id}
                className="relative"
                onMouseEnter={() => handleCategoryEnter(cat.slug)}
                onMouseLeave={() => {}} // Don't close menu on li mouseleave, handled by nav wrapper
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
            <li>
              <Link href="/about" passHref>
                <a className="text-[15px] md:text-lg lg:text-xl font-medium text-qblack px-1 py-1 border-b-2 border-transparent hover:border-qpurple transition-all duration-200">
                  {langCntnt?.About || "About"}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contact" passHref>
                <a className="text-[15px] md:text-lg lg:text-xl font-medium text-qblack px-1 py-1 border-b-2 border-transparent hover:border-qpurple transition-all duration-200">
                  {langCntnt?.Contact_Us || "Contact Us"}
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* MegaMenu is always centered under the nav, not under li! */}
      {menuOpen && activeSlug && (
        <MegaMenu slug={activeSlug} onMouseEnter={handleNavMouseEnter} onMouseLeave={handleNavMouseLeave} />
      )}
    </div>
  );
}
