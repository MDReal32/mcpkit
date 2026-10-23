import { AUTH_TYPES } from '../../const';
import type { AuthType } from '../../types/auth/auth-type';

export const isAuthType = (value: unknown): value is AuthType => AUTH_TYPES.some((type) => type === value);
