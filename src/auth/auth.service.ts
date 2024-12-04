import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sing-in.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async signup(signUpDto: SignUpDto) {
    const { email, password, firstName, lastName, role } = signUpDto;

    const app = this.firebaseService.setup();

    try {
      const createdUser = await app.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
      });
      await app.auth().setCustomUserClaims(createdUser.uid, { role });
      return this.firebaseService.signWithPassword(email, password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async signin(signInDto: SignInDto) {
    const { email, password } = signInDto;

    try {
      return this.firebaseService.signWithPassword(email, password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
