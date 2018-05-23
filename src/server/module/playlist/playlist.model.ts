import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Length } from 'class-validator';
import User from '@server/module/user/user.model';
import Track from './track/track.model';

export interface PlaylistInterface {
  id?: number;
  name: string;
  position?: number;
  user?: User;
  tracks: Track[] | Promise<Track[]>;
}

@Entity()
export default class Playlist extends BaseEntity implements PlaylistInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(3, 150)
  @Column()
  name: string;

  @Column('tinyint')
  position: number;

  @ManyToOne(type => User, user => user.playlists)
  user: User;

  @ManyToMany(type => Track, track => track.playlists, { lazy: true })
  @JoinTable({ name: 'playlist_track' })
  tracks: Track[] | Promise<Track[]>;
}
