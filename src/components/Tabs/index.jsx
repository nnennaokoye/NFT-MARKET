import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Tabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        {
            id: "marketplace",
            label: "Marketplace",
            icon: "ph:storefront-duotone"
        },
        {
            id: "my-nfts",
            label: "My NFTs",
            icon: "ph:wallet-duotone"
        }
    ];

    return (
        <div className="flex border-b border-gray-200 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-all ${
                        activeTab === tab.id
                            ? "border-b-2 border-primary text-primary"
                            : "text-gray-500 hover:text-primary"
                    }`}
                >
                    <Icon icon={tab.icon} className="w-5 h-5" />
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default Tabs;