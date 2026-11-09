import React from 'react';
import { Sparkles, Heart, Sun, Award } from 'lucide-react';
import { BAKERY_PHILOSOPHY, BAKERY_INFO } from '../data/bakeryData';

export const BakeryStorySection: React.FC = () => {
  return (
    <section id="story" className="py-14 sm:py-20 bg-[#FAF6F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-[#8D5325] uppercase mb-2">
            제빵 철학
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D231C] tracking-tight font-serif mb-4">
            천천히 숙성하고 정성껏 구워내는<br />
            밀꽃 베이커리의 세 가지 약속
          </h2>
          <p className="text-sm text-[#68584D] leading-relaxed">
            화려한 기교 대신 좋은 밀가루, 순수한 버터, 그리고 시간을 들인 효모의 정직함을 믿습니다. 
            우리 동네 이웃들에게 매일 아침 속 편하고 건강한 빵을 구워냅니다.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {BAKERY_PHILOSOPHY.map((pillar) => (
            <div
              key={pillar.number}
              className="p-6 bg-[#FFFDF9] rounded-2xl border border-[#E8DFD1] shadow-xs relative"
            >
              <span className="text-2xl font-bold text-[#D5C2B1] font-serif block mb-3 tabular-nums">
                {pillar.number}.
              </span>
              <h3 className="text-base font-bold text-[#2D231C] mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#68584D] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Baker's note callout */}
        <div className="p-6 sm:p-8 bg-[#F5EFE6] rounded-2xl border border-[#E5DAC9] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <div className="text-xs font-bold text-[#8D5325] uppercase flex items-center gap-1.5">
              <span>오늘 제빵장의 아침 노트</span>
            </div>
            <p className="text-sm font-medium text-[#2D231C] leading-relaxed italic font-serif">
              “오늘 연남동은 선선한 바람이 불어 사워도우 반죽이 더욱 차분하고 깊게 발효되었습니다.
              특히 소금빵 바닥의 바삭한 버터 크러스트와 브리오슈 식빵의 알밤 단맛이 참 좋습니다.”
            </p>
            <div className="text-xs text-[#7A6A5E] pt-1">
              — 헤드 베이커 이민우
            </div>
          </div>

          <div className="shrink-0 p-4 bg-[#FFFDF9] rounded-xl border border-[#E8DFD1] text-xs text-[#5C4D42] space-y-1">
            <div className="font-bold text-[#2D231C]">당일 픽업 안내</div>
            <div>• 예약 시간 30분 전 포장 완료</div>
            <div>• 따뜻한 보온 백 보관 서비스</div>
          </div>
        </div>
      </div>
    </section>
  );
};
