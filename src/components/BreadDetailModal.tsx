import React, { useState } from 'react';
import { X, Check, Utensils, Flame, Sparkles, Plus, Minus, ShoppingBag } from 'lucide-react';
import { BreadItem } from '../types/bakery';

interface BreadDetailModalProps {
  bread: BreadItem | null;
  onClose: () => void;
  onAddToCartWithSlice: (bread: BreadItem, quantity: number, sliceOption: 'none' | 'thin' | 'medium' | 'thick') => void;
}

export const BreadDetailModal: React.FC<BreadDetailModalProps> = ({
  bread,
  onClose,
  onAddToCartWithSlice,
}) => {
  if (!bread) return null;

  const [quantity, setQuantity] = useState(1);
  const [sliceOption, setSliceOption] = useState<'none' | 'thin' | 'medium' | 'thick'>(
    bread.sliceable ? 'medium' : 'none'
  );

  const isSoldOut = bread.status === 'sold_out' || bread.remainingCount <= 0;

  const handleAdd = () => {
    onAddToCartWithSlice(bread, quantity, sliceOption);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-2xl border border-[#E5DAC9] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="p-4 sm:px-6 flex items-center justify-between border-b border-[#F0E8DC] bg-[#FAF6F0]">
          <span className="text-xs font-semibold tracking-wider text-[#8D5325] uppercase">
            빵 상세 안내 & 픽업 가이드
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6A5E] hover:text-[#2D231C] rounded-lg transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top image & headline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EFE8DC] border border-[#E8DFD1]">
              <img
                src={bread.image}
                alt={bread.nameKo}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#8D7665] mb-1">
                  <span>{bread.bakeTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>남은 수량 {bread.remainingCount}개</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#2D231C] tracking-tight mb-1">
                  {bread.nameKo}
                </h2>
                <p className="text-xs text-[#8D7665] font-serif italic mb-3">
                  {bread.nameEn}
                </p>
                <div className="text-2xl font-bold text-[#8D5325] tabular-nums mb-4">
                  ₩{bread.price.toLocaleString('ko-KR')}
                </div>
              </div>

              <div className="p-3 bg-[#F8F2E8] rounded-xl border border-[#EDE2D2] text-xs text-[#5C4D42]">
                <span className="font-semibold text-[#8D5325] block mb-1">제빵사의 한마디:</span>
                <p className="leading-relaxed">{bread.details}</p>
              </div>
            </div>
          </div>

          {/* Slicing Selection if sliceable */}
          {bread.sliceable && (
            <div className="p-4 bg-[#F5EFE6] rounded-xl border border-[#E8DFD1]">
              <label className="block text-xs font-bold text-[#3A2B20] mb-2">
                커팅(슬라이스) 옵션 선택
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSliceOption('none')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    sliceOption === 'none'
                      ? 'bg-white border-[#8D5325] text-[#8D5325] font-bold shadow-sm'
                      : 'bg-[#FAF6F0] border-[#E2D5C3] text-[#6B5A4E] hover:bg-white'
                  }`}
                >
                  통째로 받기
                  <span className="block text-[11px] font-normal text-[#8D7665] mt-0.5">식감 유지 추천</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSliceOption('medium')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    sliceOption === 'medium'
                      ? 'bg-white border-[#8D5325] text-[#8D5325] font-bold shadow-sm'
                      : 'bg-[#FAF6F0] border-[#E2D5C3] text-[#6B5A4E] hover:bg-white'
                  }`}
                >
                  기본 슬라이스 (1.5cm)
                  <span className="block text-[11px] font-normal text-[#8D7665] mt-0.5">토스트·샌드위치용</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSliceOption('thick')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    sliceOption === 'thick'
                      ? 'bg-white border-[#8D5325] text-[#8D5325] font-bold shadow-sm'
                      : 'bg-[#FAF6F0] border-[#E2D5C3] text-[#6B5A4E] hover:bg-white'
                  }`}
                >
                  두툼 슬라이스 (2.0cm)
                  <span className="block text-[11px] font-normal text-[#8D7665] mt-0.5">프렌치토스트용</span>
                </button>
              </div>
            </div>
          )}

          {/* Taste Pairing & Reheat Tips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#FAF6F0] rounded-xl border border-[#EBE3D7]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#3A2B20] mb-2">
                <Utensils className="w-4 h-4 text-[#8D5325]" />
                <span>페어링 추천</span>
              </div>
              <p className="text-xs text-[#68584D] leading-relaxed">
                {bread.pairingNote}
              </p>
            </div>

            <div className="p-4 bg-[#FAF6F0] rounded-xl border border-[#EBE3D7]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#3A2B20] mb-2">
                <Flame className="w-4 h-4 text-[#8D5325]" />
                <span>맛있게 다시 데우는 법</span>
              </div>
              <p className="text-xs text-[#68584D] leading-relaxed">
                {bread.reheatTip}
              </p>
            </div>
          </div>

          {/* Ingredients list */}
          <div>
            <span className="text-xs font-bold text-[#3A2B20] block mb-2">
              전체 원재료 및 알레르기 유발 정보
            </span>
            <div className="flex flex-wrap gap-2">
              {bread.ingredients.map((ing) => (
                <span 
                  key={ing}
                  className="text-xs px-2.5 py-1 bg-[#F4EDE2] text-[#5C4D42] rounded-lg border border-[#E8DFD1]"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Action */}
        <div className="p-4 sm:px-6 bg-[#FAF6F0] border-t border-[#EBE3D7] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-[#F3ECE1] border border-[#E5DAC9] rounded-xl p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-[#5C4D42] hover:bg-[#FAF6F0] active:scale-95 disabled:opacity-40 transition-all"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-[#2D231C] w-8 text-center tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(bread.remainingCount, q + 1))}
              disabled={quantity >= bread.remainingCount}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#8D5325] text-white hover:bg-[#78441D] active:scale-95 disabled:opacity-40 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-[#8D7665] block">합계 금액</span>
              <span className="text-lg font-bold text-[#2D231C] tabular-nums">
                ₩{(bread.price * quantity).toLocaleString('ko-KR')}
              </span>
            </div>

            <button
              onClick={handleAdd}
              disabled={isSoldOut}
              className="px-6 py-3 text-sm font-semibold text-[#FFFDF9] bg-[#8D5325] hover:bg-[#78441D] active:bg-[#633615] rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isSoldOut ? '예약 마감' : '예약 바구니에 담기'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
