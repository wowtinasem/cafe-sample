import React from 'react';
import { ShoppingBag, Clock, FileText, MapPin, Search } from 'lucide-react';
import { BAKERY_INFO } from '../data/bakeryData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMyReservations: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenMyReservations,
  onNavigateSection,
  activeSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#EBE3D7] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigateSection('hero')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-xl font-bold tracking-tight text-[#3A2B20] font-serif block group-hover:text-[#8D5325] transition-colors whitespace-nowrap shrink-0">
            {BAKERY_INFO.name}
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#68584D]">
          <button
            onClick={() => onNavigateSection('menu')}
            className={`whitespace-nowrap shrink-0 hover:text-[#3A2B20] transition-colors ${
              activeSection === 'menu' ? 'text-[#8D5325] font-semibold' : ''
            }`}
          >
            오늘의 빵
          </button>
          <button
            onClick={() => onNavigateSection('schedule')}
            className={`whitespace-nowrap shrink-0 hover:text-[#3A2B20] transition-colors ${
              activeSection === 'schedule' ? 'text-[#8D5325] font-semibold' : ''
            }`}
          >
            빵 나오는 시간
          </button>
          <button
            onClick={() => onNavigateSection('story')}
            className={`whitespace-nowrap shrink-0 hover:text-[#3A2B20] transition-colors ${
              activeSection === 'story' ? 'text-[#8D5325] font-semibold' : ''
            }`}
          >
            빵집 이야기
          </button>
          <button
            onClick={() => onNavigateSection('location')}
            className={`whitespace-nowrap shrink-0 hover:text-[#3A2B20] transition-colors ${
              activeSection === 'location' ? 'text-[#8D5325] font-semibold' : ''
            }`}
          >
            매장 안내
          </button>
          <button
            onClick={onOpenMyReservations}
            className="whitespace-nowrap shrink-0 text-[#8D5325] hover:text-[#6F3F1A] transition-colors font-medium flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5" />
            내 예약 조회
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenMyReservations}
            className="md:hidden p-2 text-[#68584D] hover:text-[#3A2B20] transition-colors rounded-lg"
            title="내 예약 조회"
            aria-label="내 예약 조회"
          >
            <Clock className="w-5 h-5" />
          </button>
          
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#FFFDF9] bg-[#8D5325] hover:bg-[#78441D] active:bg-[#633615] rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>예약 바구니</span>
            {cartCount > 0 && (
              <span className="flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold text-[#8D5325] bg-[#FFF8EE] rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
