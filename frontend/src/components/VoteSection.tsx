import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface VoteSectionProps {
  post: PostSnippetFragment;
  //   post: PostsQuery["posts"]["posts"][0]; // selecting a type that's within a type. ^same as above
}

export const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "upvote-loading" | "downvote-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();

  return (
    <>
      <Flex direction="column" justify="center" align="center" mr={4}>
        <IconButton
          onClick={async () => {
            setLoadingState("upvote-loading");
            await vote({
              postId: post.id,
              value: 1,
            });
            setLoadingState("not-loading");
          }}
          bgColor="teal.200"
          _hover={{ bgColor: "teal.400" }}
          isLoading={loadingState === "upvote-loading"}
          aria-label="vote up"
          icon={<ChevronUpIcon />}
        />
        {post.points}
        <IconButton
          onClick={async () => {
            setLoadingState("downvote-loading");
            await vote({
              postId: post.id,
              value: -11,
            });
            setLoadingState("not-loading");
          }}
          bgColor="teal.200"
          _hover={{ bgColor: "teal.400" }}
          isLoading={loadingState === "downvote-loading"}
          aria-label="vote down"
          icon={<ChevronDownIcon />}
        />
      </Flex>
    </>
  );
};
