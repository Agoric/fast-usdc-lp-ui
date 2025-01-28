import { ConnectWalletButton, NetworkDropdown } from '@agoric/react-components';

const Header = () => {
  return (
    <div className="w-full sticky top-0 sm:h-16 bg-white flex items-center justify-center md:justify-between flex-row shadow-md px-4">
      <div className="hidden md:flex flex-row justify-start items-center gap-2">
        <img className="h-12" src="Agoric-logo-color.svg" />
        <h1 className="text-2xl text-gray-800">Fast USDC</h1>
      </div>
      <div className="flex flex-col m-2 sm:m-0 sm:flex-row justify-start sm:items-center gap-2">
        <NetworkDropdown />
        <ConnectWalletButton className="bg-agoric-red p-2 px-3 h-12 rounded-[4px] text-white hover:bg-opacity-85 active:bg-opacity-70 active:scale-95 transition-all outline-none ring-offset-2 focus:ring-2" />
      </div>
    </div>
  );
};

export default Header;
