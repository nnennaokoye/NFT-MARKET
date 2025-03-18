import { useState } from "react";
import { useAppContext } from "../../contexts/appContext";
import { Icon } from "@iconify/react/dist/iconify.js";



const TransferModal = ({ tokenId, metadata, onClose }) => {
    const [recipientAddress, setRecipientAddress] = useState("");
    const [isTransferring, setIsTransferring] = useState(false);
    const [transferError, setTransferError] = useState("");
    const { transferToken } = useAppContext();

    const handleTransfer = async () => {
        if (!recipientAddress) {
            setTransferError("Please enter a recipient address");
            return;
        }

        setIsTransferring(true);
        setTransferError("");

        try {
            const success = await transferToken(tokenId, recipientAddress);
            
            if (success) {
                alert(`Successfully transferred token #${tokenId}`);
                setRecipientAddress("");
                onClose();
            } else {
                setTransferError("Transfer failed. Please try again.");
            }
        } catch (error) {
            setTransferError(error.message || "Transfer failed. Please try again.");
        } finally {
            setIsTransferring(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-primary">Transfer NFT</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <Icon icon="ph:x-bold" className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-4 items-center">
                        <img 
                            src={metadata?.image} 
                            alt={metadata?.name} 
                            className="w-16 h-16 rounded-md object-cover" 
                        />
                        <div>
                            <h3 className="font-bold">{metadata?.name}</h3>
                            <p className="text-sm text-gray-500">Token ID: #{tokenId}</p>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block font-medium">Recipient Address</label>
                        <input
                            type="text"
                            placeholder="0x..." 
                            value={recipientAddress}
                            onChange={(e) => setRecipientAddress(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {transferError && <p className="text-red-500 text-sm">{transferError}</p>}
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all">
                            Cancel
                        </button>
                        <button 
                            onClick={handleTransfer}
                            disabled={isTransferring}
                            className={`px-4 py-2 rounded-md text-white ${
                                isTransferring ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/90"
                            }`}
                        >
                            {isTransferring ? (
                                <div className="flex items-center gap-2">
                                    <Icon icon="line-md:loading-twotone-loop" className="w-5 h-5 animate-spin" />
                                    <span>Transferring...</span>
                                </div>
                            ) : (
                                "Transfer NFT"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransferModal;
