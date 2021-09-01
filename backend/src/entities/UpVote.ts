import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

/*
many to many relation


*/

@ObjectType() // We need to turn classes into a graphql type
@Entity()
export class UpVote extends BaseEntity {
  @Field()
  @Column({ type: "int" })
  value: number;

  @Field()
  @PrimaryColumn()
  userId: number;

  @Field()
  @Column()
  user: number;

  @Field()
  @ManyToOne(() => User, (user) => user.upvotes)
  creatorId: number;

  @Field()
  @PrimaryColumn()
  postId: number;

  @Field()
  // one user can have many posts
  @ManyToOne(() => Post, (post) => post.upvotes)
  post: Post;
}
