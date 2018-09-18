import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity("verification_log")
export class VerificationLog {

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

    @CreateDateColumn()
    create_date!: Date;

    @UpdateDateColumn()
    update_date!: Date;
}
