import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Link } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation } from "../generated/graphql";

interface EditDeletePostButtons {
  id: number;
}

const EditDeletePostButtons: React.FC<EditDeletePostButtons> = ({ id }) => {
  const [, deletePost] = useDeletePostMutation();
  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={3}
          icon={<EditIcon />}
          aria-label="Edit Post"
          colorScheme="green"
        />
      </NextLink>
      <IconButton
        icon={<DeleteIcon />}
        aria-label="Delete Post"
        colorScheme="red"
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Box>
  );
};

export default EditDeletePostButtons;
