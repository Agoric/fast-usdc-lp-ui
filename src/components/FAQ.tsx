import { useState } from 'react';

type FAQSection = {
  title: string;
  content: React.ReactNode;
};

const FAQ = () => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set(),
  );

  const toggleSection = (index: number) => {
    setExpandedSections(prevExpanded => {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(index)) {
        newExpanded.delete(index);
      } else {
        newExpanded.add(index);
      }
      return newExpanded;
    });
  };

  const faqSections: FAQSection[] = [
    {
      title: 'What does Fast USDC do?',
      content: (
        <p>
          <b>Fast USDC</b> is a product built with Agoric's on-chain
          Orchestration API. It helps speed up USDC transfers between chains by
          reducing wait times for users coming from EVM chains.
          <br />
          <br />
          Instead of waiting for the standard CCTP bridge to finalize, a{' '}
          <b>Liquidity Provider</b> can front the USDC to the user right away,
          knowing the official transfer is on its way. LPs can earn fees from
          users that are willing to pay to get their funds quickly to the End
          destination.
        </p>
      ),
    },
    {
      title: 'Dashboard Overview',
      content: (
        <div>
          <p>
            <strong>What information can I see on my Dashboard?</strong>
          </p>
          <p>Your Dashboard displays four key metrics:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Total Pool Balance: The total amount of USDC in the pool</li>
            <li>
              Your Pool Share: Your share amount and percentage of the total
              pool
            </li>
            <li>
              Awaiting Settlement: Amount of your USDC currently being processed
            </li>
            <li>
              Pool Fees Earned: Total earned fees by the entire pool in USDC
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Wallet Connection',
      content: (
        <div>
          <p>
            <strong>How do I connect my wallet?</strong>
          </p>
          <p>
            Use the wallet button in the top right corner of the interface. Your
            wallet address will be displayed once connected.
          </p>

          <p className="mt-4">
            <strong>Why does my balance show as $0.00?</strong>
          </p>
          <p>If all your balances show as $0.00, please verify:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Your wallet is properly connected</li>
            <li>You're on the correct network</li>
            <li>You have USDC in your wallet</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Deposits',
      content: (
        <div>
          <p>
            <strong>How do I deposit USDC to the pool?</strong>
          </p>
          <ol className="list-decimal pl-6 mt-2">
            <li>Check your Purse Balance in the Deposit USDC section</li>
            <li>Enter an amount up to your available purse balance</li>
            <li>
              If you don't have any USDC, you may source it from{' '}
              <a
                href="https://www.usdc.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 underline"
              >
                https://usdc.com
              </a>
            </li>
            <li>Click the "Deposit" button</li>
            <li>Confirm the transaction in your wallet</li>
          </ol>

          <p className="mt-4">
            <strong>What's the minimum deposit amount?</strong>
          </p>
          <p>
            You can deposit any amount up to your Purse Balance, but always
            consider gas fees especially when making smaller deposits.
          </p>

          <p className="mt-4">
            <strong>
              What happens if I enter an amount greater than my balance?
            </strong>
          </p>
          <p>
            The system will prevent you from depositing more than your available
            Purse Balance.
          </p>
        </div>
      ),
    },
    {
      title: 'Withdrawals',
      content: (
        <div>
          <p>
            <strong>How do I withdraw my USDC?</strong>
          </p>
          <ol className="list-decimal pl-6 mt-2">
            <li>Go to the "Withdraw USDC" section</li>
            <li>Enter the amount you wish to withdraw</li>
            <li>Verify it's within your maximum withdrawable amount</li>
            <li>Click the "Withdraw" button to process</li>
          </ol>

          <p className="mt-4">
            <strong>What is "Max Withdrawable"?</strong>
          </p>
          <p>
            The Max Withdrawable amount shown below the withdrawal input field
            indicates the maximum USDC you can currently withdraw based on your
            pool share and available liquidity.
          </p>

          <p className="mt-4">
            <strong>
              Why might my max withdrawable amount be different from my pool
              share?
            </strong>
          </p>
          <p>
            Your max withdrawable amount might be lower than your total pool
            share if:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>There are pending settlements</li>
            <li>There are active bridge transactions being processed</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Pool Metrics',
      content: (
        <div>
          <p>
            <strong>How can I track my position in the pool?</strong>
          </p>
          <p>
            Your Dashboard currently only shows your percentage share of the
            total pool. It is your responsibility to track the USDC amounts you
            have deposited, and you may use the percentage share displayed in
            your Dashboard to calculate the value of your position.
          </p>

          <p className="mt-4">
            <strong>Why is my pool share shown as a percentage?</strong>
          </p>
          <p>
            The percentage helps you understand your proportional ownership of
            the pool, which determines your share of fees and withdrawal rights.
          </p>

          <p className="mt-4">
            <strong>How do I start earning fees?</strong>
          </p>
          <p>To start earning fees:</p>
          <ol className="list-decimal pl-6 mt-2">
            <li>
              Deposit some of your available USDC from the Purse Balance into
              the pool
            </li>
            <li>
              Maintain your position while the pool facilitates bridging
              transactions
            </li>
            <li>Fees will accumulate based on your pool share percentage</li>
          </ol>
        </div>
      ),
    },
    {
      title: 'Support',
      content: (
        <div>
          <p>
            <strong>What should I do if I encounter issues?</strong>
          </p>
          <p>If you experience any issues:</p>
          <ol className="list-decimal pl-6 mt-2">
            <li>
              Join the Agoric Discord:{' '}
              <a
                href="https://agoric.com/discord"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 underline"
              >
                https://agoric.com/discord
              </a>
            </li>
            <li>Select the community role in the onboarding page</li>
            <li>
              Go to <i>#get-roles channel</i> (unlocked for server members) and
              select the Fast USDC LP role
            </li>
            <li>
              Go to <i>#fast-usdc-lp-support</i> channel
            </li>
          </ol>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Fast USDC Liquidity Pool - Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqSections.map((section, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center focus:outline-none"
              onClick={() => toggleSection(index)}
            >
              <h3 className="text-lg font-medium text-gray-800">
                {section.title}
              </h3>
              <span className="text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform duration-300 ${
                    expandedSections.has(index) ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                expandedSections.has(index)
                  ? 'grid-rows-[1fr]'
                  : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  {section.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
