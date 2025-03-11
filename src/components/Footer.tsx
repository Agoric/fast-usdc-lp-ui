import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="mt-12 text-center text-sm text-gray-600 relative">
      <div className="py-6 relative">
        {/* Subtle decorative elements */}
        <div className="absolute left-0 top-1/2 h-[1px] w-16 bg-gradient-to-r from-transparent to-gray-300/60 transform -translate-y-1/2"></div>
        <div className="absolute right-0 top-1/2 h-[1px] w-16 bg-gradient-to-l from-transparent to-gray-300/60 transform -translate-y-1/2"></div>

        <p className="mb-3">
          Fast USDC is powered by{' '}
          <a
            href="https://agoric.com/fast-usdc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-agoric-red font-medium hover:underline transition-colors duration-200"
          >
            Agoric
          </a>
          . Move USDC to any chain in seconds.
        </p>
        <p className="mt-1">
          <NavLink
            to="/terms"
            className="text-agoric-red hover:underline inline-flex items-center transition-all duration-200 hover:translate-x-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
            Terms & Conditions
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Footer;
