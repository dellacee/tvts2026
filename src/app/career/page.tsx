'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { Header } from '@/components/layout/Header';

export default function CareerPage() {
  const router = useRouter();

  const handleNotSure = () => {
    // TODO: Gọi API ONET sau
    alert('Tính năng làm bài test ONET sẽ được cập nhật sớm!');
  };

  return (
    <div className="min-h-screen bg-background-secondary">
      <Header 
        title="Chọn nghề" 
        onBack={() => router.push('/dashboard')} 
        showLogo
      />
      
      <div className="px-4 py-8">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-warm">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Question */}
        <h1 className="text-2xl font-bold text-center text-neutral-900 mb-3 font-heading">
          BẠN ĐÃ CHỌN ĐƯỢC NGHỀ<br />YÊU THÍCH CHƯA?
        </h1>
        <p className="text-center text-neutral-500 mb-8">
          Chúng tôi sẽ giúp bạn tìm kiếm định hướng phù hợp
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            className="w-full !bg-success hover:!bg-success/90"
            onClick={() => router.push('/career/list')}
          >
            RỒI, TÔI ĐÃ CHỌN NGHỀ
          </Button>
          
          <Button
            variant="gray"
            size="lg"
            className="w-full"
            onClick={handleNotSure}
          >
            CHƯA, TÔI CHƯA BIẾT
          </Button>
        </div>

        {/* Tip */}
        <div className="mt-6 p-4 bg-accent-lighter rounded-xl border border-accent-light">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-neutral-700">
              <span className="font-medium">Gợi ý:</span> Nếu bạn chưa chắc chắn, hãy làm bài test ONET để khám phá năng lực và sở thích của bản thân!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
