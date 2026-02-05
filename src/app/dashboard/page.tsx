'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import Image from 'next/image';

export default function DashboardPage() {
  const router = useRouter();
  const { state } = useApp();
  const { user, progress } = state;

  // Generate lucky number based on user or random
  const luckyNumber = useMemo(() => {
    if (user?.id) {
      // Generate consistent number from user id
      const hash = user.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return String(hash % 10000).padStart(4, '0');
    }
    return String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  }, [user?.id]);

  // Calculate completed tasks
  const completedTasks = [
    (progress?.careerProgress || 0) >= 1,
    (progress?.majorProgress || 0) >= 1,
    (progress?.schoolProgress || 0) >= 1,
  ].filter(Boolean).length;

  const progressItems = [
    {
      id: 'career',
      title: 'CHỌN NGHỀ',
      description: 'Làm bài test tính cách ONET',
      path: '/career',
      completed: (progress?.careerProgress || 0) >= 1,
    },
    {
      id: 'major',
      title: 'CHỌN NGÀNH',
      description: 'Tư vấn ngành học phù hợp',
      path: '/major',
      completed: (progress?.majorProgress || 0) >= 1,
    },
    {
      id: 'school',
      title: 'CHỌN TRƯỜNG',
      description: 'Gặp đại sứ sinh viên các trường',
      path: '/school',
      completed: (progress?.schoolProgress || 0) >= 1,
    },
  ];

  const utilityItems = [
    {
      id: 'psychology',
      title: 'Tham vấn tâm lý',
      path: '/psychology',
      icon: (
        <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      bgColor: 'bg-amber-50',
    },
    {
      id: 'feedback',
      title: 'Góp ý chương trình',
      path: '/feedback',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      bgColor: 'bg-blue-50',
    },
    {
      id: 'food',
      title: 'Khu ẩm thực',
      path: '/utilities/food',
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-orange-50',
    },
    {
      id: 'games',
      title: 'Khu trò chơi',
      path: '/utilities/games',
      icon: (
        <svg className="w-8 h-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-pink-50',
    },
    {
      id: 'music',
      title: 'Khu âm nhạc',
      path: '/utilities/music',
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      bgColor: 'bg-purple-50',
    },
    {
      id: 'locations',
      title: 'Bản đồ',
      path: '/locations',
      icon: (
        <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      bgColor: 'bg-teal-50',
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Overlay for transparency */}
      <div className="fixed inset-0 z-0 bg-white/70" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <Image src="/logo-tvts.png" alt="TVTS Logo" width={200} height={200} className="object-contain" />
          {/* <div className="flex flex-col">
            <span className="text-primary text-[10px] font-medium leading-tight">TƯ VẤN TUYỂN SINH QUẢNG TRỊ</span>
            <h1 className="text-primary font-bold text-sm italic leading-tight">CHUYẾN BAY ĐẦU TIÊN</h1>
          </div> */}
        </div>
        <div className="flex items-center gap-3">
          {/* <button className="p-2">
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button> */}
          <button onClick={() => router.push('/profile')} className="p-2">
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </header>
      
      <div className="px-4 pb-6">
        {/* Welcome Section */}
        <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-red-400 flex items-center justify-center text-white font-bold text-lg">
              {(user?.name || 'N')[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Chào {user?.name || 'Nguyễn Văn A'}!
              </h2>
              <p className="text-sm text-gray-500">Học sinh</p>
            </div>
          </div>

          {/* Lucky Number Card with QR */}
          <div className="mt-4 bg-primary rounded-2xl p-4 text-white relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs opacity-90">STT May mắn của bạn</p>
                <p className="text-3xl font-bold mt-1">#{luckyNumber}</p>
                <p className="text-xs mt-2 opacity-80 max-w-[160px]">
                  Lưu số này để tham gia bốc thăm trúng thưởng!
                </p>
              </div>
              {/* QR Code placeholder */}
              <div className="w-24 h-24 bg-white rounded-lg p-2 flex items-center justify-center">
                <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h1v1h-1v-1zm-3 0h1v3h-1v1h-1v-1h-1v-1h1v-1h1v-1zm4 0h1v1h1v3h-1v1h-1v-2h-1v-1h1v-2zm-4 4h1v2h-1v1h-1v-1h-1v-1h2v-1zm2 0h1v1h-1v-1zm-7-4h1v1h-1v-1zm0 4h1v1h-1v-1z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-gray-900 tracking-wider">TIẾN ĐỘ HOÀN THÀNH</h3>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i < completedTasks ? 'bg-primary' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{completedTasks}/3</span>
            </div>
          </div>

          <div className="space-y-3">
            {progressItems.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-transform text-left"
              >
                {/* Checkmark Circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  item.completed 
                    ? 'bg-secondary' 
                    : 'bg-gray-100'
                }`}>
                  <svg 
                    className={`w-5 h-5 ${item.completed ? 'text-white' : 'text-gray-400'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500 truncate">{item.description}</p>
                </div>

                {/* Arrow */}
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Utilities Section */}
        <div className="mt-6">
          <h3 className="text-base font-bold text-gray-900 tracking-wider mb-3">TIỆN ÍCH KHÁC</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {utilityItems.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`${item.bgColor} rounded-2xl p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform min-h-[100px]`}
              >
                {item.icon}
                <span className="text-sm font-medium text-gray-700 text-center">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
