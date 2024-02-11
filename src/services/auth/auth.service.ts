import {AuthAdapter} from "@/services/adapters/abstract/auth";

export class AuthService {
    private adapter:AuthAdapter;
    constructor(authAdapter: AuthAdapter) {
        this.adapter = authAdapter;
    }
    login(email: string, password: string) {
        return this.adapter.loginWithEmail(email, password);
    }
}