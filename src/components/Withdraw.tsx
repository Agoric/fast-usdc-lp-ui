import { type makeRatio } from '@agoric/zoe/src/contractSupport/index.js';
import { AmountInput, useAgoric } from '@agoric/react-components';
import { stringifyValue } from '@agoric/web-components';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { divideBy } from '@agoric/zoe/src/contractSupport/ratio';
import { Oval } from 'react-loader-spinner';
import Shimmer from './Shimmer';

type Props = {
  availableToWithdraw: bigint | null;
  shareWorth: ReturnType<typeof makeRatio> | undefined;
  showMaxButton?: boolean;
};

const Withdraw = ({
  availableToWithdraw,
  shareWorth,
  showMaxButton = false,
}: Props) => {
  const [value, setValue] = useState<bigint | null>(null);
  const [inProgress, setInProgress] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const { makeOffer, purses, address } = useAgoric();
  const usdcPurseAmount = purses?.find(
    ({ pursePetname }) => pursePetname === 'USDC',
  )?.currentAmount as Amount<'nat'>;

  const isMaxExceeded =
    !!value && (!availableToWithdraw || value > availableToWithdraw);
  const isDisabled =
    !value ||
    !shareWorth ||
    !usdcPurseAmount ||
    isMaxExceeded ||
    !makeOffer ||
    !availableToWithdraw;

  const isLoading = !!address && availableToWithdraw === null;

  // Check if current value equals max
  const isMaxSelected =
    value !== null &&
    availableToWithdraw !== null &&
    value === availableToWithdraw;

  // Handle focus events on the wrapper
  useEffect(() => {
    const handleFocusIn = () => setIsFocused(true);
    const handleFocusOut = () => setIsFocused(false);

    const container = inputRef.current;
    if (container) {
      container.addEventListener('focusin', handleFocusIn);
      container.addEventListener('focusout', handleFocusOut);
    }

    return () => {
      if (container) {
        container.removeEventListener('focusin', handleFocusIn);
        container.removeEventListener('focusout', handleFocusOut);
      }
    };
  }, []);

  const setMaxAmount = () => {
    if (availableToWithdraw) {
      setValue(availableToWithdraw);
    }
  };

  const executeOffer = () => {
    if (inProgress) return;
    const usdcAmount = harden({ brand: usdcPurseAmount.brand, value });
    const fastLPAmount = divideBy(usdcAmount, shareWorth);
    const proposal = {
      give: {
        PoolShare: fastLPAmount,
      },
      want: {
        USDC: usdcAmount,
      },
    };

    const invitationSpec = {
      source: 'agoricContract',
      instancePath: ['fastUsdc'],
      callPipe: [['makeWithdrawInvitation', []]],
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
    <div
      className={
        showMaxButton
          ? ''
          : 'bg-white rounded-lg shadow col-span-1 md:col-span-2 p-6'
      }
    >
      {!showMaxButton && (
        <div className="text-xl font-semibold mb-4">Withdraw USDC</div>
      )}
      <div>
        {!showMaxButton && (
          <div className="text-gray-500 font-semibold text-sm mb-1">
            Amount to Withdraw
          </div>
        )}
        <div className="mb-2">
          <div
            ref={inputRef}
            className={clsx(
              'flex items-center overflow-hidden border rounded-lg bg-white pr-3 transition-all',
              isFocused
                ? 'border-agoric-red ring-1 ring-agoric-red ring-opacity-50'
                : 'border-gray-300',
            )}
          >
            <div className="flex-grow">
              <AmountInput
                decimalPlaces={6}
                value={value}
                onChange={setValue}
                className="border-0 text-gray-900 py-2 px-3 w-full focus:ring-0 focus:outline-none"
              />
            </div>

            {showMaxButton && (
              <button
                onClick={setMaxAmount}
                className={clsx(
                  'flex-shrink-0 font-medium h-full py-1 px-3 text-xs transition-all',
                  isMaxSelected
                    ? 'bg-agoric-red bg-opacity-20 text-agoric-red font-bold shadow-sm rounded'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700 rounded',
                )}
                style={
                  isMaxSelected
                    ? {
                        boxShadow: '0 0 6px rgba(220, 53, 69, 0.5)',
                      }
                    : {}
                }
              >
                MAX
              </button>
            )}
          </div>
        </div>
        <div
          className={clsx(
            'text-gray-500 text-sm mb-3',
            isMaxExceeded && 'text-red-500',
          )}
        >
          {!address ? (
            <span>No wallet connected</span>
          ) : (
            <>
              <span className="font-medium">Max Withdrawable:</span>{' '}
              {isLoading ? (
                <Shimmer
                  height="18px"
                  width="120px"
                  className="inline-block align-middle ml-1 -mt-[2px]"
                />
              ) : (
                <>{stringifyValue(availableToWithdraw || 0n, 'nat', 6)} USDC</>
              )}
            </>
          )}
        </div>
      </div>
      <button
        onClick={executeOffer}
        disabled={isDisabled}
        className={clsx(
          'w-full flex flex-row items-center justify-center bg-agoric-red p-2 px-3 h-10 rounded-lg text-white hover:bg-opacity-85 active:bg-opacity-70 active:scale-95 transition-all outline-none ring-offset-2 focus:ring-2',
          (isDisabled || inProgress) && 'cursor-not-allowed',
          isDisabled && 'bg-gray-300',
        )}
      >
        {inProgress ? (
          <Oval
            height={20}
            width={20}
            color="white"
            secondaryColor="lightgray"
          />
        ) : (
          'Withdraw'
        )}
      </button>
    </div>
  );
};

export default Withdraw;
