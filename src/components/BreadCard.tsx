import React from 'react';
import { Plus, Minus, Info, Check, AlertCircle } from 'lucide-react';
import { BreadItem } from '../types/bakery';

interface BreadCardProps {
  bread: BreadItem;
  quantityInCart: number;
  onAddToCart: (bread: BreadItem) => void;
  onUpdateQuantity: (breadId: string, quantity: number) => void;
  onOpenDetail: (bread: BreadItem) => void;
}

export const BreadCard: React.FC<BreadCardProps> = ({
  bread,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  onOpenDetail,
}) => {
  const isSoldOut = bread.status === 'sold_out' || bread.remainingCount <= 0;
  const isLowStock = bread.status === 'low_stock' || (bread.remainingCount > 0 && bread.remainingCount <= 4);

  return (
    <article className="group bg-[#FFFDF9] rounded-2xl border border-[#E8DFD1] overflow-hidden flex flex-col justify-between hover:border-[#D5C6B1] hover:shadow-md transition-all duration-200">
      <div>
        {/* Product Image Slot */}
        <div 
          onClick={() => onOpenDetail(bread)}
          className="relative aspect-[4/3] bg-[#EFE8DC] overflow-hidden cursor-pointer"
        >
          <img
            src={bread.image}
            alt={bread.nameKo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Bake time stamp */}
          <div className="absolute top-3 left-3 bg-[#FAF6F0]/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-medium text-[#4A3B30] border border-[#E8DFD1]">
            {bread.bakeTime}
          </div>

          {/* Stock state */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
            <span className="bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded text-white/90">
              {isSoldOut ? (
                '오늘 예약 마감'
              ) : isLowStock ? (
                `마감 임박 (남은 수량 ${bread.remainingCount}개)`
              ) : (
                `예약 가능 ${bread.remainingCount}개`
              )}
            </span>
            <span className="text-white/80 hover:text-white transition-colors flex items-center gap-1 text-[11px] underline underline-offset-2">
              상세보기
            </span>
          </div>
        </div>

        {/* Content info */}
        <div className="p-4 sm:p-5">
          {/* Unboxed metadata tags */}
          <div className="flex items-center gap-1.5 text-xs text-[#8D7665] mb-1.5 flex-wrap">
            {bread.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span>{tag}</span>
                {idx < bread.tags.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>

          <h3 
            onClick={() => onOpenDetail(bread)}
            className="text-lg font-bold text-[#2D231C] tracking-tight hover:text-[#8D5325] cursor-pointer transition-colors"
          >
            {bread.nameKo}
          </h3>
          <p className="text-xs text-[#8D7665] font-serif italic mb-2">
            {bread.nameEn}
          </p>

          <p className="text-xs text-[#68584D] line-clamp-2 leading-relaxed mb-3">
            {bread.description}
          </p>

          {/* Key ingredients brief */}
          <div className="text-[11px] text-[#7A6A5E] bg-[#F7F2EA] px-2.5 py-1.5 rounded-lg border border-[#EFE7DB]">
            <span className="font-semibold text-[#5A493D]">주요 재료: </span>
            <span>{bread.ingredients.slice(0, 3).join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Footer: Price & Reservation Actions */}
      <div className="p-4 sm:p-5 pt-0">
        <div className="pt-3 border-t border-[#F0E8DC] flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-[#8D7665] block">예약 단가</span>
            <span className="text-lg font-bold text-[#2D231C] tabular-nums">
              ₩{bread.price.toLocaleString('ko-KR')}
            </span>
          </div>

          {/* Action buttons */}
          {isSoldOut ? (
            <button
              disabled
              className="px-4 py-2 text-xs font-semibold text-[#9C8F84] bg-[#EBE3D7] rounded-xl cursor-not-allowed"
            >
              예약 마감
            </button>
          ) : quantityInCart > 0 ? (
            <div className="flex items-center gap-2 bg-[#F3ECE1] border border-[#E5DAC9] rounded-xl p-1">
              <button
                onClick={() => onUpdateQuantity(bread.id, quantityInCart - 1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-[#5C4D42] hover:bg-[#FAF6F0] active:scale-95 transition-all"
                aria-label="수량 감소"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-[#2D231C] w-6 text-center tabular-nums">
                {quantityInCart}
              </span>
              <button
                onClick={() => onUpdateQuantity(bread.id, Math.min(bread.remainingCount, quantityInCart + 1))}
                disabled={quantityInCart >= bread.remainingCount}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#8D5325] text-white hover:bg-[#78441D] active:scale-95 disabled:opacity-50 transition-all"
                aria-label="수량 증가"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(bread)}
              className="px-4 py-2 text-xs font-semibold text-[#FFFDF9] bg-[#8D5325] hover:bg-[#78441D] active:bg-[#633615] rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>예약 담기</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
