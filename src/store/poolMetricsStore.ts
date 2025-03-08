import { create } from 'zustand';
import { type makeRatio } from '@agoric/zoe/src/contractSupport/index.js';
import { useEffect } from 'react';
import { AgoricChainStoragePathKind } from '@agoric/rpc';
import { toast, type Id as ToastId } from 'react-toastify';
import { useAgoric } from '@agoric/react-components';

export interface PoolMetrics {
  encumberedBalance: Amount<'nat'>;
  totalBorrows: Amount<'nat'>;
  totalContractFees: Amount<'nat'>;
  totalPoolFees: Amount<'nat'>;
  totalRepays: Amount<'nat'>;
  shareWorth: ReturnType<typeof makeRatio>;
}

interface PoolMetricsState {
  metrics: PoolMetrics | null;
  errorId: ToastId | undefined;
  setMetrics: (metrics: PoolMetrics | null) => void;
  setErrorId: (errorId: ToastId | undefined) => void;
}

export const usePoolMetricsStore = create<PoolMetricsState>(set => ({
  metrics: null,
  errorId: undefined,
  setMetrics: metrics => set({ metrics }),
  setErrorId: errorId => set({ errorId }),
}));

export const usePoolMetricsData = () => {
  const { chainStorageWatcher } = useAgoric();
  const { metrics, errorId, setMetrics, setErrorId } = usePoolMetricsStore();

  useEffect(() => {
    const cancel = chainStorageWatcher?.watchLatest<PoolMetrics>(
      [AgoricChainStoragePathKind.Data, 'published.fastUsdc.poolMetrics'],
      metrics => {
        if (!metrics) {
          if (errorId && toast.isActive(errorId)) return;
          const id = toast.error(
            'Could not read FastUSDC contract, is it deployed on chain?',
            { autoClose: false },
          );
          setErrorId(id);
          return;
        }
        setMetrics(metrics);
      },
    );

    return () => {
      cancel?.();
    };
  }, [chainStorageWatcher, errorId, setMetrics, setErrorId]);

  return metrics;
};
