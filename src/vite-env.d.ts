/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON: string;
  readonly Vite_FIREBASE_API_KEY: string;
  readonly Vite_FIREBASE_AUTH_DOMAIN: string;
  readonly Vite_FIREBASE_PROJECT_ID: string;
  readonly Vite_FIREBASE_STORAGE_BUCKET: string;
  readonly Vite_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly Vite_FIREBASE_APP_ID: string;
  readonly Vite_FIREBASE_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
