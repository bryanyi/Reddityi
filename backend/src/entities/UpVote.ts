import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

/*
many to many relation


*/

@ObjectType() // We need to turn classes into a graphql type
@Entity()
export class Post extends BaseEntity {
  @Field()
  @Column()
  userId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.upvotes)
  creatorId: number;

  @Field()
  @Column()
  postId: number;

  @Field()
  // one user can have many posts
  @ManyToOne(() => Post, (post) => post.upvotes)
  post: Post;
}
