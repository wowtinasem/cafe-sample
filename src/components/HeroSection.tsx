import React from 'react';
import { Sparkles, Clock, MapPin, ShieldCheck, ArrowDown } from 'lucide-react';
import { HERO_IMAGE, BAKERY_INFO } from '../data/bakeryData';

interface HeroSectionProps {
  onScrollToMenu: () => void;
  onScrollToSchedule: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToMenu,
  onScrollToSchedule,
}) => {
  return (
    <section id="hero" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Notice announcement bar */}
        <div className="mb-6 py-2.5 px-4 bg-[#F4EDE2] border border-[#E8DFD1] rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[#5C4D42]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#8D5325]">📢 오늘 공지</span>
            <span className="text-[#3A2B20]">{BAKERY_INFO.todayNotice}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#7A6A5E] shrink-0">
            <span>오늘 픽업 시간 {BAKERY_INFO.pickupHours}</span>
          </div>
        </div>

        {/* 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Brand copy and actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="text-xs font-semibold tracking-wider text-[#8D5325] uppercase mb-3 flex items-center gap-1.5">
              <span>연남동 동네 제빵소</span>
              <span aria-hidden="true">·</span>
              <span>당일 생산 당일 예약</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#2D231C] leading-[1.25] tracking-tight mb-4 font-serif text-balance">
              따뜻한 동네 빵집에서 전하는<br />
              <span className="text-[#8D5325]">오늘의 갓 구운 빵</span> 예약
            </h1>

            <p className="text-base text-[#68584D] leading-relaxed mb-6 max-w-xl">
              아침 6시 돌오븐에 불을 지펴 구워낸 바삭한 사워도우와 버터향 가득한 소금빵. 
              오후 늦게 퇴근길에도 원하는 빵이 품절될 걱정 없이, 
              갓 구운 온기 그대로 간편하게 픽업 예약하세요.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                onClick={onScrollToMenu}
                className="px-6 py-3 text-sm font-semibold text-[#FFFDF9] bg-[#8D5325] hover:bg-[#78441D] active:bg-[#633615] rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                <span>오늘의 빵 메뉴 예약하기</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              
              <button
                onClick={onScrollToSchedule}
                className="px-5 py-3 text-sm font-medium text-[#5C4D42] bg-[#F3ECE1] hover:bg-[#ECE3D5] rounded-xl transition-colors flex items-center gap-2 border border-[#E5DAC9]"
              >
                <Clock className="w-4 h-4 text-[#8D5325]" />
                <span>빵 나오는 시간표</span>
              </button>
            </div>

            {/* Trust points without badges (clean metadata discipline) */}
            <div className="pt-6 border-t border-[#EBE3D7] grid grid-cols-3 gap-4 text-[#5C4D42]">
              <div>
                <div className="text-lg font-bold text-[#2D231C] tabular-nums">48시간</div>
                <div className="text-xs text-[#7A6A5E] mt-0.5">천연 발효종 저온숙성</div>
              </div>
              <div>
                <div className="text-lg font-bold text-[#2D231C] tabular-nums">100%</div>
                <div className="text-xs text-[#7A6A5E] mt-0.5">AOP 프랑스 버터</div>
              </div>
              <div>
                <div className="text-lg font-bold text-[#2D231C] tabular-nums">당일소진</div>
                <div className="text-xs text-[#7A6A5E] mt-0.5">소량 한정 베이킹</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E5DAC9] shadow-sm bg-[#EFE8DC] aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px]">
              <img
                src={HERO_IMAGE}
                alt="밀꽃 베이커리 매장과 갓 구운 빵"
                className="w-full h-full object-cover object-center"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-light text-white/80">오늘 구운 신선한 빵</div>
                  <div className="text-sm font-semibold">오전 08:30 첫 번째 오븐 완료</div>
                </div>
                <span className="text-xs bg-[#8D5325] text-white px-2.5 py-1 rounded-md font-medium">
                  픽업 접수 중
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
