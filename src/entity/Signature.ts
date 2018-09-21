import { Entity, Column, PrimaryColumn } from 'typeorm';

import { BaseEntity, UUIDTransformer } from './BaseEntity'

@Entity()
export class Signature extends BaseEntity {
    @PrimaryColumn({type: "binary", length: 16, transformer: new UUIDTransformer()})
    signature_id!: string;

    @Column()
    signature!: string;

    @Column()
    username!: string;

    @Column({type: "binary", length: 16, transformer: new UUIDTransformer()})
    application_id!: string;
}
