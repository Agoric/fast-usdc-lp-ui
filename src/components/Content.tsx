import { type makeRatio } from '@agoric/zoe/src/contractSupport/index.js';
import { useAgoric } from '@agoric/react-components';
import { stringifyValue } from '@agoric/web-components';
import { AgoricChainStoragePathKind } from '@agoric/rpc';
import Deposit from './Deposit';
import InfoCard from './InfoCard';
import Withdraw from './Withdraw';
import { useEffect, useState } from 'react';
import { multiplyBy } from '@agoric/zoe/src/contractSupport/ratio';
import { toast, type Id as ToastId } from 'react-toastify';

interface PoolMetrics {
  encumberedBalance: Amount<'nat'>;
  totalBorrows: Amount<'nat'>;
  totalContractFees: Amount<'nat'>;
  totalPoolFees: Amount<'nat'>;
  totalRepays: Amount<'nat'>;
  shareWorth: ReturnType<typeof makeRatio>;
}

const usePoolMetrics = () => {
  const [metrics, setMetrics] = useState<PoolMetrics | null>(null);
  const { chainStorageWatcher } = useAgoric();
  const [errorId, setErrorId] = useState<ToastId | undefined>(undefined);

  useEffect(() => {
    const cancel = chainStorageWatcher?.watchLatest<PoolMetrics>(
      [AgoricChainStoragePathKind.Data, 'published.fastUsdc.poolMetrics'],
      metrics => {
        if (!metrics) {
          if (errorId && toast.isActive(errorId)) return;
          const id = toast.error(
            'Could not read FastUSDC contract, is it deployed on chain?',
            { autoClose: false }
          );
          setErrorId(id);
          return;
        }
        setMetrics(metrics);
      }
    );

    return () => {
      cancel?.();
    };
  }, [chainStorageWatcher, errorId]);

  return metrics;
};

const Content = () => {
  const { purses } = useAgoric();
  const metrics = usePoolMetrics();
  const poolBalanceForDisplay = metrics
    ? stringifyValue(metrics.shareWorth.numerator.value, 'nat', 6)
    : '0.00';

  const awaitingSettlementForDisplay = metrics
    ? stringifyValue(metrics.encumberedBalance.value, 'nat', 6)
    : '0.00';

  const poolFeesForDisplay = metrics
    ? stringifyValue(metrics.totalPoolFees.value, 'nat', 6)
    : '0.00';

  const fastLPBalance = purses?.find(
    ({ pursePetname }) => pursePetname === 'FastLP'
  )?.currentAmount as Amount<'nat'>;

  const shareWorth = metrics?.shareWorth;

  const availableToWithdraw =
    fastLPBalance && shareWorth
      ? multiplyBy(fastLPBalance, shareWorth).value
      : 0n;

  const poolShareBPS =
    shareWorth && fastLPBalance
      ? (fastLPBalance.value * 10_000n) / shareWorth.denominator.value
      : 0n;

  const poolSharePercent = (Number(poolShareBPS) / 100).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-9 gap-7 max-w-[100rem] mx-auto">
      <InfoCard
        data={`$${poolBalanceForDisplay}`}
        label="Total Pool Balance"
        footer="USDC"
      />
      <InfoCard
        data={`$${stringifyValue(availableToWithdraw, 'nat', 6)}`}
        label="Your Pool Share"
        footer={`${poolSharePercent}% of pool`}
      />
      <InfoCard
        data={`$${awaitingSettlementForDisplay}`}
        label="Awaiting Settlement"
        footer="USDC"
      />
      <InfoCard
        data={`$${poolFeesForDisplay}`}
        label="Pool Fees Earned"
        footer="USDC"
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
