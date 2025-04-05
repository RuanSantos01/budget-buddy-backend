export const CodeReturn = {
  AUTH: {
    ATH_401_001: { description: 'Invalid credentials.', status: 'ATH_001' },
    ATH_401_002: { description: 'User is inactive.', status: 'ATH_002' },
    ATH_409_003: { description: 'Email already taken.', status: 'ATH_003' },
  },
  TRANSACTION: {},
  USER: {},
} as const;

export type CodeReturnKey = keyof typeof CodeReturn;
export type CodeReturnValue = (typeof CodeReturn)[CodeReturnKey];
