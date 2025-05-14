import { useAgoric } from '@agoric/react-components';
import { stringifyValue } from '@agoric/web-components';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import { multiplyBy } from '@agoric/zoe/src/contractSupport/ratio';
import {
  usePoolMetricsData,
  usePoolMetricsStore,
} from '../store/poolMetricsStore';
import Shimmer from './Shimmer';
import Footer from './Footer';
import { useState, useRef, useEffect } from 'react';
import Layout from './Layout';
import PageHeading from './PageHeading';
import { formatNumber } from '../utils/format';

const Content = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const depositTabRef = useRef<HTMLButtonElement>(null);
  const withdrawTabRef = useRef<HTMLButtonElement>(null);
  const poolCardRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: '0',
    width: '50%',
  });

  // Mouse position state for glow effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glowOpacity, setGlowOpacity] = useState(0);

  // Handle mouse movement for the glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (poolCardRef.current) {
      const rect = poolCardRef.current.getBoundingClientRect();
      // Calculate position relative to the card
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Handle hover state with animation
  const handleMouseEnter = () => {
    setGlowOpacity(1);
  };

  const handleMouseLeave = () => {
    setGlowOpacity(0);
  };

  // Update indicator position based on active tab
  useEffect(() => {
    const updateIndicator = () => {
      const activeTabRef =
        activeTab === 'deposit'
          ? depositTabRef.current
          : withdrawTabRef.current;

      if (activeTabRef) {
        const tabsContainer = activeTabRef.parentElement;
        const { offsetLeft, offsetWidth } = activeTabRef;

        if (tabsContainer) {
          setIndicatorStyle({
            left: `${offsetLeft}px`,
            width: `${offsetWidth}px`,
          });
        }
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);

    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeTab]);

  usePoolMetricsData();
  const metrics = usePoolMetricsStore(state => state.metrics);
  const { purses, address, isSmartWalletProvisioned } = useAgoric();

  const shareWorth = metrics?.shareWorth;

  const poolBalanceForDisplay =
    shareWorth && stringifyValue(shareWorth.numerator.value, 'nat', 6, 4);

  const awaitingSettlementForDisplay =
    metrics && stringifyValue(metrics.encumberedBalance.value, 'nat', 6, 4);

  const poolFeesForDisplay =
    metrics && stringifyValue(metrics.totalPoolFees.value, 'nat', 6, 4);

  const fastLPBalance = purses?.find(
    ({ pursePetname }) => pursePetname === 'FastLP',
  )?.currentAmount as Amount<'nat'>;

  const maxAvailableToWithdraw =
    fastLPBalance && shareWorth
      ? multiplyBy(fastLPBalance, shareWorth).value
      : null;

  const unencumberedBalance =
    metrics && shareWorth
      ? shareWorth.numerator.value - metrics.encumberedBalance.value
      : null;

  const availableToWithdraw =
    unencumberedBalance !== null && maxAvailableToWithdraw !== null
      ? unencumberedBalance < maxAvailableToWithdraw
        ? unencumberedBalance
        : maxAvailableToWithdraw
      : null;

  const poolShareBPS =
    shareWorth && fastLPBalance
      ? (fastLPBalance.value * 10_000n) / shareWorth.denominator.value
      : null;

  const poolSharePercent =
    poolShareBPS !== null ? (Number(poolShareBPS) / 100).toFixed(2) : null;

  const isMetricsLoading = metrics === null;

  const isPoolShareLoading =
    !!address &&
    isSmartWalletProvisioned !== false &&
    (poolSharePercent === null || maxAvailableToWithdraw === null);

  return (
    <Layout>
      <PageHeading
        title="Fast USDC Liquidity Pool"
        subtitle="Provide liquidity to enable instant USDC transfers across chains, earning fees while supporting the ecosystem."
      />

      {/* Container with glow effect */}
      <div
        className="relative mb-12"
        style={{
          paddingBottom: '2px',
          paddingTop: '2px',
          paddingLeft: '2px',
          paddingRight: '2px',
        }}
        ref={poolCardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main card */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-0 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg z-10">
          {/* Pool Details Card - Top on mobile, right on desktop */}
          <div className="rounded-tr-lg rounded-tl-lg md:rounded-tl-none rounded-t-lg md:rounded-tr-lg md:rounded-br-lg p-5 md:p-6 md:col-span-4 order-1 md:order-2 bg-gradient-to-br from-white to-gray-50/70 relative transition-all duration-300">
            <div className="w-full text-xl font-semibold mb-5 text-center md:text-left bg-[#EBF9F9] py-2 px-4 rounded shadow-sm border-l-4 border-agoric-red/70">
              Pool Details
            </div>

            <div className="space-y-4">
              {/* Total Pool Balance */}
              <div className="px-4 py-3 hover:bg-gray-50/40 transition-all duration-300 rounded-lg group">
                <div className="text-gray-700 font-medium text-sm mb-1">
                  Total Pool Balance
                </div>
                <div className="text-xl font-bold text-gray-800 transition-all duration-300 group-hover:translate-x-1">
                  {isMetricsLoading ? (
                    <Shimmer height="28px" width="100px" />
                  ) : (
                    `$${formatNumber(poolBalanceForDisplay)}`
                  )}
                </div>
                <div className="text-gray-500 text-xs">USDC</div>
              </div>

              {/* Subtle divider */}
              <div className="h-px bg-gray-100/70 w-full mx-4"></div>

              {/* Awaiting Settlement */}
              <div className="px-4 py-3 hover:bg-gray-50/40 transition-all duration-300 rounded-lg group">
                <div className="text-gray-700 font-medium text-sm mb-1">
                  Awaiting Settlement
                </div>
                <div className="text-xl font-bold text-gray-800 transition-all duration-300 group-hover:translate-x-1">
                  {isMetricsLoading ? (
                    <Shimmer height="28px" width="100px" />
                  ) : (
                    `$${formatNumber(awaitingSettlementForDisplay)}`
                  )}
                </div>
                <div className="text-gray-500 text-xs">USDC</div>
              </div>

              {/* Subtle divider */}
              <div className="h-px bg-gray-100/70 w-full mx-4"></div>

              {/* Pool Fees Earned */}
              <div className="px-4 py-3 hover:bg-gray-50/40 transition-all duration-300 rounded-lg group">
                <div className="text-gray-700 font-medium text-sm mb-1">
                  Pool Fees Earned
                </div>
                <div className="text-xl font-bold text-gray-800 transition-all duration-300 group-hover:translate-x-1">
                  {isMetricsLoading ? (
                    <Shimmer height="28px" width="100px" />
                  ) : (
                    `$${formatNumber(poolFeesForDisplay)}`
                  )}
                </div>
                <div className="text-gray-500 text-xs">USDC</div>
              </div>
            </div>
          </div>

          {/* Horizontal divider for mobile view */}
          <div className="block md:hidden h-[1px] bg-gradient-to-r from-transparent via-gray-300/80 to-transparent mx-10 order-2 w-auto"></div>

          {/* User's Pool Share Card - Bottom on mobile, left on desktop */}
          <div className="rounded-bl-lg rounded-br-lg md:rounded-tl-lg md:rounded-tr-none md:rounded-bl-lg md:rounded-br-none p-5 md:p-6 md:col-span-8 order-3 md:order-1 w-full bg-gradient-to-br from-white to-gray-50 relative transition-all duration-300">
            <div className="w-full text-xl font-semibold mb-5 text-center md:text-left bg-[#EBF9F9] py-2 px-4 rounded shadow-sm border-l-4 border-agoric-red/70">
              Your Pool Share
            </div>

            {/* User's Pool Share Info */}
            <div className="mb-6 px-2">
              <table className="w-full">
                <tbody>
                  {/* LP Token amount */}
                  <tr className="border-b border-gray-50/50">
                    <td className="py-2 px-3">
                      <span className="text-gray-700 font-medium">
                        LP Tokens:
                      </span>
                    </td>
                    <td className="text-right py-2 px-3">
                      <span className="text-2xl font-bold text-gray-800">
                        {isPoolShareLoading ? (
                          <Shimmer
                            height="30px"
                            width="100px"
                            className="float-right"
                          />
                        ) : address ? (
                          stringifyValue(
                            fastLPBalance?.value ?? 0n,
                            'nat',
                            6,
                            4,
                          )
                        ) : (
                          '0'
                        )}
                      </span>
                    </td>
                  </tr>

                  {/* Current pool share value in USDC*/}
                  <tr className="border-b border-gray-50/50">
                    <td className="py-2 px-3">
                      <span className="text-gray-700 font-medium">
                        Current Value:
                      </span>
                    </td>
                    <td className="text-right py-2 px-3">
                      <span className="text-gray-700 font-semibold inline-block">
                        {isPoolShareLoading ? (
                          <Shimmer height="21px" width="80px" />
                        ) : (
                          `$${formatNumber(stringifyValue(maxAvailableToWithdraw ?? 0n, 'nat', 6, 4))}`
                        )}
                      </span>
                    </td>
                  </tr>

                  {/* Percentage of total pool share */}
                  <tr>
                    <td className="py-2 px-3">
                      <span className="text-gray-700 font-medium">
                        Percentage:
                      </span>
                    </td>
                    <td className="text-right py-2 px-3">
                      <span className="text-gray-700 font-semibold flex items-center justify-end">
                        {isPoolShareLoading ? (
                          <Shimmer height="22px" width="80px" />
                        ) : address ? (
                          <>
                            <span className="text-agoric-red/90 font-bold mr-1">
                              {poolSharePercent ?? 0}%
                            </span>{' '}
                            of pool
                          </>
                        ) : (
                          'No wallet connected'
                        )}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Combined Deposit and Withdraw Section */}
            <div className="transition-all duration-300">
              {/* Tabs for Deposit and Withdraw with animated indicator */}
              <div className="flex border-b border-gray-100 h-12 relative">
                <button
                  ref={depositTabRef}
                  onClick={() => setActiveTab('deposit')}
                  className={`w-1/2 py-3 px-4 text-center font-medium transition-all duration-200 h-full ${
                    activeTab === 'deposit'
                      ? 'text-agoric-red'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Deposit USDC
                </button>
                <button
                  ref={withdrawTabRef}
                  onClick={() => setActiveTab('withdraw')}
                  className={`w-1/2 py-3 px-4 text-center font-medium transition-all duration-200 h-full ${
                    activeTab === 'withdraw'
                      ? 'text-agoric-red'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Withdraw USDC
                </button>

                {/* Animated tab indicator */}
                <div
                  className="absolute bottom-0 h-0.5 bg-agoric-red/70 transition-all duration-300 ease-in-out"
                  style={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                  }}
                ></div>
              </div>

              {/* Tab Content */}
              <div className="p-4">
                {activeTab === 'deposit' ? (
                  <Deposit shareWorth={shareWorth} />
                ) : (
                  <Withdraw
                    availableToWithdraw={availableToWithdraw}
                    shareWorth={shareWorth}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Vertical divider for desktop view */}
          <div className="hidden md:block absolute top-8 bottom-8 right-1/3 w-[1px] bg-gradient-to-b from-transparent via-gray-300/70 to-transparent opacity-90 z-10"></div>
        </div>

        {/* Glow effect - positioned behind the card with smooth animation */}
        <div
          className="absolute rounded-xl inset-0 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              circle 350px at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(233, 30, 99, 0.35) 0%,
              rgba(233, 30, 99, 0.22) 25%,
              rgba(233, 30, 99, 0.18) 40%,
              rgba(233, 30, 99, 0.14) 55%, 
              rgba(233, 30, 99, 0.10) 70%,
              rgba(233, 30, 99, 0.06) 80%,
              rgba(233, 30, 99, 0.03) 90%,
              transparent 100%
            )`,
            filter: 'blur(8px)',
            transform: 'scale(1.01)',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            opacity: glowOpacity,
            transition: 'opacity 0.4s ease-in-out',
          }}
        />
      </div>

      <Footer />
    </Layout>
  );
};

export default Content;
