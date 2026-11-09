/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ShoppingBag, ArrowUpRight, Sparkles, Check, ChevronRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BreadCard } from './components/BreadCard';
import { BreadDetailModal } from './components/BreadDetailModal';
import { ReservationDrawer } from './components/ReservationDrawer';
import { ReservationSuccessModal } from './components/ReservationSuccessModal';
import { MyReservationsModal } from './components/MyReservationsModal';
import { BakingScheduleSection } from './components/BakingScheduleSection';
import { BakeryStorySection } from './components/BakeryStorySection';
import { StoreInfoSection } from './components/StoreInfoSection';
import { Footer } from './components/Footer';
import { INITIAL_BREADS, BAKERY_INFO } from './data/bakeryData';
import { BreadItem, BreadCategory, CartItem, Reservation } from './types/bakery';

const CATEGORIES: { id: BreadCategory; label: string }[] = [
  { id: 'all', label: '전체 메뉴' },
  { id: 'shiopan', label: '소금빵·기본빵' },
  { id: 'sourdough', label: '천연발효 사워도우' },
  { id: 'croissant', label: '크루아상·패스츄리' },
  { id: 'loaf', label: '식빵·브리오슈' },
  { id: 'dessert', label: '구움과자' },
];

export default function App() {
  const [breads, setBreads] = useState<BreadItem[]>(INITIAL_BREADS);
  const [selectedCategory, setSelectedCategory] = useState<BreadCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'stock'>('recommended');

  // Modals & Drawers state
  const [selectedBreadDetail, setSelectedBreadDetail] = useState<BreadItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMyReservationsOpen, setIsMyReservationsOpen] = useState(false);
  const [lastConfirmedReservation, setLastConfirmedReservation] = useState<Reservation | null>(null);

  // Cart & Reservations persistence in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('milkkot_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('milkkot_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('milkkot_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('milkkot_reservations', JSON.stringify(reservations));
    } catch (e) {
      console.error(e);
    }
  }, [reservations]);

  // Cart Handlers
  const handleAddToCart = (bread: BreadItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.bread.id === bread.id);
      if (existing) {
        return prev.map((item) =>
          item.bread.id === bread.id
            ? { ...item, quantity: Math.min(bread.remainingCount, item.quantity + 1) }
            : item
        );
      }
      return [...prev, { bread, quantity: 1, sliceOption: bread.sliceable ? 'medium' : 'none' }];
    });
  };

  const handleAddToCartWithSlice = (
    bread: BreadItem,
    quantity: number,
    sliceOption: 'none' | 'thin' | 'medium' | 'thick'
  ) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.bread.id === bread.id);
      if (existing) {
        return prev.map((item) =>
          item.bread.id === bread.id
            ? { ...item, quantity: Math.min(bread.remainingCount, item.quantity + quantity), sliceOption }
            : item
        );
      }
      return [...prev, { bread, quantity, sliceOption }];
    });
  };

  const handleUpdateQuantity = (breadId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(breadId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.bread.id === breadId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (breadId: string) => {
    setCartItems((prev) => prev.filter((item) => item.bread.id !== breadId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Reservation completion
  const handleCompleteReservation = (newReservation: Reservation) => {
    setReservations((prev) => [newReservation, ...prev]);
    setLastConfirmedReservation(newReservation);
    setIsCartOpen(false);

    // Deduct stock
    setBreads((prev) =>
      prev.map((b) => {
        const booked = newReservation.items.find((item) => item.bread.id === b.id);
        if (booked) {
          const nextStock = Math.max(0, b.remainingCount - booked.quantity);
          return {
            ...b,
            remainingCount: nextStock,
            status: nextStock === 0 ? 'sold_out' : nextStock <= 3 ? 'low_stock' : b.status,
          };
        }
        return b;
      })
    );
  };

  const handleCancelReservation = (reservationId: string) => {
    setReservations((prev) =>
      prev.map((r) =>
        r.id === reservationId ? { ...r, status: 'cancelled' } : r
      )
    );
  };

  // Filtered breads
  const filteredBreads = useMemo(() => {
    return breads
      .filter((bread) => {
        if (selectedCategory !== 'all' && bread.category !== selectedCategory) {
          return false;
        }
        if (onlyAvailable && (bread.status === 'sold_out' || bread.remainingCount <= 0)) {
          return false;
        }
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchesName = bread.nameKo.toLowerCase().includes(query);
          const matchesEng = bread.nameEn.toLowerCase().includes(query);
          const matchesIngredient = bread.ingredients.some((i) => i.toLowerCase().includes(query));
          const matchesTag = bread.tags.some((t) => t.toLowerCase().includes(query));
          return matchesName || matchesEng || matchesIngredient || matchesTag;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'stock') return b.remainingCount - a.remainingCount;
        return 0; // recommended original order
      });
  }, [breads, selectedCategory, onlyAvailable, searchQuery, sortBy]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2D231C] selection:bg-[#E8DFD1] selection:text-[#8D5325]">
      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMyReservations={() => setIsMyReservationsOpen(true)}
        onNavigateSection={scrollToSection}
        activeSection="menu"
      />

      <main>
        {/* Hero Section */}
        <HeroSection
          onScrollToMenu={() => scrollToSection('menu')}
          onScrollToSchedule={() => scrollToSection('schedule')}
        />

        {/* Today's Bread Menu Section */}
        <section id="menu" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold tracking-wider text-[#8D5325] uppercase mb-1">
                오늘의 라인업
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D231C] tracking-tight font-serif">
                오늘 구운 신선한 빵 예약
              </h2>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-72 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8D7665]" />
              <input
                type="text"
                placeholder="빵 이름 또는 재료 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#FFFDF9] border border-[#E5DAC9] rounded-xl focus:outline-none focus:border-[#8D5325] text-[#2D231C] shadow-2xs placeholder-[#9C8F84]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8D7665] hover:text-[#2D231C]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Interactive Category Segmented Controls & Options Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E8DFD1]">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-all ${
                      isActive
                        ? 'bg-[#8D5325] text-[#FFFDF9] font-bold shadow-xs'
                        : 'bg-[#FFFDF9] text-[#68584D] border border-[#E8DFD1] hover:bg-[#F3ECE1] hover:text-[#2D231C]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Filter & Sorting Controls */}
            <div className="flex items-center gap-3 shrink-0 text-xs">
              {/* Only available toggle */}
              <label className="flex items-center gap-1.5 cursor-pointer text-[#68584D] hover:text-[#2D231C]">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="rounded text-[#8D5325] focus:ring-[#8D5325] w-3.5 h-3.5"
                />
                <span>예약 가능만 보기</span>
              </label>

              <span className="text-[#DACFBF]">|</span>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FFFDF9] border border-[#E5DAC9] text-[#5C4D42] text-xs py-1.5 px-2.5 rounded-lg focus:outline-none focus:border-[#8D5325]"
              >
                <option value="recommended">추천순</option>
                <option value="price_asc">가격 낮은순</option>
                <option value="price_desc">가격 높은순</option>
                <option value="stock">남은 수량순</option>
              </select>
            </div>
          </div>

          {/* Bread Cards Grid */}
          {filteredBreads.length === 0 ? (
            <div className="text-center py-16 bg-[#FFFDF9] rounded-2xl border border-[#E8DFD1] p-6">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#EFE8DC] flex items-center justify-center text-xl">
                🔍
              </div>
              <p className="text-base font-bold text-[#2D231C] mb-1">
                조건에 맞는 빵이 없습니다.
              </p>
              <p className="text-xs text-[#8D7665] mb-4">
                검색어를 변경하시거나 필터 설정을 초기화해 보세요.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setOnlyAvailable(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-[#8D5325] bg-[#F4EDE2] hover:bg-[#EBE2D4] rounded-lg border border-[#E2D5C3]"
              >
                전체 메뉴 다시 보기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredBreads.map((bread) => {
                const inCart = cartItems.find((i) => i.bread.id === bread.id)?.quantity || 0;
                return (
                  <BreadCard
                    key={bread.id}
                    bread={bread}
                    quantityInCart={inCart}
                    onAddToCart={handleAddToCart}
                    onUpdateQuantity={handleUpdateQuantity}
                    onOpenDetail={setSelectedBreadDetail}
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* Baking Schedule Section */}
        <BakingScheduleSection />

        {/* Bakery Story & Philosophy */}
        <BakeryStorySection />

        {/* Store Info & Location */}
        <StoreInfoSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Mobile Cart Bar */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-30 md:hidden animate-in slide-in-from-bottom duration-200">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 bg-[#8D5325] text-white rounded-2xl shadow-xl flex items-center justify-between font-bold text-sm"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>예약 바구니 ({totalCartCount}개)</span>
            </div>
            <div className="flex items-center gap-1">
              <span>예약하러 가기</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Bread Detail Modal */}
      <BreadDetailModal
        bread={selectedBreadDetail}
        onClose={() => setSelectedBreadDetail(null)}
        onAddToCartWithSlice={handleAddToCartWithSlice}
      />

      {/* Reservation Cart & Booking Drawer */}
      <ReservationDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCompleteReservation={handleCompleteReservation}
        onClearCart={handleClearCart}
      />

      {/* Reservation Success Modal */}
      <ReservationSuccessModal
        reservation={lastConfirmedReservation}
        onClose={() => setLastConfirmedReservation(null)}
        onViewMyReservations={() => {
          setLastConfirmedReservation(null);
          setIsMyReservationsOpen(true);
        }}
      />

      {/* My Reservations Lookup Modal */}
      <MyReservationsModal
        isOpen={isMyReservationsOpen}
        onClose={() => setIsMyReservationsOpen(false)}
        reservations={reservations}
        onCancelReservation={handleCancelReservation}
      />
    </div>
  );
}
