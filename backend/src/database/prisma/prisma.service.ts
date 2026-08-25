import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaMssql } from '@prisma/adapter-mssql';
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaMssql({
      server: process.env.DB_SERVER!,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    });

    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
