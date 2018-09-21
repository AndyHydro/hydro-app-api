import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  create_date!: Date

  @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  update_date!: Date
}
