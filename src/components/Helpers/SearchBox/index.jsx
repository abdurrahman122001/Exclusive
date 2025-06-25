import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import languageModel from "../../../../utils/languageModel";
import { Search } from "lucide-react"; // npm i lucide-react

export default function SearchBox({ className }) {
  const router = useRouter();
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [searchKey, setSearchkey] = useState("");
  const [langCntnt, setLangCntnt] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);

  useEffect(() => {
    if (websiteSetup) {
      setCategories(websiteSetup.payload?.productCategories || []);
    }
  }, [websiteSetup]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const categoryHandler = (cat) => {
    setSelectedCat(cat);
    setShowDropdown(false);
  };

  const clearCategory = () => {
    setSelectedCat(null);
  };

  const searchHandler = () => {
    if (searchKey !== "") {
      if (selectedCat) {
        router.push({
          pathname: "/search",
          query: { search: searchKey, category: selectedCat.slug },
        });
      } else {
        router.push({
          pathname: "/search",
          query: { search: searchKey },
        });
      }
    } else if (searchKey === "" && selectedCat) {
      router.push({
        pathname: "/products",
        query: { category: selectedCat.slug },
      });
    } else {
      setShowDropdown(true); // show dropdown if nothing entered
    }
  };

  // Show dropdown when input is focused
  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  return (
    <div
      className={`relative w-full flex justify-center ${className || ""}`}
      ref={wrapperRef}
    >
      <div className="w-full max-w-3xl">
        {/* Search bar */}
        <div className="flex items-center bg-white border border-[#E5E5E5] rounded-full h-[54px] w-full transition">
          <input
            className="flex-1 px-6 h-full bg-transparent text-base rounded-full focus:outline-none"
            value={searchKey}
            onFocus={handleInputFocus}
            onChange={e => setSearchkey(e.target.value)}
            onKeyDown={e => e.key === "Enter" && searchHandler()}
            placeholder="Search"
            aria-label="Search input"
          />

          {/* Category pill in input */}
          {selectedCat && (
            <span className="flex items-center bg-[#FFF4EF] border border-[#F87D2F] text-[#F87D2F] rounded-full px-3 py-1 ml-2 text-sm font-medium transition">
              {selectedCat.name}
              <button
                onClick={clearCategory}
                className="ml-2 focus:outline-none"
                tabIndex={0}
                aria-label="Clear selected category"
              >
                <svg width="12" height="12" viewBox="0 0 20 20">
                  <line x1="5" y1="5" x2="15" y2="15" stroke="#F87D2F" strokeWidth="2" />
                  <line x1="15" y1="5" x2="5" y2="15" stroke="#F87D2F" strokeWidth="2" />
                </svg>
              </button>
            </span>
          )}

          {/* Search icon/button */}
          <button
            onClick={searchHandler}
            className="px-5 h-full bg-transparent focus:outline-none text-[#F87D2F]"
            type="button"
            aria-label="Search"
          >
            <Search size={22} />
          </button>
        </div>

        {/* Main search dropdown (clean, no shadow) */}
        {showDropdown && (
          <div className="absolute left-0 top-[60px] w-full bg-white rounded-2xl border border-[#E5E5E5] z-40 py-6 px-6">
            {/* Most Searched Categories */}
            <div className="font-semibold text-[15px] text-qblack mb-2">
              Most Searched Categories
            </div>
            <div className="flex flex-wrap gap-6 mb-4">
              {categories.slice(0, 8).map((cat, idx) => (
                <span
                  key={cat.slug || idx}
                  onClick={() => categoryHandler(cat)}
                  className="text-[15px] text-qgray hover:text-qpurple transition font-medium whitespace-nowrap cursor-pointer px-2 py-1 rounded"
                  style={{ border: "1px solid transparent" }}
                >
                  {cat.name}
                </span>
              ))}
            </div>
            {/* More groups can go here */}
            <div className="font-semibold text-[15px] text-qblack mb-2">Popular Searches</div>
            <div className="flex flex-wrap gap-6 mb-4">
              {/* Dummy data, replace with dynamic if you have */}
              {["Banarasi Saree", "Ready to Ship", "Designer Blouse", "Mirror Work"].map((name, i) => (
                <span
                  key={name + i}
                  className="text-[15px] text-qgray hover:text-qpurple transition font-medium whitespace-nowrap cursor-pointer px-2 py-1 rounded"
                  style={{ border: "1px solid transparent" }}
                >
                  {name}
                </span>
              ))}
            </div>
            <div className="font-semibold text-[15px] text-qblack mb-2">Popular Collections</div>
            <div className="flex flex-wrap gap-6">
              {/* Dummy data, replace with dynamic if you have */}
              {["New Arrivals", "Sale", "Plus Size", "Best Sellers"].map((name, i) => (
                <span
                  key={name + i}
                  className="text-[15px] text-qgray hover:text-qpurple transition font-medium whitespace-nowrap cursor-pointer px-2 py-1 rounded"
                  style={{ border: "1px solid transparent" }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
