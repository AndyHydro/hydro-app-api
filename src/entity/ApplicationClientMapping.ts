import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ApplicationClientMapping {

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

    @CreateDateColumn()
    create_date!: Date;

    @UpdateDateColumn()
    update_date!: Date;
}
