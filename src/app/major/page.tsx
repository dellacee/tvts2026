'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';

// Popular majors for quick select
const popularMajors = [
  'Công nghệ thông tin',
  'Kinh tế',
  'Y - Dược',
  'Kỹ thuật',
  'Ngoại ngữ',
  'Sư phạm',
];

// All majors for dropdown
const allMajors = [
  { value: 'cntt', label: 'Công nghệ thông tin' },
  { value: 'kinh-te', label: 'Kinh tế' },
  { value: 'ke-toan', label: 'Kế toán' },
  { value: 'y-khoa', label: 'Y khoa' },
  { value: 'duoc-hoc', label: 'Dược học' },
  { value: 'ngoai-ngu', label: 'Ngoại ngữ' },
  { value: 'luat', label: 'Luật' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'kien-truc', label: 'Kiến trúc' },
  { value: 'su-pham', label: 'Sư phạm' },
  { value: 'ky-thuat', label: 'Kỹ thuật' },
  { value: 'dieu-duong', label: 'Điều dưỡng' },
  { value: 'quan-tri', label: 'Quản trị kinh doanh' },
  { value: 'truyen-thong', label: 'Truyền thông đa phương tiện' },
];

type Step = 'initial' | 'select' | 'meet-professionals' | 'directions';

export default function MajorPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('initial');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [customMajor, setCustomMajor] = useState('');

  // Handle quick select popular major
  const handleQuickSelect = (majorName: string) => {
    setCustomMajor(majorName);
    setSelectedMajor('');
  };

  // Validation: Chỉ cần 1 trong 2 được điền
  const isValid = selectedMajor || customMajor.trim();

  // Step 1: Initial - Ask if already chosen
  if (step === 'initial') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="Chọn ngành" 
          onBack={() => router.push('/dashboard')} 
          showLogo
        />
        
        <div className="px-4 py-6">
          {/* Status indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
              <span className="text-sm text-gray-500 font-medium">CHƯA HOÀN THÀNH</span>
            </div>
          </div>

          {/* Logo Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-red-400 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>

          {/* Question */}
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            BẠN ĐÃ CHỌN ĐƯỢC<br />NGÀNH HỌC CHƯA?
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Ngành học sẽ quyết định con đường sự nghiệp của bạn
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setStep('select')}
              className="w-full py-4 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors"
            >
              RỒI, TÔI ĐÃ CHỌN NGÀNH
            </button>
            
            <button
              onClick={() => setStep('directions')}
              className="w-full py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
            >
              CHƯA, TÔI CẦN TƯ VẤN
            </button>
          </div>

          {/* Tip */}
          <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Gợi ý:</span> Nếu bạn chưa chắc chắn, hãy đến phòng Định Hướng Nghề Nghiệp để được tư vấn kỹ hơn
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Select major
  if (step === 'select') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <Header 
          title="Chọn ngành học" 
          onBack={() => setStep('initial')} 
          showLogo
        />
        
        <div className="px-4 py-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-red-400 rounded-2xl flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <p className="text-center text-gray-700 mb-6">
            Tuyệt vời! Hãy cho chúng tôi biết<br />
            <span className="font-bold">ngành bạn quan tâm:</span>
          </p>

          {/* Dropdown Select */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Chọn ngành từ danh sách
            </label>
            <select
              value={selectedMajor}
              onChange={(e) => {
                setSelectedMajor(e.target.value);
                if (e.target.value) setCustomMajor('');
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-red-500"
            >
              <option value="">-- Chọn ngành --</option>
              {allMajors.map((major) => (
                <option key={major.value} value={major.value}>
                  {major.label}
                </option>
              ))}
            </select>
          </div>

          {/* Popular majors - in bordered card */}
          <div className="border border-gray-200 rounded-2xl p-4 mb-4">
            <label className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Ngành phổ biến
            </label>
            <div className="grid grid-cols-2 gap-2">
              {popularMajors.map((major) => (
                <button
                  key={major}
                  onClick={() => handleQuickSelect(major)}
                  className={`px-3 py-2.5 text-sm rounded-xl border transition-all ${
                    customMajor === major
                      ? 'border-red-500 bg-red-50 text-red-500 font-medium'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {major}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">Hoặc</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Custom input */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Nhập tên ngành khác
            </label>
            <input
              type="text"
              placeholder="Ví dụ: Khoa học máy tính, Luật..."
              value={customMajor}
              onChange={(e) => {
                setCustomMajor(e.target.value);
                if (e.target.value) setSelectedMajor('');
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Bottom CTA - Blue button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
          <button
            onClick={() => setStep('meet-professionals')}
            disabled={!isValid}
            className={`w-full py-4 rounded-xl text-white font-bold transition-colors ${
              isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            XÁC NHẬN NGÀNH ĐÃ CHỌN
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Ask if want to meet professionals
  if (step === 'meet-professionals') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-lg">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-green-400 flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>

          {/* Question */}
          <h1 className="text-xl font-bold text-center text-gray-900 mb-4">
            BẠN CÓ MUỐN GẶP<br />
            ANH CHỊ THÀNH ĐẠT<br />
            TRONG LĨNH VỰC ĐÓ?
          </h1>

          {/* Info box */}
          <div className="p-4 bg-green-50 rounded-xl border border-green-200 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Phòng định hướng nghề nghiệp</span> là nơi các anh chị đang làm việc trong ngành sẽ chia sẻ kinh nghiệm thực tế, cơ hội nghề nghiệp và định hướng phát triển trong lĩnh vực mà bạn quan tâm!
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setStep('directions')}
              className="w-full py-4 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors"
            >
              CÓ, TÔI MUỐN GẶP
            </button>
            
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
            >
              KHÔNG, QUAY LẠI TRANG CHỦ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Directions to guidance room
  if (step === 'directions') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <Header 
          title="Phòng định hướng nghề nghiệp" 
          onBack={() => router.push('/dashboard')} 
          showLogo
        />
        
        <div className="px-4 py-6">
          {/* Compass Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-center text-gray-900 mb-1">HƯỚNG DẪN ĐẾN</h2>
          <p className="text-center text-gray-500 mb-6">Phòng định hướng nghề nghiệp</p>

          {/* Location Info */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <div className="flex items-center gap-2 justify-center">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="font-bold text-red-500">VỊ TRÍ: Dãy B - Phòng 203</span>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <div className="relative bg-blue-50 rounded-xl h-40 flex items-center justify-center overflow-hidden">
              {/* Navigation arrow */}
              <div className="text-blue-500">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                </svg>
              </div>
              <span className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded-full shadow-sm">
                Bản đồ khuôn viên
              </span>
            </div>
            
            <div className="mt-4">
              <h3 className="font-bold text-gray-900 text-center mb-2">BẢN ĐỒ HƯỚNG DẪN</h3>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Vị trí bạn</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Phòng 205</span>
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">
                Khoảng cách: ~80m<br />
                Thời gian đi bộ: 3 phút
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              KHI ĐẾN PHÒNG ĐỊNH HƯỚNG
            </h3>
            <div className="space-y-3">
              {[
                'Gặp gỡ người đi trước trong ngành',
                'Nghe tư vấn về lộ trình phát triển',
                'Kết nối và xây dựng mạng lưới',
                'Tìm hiểu về công việc thực tế',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white shrink-0 ${
                    index < 2 ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
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
