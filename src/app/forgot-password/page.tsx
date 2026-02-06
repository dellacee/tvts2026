'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { Header } from '@/components/layout/Header';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSent(true);
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen flex flex-col bg-background-primary">
        <Header title="Quên mật khẩu" onBack={() => router.push('/login')} />
        
        <div className="flex-1 px-6 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-neutral-900 text-center">
            Kiểm tra email của bạn
          </h1>
          <p className="text-sm text-neutral-500 text-center mt-2 max-w-[280px]">
            Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến <strong>{email}</strong>
          </p>

          <Button
            variant="primary"
            size="lg"
            className="w-full mt-8"
            onClick={() => router.push('/login')}
          >
            Quay lại đăng nhập
          </Button>

          <button
            onClick={() => setIsSent(false)}
            className="mt-4 text-sm text-primary hover:underline transition-all duration-base"
          >
            Gửi lại email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-primary">
      <Header title="Quên mật khẩu" onBack={() => router.push('/login')} />
      
      <div className="flex-1 px-6 pt-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-lighter flex items-center justify-center">
            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-neutral-900">Quên mật khẩu?</h1>
          <p className="text-sm text-neutral-500 mt-2">
            Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            required
            leftIcon={
              <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />

          {error && (
            <p className="text-sm text-error text-center">{error}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            Gửi hướng dẫn
          </Button>
        </form>
      </div>

      {/* Bottom */}
      <div className="p-6 text-center safe-area-bottom">
        <p className="text-sm text-neutral-500">
          Nhớ mật khẩu?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-primary font-medium hover:underline transition-all duration-base"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
}
