import { useAgoric } from '@agoric/react-components';
import { stringifyValue } from '@agoric/web-components';
import Deposit from './Deposit';
import InfoCard from './InfoCard';
import Withdraw from './Withdraw';
import { multiplyBy } from '@agoric/zoe/src/contractSupport/ratio';
import {
  usePoolMetricsData,
  usePoolMetricsStore,
} from '../store/poolMetricsStore';

const Content = () => {
  usePoolMetricsData();
  const metrics = usePoolMetricsStore(state => state.metrics);
  const { purses, address } = useAgoric();

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
    !!address && (poolSharePercent === null || maxAvailableToWithdraw === null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-9 gap-7 max-w-[100rem] mx-auto">
      <InfoCard
        data={`$${poolBalanceForDisplay ?? '0'}`}
        label="Total Pool Balance"
        footer="USDC"
        isLoading={isMetricsLoading}
      />
      <InfoCard
        data={`$${stringifyValue(maxAvailableToWithdraw ?? 0n, 'nat', 6, 4)}`}
        label="Your Pool Share"
        footer={
          address ? `${poolSharePercent ?? 0}% of pool` : 'No wallet connected'
        }
        isLoading={isPoolShareLoading}
      />
      <InfoCard
        data={`$${awaitingSettlementForDisplay ?? '0'}`}
        label="Awaiting Settlement"
        footer="USDC"
        isLoading={isMetricsLoading}
      />
      <InfoCard
        data={`$${poolFeesForDisplay ?? '0'}`}
        label="Pool Fees Earned"
        footer="USDC"
        isLoading={isMetricsLoading}
      />
      <Deposit shareWorth={shareWorth} />
      <Withdraw
        availableToWithdraw={availableToWithdraw}
        shareWorth={shareWorth}
      />
    </div>
  );
};

export default Content;
