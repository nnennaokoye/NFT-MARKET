import { Contract } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { getEthersSigner } from "../config/wallet-connection/adapter";
import { getReadOnlyProvider } from "../utils";
import NFT_ABI from "../ABI/nft.json";
import { useAccount, useConfig } from "wagmi";

const appContext = createContext();

export const useAppContext = () => {
    const context = useContext(appContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }

    return context;
};

export const AppProvider = ({ children }) => {
    const [nextTokenId, setNextTokenId] = useState(null);
    const [maxSupply, setMaxSupply] = useState(null);
    const [baseTokenURI, setBaseTokenURI] = useState("");
    const [tokenMetaData, setTokenMetaData] = useState(new Map());
    const [mintPrice, setMintPrice] = useState(null);
    const [ownedTokens, setOwnedTokens] = useState([]);
    const { address } = useAccount();
    const wagmiConfig = useConfig();

    // Fetch contract data
    useEffect(() => {
        const contract = new Contract(
            import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
            NFT_ABI,
            getReadOnlyProvider()
        );
        contract
            .nextTokenId()
            .then((id) => setNextTokenId(id))
            .catch((error) => console.error("error: ", error));

        contract
            .baseTokenURI()
            .then((uri) => setBaseTokenURI(uri))
            .catch((error) => console.error("error: ", error));

        contract
            .maxSupply()
            .then((supply) => setMaxSupply(supply))
            .catch((error) => console.error("error: ", error));

        contract
            .mintPrice()
            .then((price) => {setMintPrice(price)
                console.log("price: ", price);
            })
            .catch((error) => console.error("error: ", error));
    }, []);

    // Fetch token metadata
    useEffect(() => {
        if (!maxSupply || !baseTokenURI) return;
        
        const tokenIds = [];
        for (let i = 0; i < maxSupply; i++) {
            tokenIds.push(i);
        }

        const promises = tokenIds.map((id) => {
            return fetch(`${baseTokenURI}${id}.json`)
                .then((response) => response.json())
                .then((data) => {
                    return data;
                });
        });

        Promise.all(promises)
            .then((responses) => {
                const tokenMetaData = new Map();
                responses.forEach((response, index) => {
                    tokenMetaData.set(index, response);
                });
                setTokenMetaData(tokenMetaData);
            })
            .catch((error) => console.error("error: ", error));
    }, [baseTokenURI, maxSupply]);

    // Fetch owned tokens when the address changes
    useEffect(() => {
        const fetchOwnedTokens = async () => {
            if (!address || !nextTokenId) return;
            
            try {
                const contract = new Contract(
                    import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
                    NFT_ABI,
                    getReadOnlyProvider()
                );
                
                const owned = [];
                
                // Query each token ID to check if owned by current user
                for (let i = 0; i < nextTokenId; i++) {
                    try {
                        const owner = await contract.ownerOf(i);
                        if (owner.toLowerCase() === address.toLowerCase()) {
                            owned.push(i);
                        }
                    } catch (error) {
                        // Skip if token doesn't exist or has been transferred
                        console.log(`Error checking token ${i}:`, error);
                    }
                }
                
                setOwnedTokens(owned);
            } catch (error) {
                console.error("Error fetching owned tokens:", error);
            }
        };
        
        fetchOwnedTokens();

    }, [address, nextTokenId]);

    useEffect(() => {
        const contract = new Contract(
            import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
            NFT_ABI,
            getReadOnlyProvider()
        );

        const handleNextTokenId = (owner, id) => {
            console.log("Minted event", owner, id);
            // setNextTokenId(id.add(1));
            contract
            .nextTokenId()
            .then((id) => setNextTokenId(id))
            .catch((error) => console.error("error: ", error));
        }

        console.log("Listening for Minted event", nextTokenId);
        contract.on("Minted", handleNextTokenId);

        return () => contract.off("Minted", handleNextTokenId);
    }, [nextTokenId]);

    // Function to transfer a token
    const transferToken = async (tokenId, recipientAddress) => {
        if (!address) return alert("Please connect your wallet");
        
        try {
            const signer = await getEthersSigner(wagmiConfig);
            const contract = new Contract(
                import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
                NFT_ABI,
                signer
            );
            
            const tx = await contract.transferFrom(address, recipientAddress, tokenId);
            const receipt = await tx.wait();
            
            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }
            
            // Updated owned tokens after transfer
            setOwnedTokens(prevTokens => prevTokens.filter(id => id !== tokenId));
            
            return true;
        } catch (error) {
            console.error("Transfer error:", error);
            return false;
        }
    };

    return (
        <appContext.Provider
            value={{
                nextTokenId,
                setNextTokenId,
                maxSupply,
                baseTokenURI,
                tokenMetaData,
                mintPrice,
                ownedTokens,
                transferToken
            }}
        >
            {children}
        </appContext.Provider>
    );
};

