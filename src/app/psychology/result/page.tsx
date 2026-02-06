'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent } from '@/components/ui';
import { Header } from '@/components/layout/Header';

// Mock result data
const result = {
  personality: 'Nhà lãnh đạo tiềm năng',
  traits: [
    { name: 'Quyết đoán', score: 85 },
    { name: 'Sáng tạo', score: 78 },
    { name: 'Kiên nhẫn', score: 65 },
    { name: 'Giao tiếp', score: 72 },
  ],
  recommendations: [
    'Phát huy khả năng lãnh đạo trong các hoạt động nhóm',
    'Rèn luyện kỹ năng lắng nghe và thấu hiểu người khác',
    'Học cách quản lý thời gian hiệu quả',
    'Tham gia các câu lạc bộ để mở rộng mạng lưới quan hệ',
  ],
};

export default function PsychologyResultPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background-secondary pb-24">
      <Header title="Kết quả trắc nghiệm" onBack={() => router.push('/psychology')} />
      
      <div className="px-4 py-6">
        {/* Result Card */}
        <Card className="bg-gradient-to-br from-primary to-accent text-white">
          <CardContent>
            <div className="text-center py-4">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-1">Bạn là</h2>
              <p className="text-2xl font-bold">{result.personality}</p>
            </div>
          </CardContent>
        </Card>

        {/* Traits */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-3">Đặc điểm tính cách</h3>
          <div className="space-y-3">
            {result.traits.map((trait) => (
              <div key={trait.name} className="bg-background-primary rounded-xl p-4 shadow-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-neutral-900">{trait.name}</span>
                  <span className="text-sm font-medium text-primary">{trait.score}%</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                    style={{ width: `${trait.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-3">Lời khuyên cho bạn</h3>
          <Card>
            <CardContent>
              <ul className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent-lighter text-accent flex items-center justify-center flex-shrink-0 text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm text-neutral-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-primary border-t border-neutral-100 safe-area-bottom">
        <div className="mobile-container mx-auto space-y-3">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => router.push('/dashboard')}
          >
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}
