'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui';
import { Header } from '@/components/layout/Header';

const games = [
  { id: '1', name: 'Vòng quay may mắn', description: 'Quay số trúng thưởng', prizes: '🎁 Quà tặng hấp dẫn' },
  { id: '2', name: 'Đố vui kiến thức', description: 'Trả lời câu hỏi hay', prizes: '🏆 Phần thưởng giá trị' },
  { id: '3', name: 'Ném bóng trúng đích', description: 'Thử thách độ chính xác', prizes: '🎯 Quà tặng bất ngờ' },
  { id: '4', name: 'Photo booth', description: 'Chụp ảnh kỷ niệm', prizes: '📸 Ảnh in miễn phí' },
  { id: '5', name: 'Thử thách nhóm', description: 'Hoạt động team building', prizes: '👥 Giải thưởng nhóm' },
];

export default function GamesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Khu trò chơi" onBack={() => router.push('/dashboard')} />
      
      <div className="px-4 py-6">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6">
          <div className="text-center text-white">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold">Khu Trò Chơi</h2>
          </div>
        </div>

        {/* Info */}
        <Card className="mb-6">
          <CardContent>
            <p className="text-sm text-gray-600">
              📍 Vị trí: Khu vực phía Tây sân trường
            </p>
            <p className="text-sm text-gray-600 mt-1">
              🕐 Giờ hoạt động: 8:00 - 16:30
            </p>
            <p className="text-sm text-gray-600 mt-1">
              🎟️ Mỗi trò chơi: 1 lượt miễn phí/người
            </p>
          </CardContent>
        </Card>

        {/* Games list */}
        <h3 className="text-lg font-bold text-gray-900 mb-3">Các trò chơi</h3>
        <div className="space-y-3">
          {games.map((game) => (
            <div key={game.id} className="bg-white rounded-xl p-4 shadow-card">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{game.name}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">{game.description}</p>
                  <p className="text-sm text-green-600 mt-1">{game.prizes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
