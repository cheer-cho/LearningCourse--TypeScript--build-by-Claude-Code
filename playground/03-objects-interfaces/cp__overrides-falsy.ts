type ServerConfig = { readonly host: string; readonly port: number; env: 'dev' | 'prod'; debug?: boolean };
type Overrides = { env?: 'dev' | 'prod'; debug?: boolean };

function withOverrides(base: ServerConfig, overrides: Overrides): ServerConfig {
  return {
    ...base,
    ...(overrides.env !== undefined && { env: overrides.env }),
    ...(overrides.debug !== undefined && { debug: overrides.debug }),
  };
}

const base: ServerConfig = { host: 'x', port: 80, env: 'prod', debug: true };
console.log('turn debug OFF:', withOverrides(base, { debug: false }));
console.log('explicit undefined:', withOverrides(base, { env: undefined }));
console.log('no overrides:     ', withOverrides(base, {}));
