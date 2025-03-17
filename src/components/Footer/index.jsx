import { Box, Flex, Text } from "@radix-ui/themes"; 
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Footer = () => {
    return (
        <Flex
            gap="3"
            as="footer"
            width="100%"
            align="center"
            justify="between"
            className="border-t border-gray-200 px-6 py-6 bg-white mt-auto"
        >
            <Box>
                <Text
                    className="text-gray-600 flex items-center gap-2"
                    as="span"
                >
                    <Icon icon="ph:cube-duotone" className="w-5 h-5 text-primary" />
                    <span>&copy; 2025 Cohort XII NFT Marketplace</span>
                </Text>
            </Box>
            
            <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <Icon icon="ph:github-logo-duotone" className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <Icon icon="ph:twitter-logo-duotone" className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <Icon icon="ph:discord-logo-duotone" className="w-5 h-5" />
                </a>
            </div>
        </Flex>
    );
};

export default Footer;