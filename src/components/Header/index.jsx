import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";
import WalletConnection from "./WalletConnection";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header = () => {
    return (
        <Flex
            gap="3"
            as="header"
            width="100%"
            align="center"
            justify="between"
            className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 shadow-sm"
        >
            <Box>
                <Text
                    className="text-primary font-bold text-2xl flex items-center gap-2"
                    as="span"
                    role="img"
                    aria-label="logo"
                >
                    <Icon icon="ph:cube-duotone" className="w-8 h-8" />
                    NFT Marketplace
                </Text>
            </Box>
            <WalletConnection />
        </Flex>
    );
};

export default Header;