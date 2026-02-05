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
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      path: '/profile/edit',
    },
    {
      id: 'my-choices',
      title: 'Lựa chọn của tôi',
      icon: (
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      path: '/profile/choices',
    },
    {
      id: 'test-history',
      title: 'Lịch sử trắc nghiệm',
      icon: (
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      path: '/profile/history',
    },
    {
      id: 'settings',
      title: 'Cài đặt',
      icon: (
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      path: '/profile/settings',
    },
    {
      id: 'help',
      title: 'Trợ giúp',
      icon: (
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      path: '/profile/help',
    },
  ];

  const totalProgress = ((progress?.careerProgress || 0) + (progress?.majorProgress || 0) + (progress?.schoolProgress || 0)) / 9 * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Hồ sơ" onBack={() => router.push('/dashboard')} />
      
      <div className="px-4 py-6">
        {/* User Info Card */}
        <Card className="mb-6">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">{user?.name || 'Người dùng'}</h2>
                <p className="text-sm text-gray-500">{user?.email || 'email@example.com'}</p>
                <p className="text-sm text-gray-500">{user?.school || 'Chưa cập nhật'}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Tiến độ tổng</span>
                <span className="text-sm font-medium text-primary">{Math.round(totalProgress)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
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
              className="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow-card active:scale-[0.98] transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="flex-1 text-left font-medium text-gray-700">{item.title}</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          size="lg"
          className="w-full mt-6 text-red-500 border-red-200 hover:bg-red-50"
          onClick={() => setShowLogoutModal(true)}
        >
          Đăng xuất
        </Button>

        {/* App Version */}
        <p className="text-center text-xs text-gray-400 mt-6">
          TVTS Quảng Trị 2026 - Phiên bản 1.0.0
        </p>
      </div>

      {/* Logout Modal */}
      <Modal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
        <ModalHeader>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Đăng xuất?</h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-gray-600 text-center">
            Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            size="lg"
            className="w-full bg-red-500 hover:bg-red-600"
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
