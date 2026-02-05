'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui';
import { Header } from '@/components/layout/Header';

const schedule = [
  { time: '08:00 - 08:30', title: 'Khai mạc', artist: 'Ban tổ chức' },
  { time: '08:30 - 09:30', title: 'Biểu diễn văn nghệ', artist: 'CLB Âm nhạc THPT Đông Hà' },
  { time: '10:00 - 11:00', title: 'Giao lưu ca sĩ khách mời', artist: 'TBA' },
  { time: '14:00 - 15:00', title: 'Cuộc thi hát', artist: 'Học sinh các trường' },
  { time: '15:30 - 16:30', title: 'Biểu diễn DJ', artist: 'DJ Khách mời' },
  { time: '16:30 - 17:00', title: 'Tổng kết & Bế mạc', artist: 'Ban tổ chức' },
];

export default function MusicPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Sân khấu âm nhạc" onBack={() => router.push('/dashboard')} />
      
      <div className="px-4 py-6">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
          <div className="text-center text-white">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <h2 className="text-xl font-bold">Sân Khấu Âm Nhạc</h2>
          </div>
        </div>

        {/* Info */}
        <Card className="mb-6">
          <CardContent>
            <p className="text-sm text-gray-600">
              📍 Vị trí: Sân khấu chính, trung tâm sự kiện
            </p>
            <p className="text-sm text-gray-600 mt-1">
              🎵 Nhiều tiết mục đặc sắc từ các nghệ sĩ
            </p>
          </CardContent>
        </Card>

        {/* Schedule */}
        <h3 className="text-lg font-bold text-gray-900 mb-3">Lịch biểu diễn</h3>
        <div className="space-y-3">
          {schedule.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-card">
              <div className="flex items-start gap-3">
                <div className="w-16 text-center flex-shrink-0">
                  <span className="text-xs text-purple-600 font-medium bg-purple-100 px-2 py-1 rounded-full">
                    {item.time.split(' - ')[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">{item.artist}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <Card className="mt-6 bg-purple-50">
          <CardContent>
            <p className="text-sm text-purple-700 text-center">
              🎤 Lịch trình có thể thay đổi. Vui lòng theo dõi thông báo mới nhất!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
