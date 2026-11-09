import React, { useState } from 'react';
import { X, Search, Clock, MapPin, AlertCircle, Trash2, CheckCircle2 } from 'lucide-react';
import { Reservation } from '../types/bakery';
import { BAKERY_INFO } from '../data/bakeryData';

interface MyReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onCancelReservation: (id: string) => void;
}

export const MyReservationsModal: React.FC<MyReservationsModalProps> = ({
  isOpen,
  onClose,
  reservations,
  onCancelReservation,
}) => {
  if (!isOpen) return null;

  const [searchPhone, setSearchPhone] = useState('');

  const filteredReservations = searchPhone.trim()
    ? reservations.filter((r) => r.customerPhone.includes(searchPhone.trim()))
    : reservations;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#FFFDF9] rounded-2xl border border-[#E5DAC9] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 bg-[#FAF6F0] border-b border-[#EBE3D7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#8D5325]" />
            <h2 className="text-base font-bold text-[#2D231C]">
              내 빵 예약 조회 및 관리
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6A5E] hover:text-[#2D231C] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter / Search input */}
        <div className="p-4 sm:px-6 bg-[#FAF6F0] border-b border-[#EBE3D7]">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8D7665]" />
            <input
              type="text"
              placeholder="예약 시 입력한 휴대폰 번호로 검색 (예: 010-1234-5678)"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E2D5C3] rounded-lg focus:outline-none focus:border-[#8D5325] text-[#2D231C]"
            />
          </div>
        </div>

        {/* List of reservations */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredReservations.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#EFE8DC] flex items-center justify-center text-[#8D7665]">
                📋
              </div>
              <p className="text-sm font-semibold text-[#3A2B20] mb-1">
                조회된 예약 내역이 없습니다.
              </p>
              <p className="text-xs text-[#8D7665]">
                {searchPhone ? '전화번호를 다시 확인해 주세요.' : '오늘의 빵 메뉴에서 픽업 예약을 접수해 보세요.'}
              </p>
            </div>
          ) : (
            filteredReservations.map((res) => {
              const isCancelled = res.status === 'cancelled';

              return (
                <div
                  key={res.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isCancelled
                      ? 'bg-[#F7F2EA] border-[#E5DAC9] opacity-70'
                      : 'bg-[#FFFDF9] border-[#E5DAC9] shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-[#F0E8DC] pb-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#8D5325]">
                          {res.id}
                        </span>
                        <span className="text-xs text-[#8D7665]">
                          ({res.createdAt})
                        </span>
                      </div>
                      <div className="text-xs font-medium text-[#3A2B20] mt-0.5">
                        예약자: {res.customerName} ({res.customerPhone})
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-semibold inline-block ${
                          isCancelled
                            ? 'bg-[#E5DAC9] text-[#7A6A5E]'
                            : 'bg-[#EBF5EE] text-[#2E6B47]'
                        }`}
                      >
                        {isCancelled ? '예약 취소됨' : '예약 확정 (준비중)'}
                      </span>
                    </div>
                  </div>

                  {/* Pickup timing */}
                  <div className="text-xs text-[#5C4D42] mb-3 flex items-center gap-1.5 bg-[#FAF6F0] p-2 rounded-lg border border-[#EFE7DB]">
                    <Clock className="w-3.5 h-3.5 text-[#8D5325]" />
                    <span>픽업 예정 시간:</span>
                    <strong className="text-[#2D231C]">{res.pickupDate} {res.pickupTime}</strong>
                  </div>

                  {/* Item breakdown */}
                  <div className="space-y-1.5 text-xs text-[#5C4D42] mb-3">
                    {res.items.map((item) => (
                      <div key={item.bread.id} className="flex justify-between">
                        <span>
                          {item.bread.nameKo} × {item.quantity}
                          {item.sliceOption !== 'none' && (
                            <span className="text-[#8D5325] ml-1">
                              ({item.sliceOption === 'medium' ? '1.5cm' : '2.0cm'} 슬라이스)
                            </span>
                          )}
                        </span>
                        <span className="tabular-nums font-medium">
                          ₩{(item.bread.price * item.quantity).toLocaleString('ko-KR')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing footer & cancel button */}
                  <div className="pt-2.5 border-t border-[#F0E8DC] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#8D7665]">결제 예정: </span>
                      <span className="font-bold text-[#2D231C] tabular-nums">
                        ₩{res.finalPrice.toLocaleString('ko-KR')}
                      </span>
                      <span className="text-[#8D7665] ml-1">
                        ({res.paymentMethod === 'onsite' ? '현장결제' : '계좌이체'})
                      </span>
                    </div>

                    {!isCancelled && (
                      <button
                        onClick={() => {
                          if (window.confirm('정말 예약을 취소하시겠습니까?')) {
                            onCancelReservation(res.id);
                          }
                        }}
                        className="text-[#C2410C] hover:underline flex items-center gap-1 text-xs"
                      >
                        <Trash2 className="w-3 h-3" />
                        예약 취소하기
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 bg-[#FAF6F0] border-t border-[#EBE3D7] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-[#5C4D42] bg-[#EFE8DC] hover:bg-[#E5DAC9] rounded-xl transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
