import {createClient} from "@supabase/supabase-js";
import {SupabaseAuthAdapter} from "./auth-adapter";


export class CombinedSupabaseAdapter {
    private authAdapter;
    private storageAdapter: any;

    constructor() {
        const client = createClient("https://<project>.supabase.co", "<your-anon-key>");
        this.authAdapter = new SupabaseAuthAdapter(client);
    }

    get auth() {
        return this.authAdapter;
    }

}
