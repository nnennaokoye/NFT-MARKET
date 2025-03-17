import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { truncateString } from "../../utils";
import TransferModal from "./TransferModal";

const OwnedNFTCard = ({ metadata, tokenId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-full space-y-4 rounded-xl bg-secondary shadow-md border border-gray-200 p-4 transition-all hover:shadow-lg">
            <div className="relative group">
                <img
                    src={metadata.image}
                    alt={`${metadata.name} image`}
                    className="rounded-xl w-full h-64 object-cover transition-all group-hover:opacity-90"
                />
                <div className="absolute top-2 right-2 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                    #{tokenId}
                </div>
            </div>
            
            <h1 className="font-bold text-lg">{metadata.name}</h1>
            
            <p className="text-sm text-gray-600">
                {truncateString(metadata.description, 100)}
            </p>

            <div className="border-t border-gray-100 pt-3">
                <div className="flex gap-2 items-center mb-3">
                    <Icon icon="tabler:list-details" className="w-5 h-5 text-primary" />
                    <span className="text-sm">{metadata.attributes.length} Attributes</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {metadata.attributes.slice(0, 4).map((attr, index) => (
                        <div key={index} className="bg-gray-50 p-2 rounded text-xs">
                            <span className="font-medium">{attr.trait_type}:</span> {attr.value}
                        </div>
                    ))}
                </div>
            </div>

            {/* Transfer Button to open modal */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 w-full p-3 bg-primary/80 rounded-md text-white font-medium hover:bg-primary transition-all"
            >
                <Icon icon="heroicons:arrow-path-rounded-square" className="w-5 h-5" />
                <span>Transfer NFT</span>
            </button>

            {/* Render TransferModal only when needed */}
            {isModalOpen && (
                <TransferModal tokenId={tokenId} metadata={metadata} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

export default OwnedNFTCard;
