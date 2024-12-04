import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from './config/firebaseServiceAccountKey.json';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

let app: admin.app.App = null;
@Injectable()
export class FirebaseService implements OnApplicationBootstrap {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async onApplicationBootstrap() {
    if (!app) {
      const firebase_params = {
        type: serviceAccount.type,
        projectId: serviceAccount.project_id,
        privateKeyId: serviceAccount.private_key_id,
        privateKey: serviceAccount.private_key,
        clientEmail: serviceAccount.client_email,
        clientId: serviceAccount.client_id,
        authUri: serviceAccount.auth_uri,
        tokenUri: serviceAccount.token_uri,
        authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
        clientC509CertUrl: serviceAccount.client_x509_cert_url,
      };
      app = admin.initializeApp({
        credential: admin.credential.cert(firebase_params),
      });
    }
  }
  setup() {
    return app;
  }

  async signWithPassword(email: string, password: string) {
    const apiKey = this.configService.get('FIREBASE_API_KEY');

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    const { data } = await lastValueFrom(
      this.httpService.post(url, {
        email,
        password,
        returnSecureToken: true,
      }),
    );

    return data;
  }
}
