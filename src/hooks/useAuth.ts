'use client';

import { useEffect, useMemo, useState } from 'react';
import type { User } from '@/types';
import { useApp } from '@/contexts/AppContext';

type Claims = Record<string, unknown>;

type AccessTokenResult = {
  token: string | null;
  claims: Claims | null;
  user: User | null;
};

const claimValue = (claims: Claims, keys: string[]): string | undefined => {
  for (const key of keys) {
    const value = claims[key];
    if (typeof value === 'string' && value.trim()) return value;
  }
  return undefined;
};

const decodeBase64Url = (input: string): string => {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '==='.slice((base64.length + 3) % 4);
  const decoded = atob(padded);

  try {
    return decodeURIComponent(
      decoded
        .split('')
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join(''),
    );
  } catch {
    return decoded;
  }
};

export const decodeAccessToken = (token?: string | null): Claims | null => {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;

  try {
    const payload = decodeBase64Url(parts[1]);
    const parsed = JSON.parse(payload);
    return typeof parsed === 'object' && parsed !== null ? (parsed as Claims) : null;
  } catch {
    return null;
  }
};

export const extractUserFromAccessToken = (token?: string | null): User | null => {
  const claims = decodeAccessToken(token);
  if (!claims) return null;
  console.log('Decoded Claims:', claims);

  const id = claimValue(claims, [
    'userId',
    'user_id',
    'uid',
    'id',
    'nameid',
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
  ]);

  const email = claimValue(claims, [
    'email',
    'preferred_username',
    'upn',
    'sub',
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
  ]);

  const fullName = claimValue(claims, [
    'name',
    'fullName',
    'full_name',
    'unique_name',
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
  ]);

  const givenName = claimValue(claims, [
    'given_name',
    'firstName',
    'givenname',
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
  ]);
  const familyName = claimValue(claims, [
    'family_name',
    'lastName',
    'surname',
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname',
  ]);
  const phone = claimValue(claims, ['phone_number', 'phone']);

  const nameFromParts = [givenName, familyName].filter(Boolean).join(' ').trim();
  const displayName = fullName || nameFromParts || undefined;

  if (!id && !email && !displayName) return null;

  return {
    id: id || email || 'sso-user',
    email: email || '',
    name: displayName,
    fullName: displayName,
    phone: phone || undefined,
  };
};

const getStoredToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken') || localStorage.getItem('accessToken');
};

export const useAccessTokenUser = (accessToken?: string | null): AccessTokenResult => {
  const token = accessToken ?? getStoredToken();

  return useMemo(() => {
    const claims = decodeAccessToken(token);
    const user = extractUserFromAccessToken(token);
    return { token, claims, user };
  }, [token]);
};

export const useAuthFromToken = () => {
  const { state, login } = useApp();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const token = getStoredToken();
    const user = extractUserFromAccessToken(token);
    if (token && user) {
      const shouldUpdate =
        !state.user ||
        (user.id && user.id !== state.user.id) ||
        (user.email && user.email !== state.user.email) ||
        (user.name && user.name !== state.user.name) ||
        (user.fullName && user.fullName !== state.user.fullName);

      if (shouldUpdate) {
        login(user, token);
      }
    }
    setHydrated(true);
  }, [hydrated, login, state.user]);

  return state;
};
