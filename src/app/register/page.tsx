'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Select } from '@/components/ui';
import { Header } from '@/components/layout/Header';
import { useApp } from '@/contexts/AppContext';

const schoolOptions = [
  { value: 'thpt-dong-ha', label: 'THPT Đông Hà' },
  { value: 'thpt-vinh-linh', label: 'THPT Vĩnh Linh' },
  { value: 'thpt-gio-linh', label: 'THPT Gio Linh' },
  { value: 'thpt-cam-lo', label: 'THPT Cam Lộ' },
  { value: 'thpt-trieu-phong', label: 'THPT Triệu Phong' },
  { value: 'thpt-hai-lang', label: 'THPT Hải Lăng' },
  { value: 'thpt-le-loi', label: 'THPT Lê Lợi' },
  { value: 'thpt-chuyen-qt', label: 'THPT Chuyên Quảng Trị' },
  { value: 'other', label: 'Trường khác' },
];

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    school: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        setError('Vui lòng điền đầy đủ thông tin');
        return;
      }
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (!formData.school) {
      setError('Vui lòng chọn trường');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Mock register - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const schoolLabel = schoolOptions.find(s => s.value === formData.school)?.label || formData.school;
      
      const mockUser = {
        id: '1',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        school: schoolLabel,
      };
      
      login(mockUser);
      router.push('/dashboard');
    } catch {
      setError('Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        title="Đăng ký" 
        onBack={() => step === 1 ? router.push('/login') : setStep(1)} 
      />
      
      <div className="flex-1 px-6 pt-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-6 gap-2">
          <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-200'}`} />
          <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
          <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900">
            {step === 1 ? 'Thông tin cá nhân' : 'Tạo tài khoản'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {step === 1 ? 'Bước 1/2' : 'Bước 2/2'}
          </p>
        </div>

        <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNextStep(); } : handleSubmit}>
          {step === 1 ? (
            <div className="space-y-4">
              <Input
                label="Họ và tên"
                type="text"
                name="name"
                placeholder="Nhập họ và tên"
                value={formData.name}
                onChange={handleChange}
                required
                leftIcon={
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />

              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Nhập email của bạn"
                value={formData.email}
                onChange={handleChange}
                required
                leftIcon={
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />

              <Input
                label="Số điện thoại"
                type="tel"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                required
                leftIcon={
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                label="Mật khẩu"
                type="password"
                name="password"
                placeholder="Tạo mật khẩu (ít nhất 6 ký tự)"
                value={formData.password}
                onChange={handleChange}
                required
                leftIcon={
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />

              <Input
                label="Xác nhận mật khẩu"
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                leftIcon={
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />

              <Select
                label="Trường THPT"
                options={schoolOptions}
                value={formData.school}
                onChange={(e) => handleSelectChange('school', e.target.value)}
                placeholder="Chọn trường của bạn"
                required
              />
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
          )}

          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              {step === 1 ? 'Tiếp tục' : 'Đăng ký'}
            </Button>
          </div>
        </form>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 text-center safe-area-bottom">
        <p className="text-sm text-gray-500">
          Đã có tài khoản?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-primary font-medium hover:underline"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
}
