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
import { useState } from 'react';
import Layout from './Layout';

const Content = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

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

  const poolSharePercent = poolShareBPS
    ? (Number(poolShareBPS) / 100).toFixed(2)
    : null;

  const isMetricsLoading = metrics === null;

  const isPoolShareLoading =
    !!address &&
    isSmartWalletProvisioned !== false &&
    (poolSharePercent === null || maxAvailableToWithdraw === null);

  return (
    <Layout>
      {/* Page header */}
      <div className="text-center mb-9 relative">
        <div className="relative py-4 px-4 mb-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2 mb-3">
            Fast USDC Liquidity Pool
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
            Provide liquidity to enable instant USDC transfers across chains,
            earning fees while supporting the ecosystem.
          </p>
        </div>
        <div className="top-0 left-1/2 transform mx-auto w-16 h-1 bg-agoric-red/70 rounded-full mb-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
        {/* Pool Details Card - Top on mobile, right on desktop */}
        <div className="rounded-tr-lg rounded-tl-lg md:rounded-tl-none rounded-t-lg md:rounded-tr-lg md:rounded-br-lg p-5 md:p-6 md:col-span-4 order-1 md:order-2 bg-gradient-to-br from-white to-gray-50/70 relative transition-all duration-300">
          <div className="w-full text-xl font-semibold mb-5 text-center md:text-left bg-[#EBF9F9] py-2 px-4 rounded shadow-sm border-l-4 border-agoric-red/70">
            Pool Details
          </div>

          <div className="space-y-4">
            {/* Total Pool Balance */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 transition-all duration-300 hover:border-agoric-red/30 group">
              <div className="text-gray-600 font-medium text-sm flex items-center">
                Total Pool Balance
              </div>
              <div className="text-xl font-bold text-gray-800 mt-1 transition-all duration-300 group-hover:translate-x-1">
                {isMetricsLoading ? (
                  <Shimmer height="28px" width="100px" />
                ) : (
                  `$${poolBalanceForDisplay ?? '0'}`
                )}
              </div>
              <div className="text-gray-500 text-xs mt-1">USDC</div>
            </div>

            {/* Awaiting Settlement */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 transition-all duration-300 hover:border-agoric-red/30 group">
              <div className="text-gray-600 font-medium text-sm flex items-center">
                Awaiting Settlement
              </div>
              <div className="text-xl font-bold text-gray-800 mt-1 transition-all duration-300 group-hover:translate-x-1">
                {isMetricsLoading ? (
                  <Shimmer height="28px" width="100px" />
                ) : (
                  `$${awaitingSettlementForDisplay ?? '0'}`
                )}
              </div>
              <div className="text-gray-500 text-xs mt-1">USDC</div>
            </div>

            {/* Pool Fees Earned */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 transition-all duration-300 hover:border-agoric-red/30 group">
              <div className="text-gray-600 font-medium text-sm flex items-center">
                Pool Fees Earned
              </div>
              <div className="text-xl font-bold text-gray-800 mt-1 transition-all duration-300 group-hover:translate-x-1">
                {isMetricsLoading ? (
                  <Shimmer height="28px" width="100px" />
                ) : (
                  `$${poolFeesForDisplay ?? '0'}`
                )}
              </div>
              <div className="text-gray-500 text-xs mt-1">USDC</div>
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
          <div className="mb-6 p-3 bg-white rounded-lg shadow-sm border border-gray-100 group">
            <table className="w-full">
              <tbody>
                {/* LP Token amount */}
                <tr>
                  <td className="py-1">
                    <span className="text-gray-600 font-medium">
                      LP Tokens:
                    </span>
                  </td>
                  <td className="text-right py-1">
                    <span className="text-2xl font-bold text-gray-800 transition-all duration-300">
                      {isPoolShareLoading ? (
                        <Shimmer
                          height="30px"
                          width="100px"
                          className="float-right"
                        />
                      ) : address ? (
                        stringifyValue(fastLPBalance?.value ?? 0n, 'nat', 6, 4)
                      ) : (
                        '0'
                      )}
                    </span>
                  </td>
                </tr>

                {/* Current pool share value in USDC*/}
                <tr>
                  <td className="py-1">
                    <span className="text-gray-600 font-medium">
                      Current Value:
                    </span>
                  </td>
                  <td className="text-right py-1">
                    <span className="text-gray-700 font-semibold transition-all duration-300 inline-block">
                      {isPoolShareLoading ? (
                        <Shimmer height="21px" width="80px" />
                      ) : (
                        `$${stringifyValue(maxAvailableToWithdraw ?? 0n, 'nat', 6, 4)}`
                      )}
                    </span>
                  </td>
                </tr>

                {/* Percentage of total pool share */}
                <tr>
                  <td className="py-1">
                    <span className="text-gray-600 font-medium">
                      Percentage:
                    </span>
                  </td>
                  <td className="text-right py-1">
                    <span className="text-gray-700 font-semibold flex items-center justify-end transition-all duration-300">
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
          {/* Combined Deposit and Withdraw Section in a single card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300">
            {/* Tabs for Deposit and Withdraw with fixed height to prevent layout shift */}
            <div className="flex border-b border-gray-200 h-14">
              <button
                onClick={() => setActiveTab('deposit')}
                className={`w-1/2 py-3 px-4 text-center font-semibold transition-all duration-200 h-full ${
                  activeTab === 'deposit'
                    ? 'text-gray-800 border-b-2 border-agoric-red/70 bg-gray-50/50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50/30'
                }`}
              >
                Deposit USDC
              </button>
              <button
                onClick={() => setActiveTab('withdraw')}
                className={`w-1/2 py-3 px-4 text-center font-semibold transition-all duration-200 h-full ${
                  activeTab === 'withdraw'
                    ? 'text-gray-800 border-b-2 border-agoric-red/70 bg-gray-50/50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50/30'
                }`}
              >
                Withdraw USDC
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-5">
              {activeTab === 'deposit' ? (
                <Deposit shareWorth={shareWorth} showMaxButton={true} />
              ) : (
                <Withdraw
                  availableToWithdraw={availableToWithdraw}
                  shareWorth={shareWorth}
                  showMaxButton={true}
                />
              )}
            </div>
          </div>
        </div>
        {/* Vertical divider for desktop view */}
        <div className="hidden md:block absolute top-8 bottom-8 right-1/3 w-[1px] bg-gradient-to-b from-transparent via-gray-300/70 to-transparent opacity-90 z-10"></div>
      </div>

      <Footer />
    </Layout>
  );
};

export default Content;
