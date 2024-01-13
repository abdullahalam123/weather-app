"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/navigation";
const NotFound = () => {
  const router = useRouter();

  return (
    <Flex minHeight="100vh" justify="center" align="center">
      <Flex gap="5" direction="column">
        <Text fontSize="106px" fontWeight="bold">
          404
        </Text>
        <Text fontWeight="semibold">Oops. Nothing to be seen here.</Text>
        <Button colorScheme="gray" onClick={() => router.push("/")}>
          Go back
        </Button>
      </Flex>
    </Flex>
  );
};

export default NotFound;
