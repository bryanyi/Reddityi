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
            if (post.voteStatus === 1) {
              return;
            }
            setLoadingState("upvote-loading");
            await vote({
              postId: post.id,
              value: 1,
            });
            setLoadingState("not-loading");
          }}
          isLoading={loadingState === "upvote-loading"}
          bgColor={post.voteStatus === 1 ? "green.200" : "gray.200"}
          _hover={{ bgColor: "green.200" }}
          aria-label="vote up"
          icon={<ChevronUpIcon />}
        />
        {post.points}
        <IconButton
          onClick={async () => {
            if (post.voteStatus === -1) {
              return;
            }
            setLoadingState("downvote-loading");
            await vote({
              postId: post.id,
              value: -1,
            });
            setLoadingState("not-loading");
          }}
          isLoading={loadingState === "downvote-loading"}
          bgColor={post.voteStatus === -1 ? "red.200" : "gray.200"}
          _hover={{ bgColor: "red.200" }}
          aria-label="vote down"
          icon={<ChevronDownIcon />}
        />
      </Flex>
    </>
  );
};
