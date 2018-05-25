import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, Index } from 'typeorm';
import Playlist from '@server/module/playlist/playlist.model';

export interface TrackInterface {
  id?: number;
  name: string;
  sourceId: string;
  sourceType: string;
  metadata: string;
  playlists?: Playlist[];
}

@Entity()
@Index(['sourceId', 'sourceType'], { unique: true })
export default class Track extends BaseEntity implements TrackInterface {
  static Source = {
    youtube: 'youtube',
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sourceId: string;

  @Column()
  sourceType: string;

  @Column('text')
  metadata: string;

  @ManyToMany(type => Playlist, playlist => playlist.tracks)
  playlists: Playlist[];

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      sourceId: this.sourceId,
      sourceType: this.sourceType,
    };
  }
}
