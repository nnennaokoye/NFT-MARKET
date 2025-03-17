import React from "react";
import { useAppContext } from "../../contexts/appContext";
import OwnedNFTCard from "../NFTCard";
import { useAccount } from "wagmi";
import { Icon } from "@iconify/react/dist/iconify.js";

const MyNFTs = () => {
    const { ownedTokens, tokenMetaData } = useAppContext();
    const { address, isConnected } = useAccount();
    
    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-xl min-h-[400px]">
                <Icon icon="ph:wallet-duotone" className="w-16 h-16 text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-600">Connect Your Wallet</h2>
                <p className="text-gray-500 mt-2 text-center max-w-md">
                    Connect your wallet to view your owned NFTs and manage your collection.
                </p>
            </div>
        );
    }
    
    if (ownedTokens.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-xl min-h-[400px]">
                <Icon icon="ph:image-square-duotone" className="w-16 h-16 text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-600">No NFTs Found</h2>
                <p className="text-gray-500 mt-2 text-center max-w-md">
                    You don't own any NFTs from this collection yet. Head over to the marketplace to mint some!
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-primary">My NFT Collection</h2>
                    <p className="text-gray-500 text-sm">Manage and transfer your owned NFTs</p>
                </div>
                <div className="bg-primary/10 text-primary rounded-full px-4 py-2 flex items-center gap-2">
                    <Icon icon="ph:stack-duotone" className="w-5 h-5" />
                    <span className="font-medium">{ownedTokens.length} NFTs</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {ownedTokens.map((tokenId) => (
                    <OwnedNFTCard
                        key={tokenId}
                        metadata={tokenMetaData.get(tokenId)}
                        tokenId={tokenId}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyNFTs;