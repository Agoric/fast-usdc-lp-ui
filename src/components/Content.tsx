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

const Content = () => {
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
    <div className="p-6 md:p-9 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 relative bg-white rounded-lg shadow">
          {/* Pool Details Card - Top on mobile, right on desktop */}
          <div className="rounded-tr-lg rounded-tl-lg md:rounded-tl-none rounded-t-lg md:rounded-tr-lg md:rounded-br-lg p-5 md:p-6 md:col-span-4 order-1 md:order-2">
            <div className="text-xl font-semibold mb-4 text-center md:text-left">
              Pool Details
            </div>

            <div className="space-y-3">
              {/* Total Pool Balance */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-600 font-medium text-sm">
                  Total Pool Balance
                </div>
                <div className="text-lg font-bold">
                  {isMetricsLoading ? (
                    <Shimmer height="28px" width="80px" />
                  ) : (
                    `$${poolBalanceForDisplay ?? '0'}`
                  )}
                </div>
                <div className="text-gray-500 text-xs">USDC</div>
              </div>

              {/* Awaiting Settlement */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-600 font-medium text-sm">
                  Awaiting Settlement
                </div>
                <div className="text-lg font-bold">
                  {isMetricsLoading ? (
                    <Shimmer height="28px" width="80px" />
                  ) : (
                    `$${awaitingSettlementForDisplay ?? '0'}`
                  )}
                </div>
                <div className="text-gray-500 text-xs">USDC</div>
              </div>

              {/* Pool Fees Earned */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-600 font-medium text-sm">
                  Pool Fees Earned
                </div>
                <div className="text-lg font-bold">
                  {isMetricsLoading ? (
                    <Shimmer height="28px" width="80px" />
                  ) : (
                    `$${poolFeesForDisplay ?? '0'}`
                  )}
                </div>
                <div className="text-gray-500 text-xs">USDC</div>
              </div>
            </div>
          </div>

          {/* Horizontal divider for mobile view */}
          <div className="block md:hidden h-px bg-gray-300/50 mx-10 order-2 w-auto"></div>

          {/* User's Pool Share Card - Bottom on mobile, left on desktop */}
          <div className="rounded-bl-lg rounded-br-lg md:rounded-tl-lg md:rounded-tr-none md:rounded-bl-lg md:rounded-br-none p-5 md:p-6 md:col-span-8 order-3 md:order-1 w-full">
            <div className="text-xl font-semibold mb-4 text-center md:text-left">
              Your Pool Share
            </div>

            {/* Pool Share Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">LP Tokens:</span>
                <span className="text-xl font-bold">
                  {isPoolShareLoading ? (
                    <Shimmer height="28px" width="80px" />
                  ) : address ? (
                    stringifyValue(fastLPBalance?.value ?? 0n, 'nat', 6, 4)
                  ) : (
                    '0'
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">
                  Current Value:
                </span>
                <span className="text-gray-700 font-medium">
                  {isPoolShareLoading ? (
                    <Shimmer height="24px" width="60px" />
                  ) : (
                    `$${stringifyValue(maxAvailableToWithdraw ?? 0n, 'nat', 6, 4)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Percentage:</span>
                <span className="text-gray-700 font-medium">
                  {isPoolShareLoading ? (
                    <Shimmer height="24px" width="60px" />
                  ) : address ? (
                    `${poolSharePercent ?? 0}% of pool`
                  ) : (
                    'No wallet connected'
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-5">
              {/* Deposit Section */}
              <div>
                <div className="text-lg font-medium mb-3">Deposit USDC</div>
                <Deposit shareWorth={shareWorth} showMaxButton={true} />
              </div>

              {/* Withdraw Section */}
              <div>
                <div className="text-lg font-medium mb-3">Withdraw USDC</div>
                <Withdraw
                  availableToWithdraw={availableToWithdraw}
                  shareWorth={shareWorth}
                  showMaxButton={true}
                />
              </div>
            </div>
          </div>

          {/* Vertical divider for desktop view */}
          <div className="hidden md:block absolute top-8 bottom-8 right-1/3 w-px bg-gray-300/50 z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Content;
