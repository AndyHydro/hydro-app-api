import { Entity, Column, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity'

@Entity()
export class Signature extends BaseEntity {

    @PrimaryColumn({type: "binary", length: 16})
    signature_id!: Buffer;

    @Column()
    signature!: string;

    @Column()
    username!: string;

    @Column()
    application_id!: string;
}
