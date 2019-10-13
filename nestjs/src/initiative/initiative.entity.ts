import {
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  BeforeUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'initiatives_v2' })
export class Initiative {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  address: string;

  // we won't do any mathematical operators
  // and don't want to deal with
  // rounding issues
  @Column({ length: 100 })
  latitude: string;
  @Column({ length: 100 })
  longitude: string;

  @Column('text')
  post: string;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
  @VersionColumn() version: number;
}
