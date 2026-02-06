'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';

// Danh sách lĩnh vực
const fields = [
  { value: 'cntt', label: 'Công nghệ thông tin' },
  { value: 'y-te', label: 'Y tế' },
  { value: 'xay-dung', label: 'Xây dựng' },
  { value: 'phap-luat', label: 'Pháp luật' },
  { value: 'kinh-doanh', label: 'Kinh doanh' },
  { value: 'giao-duc', label: 'Giáo dục' },
  { value: 'truyen-thong', label: 'Truyền thông' },
  { value: 'ky-thuat', label: 'Kỹ thuật' },
  { value: 'nghe-thuat', label: 'Nghệ thuật' },
];

export default function CareerListPage() {
  const router = useRouter();
  const [selectedField, setSelectedField] = useState('');
  const [customCareer, setCustomCareer] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);

  const handleContinue = () => {
    setShowSuggestion(true);
  };

  const handleDoTest = () => {
    // TODO: Gọi API ONET sau
    alert('Tính năng làm bài test ONET sẽ được cập nhật sớm!');
  };

  const handleSkipTest = () => {
    // Quay về dashboard
    router.push('/dashboard');
  };

  // Cả 2 ô phải được điền mới enable
  const isValid = selectedField && customCareer.trim();

  // Modal gợi ý
  if (showSuggestion) {
    return (
      <div className="min-h-screen bg-background-secondary flex items-center justify-center p-4">
        <div className="bg-background-primary rounded-3xl p-6 max-w-sm w-full shadow-warm">
          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-neutral-900 mb-4">
            GỢI Ý CHO BẠN
          </h2>

          {/* Description */}
          <p className="text-center text-neutral-600 mb-6">
            Bạn có muốn làm bài <span className="font-bold text-primary">TEST TÍNH CÁCH ONET</span> để kiểm tra mức độ phù hợp với nghề "<span className="font-bold">{customCareer}</span>" không?
          </p>

          {/* Info boxes */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-3 text-neutral-600">
              <div className="w-6 h-6 rounded-full bg-accent-lighter flex items-center justify-center">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span><strong>Thời gian:</strong> Khoảng 10 phút</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-600">
              <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span><strong>Kết quả:</strong> Phân tích tính cách chi tiết</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleDoTest}
              className="w-full py-4 rounded-xl bg-success text-white font-bold hover:bg-success/90 transition-all duration-base"
            >
              CÓ, LÀM TEST NGAY
            </button>
            
            <button
              onClick={handleSkipTest}
              className="w-full py-4 rounded-xl border-2 border-neutral-300 text-neutral-700 font-bold hover:bg-background-secondary transition-all duration-base"
            >
              KHÔNG, TÔI THẤY PHÙ HỢP RỒI
            </button>
          </div>

          {/* Back link */}
          <button
            onClick={() => setShowSuggestion(false)}
            className="w-full mt-4 text-center text-neutral-500 hover:text-neutral-700 transition-all duration-base"
          >
            ← Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-secondary pb-24">
      <Header 
        title="Chọn nghề yêu thích" 
        onBack={() => router.push('/career')} 
        showLogo
      />
      
      <div className="px-4 py-6">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-warm">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <p className="text-center text-neutral-700 mb-6">
          Tuyệt vời! Hãy cho chúng tôi biết<br />
          <span className="font-bold">nghề bạn đã chọn nhé</span>
        </p>

        {/* Dropdown Select Field */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Chọn lĩnh vực từ danh sách
          </label>
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-background-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-base"
          >
            <option value="">-- Chọn lĩnh vực --</option>
            {fields.map((field) => (
              <option key={field.value} value={field.value}>
                {field.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom career input */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Nhập tên nghề bạn yêu thích
          </label>
          <input
            type="text"
            placeholder="Ví dụ: Kiến trúc sư, Nhà báo.."
            value={customCareer}
            onChange={(e) => setCustomCareer(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-background-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-base"
          />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-primary border-t border-neutral-100">
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className={`w-full py-4 rounded-xl text-white font-bold transition-all duration-base ${
            isValid ? 'bg-primary hover:bg-primary-dark' : 'bg-neutral-300 cursor-not-allowed'
          }`}
        >
          TIẾP THEO →
        </button>
      </div>
    </div>
  );
}
