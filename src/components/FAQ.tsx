import { useState } from 'react';
import Footer from './Footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Layout from './Layout';
import PageHeading from './PageHeading';

type FAQSection = {
  title: string;
  content: string; // Changed from React.ReactNode to string for markdown
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
      content: `
**Fast USDC** is a product built with Agoric's on-chain Orchestration API. It helps speed up USDC transfers between chains by reducing wait times for users coming from EVM chains.

Instead of waiting for the standard CCTP bridge to finalize, a **Liquidity Provider** can front the USDC to the user right away, knowing the official transfer is on its way. LPs can earn fees from users that are willing to pay to get their funds quickly to the End destination.
      `,
    },
    {
      title: 'Dashboard Overview',
      content: `
**What information can I see on my Dashboard?**

Your Dashboard displays four key metrics:

* Total Pool Balance: The total amount of USDC in the pool
* Your Pool Share: Your share amount and percentage of the total pool
* Awaiting Settlement: Amount of your USDC currently being processed
* Pool Fees Earned: Total earned fees by the entire pool in USDC
      `,
    },
    {
      title: 'Wallet Connection',
      content: `
**How do I connect my wallet?**

Use the wallet button in the top right corner of the interface. Your wallet address will be displayed once connected.

**Why does my balance show as $0.00?**

If all your balances show as $0.00, please verify:

* Your wallet is properly connected
* You're on the correct network
* You have USDC in your wallet
      `,
    },
    {
      title: 'Deposits',
      content: `
**How do I deposit USDC to the pool?**

1. Check your Purse Balance in the Deposit USDC section
2. Enter an amount up to your available purse balance
3. If you don't have any USDC, you may source it from [https://usdc.com](https://www.usdc.com/)
4. Click the "Deposit" button
5. Confirm the transaction in your wallet

**What's the minimum deposit amount?**

You can deposit any amount up to your Purse Balance, but always consider gas fees especially when making smaller deposits.

**What happens if I enter an amount greater than my balance?**

The system will prevent you from depositing more than your available Purse Balance.
      `,
    },
    {
      title: 'Withdrawals',
      content: `
**How do I withdraw my USDC?**

1. Go to the "Withdraw USDC" section
2. Enter the amount you wish to withdraw
3. Verify it's within your maximum withdrawable amount
4. Click the "Withdraw" button to process

**What is "Max Withdrawable"?**

The Max Withdrawable amount shown below the withdrawal input field indicates the maximum USDC you can currently withdraw based on your pool share and available liquidity.

**Why might my max withdrawable amount be different from my pool share?**

Your max withdrawable amount might be lower than your total pool share if:

* There are pending settlements
* There are active bridge transactions being processed
      `,
    },
    {
      title: 'Pool Metrics',
      content: `
**How can I track my position in the pool?**

Your Dashboard currently only shows your percentage share of the total pool. It is your responsibility to track the USDC amounts you have deposited, and you may use the percentage share displayed in your Dashboard to calculate the value of your position.

**Why is my pool share shown as a percentage?**

The percentage helps you understand your proportional ownership of the pool, which determines your share of fees and withdrawal rights.

**How do I start earning fees?**

To start earning fees:

1. Deposit some of your available USDC from the Purse Balance into the pool
2. Maintain your position while the pool facilitates bridging transactions
3. Fees will accumulate based on your pool share percentage
      `,
    },
    {
      title: 'Support',
      content: `
**What should I do if I encounter issues?**

If you experience any issues:

1. Join the Agoric Discord: [https://agoric.com/discord](https://agoric.com/discord)
2. Select the community role in the onboarding page
3. Go to *#get-roles channel* (unlocked for server members) and select the Fast USDC LP role
4. Go to *#fast-usdc-lp-support* channel
      `,
    },
  ];

  return (
    <Layout>
      <PageHeading title="Fast USDC Liquidity Pool - Frequently Asked Questions" />

      <div className="space-y-4">
        {faqSections.map((section, index) => (
          <div
            key={index}
            className="border border-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-200"
          >
            <button
              className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50/70 flex justify-between items-center focus:outline-none"
              onClick={() => toggleSection(index)}
            >
              <h3 className="text-lg font-medium text-gray-800">
                {section.title}
              </h3>
              <span
                className={`${expandedSections.has(index) ? 'text-agoric-red' : 'text-gray-400'} transition-colors duration-300`}
              >
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
                <div className="px-6 py-5 bg-gray-50/30 border-t border-gray-100 prose prose-slate max-w-none prose-headings:text-gray-700 prose-p:leading-relaxed prose-ul:space-y-1 prose-li:text-gray-600">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {section.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </Layout>
  );
};

export default FAQ;
