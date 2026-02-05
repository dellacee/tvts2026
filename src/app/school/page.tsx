'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui';
import { Header } from '@/components/layout/Header';

// Mock school data
const schools = [
  { 
    id: '1', 
    name: 'Đại học Bách khoa Hà Nội', 
    location: 'Hà Nội', 
    type: 'Công lập',
    ranking: 1,
    majors: ['Công nghệ thông tin', 'Kỹ thuật điện', 'Cơ khí'],
  },
  { 
    id: '2', 
    name: 'Đại học Kinh tế Quốc dân', 
    location: 'Hà Nội', 
    type: 'Công lập',
    ranking: 2,
    majors: ['Kinh tế', 'Kế toán', 'Marketing'],
  },
  { 
    id: '3', 
    name: 'Đại học FPT', 
    location: 'Hà Nội', 
    type: 'Tư thục',
    ranking: 5,
    majors: ['Công nghệ thông tin', 'Kinh doanh quốc tế'],
  },
  { 
    id: '4', 
    name: 'Đại học Y Hà Nội', 
    location: 'Hà Nội', 
    type: 'Công lập',
    ranking: 3,
    majors: ['Y khoa', 'Dược học'],
  },
  { 
    id: '5', 
    name: 'Đại học Ngoại thương', 
    location: 'Hà Nội', 
    type: 'Công lập',
    ranking: 4,
    majors: ['Kinh tế', 'Ngoại ngữ', 'Marketing'],
  },
  { 
    id: '6', 
    name: 'Đại học Đà Nẵng', 
    location: 'Đà Nẵng', 
    type: 'Công lập',
    ranking: 8,
    majors: ['Công nghệ thông tin', 'Kinh tế', 'Sư phạm'],
  },
];

export default function SchoolPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [showQRModal, setShowQRModal] = useState(false);

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSchool = (schoolId: string) => {
    setSelectedSchools((prev) =>
      prev.includes(schoolId) ? prev.filter((id) => id !== schoolId) : [...prev, schoolId]
    );
  };

  const handleContinue = () => {
    console.log('Selected schools:', selectedSchools);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header 
        title="Chọn Trường" 
        onBack={() => router.push('/dashboard')}
        rightAction={
          <button
            onClick={() => setShowQRModal(true)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </button>
        }
      />
      
      <div className="px-4 py-4">
        {/* Search */}
        <Input
          placeholder="Tìm kiếm trường..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />

        {/* QR Scan button */}
        <button
          onClick={() => router.push('/school/qr-scan')}
          className="mt-4 w-full p-4 bg-gradient-to-r from-primary to-red-600 rounded-xl text-white flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          <span className="font-medium">Quét QR để thêm trường</span>
        </button>

        {/* Selected count */}
        {selectedSchools.length > 0 && (
          <p className="mt-4 text-sm text-gray-500">
            Đã chọn: <span className="font-medium text-primary">{selectedSchools.length}</span> trường
          </p>
        )}

        {/* School list */}
        <div className="mt-4 space-y-3">
          {filteredSchools.map((school) => (
            <div
              key={school.id}
              onClick={() => toggleSchool(school.id)}
              className={`
                p-4 bg-white rounded-xl cursor-pointer transition-all
                ${selectedSchools.includes(school.id)
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'shadow-card hover:shadow-lg'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                    ${selectedSchools.includes(school.id)
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                    }
                  `}
                >
                  {selectedSchools.includes(school.id) && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-gray-900">{school.name}</h3>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                      #{school.ranking}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {school.location}
                    <span className="text-gray-300">•</span>
                    <span className={school.type === 'Công lập' ? 'text-blue-600' : 'text-purple-600'}>
                      {school.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {school.majors.slice(0, 3).map((major) => (
                      <span key={major} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                        {major}
                      </span>
                    ))}
                    {school.majors.length > 3 && (
                      <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                        +{school.majors.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy trường phù hợp</p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="mobile-container mx-auto">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleContinue}
            disabled={selectedSchools.length === 0}
          >
            Hoàn thành ({selectedSchools.length} đã chọn)
          </Button>
        </div>
      </div>

      {/* QR Modal */}
      <Modal isOpen={showQRModal} onClose={() => setShowQRModal(false)}>
        <ModalHeader>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Quét mã QR</h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-gray-600 text-center">
            Quét mã QR tại gian hàng của trường để nhanh chóng thêm vào danh sách quan tâm
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => {
              setShowQRModal(false);
              router.push('/school/qr-scan');
            }}
          >
            Mở máy quét
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full"
            onClick={() => setShowQRModal(false)}
          >
            Để sau
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
