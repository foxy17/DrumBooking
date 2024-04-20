export abstract class AuthAdapter {
  abstract loginWithEmail(
    email: string,
    password: string,
  ): Promise<boolean | string>;
  abstract logout(): Promise<boolean>;
  abstract isAuthenticated(): boolean;
}
