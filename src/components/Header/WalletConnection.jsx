import React, { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import WalletModal from "./WalletModal";
import { shortenAddress } from "../../utils";
import { Flex, Popover } from "@radix-ui/themes";
import { Icon } from "@iconify/react/dist/iconify.js";
import { supportedNetworks } from "../../config/wallet-connection/wagmi";

const WalletConnection = () => {
    const account = useAccount();
    const { disconnect } = useDisconnect();
    const [copied, setCopied] = useState(false);

    const copyAddress = () => {
        if (!account.address) return;
        navigator.clipboard.writeText(account.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!account.address) {
        return <WalletModal />;
    }

    return (
        <Popover.Root>
            <Popover.Trigger>
                <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg transition-all">
                    <Flex align="center" gap="2">
                        <Icon icon="ph:wallet-duotone" className="w-5 h-5" />
                        <span className="font-medium">{shortenAddress(account.address)}</span>
                        <Icon icon="ph:caret-down" className="w-4 h-4" />
                    </Flex>
                </button>
            </Popover.Trigger>
            <Popover.Content width="280px" className="!p-0 shadow-lg rounded-xl overflow-hidden border border-gray-200">
                <div className="bg-primary/10 p-4">
                    <div className="font-medium text-sm text-gray-500">Connected Wallet</div>
                    <div className="font-semibold text-primary">{shortenAddress(account.address, 8)}</div>
                </div>
                
                <div className="p-2">
                    <a
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
                        href={`${supportedNetworks[0].blockExplorers.default.url}/address/${account.address}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Icon icon="ph:link-duotone" className="w-5 h-5 text-primary" />
                        <span>View on Explorer</span>
                    </a>
                    
                    <button 
                        onClick={copyAddress}
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
                    >
                        {copied ? (
                            <>
                                <Icon icon="ph:check-circle-duotone" className="w-5 h-5 text-green-500" />
                                <span>Address Copied!</span>
                            </>
                        ) : (
                            <>
                                <Icon icon="ph:copy-duotone" className="w-5 h-5 text-primary" />
                                <span>Copy Address</span>
                            </>
                        )}
                    </button>
                    
                    <button
                        onClick={disconnect}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                        <Icon icon="ph:power-duotone" className="w-5 h-5" />
                        <span>Disconnect</span>
                    </button>
                </div>
            </Popover.Content>
        </Popover.Root>
    );
};

export default WalletConnection;