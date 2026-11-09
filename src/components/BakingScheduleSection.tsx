import React from 'react';
import { Clock, Flame, CheckCircle, Sparkles } from 'lucide-react';
import { BAKING_SCHEDULE } from '../data/bakeryData';

interface BakingScheduleSectionProps {
  onSelectScheduleBreads?: (breadIds: string[]) => void;
}

export const BakingScheduleSection: React.FC<BakingScheduleSectionProps> = ({
  onSelectScheduleBreads,
}) => {
  return (
    <section id="schedule" className="py-12 sm:py-16 bg-[#F5EFE6] border-y border-[#E8DFD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-[#8D5325] uppercase mb-1 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              <span>오븐 시간표</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D231C] tracking-tight font-serif">
              오늘의 빵 나오는 시간표
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7A6A5E] max-w-md leading-relaxed">
            매일 정해진 시간에 갓 구워져 나오는 따뜻한 빵입니다. 
            원하시는 출하 시간에 맞춰 픽업 시간을 예약하시면 가장 맛있는 온도로 만나보실 수 있습니다.
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {BAKING_SCHEDULE.map((item, index) => {
            const isFinished = item.status === 'finished';
            const isInOven = item.status === 'in_oven';
            
            return (
              <div
                key={item.id}
                className="bg-[#FFFDF9] rounded-2xl p-4 sm:p-5 border border-[#E8DFD1] shadow-xs flex flex-col justify-between hover:border-[#D5C6B1] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-[#8D5325] tabular-nums font-mono">
                      {item.time}
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                        isFinished
                          ? 'bg-[#EBF5EE] text-[#2E6B47]'
                          : isInOven
                          ? 'bg-[#FEF3C7] text-[#92400E]'
                          : 'bg-[#F3ECE1] text-[#7A6A5E]'
                      }`}
                    >
                      {isFinished ? '출하 완료' : isInOven ? '오븐 베이킹 중' : '출하 예정'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#2D231C] mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#68584D] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0E8DC] text-[11px] text-[#8D7665] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#8D5325]" />
                  <span>예약 후 지정 시간 픽업</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
