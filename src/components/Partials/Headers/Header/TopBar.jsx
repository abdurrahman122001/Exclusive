import Link from "next/link";
import { useEffect, useState } from "react";
import languageModel from "../../../../../utils/languageModel";

export default function TopBar({ className, contact }) {
  const [auth, setAuth] = useState(null);
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
    setLangCntnt(languageModel());
  }, []);

  return (
    <>
      <div
        className={`w-full bg-qpurplelow/10 h-10 border-b border-qpurple ${
          className || ""
        }`}
      >
        <div className="container-x mx-auto h-full">
          <div className="flex justify-center items-center h-full"> {/* Changed here */}
            <a href={`tel:${contact && contact.phone}`}>
              <div className="flex space-x-2 items-center">
                <span className="text-qblack text-sm font-medium">
                  {langCntnt && langCntnt.Need_help}
                </span>
                <span className="text-xs text-qpurple font-bold leading-none">
                  {contact && contact.phone}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
