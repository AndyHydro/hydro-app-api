import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { BaseEntity } from './BaseEntity'

@Entity("verification_log")
export class VerificationLog extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    log_id!: string;

    @Column()
    signature!: string;

    @Column()
    username!: string;

    @Column()
    application_id!: string;

    @Column()
    verified!: boolean;
}
