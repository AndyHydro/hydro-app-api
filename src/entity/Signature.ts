import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Signature {

    @PrimaryGeneratedColumn("uuid")
    signature_id!: string;

    @Column()
    signature!: string;

    @Column()
    username!: string;

    @Column()
    application_id!: string;

    @CreateDateColumn()
    create_date!: Date;

    @UpdateDateColumn()
    update_date!: Date;
}
