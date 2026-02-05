'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button, Input } from '@/components/ui';

export default function FeedbackPage() {
  const router = useRouter();
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // TODO: Call API to submit feedback
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Góp ý chương trình" onBack={() => router.back()} />
        
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Cảm ơn bạn!</h2>
          <p className="text-gray-500 text-center mb-6">
            Góp ý của bạn đã được ghi nhận và sẽ giúp chúng tôi cải thiện chương trình.
          </p>
          <Button onClick={() => router.push('/dashboard')}>
            Về trang chủ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Góp ý chương trình" onBack={() => router.back()} />
      
      <div className="px-4 py-6">
        {/* Rating Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <h3 className="font-bold text-gray-900 mb-3">Bạn đánh giá chương trình thế nào?</h3>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="p-1 transition-transform active:scale-90"
              >
                <svg 
                  className={`w-10 h-10 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            {rating === 0 && 'Chạm để đánh giá'}
            {rating === 1 && 'Rất tệ'}
            {rating === 2 && 'Tệ'}
            {rating === 3 && 'Bình thường'}
            {rating === 4 && 'Tốt'}
            {rating === 5 && 'Rất tốt'}
          </p>
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <h3 className="font-bold text-gray-900 mb-3">Góp ý của bạn</h3>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Chia sẻ ý kiến của bạn về chương trình..."
            className="w-full h-32 p-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Quick Feedback Options */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <h3 className="font-bold text-gray-900 mb-3">Hoặc chọn nhanh</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Tổ chức tốt',
              'Thông tin hữu ích',
              'Cần thêm trường',
              'Quá đông đúc',
              'Địa điểm thuận tiện',
              'Cần hỗ trợ thêm',
            ].map((option) => (
              <button
                key={option}
                onClick={() => setFeedback((prev) => prev ? `${prev}, ${option}` : option)}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 active:bg-gray-200"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={rating === 0 && !feedback}
          className="w-full"
        >
          Gửi góp ý
        </Button>
      </div>
    </div>
  );
}
