import React from 'react';
import { CheckCircle2, Clock, MapPin, Calendar, Receipt, Download, X } from 'lucide-react';
import { Reservation } from '../types/bakery';
import { BAKERY_INFO } from '../data/bakeryData';

interface ReservationSuccessModalProps {
  reservation: Reservation | null;
  onClose: () => void;
  onViewMyReservations: () => void;
}

export const ReservationSuccessModal: React.FC<ReservationSuccessModalProps> = ({
  reservation,
  onClose,
  onViewMyReservations,
}) => {
  if (!reservation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FFFDF9] rounded-2xl border border-[#E5DAC9] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 bg-[#FAF6F0] border-b border-[#EBE3D7] flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-[#2E6B47] uppercase flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            예약 접수가 정상 완료되었습니다
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6A5E] hover:text-[#2D231C] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Main banner */}
          <div className="text-center pb-2">
            <div className="w-12 h-12 rounded-full bg-[#EBF5EE] text-[#2E6B47] mx-auto flex items-center justify-center mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#2D231C] tracking-tight">
              맛있는 빵을 정성껏 구워 준비해둘게요!
            </h3>
            <p className="text-xs text-[#7A6A5E] mt-1">
              예약 확인 알림이 입력하신 연락처({reservation.customerPhone})로 등록되었습니다.
            </p>
          </div>

          {/* Ticket Card */}
          <div className="p-4 bg-[#FBF8F3] rounded-xl border border-[#E8DFD1] space-y-4">
            <div className="flex items-center justify-between border-b border-dashed border-[#DACFBF] pb-3">
              <div>
                <span className="text-[11px] text-[#8D7665] block">예약 식별 번호</span>
                <span className="text-base font-bold text-[#8D5325] tracking-wider font-mono">
                  {reservation.id}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#8D7665] block">픽업 예정 시간</span>
                <span className="text-sm font-bold text-[#2D231C] tabular-nums">
                  {reservation.pickupDate} · {reservation.pickupTime}
                </span>
              </div>
            </div>

            {/* Simulated barcode for store pickup */}
            <div className="py-2 text-center bg-white rounded-lg border border-[#EFE7DB]">
              <div className="flex justify-center items-center gap-1 h-10 px-4">
                {[4, 2, 6, 2, 8, 3, 5, 2, 7, 3, 2, 9, 3, 5, 2, 6, 3, 7, 2, 4, 3, 8].map((w, i) => (
                  <div
                    key={i}
                    className="bg-[#2D231C] h-full"
                    style={{ width: `${w * 1.5}px` }}
                  />
                ))}
              </div>
              <div className="text-[10px] tracking-widest text-[#7A6A5E] font-mono mt-1">
                PICKUP PIN: {reservation.id}
              </div>
            </div>

            {/* Bread items summary */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold text-[#3A2B20] block">예약 빵 내역</span>
              {reservation.items.map((item) => (
                <div key={item.bread.id} className="flex justify-between text-[#5C4D42]">
                  <div>
                    <span>{item.bread.nameKo}</span>
                    <span className="text-[#8D7665] ml-1">× {item.quantity}</span>
                    {item.sliceOption !== 'none' && (
                      <span className="text-[11px] text-[#8D5325] ml-1">
                        ({item.sliceOption === 'medium' ? '1.5cm' : '2.0cm'} 컷)
                      </span>
                    )}
                  </div>
                  <span className="tabular-nums font-medium">
                    ₩{(item.bread.price * item.quantity).toLocaleString('ko-KR')}
                  </span>
                </div>
              ))}

              <div className="pt-2 border-t border-[#E8DFD1] flex justify-between font-bold text-sm text-[#2D231C]">
                <span>최종 결제 금액</span>
                <span className="text-[#8D5325] tabular-nums">
                  ₩{reservation.finalPrice.toLocaleString('ko-KR')}
                  <span className="text-xs font-normal text-[#8D7665] ml-1">
                    ({reservation.paymentMethod === 'onsite' ? '현장 결제' : '계좌이체'})
                  </span>
                </span>
              </div>
            </div>

            {/* Store Location */}
            <div className="pt-3 border-t border-dashed border-[#DACFBF] text-xs text-[#68584D] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#3A2B20]">
                <MapPin className="w-3.5 h-3.5 text-[#8D5325]" />
                <span>{BAKERY_INFO.name} ({BAKERY_INFO.address})</span>
              </div>
              <p className="text-[11px] text-[#8D7665]">
                매장 카운터에서 성함({reservation.customerName}) 또는 예약번호를 말씀해 주세요.
              </p>
            </div>
          </div>
        </div>

        {/* Modal actions */}
        <div className="p-4 sm:px-6 bg-[#FAF6F0] border-t border-[#EBE3D7] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onViewMyReservations}
            className="text-xs font-semibold text-[#8D5325] hover:underline flex items-center gap-1"
          >
            내 예약 목록에서 확인하기
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#8D5325] hover:bg-[#78441D] rounded-xl transition-all shadow-sm"
          >
            확인 완료
          </button>
        </div>
      </div>
    </div>
  );
};
