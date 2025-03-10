import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="mt-8 text-center text-sm text-gray-600 relative">
      <p>
        Fast USDC is powered by{' '}
        <a
          href="https://agoric.com/fast-usdc/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-agoric-red font-medium hover:underline"
        >
          Agoric
        </a>
        . Move USDC to any chain in seconds.
      </p>
      <p className="mt-1">
        <NavLink to="/terms" className="text-agoric-red hover:underline">
          Terms & Conditions
        </NavLink>
      </p>
    </div>
  );
};

export default Footer;
