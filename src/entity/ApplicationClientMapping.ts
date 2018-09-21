import { Entity, PrimaryColumn, Column } from 'typeorm';

import { BaseEntity, UUIDTransformer } from './BaseEntity'

@Entity("application_client_mapping")
export class ApplicationClientMapping extends BaseEntity {
    @PrimaryColumn({type: "binary", length: 16, transformer: new UUIDTransformer()})
    application_client_mapping_id!: string;

    @Column({type: "binary", length: 16, transformer: new UUIDTransformer()})
    application_id!: string;

    @Column()
    username!: string;

    @Column()
    application_name!: string;

    @Column()
    confirmed!: boolean;
}
