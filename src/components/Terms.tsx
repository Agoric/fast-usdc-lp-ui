import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Layout from './Layout';

const Terms = () => {
  // This markdown content is from the Google Doc
  const termsMarkdown = `# Fast USDC Terms of Use

Last revised: March 7th, 2025 

Effective date: March 7th, 2025

Welcome to Fast USDC!

Fast USDC is built on Agoric Orchestration software. With Fast USDC, wallet holders are able to execute USDC cross-chain transfers in a matter of minutes. Built on the Agoric blockchain, Fast USDC enables bridging across Ethereum Virtual Machine ("EVM") chains (and soon, others) for end-users by connecting one or multiple underwriters ("Liquidity Providers") with USDC holders moving USDC to a destination chain in anticipation of any Cross-Chain Transfer Protocol ("CCTP) finalization.

Agoric Systems Operating Company ("Agoric Systems") develops software that is deployed by a decentralized network of validator nodes that make up the Agoric blockchain. Agoric Systems does not control or protect the funds that you manage through your digital wallet(s), or the smart contracts that enable Liquidity Providers to support Fast USDC transactions; as such, it is imperative that you maintain the security of your wallet(s) and evaluate and make your own determination of characteristics of the underlying blockchain smart contract protocols. Any permissions Fast USDC needs to interact with the supported fund sources will be granted by you through your digital wallet.

## 1. Introduction

These Terms of Use ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Agoric Systems Operating Company, doing business as Agoric Systems ("Agoric Systems", "we", "us", or "our"), concerning your access to and use of Fast USDC, as well as all web-hosted user interfaces, website sub-pages, software, applications, mobile websites, mobile applications, media, content, and channels related, linked, or otherwise connected thereto (collectively, the "Site"); provided that, use of www.agoric.com and wallet.agoric.app may be subject to other terms revised from time to time. You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY. 

IN ADDITION, YOU MAY NOT USE OUR SITE OR SERVICES IF YOU: (A) ARE NOT THE OLDER OF (i) AT LEAST EIGHTEEN (18) YEARS OF AGE; OR (ii) LEGAL AGE TO FORM A BINDING CONTRACT; OR (B) ARE A CITIZEN OR RESIDENT OF, OR LOCATED IN, ANY COUNTRY WHERE THE USE OF THE SITE IS ILLEGAL OR IMPERMISSIBLE OR WHICH WOULD SUBJECT US TO ANY REGISTRATION REQUIREMENT WITHIN SUCH JURISDICTION; OR (C) ARE OTHERWISE PROHIBITED FROM ACCESSING OR USING THIS SITE OR ANY OF THIS SITE'S FUNCTIONALITIES BY THESE TERMS OR BY APPLICABLE LAW.

Supplemental terms and conditions or policies that may be posted on the Site from time to time, including but not limited to our Privacy Policy, are incorporated into these Terms by reference and you hereby agree to be bound by such supplemental terms and conditions or policies. We reserve the right, in our sole discretion, to make changes or modifications to these Terms at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Terms of Use and provide other forms of notice in our reasonable discretion. You agree that your use of the Site will be subject to the most current version of these Terms of Use at the time of such use.

You may contact us by email at legal@agoric.com with any questions you have about these Terms, the Site, or our other services.

## 2. Access to and Use of Fast USDC

To access the Site, you may be asked to provide certain registration details or other information. You agree that all information you provide to interact with the Site is correct, current, and complete. 

The Site requires you to utilize certain Web3 capabilities, such as a crypto-asset wallet capable of interacting with your web browser or relevant blockchain nodes ("Web3 Utilities"). It is a condition of your use of the Site that you only operate such Web3 Utilities with a private key(s) that you created or for the use of which you have the direct, explicit permission of the party who created the relevant private key(s). If you utilize a Web3 Utility that relies on a separate username, password, private key, or any other piece of information as part of its security procedures, you must treat such information as confidential, and take such reasonable measures as to prevent disclosure of that information to any other person or entity. Agoric will never ask for the private keys to your wallet or smart contract.

If you are a Liquidity Provider, you may be required to create an Agoric digital wallet ("Agoric Wallet") to use the Site and access the LP dashboard, which may display a balance of digital assets, allow approval of transactions, and provide other features or functionality ("LP Dashbaord"). However, Agoric has no obligation to provide these or any functionality for the Agoric Wallet or LP Dashboard. 

You are responsible for keeping your Agoric Wallet and other digital wallet credentials secure, for all acts that occur under your Agoric Wallet and other digital wallets, and for the acts of anyone who accesses the Site on your behalf. You must immediately inform Agoric of any suspected unauthorized use of the Site or unauthorized disclosure of account credentials. In the event your Agoric Wallet or other Web3 credentials are compromised, you acknowledge and understand that all of your related crypto-assets may be compromised as well, and waive any and all responsibility of and liability against Agoric related to any losses in any such event. 

## 3. License and Ownership 

You are granted a license to use, but have no ownership interest in, the Site, including the LP Dashboard. You own your private Agoric Wallet key and the assets therein. We may use any feedback you provide about the Site without compensating you.

1. LP Dashboard. Aside from the limited license granted to you in these Terms, you have no right, title or interest in the LP Dashboard, Documentation, or any Updates.
2. Usage Information. Agoric Systems has the right to use all data regarding installation, account creation, and use of the Site, and information related to Site performance, including response times, load averages, usage statistics, and activity logs, (collectively, "Usage Information"). Usage Information is used to monitor and improve the Site and to perform Agoric System's obligations under this Agreement.
3. Marks. The Agoric Systems name, the terms Fast USDC, and all related names, logos, product and service names, designs, and slogans are trademarks of Agoric or its affiliates or licensors. You must not use such marks without the prior written permission of Agoric; provided, however, you are hereby granted a limited, revocable, non-transferrable permission and license to use the term "Agoric" and any related names, logos (excluding the Agoric logo), product and service names, designs, and slogans in any way that does not breach these Terms and your obligations hereunder. All other names, logos, product and service names, designs, and slogans on the Site are the trademarks of their respective owners.

Except as may be provided in these Terms, no right, title, or interest in or to the Site or any content on the Site is transferred to you, and all rights not expressly granted are reserved by Agoric.

## 4. Third-party Websites and Content

The Site may include content and materials provided by third parties ("Third-Party Content"), including (without limitation) materials provided by Agoric contributors, bloggers, blockchain users, other decentralized applications, aggregators, and/or reporting services. The Site may also contain links (or you may be sent via the Site) to other websites ("Third-Party Websites") or we may make services provided by third parties available through the Site as a convenience to our users. We do not investigate, monitor or check Third-Party Websites, Third-Party Content or Third-Party Services for accuracy, appropriateness or completeness, and our inclusion of such does not imply our approval or endorsement thereof. We are not responsible, or liable to you or any third party, for any Third-Party Websites, Third-Party Content or Third-Party Services made available or accessed through the Site. You understand that Third Party Websites and Third-Party Content may be protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.

## 12. Disclaimer of Warranties

THE SITE AND FAST USDC, INCLUDING WITHOUT LIMITATION ANY RELATED PRODUCTS OR SERVICES, ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE'S CONTENT OR ANY THIRD-PARTY CONTENT AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF YOUR ACCESS TO AND USE OF SITE OR OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SITE OR AS A RESULT OF A THIRD PARTY'S INTERACTIONS WITH THE SITE, BLOCKCHAIN NETWORKS, IBC, OR THEIR UNDERLYING BLOCKCHAIN TECHNOLOGIES, INCLUDING ANY LOSS OR THEFT OF, OR INABILITY TO USE, ANY DIGITAL ASSETS. MOREOVER, YOU ACKNOWLEDGE AND AGREE THAT YOUR USE OR INTERACTION WITH BLOCKCHAIN NETWORKS, OR IBC IS AT YOUR OWN RISK AND AGORIC WAIVES ALL LIABILITY OR RESPONSIBILITY, AND MAKES NO WARRANTIES, RELATED TO BLOCKCHAIN NETWORKS, OR IBC, WHETHER OR NOT THESE ARE ACCESSED VIA OUR SITE.

1. No professional advice. The content and information presented on or through the Site is made available solely for informational purposes. and should not be construed as professional advice (including, without limitation, tax, legal, or financial advice). Moreover, in no case should any information be construed as Agoric's offer to buy, sell, or exchange crypto-assets. You recommend you conduct your own diligence and consult a professional advisor before making any decisions relating to our use of the information provided via the Site.
2. No insurance. Your crypto accounts are not checking or savings accounts. We do not provide any kind of insurance to you against any type of loss, including (without limitation) losses due to decrease in value of assets, assets lost due to a cybersecurity failure, or from your or other individuals' errors or malfeasance. In most jurisdictions crypto-assets are not considered legal tender, and most crypto-assets are not backed by any government. Neither your crypto-asset balances nor any of your transactions via the Site are covered by Federal Deposit Insurance Corporation ("FDIC"), Securities Investor Protection Corporation ("SIPC"), or other similar protections.
3. No fiduciary duty. These Terms are not intended to create any fiduciary duties between us and you or any third party. Agoric never takes possession, custody, control, ownership, or management of any crypto-assets or other property transmitted via the Site. To the fullest extent permissible by law, you agree that your use of the Site does not cause us or any other user to owe fiduciary duties or liabilities to your or any third party, and if any such duties or liabilities are afforded by law or by equity, they are hereby irrevocably disclaimed, waived, and eliminated to the fullest extent permissible by law.

## 13. Limitation of Liability

TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL WE, OUR AFFILIATES, OR OUR OR THEIR DIRECTORS, OFFICERS, EMPLOYEES, REPRESENTATIVES, OR AGENTS ("AGORIC PARTIES") BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THIS DISCLAIMER OF LIABILITY EXTENDS TO ANY AND ALL DAMAGES CAUSED BY ANY THIRD PARTY (INCLUDING, WITHOUT LIMITATION, THOSE CAUSED BY FRAUD, DECEIT, OR MANIPULATION) OR ANY FAILURE, EXPLOIT, OR VULNERABILITY OF THE SITE, YOUR WEB3 UTILITIES, OR THE UNDERLYING BLOCKCHAINS OR RELATED BLOCKCHAIN FUNCTIONALITIES. EXCEPT TO THE EXTENT PROHIBITED BY APPLICABLE LAWS, THE AGGREGATE LIABILITY OF AGORIC IN CONNECTION WITH THESE TERMS OF USE AND THE SITE WILL NOT EXCEED THE AMOUNT OF ANY FEES YOU MAY PAY TO THE SITE. 

## 14. Indemnification

You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) use of the Site; (2) breach of these Terms of Use; (3) any breach of your representations and warranties set forth in these Terms of Use; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; (5) any overt harmful act toward any other user of the Site; (6) your use or reliance on of any information obtained from the Site; or (7) any other party's access and use of the Site with your assistance or by using any device or account that your own or control. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.

## 15. Dispute Resolution

You agree that any dispute under these Terms will be resolved under the laws and in the courts of the State of California.

## 16. Miscellaneous

a. Assignment. You may not assign these Terms or any rights or obligations without Agoric's prior written consent. Subject to the foregoing, these Terms will insure to the benefit of and be binding upon the parties and their respective successors and permitted assigns. Any attempted assignment in violation of this Section 16(a) will be null and void.

b. OFAC Regulations. The Site may be subject to sanctions laws and regulations of the United States and other jurisdictions. You represent that you are not named on any U.S. or E.U government denied-party or generally-sanctioned jurisdiction list. You agree that you are not listed as a specially-designated national (SDN) by OFAC. You will not, nor will you permit any other users to, access or use the Site in a U.S.-sanctioned country (including Cuba, Iran, North Korea, Sudan, Syria, or Crimea (region of Ukraine)) or in violation of any U.S. sanctions, export law or regulation. You acknowledge and accept that the site may block your transactions if your wallet is closely associated with that of a sanctioned party or jurisdiction, even if you have not violated the law. 

c. Severability. If any provision of these Terms is held by a court of competent jurisdiction to be contrary to law, the remaining provisions will remain in full force and effect.

d. Waiver. The waiver of a breach of any term hereof will in no way be construed as a waiver of any other term or breach hereof.

e. Entire Agreement. These Terms are the entire understanding of the parties with respect to their subject matter and supersede any previous or contemporaneous communications, whether oral or written. 

f. Headings and Interpretation. Headings and the summary explanations at the beginning of each Section of these Terms are for reference only and do not affect the parties' rights and obligations hereunder. As used herein, "may" means "has the right, but not the obligation, to," and "includes" and its variations means "includes, but is not limited to."

g. Electronic Communications, Transactions, and Signatures. Visiting the Site, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SITE. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means. 

BY CLICKING THE "I AGREE" BUTTON, YOU ARE INDICATING THAT YOU HAVE READ AND CONSENT TO BE BOUND BY THESE TERMS. IF YOU HAVE NOT READ THESE TERMS, OR YOU DO NOT AGREE TO BE LEGALLY BOUND BY THEM, CLICK "I DON'T AGREE" AND DO NOT USE THE SITE.`;

  return (
    <Layout>
      {/* Header */}
      <div className="text-center my-8 relative">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Terms & Conditions
        </h1>
        <div className="top-0 left-1/2 transform mx-auto w-16 h-1 bg-agoric-red/70 rounded-full mt-6 mb-8"></div>
      </div>

      {/* Terms & Conditions Content */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 prose prose-slate prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-700 prose-ul:text-gray-700 prose-li:my-1 prose-strong:font-bold prose-strong:text-gray-800 max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {termsMarkdown}
        </ReactMarkdown>
      </div>
    </Layout>
  );
};

export default Terms;
