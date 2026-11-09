import React from 'react';
import { BAKERY_INFO } from '../data/bakeryData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EFE8DD] border-t border-[#DFD4C4] py-12 text-[#68584D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#DFD4C4]">
          <div>
            <span className="text-xl font-bold text-[#2D231C] font-serif tracking-tight block">
              {BAKERY_INFO.name}
            </span>
            <p className="text-xs text-[#8D7665] mt-1">
              매일 아침 6시, 정직한 재료와 천연 발효종으로 굽는 동네 제빵소
            </p>
          </div>

          <div className="text-xs space-y-1 text-[#5C4D42]">
            <div>주소: {BAKERY_INFO.address}</div>
            <div>전화번호: {BAKERY_INFO.phone} · 영업시간: {BAKERY_INFO.operatingHours}</div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8D7665]">
          <div>
            © {new Date().getFullYear()} {BAKERY_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>사업자등록번호: 105-24-88902</span>
            <span>통신판매업신고: 2026-서울마포-0142</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
