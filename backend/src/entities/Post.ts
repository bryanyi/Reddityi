import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType() // We need to turn classes into a graphql type
@Entity()
export class Post extends BaseEntity {
  @Field() // Fields exposes the data into the graphql schema. Without it, it won't show up in the graphql schema, but it'll stay in the DB.
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date();

  @Field()
  @Column()
  title!: string;
}
