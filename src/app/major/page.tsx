'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Select } from '@/components/ui';
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
  { value: '', label: '-- Chọn ngành --' },
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

  // Get final major name
  const getFinalMajor = () => {
    if (customMajor) return customMajor;
    const found = allMajors.find(m => m.value === selectedMajor);
    return found?.label || '';
  };

  // Handle quick select popular major
  const handleQuickSelect = (majorName: string) => {
    setCustomMajor(majorName);
    setSelectedMajor('');
  };

  // Step 1: Initial - Ask if already chosen
  if (step === 'initial') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="Chọn ngành" 
          onBack={() => router.push('/dashboard')} 
          className="bg-primary text-white"
        />
        
        <div className="px-4 py-6">
          {/* Status indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
              <span className="text-sm text-gray-500 font-medium">CHƯA HOÀN THÀNH</span>
            </div>
          </div>

          {/* Target Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <span className="text-5xl">🎯</span>
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
            <Button
              variant="primary"
              size="lg"
              className="w-full bg-secondary hover:bg-secondary/90"
              onClick={() => setStep('select')}
            >
              RỒI, TÔI ĐÃ CHỌN NGÀNH
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => setStep('directions')}
            >
              CHƯA, TÔI CẦN TƯ VẤN
            </Button>
          </div>

          {/* Tip */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-sm text-gray-700">
              <span className="font-medium">💡 Gợi ý:</span> Nếu bạn chưa chắc chắn, hãy đến phòng Định Hướng Nghề Nghiệp để được tư vấn kỹ hơn
            </p>
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
          className="bg-primary text-white"
        />
        
        <div className="px-4 py-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">📋</span>
            </div>
          </div>

          {/* Title */}
          <p className="text-center text-gray-700 mb-6">
            Tuyệt vời! Hãy cho chúng tôi biết<br />
            <span className="font-bold">ngành bạn quan tâm:</span>
          </p>

          {/* Dropdown Select */}
          <div className="mb-4">
            <label className="flex items-center gap-1 text-sm text-gray-600 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Chọn ngành từ danh sách
            </label>
            <Select
              options={allMajors}
              value={selectedMajor}
              onChange={(e) => {
                setSelectedMajor(e.target.value);
                setCustomMajor('');
              }}
            />
          </div>

          {/* Popular majors - in bordered card */}
          <div className="border border-gray-200 rounded-2xl p-4 mb-4">
            <label className="flex items-center gap-1 text-sm text-gray-600 mb-3">
              <span>💡</span> Ngành phổ biến
            </label>
            <div className="grid grid-cols-2 gap-2">
              {popularMajors.map((major) => (
                <button
                  key={major}
                  onClick={() => handleQuickSelect(major)}
                  className={`px-3 py-2.5 text-sm rounded-xl border transition-all ${
                    customMajor === major
                      ? 'border-primary bg-primary/5 text-primary font-medium'
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
            <label className="flex items-center gap-1 text-sm text-gray-600 mb-2">
              <span>✏️</span> Nhập tên ngành khác
            </label>
            <Input
              placeholder="Ví dụ: Khoa học máy tính, Luật..."
              value={customMajor}
              onChange={(e) => {
                setCustomMajor(e.target.value);
                setSelectedMajor('');
              }}
            />
          </div>
        </div>

        {/* Bottom CTA - Blue button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 safe-area-bottom">
          <div className="mobile-container mx-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full !bg-blue-500 hover:!bg-blue-600"
              onClick={() => setStep('meet-professionals')}
              disabled={!selectedMajor && !customMajor}
            >
              XÁC NHẬN NGÀNH ĐÃ CHỌN
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Ask if want to meet professionals
  if (step === 'meet-professionals') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="Chọn ngành" 
          onBack={() => setStep('select')} 
          className="bg-primary text-white"
        />
        
        <div className="px-4 py-6">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <span className="text-5xl">🎯</span>
            </div>
          </div>

          {/* Question */}
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
            BẠN CÓ MUỐN GẶP<br />
            ANH CHỊ THÀNH ĐẠT<br />
            TRONG LĨNH VỰC ĐÓ?
          </h1>

          {/* Info box */}
          <div className="p-4 bg-green-50 rounded-xl border border-green-200 mb-8">
            <p className="text-sm text-gray-700">
              <span className="font-medium">💡 Phòng định hướng nghề nghiệp</span><br />
              là nơi các anh chị đang làm việc trong ngành sẽ chia sẻ kinh nghiệm thực tế, cơ hội nghề nghiệp và định hướng phát triển trong lĩnh vực mà bạn quan tâm!
            </p>
          </div>

          {/* Selected major info */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500">Ngành đã chọn:</p>
            <p className="font-bold text-primary">{getFinalMajor()}</p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full bg-secondary hover:bg-secondary/90"
              onClick={() => setStep('directions')}
            >
              CÓ, TÔI MUỐN GẶP
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => router.push('/dashboard')}
            >
              KHÔNG, QUAY LẠI TRANG CHỦ
            </Button>
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
          onBack={() => setStep('meet-professionals')} 
          className="bg-primary text-white"
        />
        
        <div className="px-4 py-6">
          {/* Compass Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center">
              <span className="text-5xl">🧭</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-center text-gray-900 mb-1">HƯỚNG DẪN ĐẾN</h2>
          <p className="text-center text-gray-500 mb-6">Phòng định hướng nghề nghiệp</p>

          {/* Location Info */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <div className="flex items-center gap-2 justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-bold text-primary">VỊ TRÍ: Dãy B - Phòng 203</span>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <div className="relative bg-blue-50 rounded-xl h-40 flex items-center justify-center overflow-hidden">
              {/* Navigation arrow */}
              <div className="text-6xl text-blue-500">
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
                  <span>Phòng 203</span>
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
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    index < 2 ? 'bg-secondary' : 'bg-blue-500'
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
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 safe-area-bottom">
          <div className="mobile-container mx-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => router.push('/dashboard')}
            >
              HOÀN THÀNH VÀ TIẾP TỤC
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
