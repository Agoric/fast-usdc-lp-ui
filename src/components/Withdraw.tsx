import { type makeRatio } from '@agoric/zoe/src/contractSupport/index.js';
import { AmountInput, useAgoric } from '@agoric/react-components';
import { stringifyValue } from '@agoric/web-components';
import { useState } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import {
  floorDivideBy,
  floorMultiplyBy,
} from '@agoric/zoe/src/contractSupport/ratio';
import { Oval } from 'react-loader-spinner';
import { IoIosSwap } from 'react-icons/io';
import Shimmer from './Shimmer';
import { formatNumber } from '../utils/format';
import useToastStore from '../store/toast';

type Props = {
  availableToWithdraw: bigint | null;
  shareWorth: ReturnType<typeof makeRatio> | undefined;
};

const Withdraw = ({ availableToWithdraw, shareWorth }: Props) => {
  const [value, setValue] = useState<bigint | null>(null);
  const [inProgress, setInProgress] = useState(false);
  const [isLpInput, setIsLpInput] = useState(false);
  const { makeOffer, purses, address } = useAgoric();
  const usdcPurseAmount = purses?.find(
    ({ pursePetname }) => pursePetname === 'USDC',
  )?.currentAmount as Amount<'nat'>;
  const { toastId, setToastId } = useToastStore();

  const lpTokenBrand = shareWorth?.denominator.brand;

  const maxLpTokens =
    availableToWithdraw && shareWorth && usdcPurseAmount
      ? floorDivideBy(
          harden({ brand: usdcPurseAmount.brand, value: availableToWithdraw }),
          shareWorth,
        ).value
      : null;

  const isMaxExceeded =
    !!value &&
    (isLpInput
      ? !maxLpTokens || value > maxLpTokens
      : !availableToWithdraw || value > availableToWithdraw);

  const isDisabled =
    !value ||
    !shareWorth ||
    !usdcPurseAmount ||
    isMaxExceeded ||
    !makeOffer ||
    !availableToWithdraw ||
    (isLpInput && !lpTokenBrand);

  const isLoading = !!address && availableToWithdraw === null;

  const isMaxSelected =
    value !== null &&
    ((isLpInput && maxLpTokens && value === maxLpTokens) ||
      (!isLpInput && availableToWithdraw && value === availableToWithdraw));

  const setMaxAmount = () => {
    if (isLpInput && maxLpTokens) {
      setValue(maxLpTokens);
    } else if (availableToWithdraw) {
      setValue(availableToWithdraw);
    }
  };

  const toggleInputType = () => {
    if (!shareWorth || !usdcPurseAmount?.brand || !lpTokenBrand) return;

    if (value) {
      if (isLpInput) {
        // Convert LP to USDC
        const lpAmount = harden({ brand: lpTokenBrand, value });
        const usdcAmount = floorMultiplyBy(lpAmount, shareWorth);
        setValue(usdcAmount.value);
      } else {
        // Convert USDC to LP
        const usdcAmount = harden({ brand: usdcPurseAmount.brand, value });
        const lpAmount = floorDivideBy(usdcAmount, shareWorth);
        setValue(lpAmount.value);
      }
    }
    setIsLpInput(!isLpInput);
  };

  const executeOffer = () => {
    if (inProgress || !usdcPurseAmount?.brand || !shareWorth || !lpTokenBrand)
      return;

    // Calculate amounts based on input type
    const usdcAmount = isLpInput
      ? floorMultiplyBy(harden({ brand: lpTokenBrand, value }), shareWorth)
      : harden({ brand: usdcPurseAmount.brand, value });

    const lpAmount = isLpInput
      ? harden({ brand: lpTokenBrand, value })
      : floorDivideBy(
          harden({ brand: usdcPurseAmount.brand, value }),
          shareWorth,
        );

    const proposal = {
      give: {
        PoolShare: lpAmount,
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
          if (toastId) {
            toast.dismiss(toastId);
          }
          const id = toast.error(`Offer Error: ${update.data}`, {
            autoClose: false,
          });
          setToastId(id);
          setInProgress(false);
        }
        if (update.status === 'accepted') {
          if (toastId) {
            toast.dismiss(toastId);
            setToastId(null);
          }
          toast.success('Offer Accepted');
          setInProgress(false);
        }
        if (update.status === 'refunded') {
          if (toastId) {
            toast.dismiss(toastId);
          }
          const id = toast.warning('Offer Refunded', {
            autoClose: false,
          });
          setToastId(id);
          setInProgress(false);
        }
      },
    );
  };

  return (
    <div>
      <div>
        <div className="mb-1">
          <div
            className={clsx(
              'text-gray-500 text-sm mb-1',
              isMaxExceeded && 'text-red-500',
            )}
          >
            {!address ? (
              <span>No wallet connected</span>
            ) : (
              <>
                <span className="font-medium">
                  {isLpInput ? 'Max Redeemable:' : 'Max Withdrawable:'}
                </span>{' '}
                {isLoading ? (
                  <Shimmer
                    height="14px"
                    width="120px"
                    className="inline-block align-middle ml-1 -mt-[2px]"
                  />
                ) : (
                  <>
                    {formatNumber(
                      stringifyValue(
                        isLpInput
                          ? maxLpTokens || 0n
                          : availableToWithdraw || 0n,
                        'nat',
                        6,
                      ),
                    )}{' '}
                    {isLpInput ? 'LP Tokens' : 'USDC'}
                  </>
                )}
              </>
            )}
          </div>
          <div
            className={clsx(
              'flex items-center overflow-hidden border rounded-lg bg-white pr-3 transition-all border-gray-300',
              'focus-within:border-agoric-red focus-within:ring-1 focus-within:ring-agoric-red focus-within:ring-opacity-50',
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
          </div>
        </div>
      </div>
      <div
        className="mb-4 ml-1 text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
        onClick={toggleInputType}
      >
        <IoIosSwap className="inline-block w-4 h-4 mr-1 -mt-[2px]" />
        {!shareWorth || !lpTokenBrand ? (
          <Shimmer
            height="14px"
            width="80px"
            className="inline-block align-middle ml-1 -mt-[2px]"
          />
        ) : value && usdcPurseAmount?.brand ? (
          formatNumber(
            stringifyValue(
              isLpInput
                ? floorMultiplyBy(
                    harden({ brand: lpTokenBrand, value }),
                    shareWorth,
                  ).value
                : floorDivideBy(
                    harden({ brand: usdcPurseAmount.brand, value }),
                    shareWorth,
                  ).value,
              'nat',
              6,
            ),
          )
        ) : (
          <span>0.00</span>
        )}{' '}
        {isLpInput ? 'USDC' : 'LP Tokens'}
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
