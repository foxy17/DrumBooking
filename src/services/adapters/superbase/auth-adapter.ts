import {  SupabaseClient } from "@supabase/supabase-js";

export class SupabaseAuthAdapter {
    private  client: SupabaseClient;
    constructor(client: SupabaseClient) {
        this.client = client;
    }

    login(email:string, password:string) {
    }
}
