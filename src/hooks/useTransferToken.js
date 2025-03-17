import { useCallback } from "react";
import { useAccount, useChainId, useConfig } from "wagmi";
import { Contract } from "ethers";
import NFT_ABI from "../ABI/nft.json";
import { getEthersSigner } from "../config/wallet-connection/adapter";
import { isSupportedNetwork } from "../utils";

const useTransferToken = (tokenId) => {
    const { address } = useAccount();
    const chainId = useChainId();
    const wagmiConfig = useConfig();
    
    return useCallback(async (toAddress) => {
        if (!address) return { success: false, error: "Wallet not connected" };
        if (!isSupportedNetwork(chainId)) return { success: false, error: "Unsupported network" };
        if (!tokenId && tokenId !== 0) return { success: false, error: "Invalid token ID" };
        
        try {
            const signer = await getEthersSigner(wagmiConfig);
            
            const contract = new Contract(
                import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
                NFT_ABI,
                signer
            );
            
            // Check if current user is the owner of the token
            const owner = await contract.ownerOf(tokenId);
            if (owner.toLowerCase() !== address.toLowerCase()) {
                return { success: false, error: "You don't own this token" };
            }
            
            // Check if the recipient address is valid
            if (!toAddress || toAddress.length !== 42 || !toAddress.startsWith("0x")) {
                return { success: false, error: "Invalid recipient address" };
            }
            
            // Transfer the token
            const tx = await contract.transferFrom(address, toAddress, tokenId);
            const receipt = await tx.wait();
            
            if (receipt.status === 0) {
                return { success: false, error: "Transaction failed" };
            }
            
            return { 
                success: true, 
                data: {
                    transactionHash: receipt.hash,
                    blockNumber: receipt.blockNumber,
                    from: address,
                    to: toAddress,
                    tokenId
                }
            };
        } catch (error) {
            console.error("Transfer error:", error);
            return { 
                success: false, 
                error: error?.reason || error?.message || "Transfer failed" 
            };
        }
    }, [address, chainId, tokenId, wagmiConfig]);
};

export default useTransferToken;