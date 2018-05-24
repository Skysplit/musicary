import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { hashPassword } from '@server/utils/password';
import Playlist from '@server/module/playlist/playlist.model';

export interface UserInterface {
  id: number;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Entity()
@Index(['email'], { unique: true })
export default class User extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @Column()
  email: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(type => Playlist, playlist => playlist.user)
  playlists: Playlist[];

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  hashPassword() {
    this.password = hashPassword(this.password);
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt),
    };
  }
}
