'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, InfoCard } from '@/components/ui';
import { Header } from '@/components/layout/Header';

const foodStalls = [
  { id: '1', name: 'Gian hàng Bánh mì', description: 'Bánh mì, xôi, bún', location: 'Khu A' },
  { id: '2', name: 'Trà sữa & Nước giải khát', description: 'Các loại nước uống', location: 'Khu A' },
  { id: '3', name: 'Gian hàng Kem & Tráng miệng', description: 'Kem, chè, bánh ngọt', location: 'Khu B' },
  { id: '4', name: 'Gian hàng Đặc sản Quảng Trị', description: 'Các món đặc sản địa phương', location: 'Khu B' },
  { id: '5', name: 'Gian hàng Cơm & Bún', description: 'Cơm trưa, bún bò', location: 'Khu C' },
];

export default function FoodPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Khu ẩm thực" onBack={() => router.push('/dashboard')} />
      
      <div className="px-4 py-6">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
          <div className="text-center text-white">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold">Khu Ẩm Thực</h2>
          </div>
        </div>

        {/* Info */}
        <Card className="mb-6">
          <CardContent>
            <p className="text-sm text-gray-600">
              📍 Vị trí: Khu vực phía Đông sân trường
            </p>
            <p className="text-sm text-gray-600 mt-1">
              🕐 Giờ hoạt động: 8:00 - 17:00
            </p>
          </CardContent>
        </Card>

        {/* Food stalls */}
        <h3 className="text-lg font-bold text-gray-900 mb-3">Các gian hàng</h3>
        <div className="space-y-3">
          {foodStalls.map((stall) => (
            <InfoCard
              key={stall.id}
              title={stall.name}
              description={`${stall.description} • ${stall.location}`}
              icon={
                <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              iconBgColor="bg-orange-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
