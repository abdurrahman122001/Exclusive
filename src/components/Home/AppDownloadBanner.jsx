// components/AppDownloadBanner.js

import Image from "next/image";
export default function AppDownloadBanner() {
  return (
    <div className="bg-gradient-to-r from-purple-100 via-purple-50 to-cyan-50 rounded-2xl my-8 py-8 flex flex-col items-center shadow-sm px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-serif font-medium text-center m-0">
        Download Exclusive Saree Fashion Mobile App
      </h2>
      <div className="mt-3 mb-5 text-center text-base">
        <span className="font-semibold">Extra 15% Off</span>
        <span className="italic text-gray-600 ml-1">
          on APP Purchase with
        </span>
        <span className="font-medium ml-1 text-gray-800">
          Code: <span className="font-bold">APP15</span>
        </span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
            className="rounded-lg h-12 w-auto" // fixed height for alignment
          />
        </a>
        <a
          href="https://apps.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
            className="rounded-lg h-12 w-auto" // fixed height for alignment
          />
        </a>
      </div>
    </div>
  );
}