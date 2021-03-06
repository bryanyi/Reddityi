import React from "react";
import NextLink from "next/link";
import { isServer } from "../utils/isServer";
import { Box, Flex, Link, Button, Heading } from "@chakra-ui/react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(), // not letting this run on the server
  });
  let body = null;

  // data is loading
  if (loading) {
    body = null;
  }
  // user not logged in
  else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr={2}>register</Link>
        </NextLink>
      </>
    );
  }
  // user is logged in
  else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button as={Link} mr={3} colorScheme="linkedin">
            create post
          </Button>
        </NextLink>
        <Box mr={3}>{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg="#4CD4C1"
      p={4}
      align="center"
    >
      <Flex maxW={800} align="center" flex={1} margin="auto">
        <NextLink href="/">
          <Link>
            <Heading>Reddityi</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
