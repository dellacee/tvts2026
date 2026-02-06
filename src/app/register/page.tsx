'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { Header } from '@/components/layout/Header';
import { useApp } from '@/contexts/AppContext';
import { extractUserFromAccessToken } from '@/hooks/useAuth';

const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL || 'https://hocgi.vn/account/sso';
const SSO_RETURN_URL = process.env.NEXT_PUBLIC_SSO_RETURN_URL;

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const readParams = (raw: string) => {
      const params = new URLSearchParams(raw);
      const token =
        params.get('token') ||
        params.get('access_token') ||
        params.get('accessToken') ||
        params.get('jwt') ||
        params.get('id_token') ||
        params.get('idToken');
      const email = params.get('email') || params.get('user') || params.get('userName');
      const fullName = params.get('fullName') || params.get('name');
      const userId = params.get('userId') || params.get('id');
      return { token, email, fullName, userId };
    };

    const searchParams = readParams(window.location.search);
    const hashParams = window.location.hash.startsWith('#')
      ? readParams(window.location.hash.slice(1))
      : { token: null, email: null, fullName: null, userId: null };

    const token = searchParams.token || hashParams.token;
    const email = searchParams.email || hashParams.email || '';
    const fullName = searchParams.fullName || hashParams.fullName || '';
    const userId = searchParams.userId || hashParams.userId || '';

    if (!token && !email && !fullName && !userId) return;

    const tokenUser = extractUserFromAccessToken(token);
    const mergedUser = {
      id: tokenUser?.id || userId || email || 'sso-user',
      email: tokenUser?.email || email || '',
      name: tokenUser?.name || tokenUser?.fullName || fullName || undefined,
      fullName: tokenUser?.fullName || fullName || tokenUser?.name || undefined,
    };

    login(
      mergedUser,
      token || undefined,
    );

    router.replace('/dashboard');
  }, [login, router]);

  const handleSsoRegister = () => {
    if (!SSO_URL) {
      setError('Thiếu cấu hình SSO');
      return;
    }

    setIsLoading(true);
    setError('');

    const returnUrl = SSO_RETURN_URL || window.location.origin;
    const url = `${SSO_URL}?returnUrl=${encodeURIComponent(returnUrl)}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-primary">
      <Header title="Đăng ký" onBack={() => router.push('/login')} />

      <div className="flex-1 px-6 pt-6">
        {/* Header with warm gradient icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-warm">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-neutral-900 font-heading">Tạo tài khoản</h1>
          <p className="text-sm text-neutral-500 mt-1">Đăng ký qua hệ thống SSO</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-neutral-500 text-center">
            Đăng ký được thực hiện qua hệ thống SSO của hocgi.vn.
          </p>

          {error && (
            <div className="p-3 bg-error-light rounded-lg border border-error/20">
              <p className="text-sm text-error text-center">{error}</p>
            </div>
          )}

          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="w-full uppercase tracking-wider"
            isLoading={isLoading}
            onClick={handleSsoRegister}
          >
            Đăng ký bằng SSO
          </Button>
        </div>
      </div>

      <div className="p-6 text-center safe-area-bottom">
        <p className="text-sm text-neutral-500">
          Đã có tài khoản?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-primary font-semibold hover:text-primary-dark hover:underline transition-colors"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
}
