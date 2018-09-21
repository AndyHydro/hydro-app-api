import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { BaseEntity } from './BaseEntity'

@Entity("application_client_mapping")
export class ApplicationClientMapping extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    application_client_mapping_id!: string;

    @Column()
    application_id!: string;

    @Column()
    hydro_id!: string;

    @Column()
    application_name!: string;

    @Column()
    confirmed!: boolean;
}
