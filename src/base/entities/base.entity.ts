import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty({ type: String, required: false })
  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @ApiProperty({ type: String, required: false })
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
