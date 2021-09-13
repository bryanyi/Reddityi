import DataLoader from "dataloader";
import { User } from "../entities/User";

/*

the key will be an array of integers, where the integer matches up with
and object that contains the integer as the key, and the username, which is the value

key = [1,6,77,8,34]

matching with:
[
    {id: 1, username: bryan}
    {id: 6, username: bryan2}
]

returns an array
*/

export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds) => {
    const users = await User.findByIds(userIds as number[]); // 1 SQL query

    const userIdToUser: Record<number, User> = {};
    users.forEach((user) => {
      userIdToUser[user.id] = user;
    });

    return userIds.map((userId) => userIdToUser[userId]);
  });
