import { makeRatio } from '@agoric/zoe/src/contractSupport/index.js';
import { AmountInput, useAgoric } from '@agoric/react-components';
import { stringifyValue } from '@agoric/web-components';
import { useState } from 'react';
import clsx from 'clsx';
import { divideBy } from '@agoric/zoe/src/contractSupport/ratio';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import Shimmer from './Shimmer';

interface Props {
  shareWorth: ReturnType<typeof makeRatio> | undefined;
}

const Deposit = ({ shareWorth }: Props) => {
  const [value, setValue] = useState<bigint | null>(null);
  const [inProgress, setInProgress] = useState(false);
  const { purses, makeOffer, address } = useAgoric();
  const usdcPurseAmount = purses?.find(
    ({ pursePetname }) => pursePetname === 'USDC',
  )?.currentAmount as Amount<'nat'>;
  const usdcBalance = usdcPurseAmount?.value ?? 0n;

  const isMaxExceeded = !!value && value > usdcBalance;
  const isDisabled =
    !value || !shareWorth || !usdcPurseAmount || isMaxExceeded || !makeOffer;

  // Determine the loading state for the footer
  const isLoading = !!address && !usdcPurseAmount;

  const executeOffer = () => {
    if (inProgress) return;
    const usdcAmount = harden({ brand: usdcPurseAmount.brand, value });
    const fastLPAmount = divideBy(usdcAmount, shareWorth);
    const proposal = {
      give: {
        USDC: usdcAmount,
      },
      want: {
        PoolShare: fastLPAmount,
      },
    };

    const invitationSpec = {
      source: 'agoricContract',
      instancePath: ['fastUsdc'],
      callPipe: [['makeDepositInvitation', []]],
    };

    assert(makeOffer);
    setInProgress(true);
    makeOffer(
      invitationSpec,
      proposal,
      undefined,
      (update: { status: string; data?: unknown }) => {
        if (update.status === 'error') {
          toast.error(`Offer Error: ${update.data}`);
          setInProgress(false);
        }
        if (update.status === 'accepted') {
          toast.success('Offer Accepted');
          setInProgress(false);
        }
        if (update.status === 'refunded') {
          toast.warning('Offer Refunded');
          setInProgress(false);
        }
      },
    );
  };

  return (
    <div className="bg-white rounded-lg shadow col-span-1 md:col-span-2 p-6">
      <div className="text-xl font-semibold">Deposit USDC</div>
      <div className="my-6">
        <div className="text-gray-500 font-semibold text-sm mb-1">
          Amount to Deposit
        </div>
        <AmountInput
          decimalPlaces={6}
          value={value}
          onChange={setValue}
          className="bg-white border border-gray-300 text-gray-900 rounded-lg py-2 px-3 w-full"
        />
        <div
          className={clsx(
            'text-gray-500 text-sm mt-1',
            isMaxExceeded && 'text-red-500',
          )}
        >
          {!address ? (
            <span>No wallet connected</span>
          ) : (
            <>
              <span className="font-medium">Purse Balance:</span>{' '}
              {isLoading ? (
                <Shimmer
                  height="16px"
                  width="120px"
                  className="inline-block align-middle ml-1 -mt-[2px]"
                />
              ) : (
                <>{stringifyValue(usdcBalance, 'nat', 6)} USDC</>
              )}
            </>
          )}
        </div>
      </div>
      <button
        onClick={executeOffer}
        disabled={isDisabled}
        className={clsx(
          'w-full flex flex-row items-center justify-center bg-agoric-red p-2 px-3 h-12 rounded-lg text-white hover:bg-opacity-85 active:bg-opacity-70 active:scale-95 transition-all outline-none ring-offset-2 focus:ring-2',
          (isDisabled || inProgress) && 'cursor-not-allowed',
          isDisabled && 'bg-gray-300',
        )}
      >
        {inProgress ? (
          <Oval
            height={24}
            width={24}
            color="white"
            secondaryColor="lightgray"
          />
        ) : (
          'Deposit'
        )}
      </button>
    </div>
  );
};

export default Deposit;
