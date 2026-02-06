'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui';
import { Header } from '@/components/layout/Header';

// Mock school data with images
const schools = [
  { 
    id: '1', 
    name: 'Học viện Báo chí & Tuyên truyền', 
    location: 'Hà Nội', 
    ranking: 1,
    image: '/AJC.jpg',
  },
  { 
    id: '2', 
    name: 'Học viện Ngoại giao', 
    location: 'Hà Nội', 
    ranking: 2,
    image: '/DAV.jpg',
  },
  { 
    id: '3', 
    name: 'ĐH Công nghệ Thông tin', 
    location: 'TP.HCM', 
    ranking: 3,
    image: '/UIT.jpg',
  },
  { 
    id: '4', 
    name: 'ĐH Kinh tế TP.HCM', 
    location: 'TP.HCM', 
    ranking: 4,
    image: '/UEH.jpg',
  },
  { 
    id: '5', 
    name: 'ĐH Ngoại thương', 
    location: 'Hà Nội', 
    ranking: 5,
    image: '/FTU.jpg',
  },
  { 
    id: '6', 
    name: 'ĐH Kinh tế Quốc dân', 
    location: 'Hà Nội', 
    ranking: 6,
    image: '/NEU.jpg',
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFF3E0', paddingBottom: '100px' }}>
      <Header 
        title="Chọn Trường" 
        onBack={() => router.push('/dashboard')}
        rightAction={
          <button
            onClick={() => setShowQRModal(true)}
            style={{ padding: '8px', borderRadius: '50%' }}
          >
            <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </button>
        }
      />
      
      <div style={{ padding: '16px' }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#9CA3AF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm trường..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              paddingLeft: '48px', 
              paddingRight: '16px', 
              paddingTop: '12px', 
              paddingBottom: '12px',
              borderRadius: '12px', 
              border: '2px solid #E5E7EB',
              backgroundColor: 'white',
              outline: 'none',
              fontSize: '14px'
            }}
          />
        </div>

        {/* QR Scan button */}
        <button
          onClick={() => router.push('/school/qr-scan')}
          style={{ 
            marginTop: '16px',
            width: '100%', 
            padding: '16px', 
            background: 'linear-gradient(to right, #D32F2F, #FF6F00)',
            borderRadius: '12px', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(211, 47, 47, 0.25)'
          }}
        >
          <svg style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          <span>Quét QR để thêm trường</span>
        </button>

        {/* Selected count */}
        {selectedSchools.length > 0 && (
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#6B7280' }}>
            Đã chọn: <span style={{ fontWeight: '500', color: '#D32F2F' }}>{selectedSchools.length}</span> trường
          </p>
        )}

        {/* School Grid - 2 columns */}
        <div style={{ 
          marginTop: '16px', 
          background: 'linear-gradient(to bottom right, #FFEBEE, #FFF3E0)',
          borderRadius: '16px', 
          padding: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', color: '#D32F2F', marginBottom: '12px' }}>
            Danh Sách Trường
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {filteredSchools.map((school) => (
              <div
                key={school.id}
                onClick={() => toggleSchool(school.id)}
                style={{ 
                  backgroundColor: 'white',
                  borderRadius: '12px', 
                  padding: '8px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  border: selectedSchools.includes(school.id) ? '2px solid #D32F2F' : '2px solid transparent'
                }}
              >
                {/* Image */}
                <div style={{ width: '100%', height: '80px', position: 'relative', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#F3F4F6' }}>
                  <Image
                    src={school.image}
                    alt={school.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Selected checkmark */}
                  {selectedSchools.includes(school.id) && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '8px', 
                      right: '8px', 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      backgroundColor: '#D32F2F',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {/* Ranking badge */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '8px', 
                    left: '8px', 
                    padding: '2px 8px', 
                    borderRadius: '9999px',
                    backgroundColor: '#FF6F00', 
                    color: 'white', 
                    fontSize: '10px', 
                    fontWeight: 'bold'
                  }}>
                    #{school.ranking}
                  </div>
                </div>
                
                {/* School name */}
                <p style={{ 
                  marginTop: '8px', 
                  fontSize: '11px', 
                  textAlign: 'center', 
                  color: '#1F2937', 
                  fontWeight: '500',
                  lineHeight: '1.3',
                  height: '28px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {school.name}
                </p>
                
                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '4px', fontSize: '10px', color: '#6B7280' }}>
                  <svg style={{ width: '12px', height: '12px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {school.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        padding: '16px', 
        backgroundColor: 'white',
        borderTop: '1px solid #E5E7EB'
      }}>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => router.push('/dashboard')}
          disabled={selectedSchools.length === 0}
        >
          Hoàn thành ({selectedSchools.length} đã chọn)
        </Button>
      </div>

      {/* QR Modal */}
      <Modal isOpen={showQRModal} onClose={() => setShowQRModal(false)}>
        <ModalHeader>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              margin: '0 auto 12px', 
              borderRadius: '50%', 
              backgroundColor: '#FFEBEE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '32px', height: '32px', color: '#D32F2F' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937' }}>Quét mã QR</h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <p style={{ fontSize: '14px', color: '#6B7280', textAlign: 'center' }}>
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
