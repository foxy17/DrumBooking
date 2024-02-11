import {  SupabaseClient } from "@supabase/supabase-js";
import {AuthAdapter} from "@/services/adapters/abstract/auth";

export class SupabaseAuthAdapter extends AuthAdapter{
    private  client: SupabaseClient;
    constructor(client: SupabaseClient) {
        super();
        this.client = client;
    }

    loginWithEmail(email: string, password: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    logout(): Promise<any> {
        return Promise.resolve(undefined);
    }
}
