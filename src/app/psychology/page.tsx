'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, RadioGroup, ProgressIndicator } from '@/components/ui';
import { Header } from '@/components/layout/Header';

// Mock psychology survey questions
const questions = [
  {
    id: 1,
    question: 'Khi gặp khó khăn trong học tập, bạn thường làm gì?',
    options: [
      { value: 'a', label: 'Tự tìm cách giải quyết' },
      { value: 'b', label: 'Hỏi bạn bè hoặc người thân' },
      { value: 'c', label: 'Hỏi thầy cô giáo' },
      { value: 'd', label: 'Bỏ qua và làm việc khác' },
    ],
  },
  {
    id: 2,
    question: 'Bạn cảm thấy thế nào về việc lựa chọn nghề nghiệp?',
    options: [
      { value: 'a', label: 'Rất tự tin và đã có định hướng rõ ràng' },
      { value: 'b', label: 'Có một số ý tưởng nhưng chưa chắc chắn' },
      { value: 'c', label: 'Đang tìm hiểu và khám phá' },
      { value: 'd', label: 'Rất lo lắng và không biết bắt đầu từ đâu' },
    ],
  },
  {
    id: 3,
    question: 'Bạn thường dành thời gian rảnh để làm gì?',
    options: [
      { value: 'a', label: 'Đọc sách, học thêm kiến thức mới' },
      { value: 'b', label: 'Chơi thể thao, vận động' },
      { value: 'c', label: 'Gặp gỡ bạn bè, tham gia hoạt động xã hội' },
      { value: 'd', label: 'Xem phim, chơi game, giải trí' },
    ],
  },
  {
    id: 4,
    question: 'Điều gì quan trọng nhất với bạn khi chọn nghề?',
    options: [
      { value: 'a', label: 'Thu nhập cao và ổn định' },
      { value: 'b', label: 'Đam mê và sở thích cá nhân' },
      { value: 'c', label: 'Cơ hội phát triển và thăng tiến' },
      { value: 'd', label: 'Đóng góp cho xã hội' },
    ],
  },
  {
    id: 5,
    question: 'Bạn đánh giá khả năng giao tiếp của mình như thế nào?',
    options: [
      { value: 'a', label: 'Rất tốt, tự tin nói trước đám đông' },
      { value: 'b', label: 'Khá tốt trong nhóm nhỏ' },
      { value: 'c', label: 'Bình thường, cần cải thiện' },
      { value: 'd', label: 'Hay ngại ngùng, khó diễn đạt' },
    ],
  },
];

export default function PsychologyPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const question = questions[currentQuestion];
  const totalQuestions = questions.length;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit and show results
      console.log('Psychology answers:', answers);
      router.push('/psychology/result');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isAnswered = answers[question.id] !== undefined;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Trắc nghiệm tâm lý" onBack={() => router.push('/dashboard')} />
      
      <div className="flex-1 px-4 py-6">
        {/* Progress */}
        <ProgressIndicator
          current={currentQuestion + 1}
          total={totalQuestions}
          className="mb-6"
        />

        {/* Question */}
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <p className="text-sm text-gray-500 mb-2">
            Câu hỏi {currentQuestion + 1}/{totalQuestions}
          </p>
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {question.question}
          </h2>

          <RadioGroup
            name={`question-${question.id}`}
            options={question.options}
            value={answers[question.id] || ''}
            onChange={handleAnswer}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="flex gap-3">
          {currentQuestion > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevious}
              className="flex-1"
            >
              Quay lại
            </Button>
          )}
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex-1"
          >
            {currentQuestion === totalQuestions - 1 ? 'Hoàn thành' : 'Tiếp theo'}
          </Button>
        </div>
      </div>
    </div>
  );
}
