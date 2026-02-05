'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { Header } from '@/components/layout/Header';

export default function QRScanPage() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    // Check camera permission
    if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then(() => setHasPermission(true))
        .catch(() => setHasPermission(false));
    }
  }, []);

  const handleManualInput = () => {
    // Navigate to manual school search
    router.push('/school');
  };

  const simulateScan = () => {
    // Simulate successful QR scan
    setScanned(true);
    setTimeout(() => {
      router.push('/school/detail/1');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header 
        title="Quét QR" 
        onBack={() => router.push('/school')}
        className="bg-transparent text-white"
      />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Camera viewfinder */}
        <div className="relative w-64 h-64 mb-8">
          {/* Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg" />
          
          {/* Scanning line animation */}
          {!scanned && hasPermission && (
            <div className="absolute inset-4 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary animate-scan" />
            </div>
          )}

          {/* Scanned success */}
          {scanned && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center animate-fade-in">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}

          {/* No permission */}
          {hasPermission === false && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm">Cần quyền truy cập camera</p>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <p className="text-white text-center mb-8">
          {scanned 
            ? 'Đã quét thành công!' 
            : 'Đưa mã QR vào khung để quét'
          }
        </p>

        {/* Demo button - In production, this would be the actual QR scanner */}
        {!scanned && (
          <Button
            variant="primary"
            onClick={simulateScan}
            className="mb-4"
          >
            [Demo] Giả lập quét QR
          </Button>
        )}
      </div>

      {/* Bottom actions */}
      <div className="p-6 safe-area-bottom">
        <Button
          variant="outline"
          size="lg"
          className="w-full bg-white/10 text-white border-white/30"
          onClick={handleManualInput}
        >
          Nhập mã thủ công
        </Button>
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(200px);
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
