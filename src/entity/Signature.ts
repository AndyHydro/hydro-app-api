import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity'

@Entity()
export class Signature extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    signature_id!: string;

    @Column()
    signature!: string;

    @Column()
    username!: string;

    @Column()
    application_id!: string;
}
