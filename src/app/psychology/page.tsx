'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';

// Psychology survey questions based on mockup
const questions = [
  {
    id: 1,
    question: 'Bạn có cảm thấy lo lắng khi nghĩ về việc chọn ngành nghề không?',
    options: [
      { value: 'a', label: 'Rất lo lắng' },
      { value: 'b', label: 'Hơi lo lắng' },
      { value: 'c', label: 'Bình thường' },
      { value: 'd', label: 'Không lo lắng' },
    ],
  },
  {
    id: 2,
    question: 'Tôi cảm thấy áp lực khi thấy bạn bè xung quanh đã có định hướng rõ ràng?',
    options: [
      { value: 'a', label: 'Đúng vậy, tôi cảm thấy áp lực' },
      { value: 'b', label: 'Không, tôi cảm thấy bình thường' },
    ],
  },
  {
    id: 3,
    question: 'Ngành tôi muốn theo đuổi khác với mong muốn của bố mẹ hoặc gia đình?',
    options: [
      { value: 'a', label: 'Không đồng ý' },
      { value: 'b', label: 'Bình thường' },
      { value: 'c', label: 'Đồng ý' },
    ],
  },
  {
    id: 4,
    question: 'Tôi chưa thực sự hiểu rõ bản thân phù hợp với ngành nghề nào.',
    options: [
      { value: 'a', label: 'Không đồng ý' },
      { value: 'b', label: 'Bình thường' },
      { value: 'c', label: 'Đồng ý' },
    ],
  },
  {
    id: 5,
    question: 'Tôi thường thay đổi ý định khi nghĩ đến việc chọn ngành học',
    options: [
      { value: 'a', label: 'Không đồng ý' },
      { value: 'b', label: 'Bình thường' },
      { value: 'c', label: 'Đồng ý' },
    ],
  },
  {
    id: 6,
    question: 'Tôi cảm thấy cần có người lắng nghe và chia sẻ khi gặp áp lực về định hướng nghề nghiệp.',
    options: [
      { value: 'a', label: 'Không đồng ý' },
      { value: 'b', label: 'Bình thường' },
      { value: 'c', label: 'Đồng ý' },
    ],
  },
];

type Step = 'questions' | 'ask-counselor' | 'directions';

export default function PsychologyPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('questions');
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const handleSubmit = () => {
    if (allAnswered) {
      setStep('ask-counselor');
    }
  };

  // Step 1: All questions on one page
  if (step === 'questions') {
    return (
      <div className="min-h-screen bg-gray-50 pb-32">
        <Header 
          title="Tham vấn tâm lý" 
          onBack={() => router.push('/dashboard')} 
          showLogo
        />
        
        <div className="px-4 py-6">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-gray-900 mb-1">MỘT VÀI CÂU HỎI</h1>
            <h2 className="text-xl font-bold text-gray-900 mb-2">VỀ TÂM LÝ</h2>
            <p className="text-sm text-gray-500">Giúp chúng tôi hiểu rõ hơn về tâm trạng của bạn</p>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={q.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="font-medium text-gray-900 mb-3">
                  {index + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAnswer(q.id, option.value)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                        answers[q.id] === option.value
                          ? 'border-primary bg-red-50'
                          : 'border-gray-200 hover:border-gray-300 active:bg-gray-50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        answers[q.id] === option.value
                          ? 'border-primary'
                          : 'border-gray-300'
                      }`}>
                        {answers[q.id] === option.value && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                      <span className={`text-sm ${
                        answers[q.id] === option.value ? 'text-primary font-medium' : 'text-gray-700'
                      }`}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA - Fixed at bottom */}
        <div className="fixed bottom-0 inset-x-0 p-4 bg-white border-t border-gray-200 z-[9999]" style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`w-full py-4 rounded-xl text-white font-bold transition-colors ${
              allAnswered ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            HOÀN THÀNH
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Ask if want to meet counselor
  if (step === 'ask-counselor') {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-lg border-2 border-blue-200">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Question */}
          <h1 className="text-xl font-bold text-center text-gray-900 mb-4">
            BẠN CÓ MUỐN GẶP<br />
            ANH CHỊ TƯ VẤN?
          </h1>

          {/* Info box */}
          <div className="p-4 bg-amber-50 rounded-xl border-2 border-amber-300 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-bold">Phòng tham vấn tâm lý</span> dành cho các bạn có thắc mắc hoặc gặp khó khăn trong việc lựa chọn nghề nghiệp. Các anh chị sẽ chia sẻ kinh nghiệm và hỗ trợ bạn!
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setStep('directions')}
              className="w-full py-4 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors shadow-md"
            >
              CÓ, TÔI MUỐN GẶP
            </button>
            
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-4 rounded-xl bg-gray-100 border-2 border-gray-400 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
            >
              KHÔNG, QUAY LẠI TRANG CHỦ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Directions to psychology room
  if (step === 'directions') {
    return (
      <div className="min-h-screen bg-gray-50 pb-32">
        <Header 
          title="Phòng tư vấn tâm lý" 
          onBack={() => router.push('/dashboard')} 
          showLogo
        />
        
        <div className="px-4 py-6">
          {/* Compass Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-center text-gray-900 mb-1">HƯỚNG DẪN ĐẾN</h2>
          <p className="text-center text-gray-500 mb-6">Phòng Tham Vấn Tâm Lý</p>

          {/* Location Info */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span className="font-bold text-gray-900">VỊ TRÍ: Dãy A - Phòng 101</span>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <div className="relative bg-blue-50 rounded-xl h-40 flex items-center justify-center overflow-hidden">
              {/* Navigation arrow */}
              <div className="text-red-500">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                </svg>
              </div>
              <span className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded-full shadow-sm">
                Bản đồ khuôn viên
              </span>
            </div>
            
            <div className="mt-4">
              <h3 className="font-bold text-gray-900 text-center mb-3">BẢN ĐỒ HƯỚNG DẪN</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Cổng chính</span>
                  <span className="text-red-500 font-medium">●</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="ml-5">↓ 30m</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Phòng 101</span>
                  <span className="text-green-500 font-medium">■</span>
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">
                Khoảng cách: ~50m<br />
                Thời gian đi bộ: 2 phút
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              KHI ĐẾN PHÒNG TƯ VẤN
            </h3>
            <div className="space-y-3">
              {[
                'Chia sẻ những băn khoăn của bạn',
                'Lắng nghe kinh nghiệm từ anh chị',
                'Nhận được định hướng phù hợp',
                'Cảm thấy tự tin hơn về lựa chọn',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white shrink-0 ${
                    index < 3 ? 'bg-primary' : 'bg-secondary'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA - Fixed at bottom */}
        <div className="fixed bottom-0 inset-x-0 p-4 bg-white border-t border-gray-200 z-[9999]" style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-4 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
          >
            HOÀN THÀNH VÀ TIẾP TỤC
          </button>
        </div>
      </div>
    );
  }

  return null;
}
