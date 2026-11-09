import React, { useState } from 'react';
import { MapPin, Phone, Clock, AlertTriangle, Car, Copy, Check } from 'lucide-react';
import { BAKERY_INFO } from '../data/bakeryData';

export const StoreInfoSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(BAKERY_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="py-14 sm:py-20 bg-[#F5EFE6] border-t border-[#E8DFD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-10">
          <div className="text-xs font-semibold tracking-wider text-[#8D5325] uppercase mb-1">
            찾아오시는 길 & 매장 안내
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D231C] tracking-tight font-serif">
            따뜻한 빵 냄새를 따라 걸어오세요
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left card: Operating information */}
          <div className="lg:col-span-7 bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#E8DFD1] shadow-xs space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Address */}
              <div className="space-y-1">
                <span className="text-xs text-[#8D7665] font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8D5325]" />
                  매장 주소
                </span>
                <p className="text-sm font-bold text-[#2D231C]">
                  {BAKERY_INFO.address}
                </p>
                <button
                  onClick={handleCopyAddress}
                  className="text-xs text-[#8D5325] hover:underline flex items-center gap-1 pt-0.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#2E6B47]" />
                      <span className="text-[#2E6B47] font-medium">주소 복사 완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>주소 복사하기</span>
                    </>
                  )}
                </button>
              </div>

              {/* Operating Hours */}
              <div className="space-y-1">
                <span className="text-xs text-[#8D7665] font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8D5325]" />
                  영업 및 픽업 시간
                </span>
                <p className="text-sm font-bold text-[#2D231C]">
                  {BAKERY_INFO.operatingHours}
                </p>
                <p className="text-xs text-[#7A6A5E]">
                  픽업 예약 가능: {BAKERY_INFO.pickupHours}
                </p>
              </div>

              {/* Telephone */}
              <div className="space-y-1">
                <span className="text-xs text-[#8D7665] font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#8D5325]" />
                  매장 연락처
                </span>
                <a
                  href={`tel:${BAKERY_INFO.phone}`}
                  className="text-sm font-bold text-[#2D231C] hover:text-[#8D5325] block tabular-nums"
                >
                  {BAKERY_INFO.phone}
                </a>
                <p className="text-xs text-[#7A6A5E]">
                  단체 주문 및 픽업 시간 변경 문의
                </p>
              </div>

              {/* Parking */}
              <div className="space-y-1">
                <span className="text-xs text-[#8D7665] font-semibold flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[#8D5325]" />
                  주차 및 정차 안내
                </span>
                <p className="text-sm font-bold text-[#2D231C]">
                  픽업 시 매장 앞 5분 정차 가능
                </p>
                <p className="text-xs text-[#7A6A5E]">
                  인근 연남 공영주차장 도보 2분
                </p>
              </div>
            </div>

            {/* Pickup Reservation Steps */}
            <div className="pt-6 border-t border-[#F0E8DC]">
              <span className="text-xs font-bold text-[#3A2B20] block mb-3">
                빵 예약 픽업 3단계 안내
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EFE7DB]">
                  <span className="font-bold text-[#8D5325] block mb-1">01. 메뉴 & 시간 선택</span>
                  <span className="text-[#68584D]">원하는 빵과 커팅 옵션, 방문 예정 시간을 선택합니다.</span>
                </div>
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EFE7DB]">
                  <span className="font-bold text-[#8D5325] block mb-1">02. 갓 구운 보온 포장</span>
                  <span className="text-[#68584D]">제빵사가 시간에 맞춰 바삭하게 식혀 정성스레 포장합니다.</span>
                </div>
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EFE7DB]">
                  <span className="font-bold text-[#8D5325] block mb-1">03. 대기 없는 즉시 픽업</span>
                  <span className="text-[#68584D]">줄 설 필요 없이 카운터에서 예약번호 말씀 후 바로 수령!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right card: Cozy Map Preview Container */}
          <div className="lg:col-span-5 bg-[#FAF6F0] rounded-2xl p-6 border border-[#E8DFD1] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#3A2B20]">
                  연남동 베이커리 골목길 맵
                </span>
                <span className="text-[11px] text-[#8D7665]">
                  홍대입구역 3번 출구 도보 8분
                </span>
              </div>

              {/* Styled Map Graphic Illustration */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#EAE2D5] border border-[#DDD3C3] flex items-center justify-center p-4">
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#8D5325_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative text-center p-4 bg-white/90 backdrop-blur-xs rounded-xl shadow-xs border border-[#E0D5C5] max-w-xs">
                  <div className="w-8 h-8 rounded-full bg-[#8D5325] text-white flex items-center justify-center mx-auto mb-2 shadow-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-[#2D231C]">
                    밀꽃 베이커리 (본점)
                  </div>
                  <div className="text-[11px] text-[#7A6A5E] mt-0.5">
                    연남동 숲길공원 인근 벽돌 건물 1층
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-[#FFFDF9] rounded-xl border border-[#E8DFD1] text-xs text-[#5C4D42]">
                <span className="font-bold text-[#8D5325] block mb-0.5">💡 예약 시 유의사항</span>
                당일 생산 빵의 특성상 픽업 시간 경과 30분 후에는 최상의 바삭함을 위해 일반 고객에게 판매될 수 있습니다. 늦으실 경우 매장으로 미리 전화 부탁드립니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
