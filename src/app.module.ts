import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    BlogModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
