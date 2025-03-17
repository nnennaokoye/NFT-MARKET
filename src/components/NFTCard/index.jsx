import { Icon } from "@iconify/react/dist/iconify.js";
import { formatEther } from "ethers";
import React, { useState } from "react";
import { truncateString } from "../../utils";

const NFTCard = ({ metadata, mintPrice, tokenId, nextTokenId, mintNFT }) => {
    const isOwned = Number(nextTokenId) > tokenId;
    const [isMinting, setIsMinting] = useState(false);
    
    const handleMint = async () => {
        setIsMinting(true);
        try {
            await mintNFT();
        } finally {
            setIsMinting(false);
        }
    };

    return (
        <div className="w-full space-y-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all border border-gray-200 overflow-hidden">
            <div className="relative group">
                <img
                    src={metadata.image}
                    alt={`${metadata.name} image`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {isOwned && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                        Owned
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h1 className="font-bold text-lg text-white">{metadata.name}</h1>
                </div>
            </div>

            <div className="p-4 space-y-4">
                <p className="text-sm text-gray-600">
                    {truncateString(metadata.description, 80)}
                </p>

                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <Icon icon="carbon:tag" className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">Token #{tokenId}</span>
                    </div>
                    
                    <div className="flex gap-2 items-center">
                        <Icon icon="ph:puzzle-piece" className="w-5 h-5 text-primary" />
                        <span className="text-sm">{metadata.attributes.length} Traits</span>
                    </div>
                </div>

                <div className="flex gap-2 items-center py-2 border-t border-gray-100">
                    <Icon icon="ph:currency-eth-duotone" className="w-6 h-6 text-primary" />
                    <span className="font-semibold text-primary">
                    {mintPrice ? `${formatEther(mintPrice)} ETH` : "Price unavailable"}
                   </span>
                    </div>

                <button
                    disabled={isOwned || isMinting}
                    onClick={handleMint}
                    className={`w-full p-3 rounded-md font-medium flex items-center justify-center gap-2 transition-all ${
                        isOwned
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-primary text-white hover:bg-primary/90"
                    }`}
                >
                    {isMinting ? (
                        <>
                            <Icon icon="line-md:loading-twotone-loop" className="w-5 h-5 animate-spin" />
                            <span>Minting...</span>
                        </>
                    ) : isOwned ? (
                        <>
                            <Icon icon="ph:check-circle-duotone" className="w-5 h-5" />
                            <span>Already Owned</span>
                        </>
                    ) : (
                        <>
                            <Icon icon="ph:lightning-duotone" className="w-5 h-5" />
                            <span>Mint NFT</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default NFTCard;