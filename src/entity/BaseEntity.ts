import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ValueTransformer } from "typeorm/decorator/options/ValueTransformer"


export abstract class BaseEntity {
  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  create_date!: Date

  @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  update_date!: Date
}

export class UUIDTransformer implements ValueTransformer {
  to (value: string): Buffer {
    if (Buffer.isBuffer(value)) return value // why is this necessary? ¯\_(ツ)_/¯
    return Buffer.from(value.replace(/-/g, ''), 'hex')
  }

  from (value: Buffer): string {
    if (typeof value === 'string') return value // why is this necessary? ¯\_(ツ)_/¯
    const str = value.toString('hex')
    return [str.slice(0, 8), str.slice(8, 12), str.slice(12, 16), str.slice(16, 20), str.slice(20, 32)].join('-')
  }
}
