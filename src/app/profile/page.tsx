'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent, Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui';
import { Header } from '@/components/layout/Header';
import { useApp } from '@/contexts/AppContext';
import { useAuthFromToken } from '@/hooks/useAuth';

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useApp();
  const { user, progress } = useAuthFromToken();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const menuItems = [
    {
      id: 'edit-profile',
      title: 'Chỉnh sửa thông tin',
      icon: (
        <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      path: '/profile/edit',
    },
    {
      id: 'my-choices',
      title: 'Lựa chọn của tôi',
      icon: (
        <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      path: '/profile/choices',
    },
    {
      id: 'test-history',
      title: 'Lịch sử trắc nghiệm',
      icon: (
        <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      path: '/profile/history',
    },
 
   
  ];

  const totalProgress = ((progress?.careerProgress || 0) + (progress?.majorProgress || 0) + (progress?.schoolProgress || 0)) / 9 * 100;

  return (
    <div className="min-h-screen bg-background-secondary">
      <Header title="Hồ sơ" onBack={() => router.push('/dashboard')} />
      
      <div className="px-4 py-6">
        {/* User Info Card */}
        <Card className="mb-6">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-warm">
                <span className="text-2xl font-bold text-white">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-neutral-900 font-heading">{user?.name || 'Người dùng'}</h2>
                <p className="text-sm text-neutral-500">{user?.email || 'email@example.com'}</p>
                <p className="text-sm text-neutral-500">{user?.school || 'Chưa cập nhật'}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-4 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-500">Tiến độ tổng</span>
                <span className="text-sm font-medium text-primary">{Math.round(totalProgress)}%</span>
              </div>
              <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-base"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className="w-full flex items-center gap-3 p-4 bg-background-primary rounded-xl shadow-card border border-neutral-100 active:scale-[0.98] transition-all duration-base hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="flex-1 text-left font-medium text-neutral-700">{item.title}</span>
              <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          size="lg"
          className="w-full mt-6 text-primary border-primary-light hover:bg-primary-lighter"
          onClick={() => setShowLogoutModal(true)}
        >
          Đăng xuất
        </Button>

        {/* App Version */}
        <p className="text-center text-xs text-neutral-400 mt-6">
          TVTS Quảng Trị 2026 - Phiên bản 1.0.0
        </p>
      </div>

      {/* Logout Modal */}
      <Modal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
        <ModalHeader>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary-lighter flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-neutral-900 font-heading">Đăng xuất?</h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-neutral-600 text-center">
            Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full"
            onClick={() => setShowLogoutModal(false)}
          >
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
