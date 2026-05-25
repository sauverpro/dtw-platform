/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REGISTRATION_SCRIPT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
