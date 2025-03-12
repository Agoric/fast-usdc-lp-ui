import {
  ConnectWalletButton,
  NetworkDropdown,
  useAgoric,
} from '@agoric/react-components';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useNetworkDropdownStore } from '../store/networkDropdownStore';

const AppBar = () => {
  const location = useLocation();
  const { chainName } = useAgoric();
  const [activeIndex, setActiveIndex] = useState(0);
  const homeRef = useRef<HTMLAnchorElement | null>(null);
  const faqRef = useRef<HTMLAnchorElement | null>(null);
  const isNetworkDropdownVisible =
    useNetworkDropdownStore(state => state.isVisible) || chainName !== 'agoric';

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: '0',
    width: '0',
  });

  // Update active link based on current route
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveIndex(0);
    } else if (location.pathname === '/faq') {
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
    window.addEventListener('resize', updateIndicator);
    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeIndex]);

  return (
    <div className="w-full sticky top-0 z-50 sm:h-16 bg-white/95 flex items-center justify-center lg:justify-between flex-row shadow-xs border-b border-gray-100/80 px-5 backdrop-blur-sm">
      <div className="hidden lg:flex flex-row justify-start items-center gap-3">
        <img className="h-10" src="Agoric-logo-color.svg" alt="Agoric Logo" />
        <div className="h-6 w-px bg-gray-200/70 mx-1"></div>
        <h1 className="text-xl font-semibold text-gray-800">Fast USDC</h1>
      </div>
      <div className="flex flex-col m-2 sm:m-0 sm:flex-row justify-start sm:items-center gap-3">
        <nav className="mr-5 relative">
          <div className="flex space-x-7 items-center">
            <NavLink
              ref={homeRef}
              to="/"
              className={({ isActive }) =>
                `text-lg py-2 transition-all duration-200 ${
                  isActive
                    ? 'text-agoric-red font-medium'
                    : 'text-gray-700 hover:text-agoric-red'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              ref={faqRef}
              to="/faq"
              className={({ isActive }) =>
                `text-lg py-2 transition-all duration-200 ${
                  isActive
                    ? 'text-agoric-red font-medium'
                    : 'text-gray-700 hover:text-agoric-red'
                }`
              }
            >
              FAQ
            </NavLink>
          </div>
          {/* Animated underline indicator */}
          <div
            className="absolute bottom-0 h-0.5 bg-agoric-red rounded-full transition-all duration-300 ease-in-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              display: location.pathname === '/terms' ? 'none' : 'block',
            }}
          />
        </nav>
        {isNetworkDropdownVisible && <NetworkDropdown />}
        <ConnectWalletButton className="bg-agoric-red p-2 px-4 h-11 rounded-md text-white hover:bg-opacity-90 active:bg-opacity-80 active:scale-98 transition-all outline-none ring-offset-2 focus:ring-2 focus:ring-agoric-red/30 hover:shadow-sm" />
      </div>
    </div>
  );
};

export default AppBar;
