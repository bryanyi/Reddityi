import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>create post</Link>
      </NextLink>
      <div>Home Page!</div>
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((p) => {
          return <div key={p.id}>{p.title}</div>;
        })
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
