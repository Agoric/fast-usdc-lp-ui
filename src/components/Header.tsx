import { ConnectWalletButton, NetworkDropdown } from "@agoric/react-components";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const homeRef = useRef<HTMLAnchorElement | null>(null);
  const faqRef = useRef<HTMLAnchorElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: "0",
    width: "0",
  });

  // Update active link based on current route
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveIndex(0);
    } else if (location.pathname === "/faq") {
      setActiveIndex(1);
    }
  }, [location]);

  // Update underline position and width based on active link
  useEffect(() => {
    const updateIndicator = () => {
      const activeRef = activeIndex === 0 ? homeRef.current : faqRef.current;

      if (activeRef) {
        const { offsetLeft, offsetWidth } = activeRef;
        setIndicatorStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    };

    updateIndicator();
    // Update on window resize
    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeIndex]);

  return (
    <div className="w-full sticky top-0 sm:h-16 bg-white flex items-center justify-center md:justify-between flex-row shadow-md px-4">
      <div className="hidden md:flex flex-row justify-start items-center gap-2">
        <img className="h-12" src="Agoric-logo-color.svg" />
        <h1 className="text-2xl text-gray-800">Fast USDC</h1>
      </div>
      <div className="flex flex-col m-2 sm:m-0 sm:flex-row justify-start sm:items-center gap-2">
        <nav className="mr-4 relative">
          <div className="flex space-x-6 items-center">
            <NavLink
              ref={homeRef}
              to="/"
              className={({ isActive }) =>
                `text-lg py-2 transition-colors duration-200 ${
                  isActive
                    ? "text-agoric-red font-medium"
                    : "text-gray-800 hover:text-agoric-red"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              ref={faqRef}
              to="/faq"
              className={({ isActive }) =>
                `text-lg py-2 transition-colors duration-200 ${
                  isActive
                    ? "text-agoric-red font-medium"
                    : "text-gray-800 hover:text-agoric-red"
                }`
              }
            >
              FAQ
            </NavLink>
          </div>
          {/* Animated underline indicator */}
          <div
            className="absolute bottom-0 h-0.5 bg-agoric-red transition-all duration-300 ease-in-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />
        </nav>
        <NetworkDropdown />
        <ConnectWalletButton className="bg-agoric-red p-2 px-3 h-12 rounded-[4px] text-white hover:bg-opacity-85 active:bg-opacity-70 active:scale-95 transition-all outline-none ring-offset-2 focus:ring-2" />
      </div>
    </div>
  );
};

export default Header;
