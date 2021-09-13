import DataLoader from "dataloader";
import { UpVote } from "../entities/UpVote";

// [{postId: 5, userId: 10}]
// [{postId: 5, userId: 10, value: 1}]

export const createUpVoteLoader = () =>
  new DataLoader<{ postId: number; userId: number }, UpVote | null>(
    async (keys) => {
      const upvotes = await UpVote.findByIds(keys as any); // 1 SQL query
      const upvoteIdsToUpvote: Record<string, UpVote> = {};
      upvotes.forEach((upvote) => {
        upvoteIdsToUpvote[`${upvote.userId} | ${upvote.postId}`] = upvote;
      });

      return keys.map(
        (key) => upvoteIdsToUpvote[`${key.userId} | ${key.postId}`]
      );
    }
  );
