import { Entity, PrimaryColumn, Column } from 'typeorm';

import { BaseEntity, UUIDTransformer } from './BaseEntity'

@Entity("verification_log")
export class VerificationLog extends BaseEntity {
    @PrimaryColumn({type: "binary", length: 16, transformer: new UUIDTransformer()})
    log_id!: string;

    @Column()
    signature!: string;

    @Column()
    username!: string;

    @Column({type: "binary", length: 16, transformer: new UUIDTransformer()})
    application_id!: string;

    @Column()
    verified!: boolean;
}
