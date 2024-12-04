import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
