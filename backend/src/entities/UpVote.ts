import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class UpVote extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @PrimaryColumn()
  userId: number;

  @Column({ nullable: true })
  user: number;

  @ManyToOne(() => User, (user) => user.upvotes)
  creatorId: number;

  @PrimaryColumn()
  postId: number;

  // one user can have many posts
  @ManyToOne(() => Post, (post) => post.upvotes)
  post: Post;
}
