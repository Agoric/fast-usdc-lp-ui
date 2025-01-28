import { AgoricProvider } from '@agoric/react-components';
import { wallets } from 'cosmos-kit';
import Header from './components/Header';
import { ThemeProvider, useTheme } from '@interchain-ui/react';
import { useEffect, useState } from 'react';
import Content from './components/Content';
import { toast, type Id as ToastId } from 'react-toastify';
import '@agoric/react-components/dist/style.css';

const localnet = {
  testChain: {
    chainId: 'agoriclocal',
    chainName: 'agoric-local',
  },
  apis: {
    rest: ['http://localhost:1317'],
    rpc: ['http://localhost:26657'],
  },
};

const devnet = {
  testChain: {
    chainId: 'agoricdev-23',
    chainName: 'agoric-devnet',
  },
  apis: {
    rest: ['https://devnet.api.agoric.net:443'],
    rpc: ['https://devnet.rpc.agoric.net:443'],
  },
};

// Omit "testChain" to specify the apis for Agoric Mainnet.
const mainnet = {
  apis: {
    rest: ['https://main.api.agoric.net'],
    rpc: ['https://main.rpc.agoric.net'],
  },
};

function App() {
  const { themeClass } = useTheme();
  const [errorId, setErrorId] = useState<ToastId | undefined>(undefined);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    if (!error || (errorId && toast.isActive(errorId))) return;
    const id = toast.error(`Error connecting to chain: ${error}`, {
      autoClose: false,
    });
    setErrorId(id);
  }, [error, errorId]);

  const onError = (e: unknown) => {
    setError(e);
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className={themeClass}>
        <AgoricProvider
          wallets={wallets.extension}
          agoricNetworkConfigs={[localnet, devnet, mainnet]}
          onConnectionError={onError}
          modalTheme={{ defaultTheme: 'light' }}
        >
          <Header />
          <Content />
        </AgoricProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
