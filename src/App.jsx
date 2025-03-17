import { useState}  from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAppContext } from "./contexts/appContext";
import NFTCard from "./components/NFTCard";
import useMintToken from "./hooks/useMintToken";
import Tabs from "./components/Tabs";
import MyNFTs from "./components/MyNfts";
import { Icon } from "@iconify/react/dist/iconify.js";

function App() {
    const { nextTokenId, tokenMetaData, mintPrice } = useAppContext();
    const [activeTab, setActiveTab] = useState("marketplace");
    const tokenMetaDataArray = Array.from(tokenMetaData.values());
    const mintToken = useMintToken();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
                <div className="bg-gradient-to-r from-primary/20 to-transparent p-6 sm:p-10 rounded-2xl mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">NFT Marketplace</h1>
                    <p className="text-gray-600 max-w-2xl">
                        Discover unique digital artworks, mint your favorites, and manage your NFT collection in one place.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    
                    {activeTab === "marketplace" ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gradient-to-br from-primary/10 to-transparent p-5 rounded-xl flex items-center gap-4">
                                    <div className="bg-primary/20 p-3 rounded-full">
                                        <Icon icon="ph:lightning-duotone" className="w-7 h-7 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg">Quick Minting</h2>
                                        <p className="text-sm text-gray-600">One-click NFT minting</p>
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-primary/10 to-transparent p-5 rounded-xl flex items-center gap-4">
                                    <div className="bg-primary/20 p-3 rounded-full">
                                        <Icon icon="ph:wallet-duotone" className="w-7 h-7 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg">Portfolio Management</h2>
                                        <p className="text-sm text-gray-600">Manage your NFT collection</p>
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-primary/10 to-transparent p-5 rounded-xl flex items-center gap-4">
                                    <div className="bg-primary/20 p-3 rounded-full">
                                        <Icon icon="ph:arrows-left-right-duotone" className="w-7 h-7 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg">Easy Transfers</h2>
                                        <p className="text-sm text-gray-600">Share NFTs with others</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-primary">Featured NFTs</h2>
                                    <p className="text-gray-500 text-sm">Discover and mint unique digital collectibles</p>
                                </div>
                                <div className="bg-primary/10 text-primary rounded-full px-4 py-2 flex items-center gap-2">
                                    <Icon icon="ph:cube-duotone" className="w-5 h-5" />
                                    <span>{nextTokenId?.toString() || 0}/{tokenMetaDataArray.length} Minted</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {tokenMetaDataArray.map((token, i) => (
                                    <NFTCard
                                        key={token.name.split(" ").join("") + i}
                                        metadata={token}
                                        mintPrice={mintPrice}
                                        tokenId={i}
                                        nextTokenId={nextTokenId}
                                        mintNFT={mintToken}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <MyNFTs />
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;