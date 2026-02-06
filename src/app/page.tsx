'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui';

const universities = [
  { id: 'AJC', name: 'Học viện Báo chí & Tuyên truyền', logo: '/AJC.jpg' },
  { id: 'DAV', name: 'Học viện Ngoại giao', logo: '/DAV.jpg' },
  { id: 'UIT', name: 'ĐH Công nghệ Thông tin', logo: '/UIT.jpg' },
  { id: 'UEH', name: 'ĐH Kinh tế TP.HCM', logo: '/UEH.jpg' },
  { id: 'FTU', name: 'ĐH Ngoại thương', logo: '/FTU.jpg' },
  { id: 'NEU', name: 'ĐH Kinh tế Quốc dân', logo: '/NEU.jpg' },
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-background-primary">
      {/* Top section with warm gradient background */}
      <div className="flex-1 relative gradient-subtle">
        {/* Logo/Banner Area */}
        <div className="pt-10 px-6 text-center">
          {/* Event Logo */}
         <div className="mx-auto mb-4 flex justify-center">
  <Image
    src="/logo-tvts.png"
    alt="TVTS Logo"
    width={200} // Kích thước tối đa
    height={200}
    className="w-full max-w-[200px] h-auto object-contain" 
    priority
  />
</div>
          
          {/* Event Title with gradient text */}
          <h1 className="text-2xl font-extrabold text-neutral-900 leading-tight font-heading">
            Ngày Hội Tư Vấn<br />
            Tuyển Sinh
          </h1>
          <p className="mt-2 gradient-text font-bold text-lg font-heading">
            Định Hướng Nghề Nghiệp
          </p>
         
          
        </div>

        {/* Student Ambassadors Section */}
        <div className="mt-6 px-4">
          <div className="bg-gradient-to-br from-primary-lighter to-accent-lighter rounded-2xl p-4 shadow-card">
            <h3 className="text-center text-sm font-bold text-primary mb-3">
               Đại Sứ Sinh Viên 
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {universities.map((uni) => (
                <div 
                  key={uni.id}
                  className="bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-all duration-base hover:scale-105 cursor-pointer"
                >
                  <div className="w-full aspect-square relative rounded-lg overflow-hidden bg-neutral-50">
                    <Image
                      src={uni.logo}
                      alt={uni.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <p className="mt-1.5 text-[10px] text-center text-neutral-700 font-medium leading-tight line-clamp-2">
                    {uni.name}
                  </p>
                </div>
              ))}
            </div>
             <h3 className="text-center text-sm font-bold text-primary mb-3">
              ... 
            </h3>
          </div>
        </div>

        
      </div>

      {/* Bottom CTA with warm design */}
      <div className="p-6 bg-background-primary safe-area-bottom">
        <Button
          variant="primary"
          size="lg"
          className="w-full uppercase tracking-wider"
          onClick={() => router.push('/login')}
        >
          CHECK-IN NGAY
        </Button>
        
        <p className="mt-4 text-center text-sm text-neutral-500">
          Đã có tài khoản?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-primary font-semibold hover:text-primary-dark hover:underline transition-colors"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
}
