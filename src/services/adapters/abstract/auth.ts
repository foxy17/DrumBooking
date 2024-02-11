export abstract class AuthAdapter {
    abstract loginWithEmail(email: string, password: string): Promise<any>;
    abstract logout(): Promise<any>;
}