import { Icon } from "@iconify/react/dist/iconify.js";
import { Dialog, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import { useConnectors } from "wagmi";

const WalletModal = () => {
    const connectors = useConnectors();
    const [pendingConnectorUID, setPendingConnectorUID] = useState(null);

    const walletConnectConnector = connectors.find(
        (connector) => connector.id === "walletConnect"
    );

    const otherConnectors = connectors.filter(
        (connector) => connector.id !== "walletConnect"
    );

    const connectWallet = async (connector) => {
        try {
            setPendingConnectorUID(connector.id);
            await connector.connect();
        } catch (error) {
            console.error(error);
        } finally {
            setPendingConnectorUID(null);
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg transition-all flex items-center gap-2">
                    <Icon icon="ph:wallet-duotone" className="w-5 h-5" />
                    <span className="font-medium">Connect Wallet</span>
                </button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title className="text-primary text-xl font-bold mb-1">
                    Connect Your Wallet
                </Dialog.Title>
                <Dialog.Description className="text-gray-500 mb-6">
                    Choose a wallet to connect and start exploring NFTs
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    {walletConnectConnector && (
                        <button
                            onClick={() => connectWallet(walletConnectConnector)}
                            disabled={pendingConnectorUID === walletConnectConnector.uid}
                            className="w-full flex justify-between items-center p-4 border border-gray-200 hover:border-primary/50 bg-white hover:bg-primary/5 rounded-lg transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://logosarchive.com/wp-content/uploads/2022/02/WalletConnect-icon.svg"
                                    className="w-8 h-8"
                                    alt="WalletConnect"
                                />
                                <span className="font-medium">WalletConnect</span>
                            </div>

                            {pendingConnectorUID === walletConnectConnector.uid ? (
                                <Icon icon="line-md:loading-twotone-loop" className="w-5 h-5 animate-spin text-primary" />
                            ) : (
                                <Icon icon="ph:arrow-right" className="w-5 h-5 text-primary" />
                            )}
                        </button>
                    )}
                    
                    <div className="flex flex-col gap-3">
                        {otherConnectors.map((connector) => (
                            <button
                                key={connector.id}
                                onClick={() => connectWallet(connector)}
                                disabled={pendingConnectorUID === connector.uid}
                                className="w-full flex justify-between items-center p-4 border border-gray-200 hover:border-primary/50 bg-white hover:bg-primary/5 rounded-lg transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <img src={connector.icon} className="w-8 h-8" alt={connector.name} />
                                    <span className="font-medium">{connector.name}</span>
                                </div>

                                {pendingConnectorUID === connector.uid ? (
                                    <Icon icon="line-md:loading-twotone-loop" className="w-5 h-5 animate-spin text-primary" />
                                ) : (
                                    <Icon icon="ph:arrow-right" className="w-5 h-5 text-primary" />
                                )}
                            </button>
                        ))}
                    </div>
                </Flex>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>New to Ethereum wallets?</p>
                    <a 
                        href="https://ethereum.org/en/wallets/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-primary hover:underline"
                    >
                        Learn more about wallets
                    </a>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default WalletModal;