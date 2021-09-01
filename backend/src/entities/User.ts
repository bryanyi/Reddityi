import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { UpVote } from "./UpVote";

@ObjectType() // We need to turn classes into a graphql type
@Entity()
export class User extends BaseEntity {
  @Field(() => Int) // Fields exposes the data into the graphql schema. Without it, it won't show up in the graphql schema, but it'll stay in the DB.
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  password!: string;

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany(() => UpVote, (upvote) => upvote.user)
  upvotes: UpVote[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date;
}
