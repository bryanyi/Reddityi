import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UpVote } from "./UpVote";
import { User } from "./User";

@ObjectType() // We need to turn classes into a graphql type
@Entity()
export class Post extends BaseEntity {
  @Field() // Fields exposes the data into the graphql schema. Without it, it won't show up in the graphql schema, but it'll stay in the DB.
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ type: "int", default: 0 })
  points!: number;

  @Field(() => Int, { nullable: true })
  voteStatus: number | null; // 1 or -1 or null

  @Field()
  @Column()
  creatorId: number;

  @Field()
  // one user can have many posts
  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @OneToMany(() => UpVote, (upvote) => upvote.post)
  upvotes: UpVote[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date();
}
