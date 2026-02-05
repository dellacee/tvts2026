'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LocationCard } from '@/components/ui';
import { Header } from '@/components/layout/Header';

const locations = [
  { id: '1', name: 'Sân khấu chính', description: 'Khu vực biểu diễn và talk show' },
  { id: '2', name: 'Khu vực gian hàng trường', description: 'Tư vấn tuyển sinh các trường' },
  { id: '3', name: 'Khu trắc nghiệm ONET', description: 'Làm bài test định hướng nghề nghiệp' },
  { id: '4', name: 'Khu tư vấn tâm lý', description: 'Gặp gỡ chuyên gia tâm lý' },
  { id: '5', name: 'Khu ẩm thực', description: 'Các gian hàng ăn uống' },
  { id: '6', name: 'Khu trò chơi', description: 'Các hoạt động giải trí' },
  { id: '7', name: 'Sân khấu âm nhạc', description: 'Biểu diễn âm nhạc và giao lưu' },
];

const quickAccess = [
  {
    id: 'food',
    title: 'Khu ẩm thực',
    icon: (
      <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBgColor: 'bg-orange-100',
    path: '/utilities/food',
  },
  {
    id: 'games',
    title: 'Trò chơi',
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBgColor: 'bg-green-100',
    path: '/utilities/games',
  },
  {
    id: 'music',
    title: 'Âm nhạc',
    icon: (
      <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    iconBgColor: 'bg-purple-100',
    path: '/utilities/music',
  },
];

export default function LocationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Bản đồ & Địa điểm" onBack={() => router.push('/dashboard')} />
      
      <div className="px-4 py-6">
        {/* Map placeholder */}
        <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-sm text-blue-600 mt-2">Bản đồ sự kiện</p>
            <p className="text-xs text-blue-500">Nhấn để xem chi tiết</p>
          </div>
        </div>

        {/* Quick Access */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Truy cập nhanh</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickAccess.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className="p-4 bg-white rounded-xl shadow-card text-center active:scale-95 transition-transform"
              >
                <div className={`w-12 h-12 mx-auto rounded-full ${item.iconBgColor} flex items-center justify-center mb-2`}>
                  {item.icon}
                </div>
                <span className="text-xs font-medium text-gray-700">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* All Locations */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Tất cả địa điểm</h2>
          <div className="space-y-3">
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onClick={() => router.push(`/locations/${location.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
