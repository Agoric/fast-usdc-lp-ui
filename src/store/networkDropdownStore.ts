import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NetworkDropdownState {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export const useNetworkDropdownStore = create<NetworkDropdownState>()(
  persist(
    set => ({
      isVisible: false,
      setIsVisible: (visible: boolean) => set({ isVisible: visible }),
    }),
    {
      name: 'network-dropdown-storage',
    },
  ),
);

// Add global console function
declare global {
  interface Window {
    showNetworkDropdown: (visible: boolean) => void;
  }
}

// Initialize console function
window.showNetworkDropdown = (visible: boolean) => {
  useNetworkDropdownStore.getState().setIsVisible(visible);
};

// Delayed console message with ASCII art
setTimeout(() => {
  console.log(`
███████╗ █████╗ ███████╗████████╗    ██╗   ██╗███████╗██████╗  ██████╗
██╔════╝██╔══██╗██╔════╝╚══██╔══╝    ██║   ██║██╔════╝██╔══██╗██╔════╝
█████╗  ███████║███████╗   ██║       ██║   ██║███████╗██║  ██║██║     
██╔══╝  ██╔══██║╚════██║   ██║       ██║   ██║╚════██║██║  ██║██║     
██║     ██║  ██║███████║   ██║       ╚██████╔╝███████║██████╔╝╚██████╗
╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝        ╚═════╝ ╚══════╝╚═════╝  ╚═════╝

To show/hide the network dropdown, use:
showNetworkDropdown(true)   - to show
showNetworkDropdown(false)  - to hide
`);
}, 1500); // Wait 1.5 seconds before showing the message
