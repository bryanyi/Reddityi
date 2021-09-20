import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withApollo } from "../utils/withApollo";
import NextLink from "next/link";
import React from "react";
import EditDeletePostButtons from "../components/EditDeletePostButtons";
import { Layout } from "../components/Layout";
import { VoteSection } from "../components/VoteSection";
import { useMeQuery, usePostsQuery } from "../generated/graphql";

const Index = () => {
  const { data: meData } = useMeQuery();
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true, // makes loading true
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Layout>
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p, idx) =>
            !p ? null : (
              <Flex
                key={idx}
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                mt={4}
              >
                <VoteSection post={p} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>posted by {p.creator.username}</Text>
                  <Flex justifyContent="space-between">
                    <Text mt={4} w="xl" color="gray">
                      {p.textSnippet}
                    </Text>
                    {meData?.me?.id === p.creator.id && (
                      <EditDeletePostButtons
                        id={p.id}
                        creatorId={p.creator.id}
                      />
                    )}
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
            isLoading={loading}
            m="auto"
            my={8}
            colorScheme="teal"
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
