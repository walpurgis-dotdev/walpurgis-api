import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { DayOfWeek, DEFAULT_TIMEZONE, DEFAULT_WEEK_START } from '../../common';
import { ContentLanguage } from '../../types';

@Entity()
export class User {
  @PrimaryColumn({ length: 36 })
  id: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  @Index('IDX_user_email')
  email: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  cover?: string;

  @Column({ type: 'text', nullable: true })
  company?: string;

  @Column({ type: 'text', nullable: true })
  title?: string;

  @Column({ default: 10 })
  reputation: number;

  @Column({ length: 39, nullable: true })
  @Index('users_username_unique', { unique: true })
  username?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ length: 39, nullable: true })
  @Index('users_github_unique', { unique: true })
  github?: string;

  @Column({ length: 39, nullable: true })
  @Index('users_threads_unique', { unique: true })
  threads?: string;

  @Column({ length: 39, nullable: true })
  @Index('users_youtube_unique', { unique: true })
  youtube?: string;

  @Column({ type: 'text', nullable: true, default: DEFAULT_TIMEZONE })
  timezone?: string;

  @Column({ type: 'int', nullable: true, default: DEFAULT_WEEK_START })
  weekStart: DayOfWeek;

  @Column({ nullable: false, default: () => 'now()' })
  @Index('IDX_user_createdAt')
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ type: 'text', nullable: true })
  experienceLevel: string | null;

  @Column({ type: 'text', nullable: true })
  language: ContentLanguage | null;
}
