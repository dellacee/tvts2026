'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { Header } from '@/components/layout/Header';

export default function CareerPage() {
  const router = useRouter();

  const handleNotSure = () => {
    // TODO: Gọi API ONET sau
    alert('Tính năng làm bài test ONET sẽ được cập nhật sớm!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Chọn nghề" 
        onBack={() => router.push('/dashboard')} 
        className="bg-primary text-white"
      />
      
      <div className="px-4 py-8">
        {/* Target Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center">
            <span className="text-5xl">🎯</span>
          </div>
        </div>

        {/* Question */}
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-3">
          BẠN ĐÃ CHỌN ĐƯỢC NGHỀ<br />YÊU THÍCH CHƯA?
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Chúng tôi sẽ giúp bạn tìm kiếm định hướng phù hợp
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            className="w-full !bg-secondary hover:!bg-secondary/90"
            onClick={() => router.push('/career/list')}
          >
            RỒI, TÔI ĐÃ CHỌN NGHỀ
          </Button>
          
          <Button
            variant="primary"
            size="lg"
            className="w-full !bg-gray-400 hover:!bg-gray-500"
            onClick={handleNotSure}
          >
            CHƯA, TÔI CHƯA BIẾT
          </Button>
        </div>

        {/* Tip */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
          <p className="text-sm text-gray-700">
            <span className="font-medium">💡 Gợi ý:</span> Nếu bạn chưa chắc chắn, hãy làm bài test ONET để khám phá năng lực và sở thích của bản thân!
          </p>
        </div>
      </div>
    </div>
  );
}
