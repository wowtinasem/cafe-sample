import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Clock, Calendar, User, Phone, CheckCircle2, Shield, Leaf, ArrowRight } from 'lucide-react';
import { CartItem, Reservation } from '../types/bakery';
import { BAKERY_INFO } from '../data/bakeryData';

interface ReservationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (breadId: string, quantity: number) => void;
  onRemoveItem: (breadId: string) => void;
  onCompleteReservation: (reservation: Reservation) => void;
  onClearCart: () => void;
}

const PICKUP_TIMES = [
  '10:30', '11:30', '12:30', '13:30', '14:30',
  '15:30', '16:30', '17:30', '18:30', '19:30',
];

export const ReservationDrawer: React.FC<ReservationDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCompleteReservation,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [pickupDate, setPickupDate] = useState<'today' | 'tomorrow'>('today');
  const [pickupTime, setPickupTime] = useState<string>('14:30');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [ecoPackaging, setEcoPackaging] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'onsite' | 'transfer'>('onsite');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const itemsSubtotal = cartItems.reduce(
    (sum, item) => sum + item.bread.price * item.quantity,
    0
  );

  const ecoDiscount = ecoPackaging && itemsSubtotal > 0 ? 500 : 0;
  const finalPrice = Math.max(0, itemsSubtotal - ecoDiscount);

  // Phone number formatter
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length > 11) val = val.slice(0, 11);

    if (val.length <= 3) {
      setCustomerPhone(val);
    } else if (val.length <= 7) {
      setCustomerPhone(`${val.slice(0, 3)}-${val.slice(3)}`);
    } else {
      setCustomerPhone(`${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7)}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setErrorMsg('예약할 빵을 1개 이상 담아주세요.');
      return;
    }
    if (!customerName.trim()) {
      setErrorMsg('예약자 성함을 입력해 주세요.');
      return;
    }
    const rawPhone = customerPhone.replace(/[^0-9]/g, '');
    if (rawPhone.length < 10) {
      setErrorMsg('올바른 연락처(휴대폰 번호)를 입력해 주세요.');
      return;
    }

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const dateCode = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const newReservationId = `MK-${dateCode}-${randomSuffix}`;

    const dateLabel = pickupDate === 'today' ? '오늘 픽업' : '내일 픽업';

    const newReservation: Reservation = {
      id: newReservationId,
      items: [...cartItems],
      totalPrice: itemsSubtotal,
      ecoDiscount,
      finalPrice,
      pickupDate: dateLabel,
      pickupTime,
      customerName: customerName.trim(),
      customerPhone,
      ecoPackaging,
      notes: notes.trim(),
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };

    onCompleteReservation(newReservation);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#FAF6F0] h-full flex flex-col shadow-2xl border-l border-[#E5DAC9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:px-6 bg-[#FAF6F0] border-b border-[#EBE3D7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#2D231C] tracking-tight">
              오늘의 빵 픽업 예약
            </h2>
            <span className="text-xs text-[#8D7665] font-medium">
              ({cartItems.reduce((acc, i) => acc + i.quantity, 0)}개)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6A5E] hover:text-[#2D231C] rounded-lg transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Cart items list */}
          {cartItems.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#EFE8DC] flex items-center justify-center text-[#8D7665]">
                🍞
              </div>
              <p className="text-base font-semibold text-[#3A2B20] mb-1">
                예약 바구니가 비어 있습니다.
              </p>
              <p className="text-xs text-[#8D7665] mb-4">
                오늘 구워진 따뜻한 빵 메뉴를 둘러보고 원하는 수량을 담아보세요.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-[#FFFDF9] bg-[#8D5325] hover:bg-[#78441D] rounded-xl transition-all shadow-sm"
              >
                오늘의 빵 둘러보기
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#68584D]">
                <span className="font-semibold text-[#3A2B20]">담긴 빵 목록</span>
                <button
                  onClick={onClearCart}
                  className="text-xs text-[#A35D2A] hover:underline"
                >
                  전체 비우기
                </button>
              </div>

              <div className="space-y-2.5">
                {cartItems.map((item) => (
                  <div
                    key={item.bread.id}
                    className="p-3 bg-[#FFFDF9] rounded-xl border border-[#E8DFD1] flex items-center gap-3"
                  >
                    <img
                      src={item.bread.image}
                      alt={item.bread.nameKo}
                      className="w-16 h-16 rounded-lg object-cover bg-[#EFE8DC] shrink-0 border border-[#E8DFD1]"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-[#2D231C] truncate">
                        {item.bread.nameKo}
                      </div>
                      <div className="text-xs text-[#8D7665] mb-1">
                        {item.sliceOption !== 'none' ? (
                          <span className="text-[#8D5325]">
                            슬라이스: {item.sliceOption === 'medium' ? '1.5cm' : '2.0cm'}
                          </span>
                        ) : (
                          '통째로 수령'
                        )}
                      </div>
                      <div className="text-xs font-bold text-[#3A2B20] tabular-nums">
                        ₩{(item.bread.price * item.quantity).toLocaleString('ko-KR')}
                        <span className="text-[11px] font-normal text-[#8D7665] ml-1">
                          (개당 ₩{item.bread.price.toLocaleString('ko-KR')})
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.bread.id)}
                        className="text-[#9E8E81] hover:text-[#C2410C] p-1 transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1 bg-[#F5EFE6] border border-[#E5DAC9] rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.bread.id, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center rounded bg-white text-[#5C4D42] hover:bg-[#FAF6F0]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#2D231C] w-5 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.bread.id, Math.min(item.bread.remainingCount, item.quantity + 1))}
                          disabled={item.quantity >= item.bread.remainingCount}
                          className="w-5 h-5 flex items-center justify-center rounded bg-[#8D5325] text-white hover:bg-[#78441D] disabled:opacity-40"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                {/* Pickup Date & Time selection */}
                <div className="p-4 bg-[#FFFDF9] rounded-xl border border-[#E8DFD1] space-y-3">
                  <span className="text-xs font-bold text-[#3A2B20] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#8D5325]" />
                    픽업 일정 선택
                  </span>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPickupDate('today')}
                      className={`p-2.5 rounded-lg border text-center transition-all ${
                        pickupDate === 'today'
                          ? 'bg-[#FAF6F0] border-[#8D5325] text-[#8D5325] font-bold shadow-xs'
                          : 'bg-white border-[#E5DAC9] text-[#6B5A4E]'
                      }`}
                    >
                      오늘 당일 픽업
                      <span className="block text-[11px] font-normal text-[#8D7665] mt-0.5">갓 구운 신선함</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPickupDate('tomorrow')}
                      className={`p-2.5 rounded-lg border text-center transition-all ${
                        pickupDate === 'tomorrow'
                          ? 'bg-[#FAF6F0] border-[#8D5325] text-[#8D5325] font-bold shadow-xs'
                          : 'bg-white border-[#E5DAC9] text-[#6B5A4E]'
                      }`}
                    >
                      내일 오전 픽업
                      <span className="block text-[11px] font-normal text-[#8D7665] mt-0.5">내일 첫 오븐 예약</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C4D42] mb-1.5">
                      방문 예정 시간 ({BAKERY_INFO.pickupHours})
                    </label>
                    <div className="grid grid-cols-5 gap-1.5 text-xs">
                      {PICKUP_TIMES.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setPickupTime(time)}
                          className={`py-1.5 px-1 rounded-md border text-center transition-all tabular-nums ${
                            pickupTime === time
                              ? 'bg-[#8D5325] text-white font-bold border-[#8D5325]'
                              : 'bg-white border-[#E5DAC9] text-[#5C4D42] hover:bg-[#FAF6F0]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="p-4 bg-[#FFFDF9] rounded-xl border border-[#E8DFD1] space-y-3">
                  <span className="text-xs font-bold text-[#3A2B20] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#8D5325]" />
                    예약자 정보
                  </span>

                  <div>
                    <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                      예약자 성함 <span className="text-[#C2410C]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        setErrorMsg('');
                      }}
                      className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#E2D5C3] rounded-lg focus:outline-none focus:border-[#8D5325] focus:bg-white text-[#2D231C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                      휴대폰 번호 <span className="text-[#C2410C]">*</span> (픽업 알림톡 및 본인 확인용)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="010-1234-5678"
                      value={customerPhone}
                      onChange={handlePhoneChange}
                      className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#E2D5C3] rounded-lg focus:outline-none focus:border-[#8D5325] focus:bg-white text-[#2D231C] tabular-nums"
                    />
                  </div>

                  {/* Eco-friendly Bag Discount Option */}
                  <label className="flex items-center gap-2 p-2.5 bg-[#F4EDE2] rounded-lg border border-[#E5DAC9] cursor-pointer hover:bg-[#EDE3D5] transition-colors">
                    <input
                      type="checkbox"
                      checked={ecoPackaging}
                      onChange={(e) => setEcoPackaging(e.target.checked)}
                      className="rounded text-[#8D5325] focus:ring-[#8D5325] w-4 h-4"
                    />
                    <div className="flex-1 text-xs">
                      <div className="font-semibold text-[#3A2B20] flex items-center gap-1">
                        <Leaf className="w-3 h-3 text-[#2E6B47]" />
                        개인 장바구니 / 용기 지참 (-500원 할인)
                      </div>
                      <div className="text-[11px] text-[#7A6A5E]">
                        일회용 종이 쇼핑백을 줄이고 환경을 함께 지켜요.
                      </div>
                    </div>
                  </label>

                  <div>
                    <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                      픽업 요청사항 (선택)
                    </label>
                    <input
                      type="text"
                      placeholder="예: 10분 정도 늦을 수 있어요 / 봉투 2개로 나눠주세요"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#E2D5C3] rounded-lg focus:outline-none focus:border-[#8D5325] focus:bg-white text-[#2D231C]"
                    />
                  </div>
                </div>

                {/* Payment Option */}
                <div className="p-4 bg-[#FFFDF9] rounded-xl border border-[#E8DFD1] space-y-2">
                  <span className="text-xs font-bold text-[#3A2B20] block">
                    결제 방법 선택
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('onsite')}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        paymentMethod === 'onsite'
                          ? 'bg-[#FAF6F0] border-[#8D5325] text-[#8D5325] font-semibold'
                          : 'bg-white border-[#E5DAC9] text-[#6B5A4E]'
                      }`}
                    >
                      매장 현장 결제
                      <span className="block text-[11px] font-normal text-[#8D7665] mt-0.5">
                        카드 · 서울페이 · 현금
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        paymentMethod === 'transfer'
                          ? 'bg-[#FAF6F0] border-[#8D5325] text-[#8D5325] font-semibold'
                          : 'bg-white border-[#E5DAC9] text-[#6B5A4E]'
                      }`}
                    >
                      사전 계좌이체
                      <span className="block text-[11px] font-normal text-[#8D7665] mt-0.5">
                        픽업 시 즉시 수령
                      </span>
                    </button>
                  </div>
                </div>

                {/* Error message */}
                {errorMsg && (
                  <div className="p-2.5 bg-[#FEF2F2] border border-[#FECACA] rounded-lg text-xs text-[#DC2626] font-medium">
                    {errorMsg}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout CTA */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:px-6 bg-[#FAF6F0] border-t border-[#EBE3D7] space-y-3">
            <div className="space-y-1.5 text-xs text-[#68584D]">
              <div className="flex justify-between">
                <span>빵 주문 합계</span>
                <span className="font-semibold text-[#2D231C] tabular-nums">
                  ₩{itemsSubtotal.toLocaleString('ko-KR')}
                </span>
              </div>
              {ecoDiscount > 0 && (
                <div className="flex justify-between text-[#2E6B47]">
                  <span>친환경 장바구니 할인</span>
                  <span className="font-semibold tabular-nums">-₩500</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-[#E8DFD1]">
                <span className="text-sm font-bold text-[#2D231C]">최종 결제 예정 금액</span>
                <span className="text-xl font-bold text-[#8D5325] tabular-nums">
                  ₩{finalPrice.toLocaleString('ko-KR')}
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3.5 px-4 text-sm font-bold text-[#FFFDF9] bg-[#8D5325] hover:bg-[#78441D] active:bg-[#633615] rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>오늘 픽업 예약 완료하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-[#8D7665]">
              * 예약 시간 기준 30분 이내 방문하지 않으실 경우 매장 판매로 전환될 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
