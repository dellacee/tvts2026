'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';

// 10 Psychology survey questions with Likert scale (1-5)
const questions = [
  {
    id: 1,
    question: 'Tôi thường xuyên thay đổi ý định về ngành học.',
  },
  {
    id: 2,
    question: 'Có sự khác biệt (lớn/nhỏ) giữa ngành tôi thích và mong muốn của gia đình, khiến tôi phân vân.',
  },
  {
    id: 3,
    question: 'Những thông tin về ngành nghề trên mạng hoặc từ mọi người quá nhiều, làm tôi thêm rối và cần được định hướng.',
  },
  {
    id: 4,
    question: 'Tôi thấy hoang mang vì chưa thực sự hiểu bản thân phù hợp với ngành nghề nào.',
  },
  {
    id: 5,
    question: 'Áp lực học tập, thi cử và kỳ vọng của mọi người ảnh hưởng nhiều đến tâm trạng của tôi.',
  },
  {
    id: 6,
    question: 'Tôi cảm thấy lo lắng khi nghĩ về tương lai của mình.',
  },
  {
    id: 7,
    question: 'Tôi gặp khó khăn trong việc tập trung học tập do những suy nghĩ về chọn ngành.',
  },
  {
    id: 8,
    question: 'Tôi cảm thấy áp lực khi thấy bạn bè xung quanh đã có định hướng rõ ràng.',
  },
  {
    id: 9,
    question: 'Tôi thường xuyên cảm thấy mệt mỏi, chán nản về việc học.',
  },
  {
    id: 10,
    question: 'Tôi cảm thấy cần có người lắng nghe và chia sẻ những khó khăn của mình.',
  },
];

// Likert scale options (1-5 points)
const likertOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

type Step = 'questions' | 'result-low' | 'result-high' | 'directions';

export default function PsychologyPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('questions');
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  // Calculate score: % = (total / 50) * 100
  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const percentage = (totalScore / 50) * 100;
    return percentage;
  };

  const handleSubmit = () => {
    if (allAnswered) {
      const percentage = calculateScore();
      if (percentage <= 50) {
        setStep('result-low');
      } else {
        setStep('result-high');
      }
    }
  };

  // Step 1: All questions on one page with Likert scale
  if (step === 'questions') {
    return (
      <div className="min-h-screen bg-background-secondary pb-32">
        <Header 
          title="Tham vấn tâm lý" 
          onBack={() => router.push('/dashboard')} 
          showLogo
        />
        
        <div className="px-4 py-6">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-neutral-900 mb-1 font-heading">MỘT VÀI CÂU HỎI</h1>
            <h2 className="text-xl font-bold text-neutral-900 mb-2 font-heading">VỀ TÂM LÝ</h2>
            <p className="text-sm text-neutral-500">Giúp chúng tôi hiểu rõ hơn về tâm trạng của bạn</p>
          </div>

          {/* Questions with Likert Scale */}
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={q.id} className="bg-background-primary rounded-2xl p-4 shadow-card border border-neutral-100">
                <p className="font-medium text-neutral-900 mb-4">
                  {index + 1}. {q.question}
                </p>
                
                {/* Likert Scale Labels */}
                <div className="flex justify-between text-xs text-neutral-500 mb-2 px-1">
                  <span>Không đồng ý</span>
                  <span>Đồng ý</span>
                </div>
                
                {/* Likert Scale Options */}
                <div className="flex justify-between items-center gap-2">
                  {likertOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAnswer(q.id, option.value)}
                      className="flex flex-col items-center gap-1"
                    >
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-base ${
                        answers[q.id] === option.value
                          ? 'border-primary bg-primary text-white'
                          : 'border-neutral-300 hover:border-primary hover:bg-primary-lighter'
                      }`}>
                        {answers[q.id] === option.value ? (
                          <div className="w-3 h-3 rounded-full bg-white" />
                        ) : null}
                      </div>
                      <span className={`text-sm font-medium ${
                        answers[q.id] === option.value ? 'text-primary' : 'text-neutral-500'
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
        <div className="fixed bottom-0 inset-x-0 p-4 bg-background-primary border-t border-neutral-200 z-[9999]" style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`w-full py-4 rounded-xl text-white font-bold transition-all duration-base ${
              allAnswered ? 'gradient-primary hover:opacity-90 shadow-warm' : 'bg-neutral-400 cursor-not-allowed'
            }`}
          >
            HOÀN THÀNH
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Result 0-50% - Good score, ready
  if (step === 'result-low') {
    const percentage = calculateScore();
    return (
      <div className="min-h-screen bg-neutral-200 flex items-center justify-center p-4">
        {/* Progress bar at top */}
        <div className="fixed top-0 left-0 right-0 px-4 py-3 bg-background-primary border-b border-neutral-200 z-10">
          <div className="text-sm text-neutral-500 mb-1">0-50%</div>
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="bg-background-primary rounded-3xl p-6 max-w-sm w-full shadow-lg">
          {/* Target Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold text-center text-neutral-900 mb-4 font-heading">
            Đây là chỉ số tốt cho thấy<br />bạn đã sẵn sàng !
          </h1>

          {/* Info box */}
          <div className="p-4 bg-neutral-100 rounded-xl border border-neutral-200 mb-6">
            <p className="text-sm text-neutral-700 leading-relaxed">
              Nhưng nếu bạn cảm thấy vẫn còn băn khoăn thì đã có chúng mình ở đây - <span className="font-bold text-primary">Phòng Tham vấn tâm lý</span> dành cho các bạn đang băn khoăn trong việc lựa chọn ngành nghề hoặc gặp những khó khăn về cảm xúc, áp lực và các vấn đề trong cuộc sống.
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed mt-3">
              Các anh chị sẵn sàng lắng nghe, chia sẻ và hỗ trợ bạn trong quá trình tìm hiểu và tháo gỡ vấn đề.
            </p>
            <p className="text-sm text-primary font-medium mt-3">
              Liệu bạn có muốn đồng hành cùng chúng mình không nhỉ?
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setStep('directions')}
              className="w-full py-4 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 transition-colors duration-base shadow-md"
            >
              CÓ, TÔI MUỐN GẶP
            </button>
            
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-4 rounded-xl bg-neutral-200 border-2 border-neutral-400 text-neutral-700 font-bold hover:bg-neutral-300 transition-colors duration-base"
            >
              KHÔNG, QUAY LẠI TRANG CHỦ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Result 51-100% - Need counseling
  if (step === 'result-high') {
    const percentage = calculateScore();
    return (
      <div className="min-h-screen bg-neutral-300 flex items-center justify-center p-4">
        {/* Progress bar at top */}
        <div className="fixed top-0 left-0 right-0 px-4 py-3 bg-background-primary border-b border-neutral-200 z-10">
          <div className="text-sm text-neutral-500 mb-1">51-100%</div>
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="bg-background-primary rounded-3xl p-6 max-w-sm w-full shadow-lg">
          {/* Target Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold text-center text-neutral-900 mb-4 font-heading">
            Có lẽ bạn đang cần được<br />trò chuyện
          </h1>

          {/* Info box */}
          <div className="p-4 bg-accent-lighter rounded-xl border border-accent-light mb-6">
            <p className="text-sm text-neutral-700 leading-relaxed">
              Hãy đến với <span className="font-bold text-primary">Phòng Tham vấn tâm lý</span>, nơi dành cho các bạn đang băn khoăn trong việc lựa chọn ngành nghề hoặc gặp những khó khăn về cảm xúc, áp lực và các vấn đề trong cuộc sống.
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed mt-3">
              Các anh chị sẵn sàng lắng nghe, chia sẻ và hỗ trợ bạn trong quá trình tìm hiểu và tháo gỡ vấn đề.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setStep('directions')}
              className="w-full py-4 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 transition-colors duration-base shadow-md"
            >
              HÃY HƯỚNG DẪN TÔI TỚI ĐÓ
            </button>
            
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-4 rounded-xl bg-neutral-200 border-2 border-neutral-400 text-neutral-700 font-bold hover:bg-neutral-300 transition-colors duration-base"
            >
              KHÔNG, QUAY LẠI TRANG CHỦ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Directions to psychology room
  if (step === 'directions') {
    return (
      <div className="min-h-screen bg-background-secondary pb-32">
        <Header 
          title="Phòng tư vấn tâm lý" 
          onBack={() => router.push('/dashboard')} 
          showLogo
        />
        
        <div className="px-4 py-6">
          {/* Compass Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-center text-neutral-900 mb-1 font-heading">HƯỚNG DẪN ĐẾN</h2>
          <p className="text-center text-neutral-500 mb-6">Phòng Tham Vấn Tâm Lý</p>

          {/* Location Info */}
          <div className="bg-background-primary rounded-2xl p-4 shadow-card border border-neutral-100 mb-4">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-6 h-6 rounded-full bg-primary-lighter flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span className="font-bold text-neutral-900">VỊ TRÍ: Dãy A - Phòng 101</span>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-background-primary rounded-2xl p-4 shadow-card border border-neutral-100 mb-4">
            <div className="relative bg-accent-lighter rounded-xl h-40 flex items-center justify-center overflow-hidden">
              {/* Navigation arrow */}
              <div className="text-primary">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                </svg>
              </div>
              <span className="absolute top-2 right-2 text-xs bg-background-primary px-2 py-1 rounded-full shadow-sm">
                Bản đồ khuôn viên
              </span>
            </div>
            
            <div className="mt-4">
              <h3 className="font-bold text-neutral-900 text-center mb-3 font-heading">BẢN ĐỒ HƯỚNG DẪN</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span>Cổng chính</span>
                  <span className="text-primary font-medium">●</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-500">
                  <span className="ml-5">↓ 30m</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-success" />
                  <span>Phòng 101</span>
                  <span className="text-success font-medium">■</span>
                </div>
              </div>
              <p className="text-center text-xs text-neutral-400 mt-3">
                Khoảng cách: ~50m<br />
                Thời gian đi bộ: 2 phút
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-background-primary rounded-2xl p-4 shadow-card border border-neutral-100">
            <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2 font-heading">
              <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    index < 3 ? 'bg-primary' : 'bg-success'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-sm text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA - Fixed at bottom */}
        <div className="fixed bottom-0 inset-x-0 p-4 bg-background-primary border-t border-neutral-200 z-[9999]" style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-4 rounded-xl gradient-primary text-white font-bold hover:opacity-90 transition-opacity duration-base shadow-warm"
          >
            HOÀN THÀNH VÀ TIẾP TỤC
          </button>
        </div>
      </div>
    );
  }

  return null;
}
