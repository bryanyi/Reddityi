import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class UpVote extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @PrimaryColumn()
  userId: number;

  @Column()
  user: number;

  @ManyToOne(() => User, (user) => user.up_votes)
  creatorId: number;

  @PrimaryColumn()
  postId: number;

  // one user can have many posts
  @ManyToOne(() => Post, (post) => post.up_votes)
  post: Post;
}
