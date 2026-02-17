"use client";

import { useState, useEffect } from "react";

// --- ANA Boarding Pass ---
const DESTINATIONS = [
  { code: "JFK", city: "NEW YORK", gate: "A32" },
  { code: "LHR", city: "LONDON", gate: "B15" },
];

function getDestination() {
  return DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
}

const ENGLISH_PHRASES = [
  {
    phrase: "The only way to do great work is to love what you do.",
    translation: "偉大な仕事をする唯一の方法は、自分のやることを愛すること。",
  },
  {
    phrase: "Every accomplishment starts with the decision to try.",
    translation: "すべての達成は、挑戦するという決断から始まる。",
  },
  {
    phrase: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    translation: "成功は最終的なものではなく、失敗は致命的なものではない。大切なのは続ける勇気だ。",
  },
  {
    phrase: "Don't watch the clock; do what it does. Keep going.",
    translation: "時計を見るな。時計がしていることをしろ。進み続けろ。",
  },
  {
    phrase: "The future belongs to those who believe in the beauty of their dreams.",
    translation: "未来は、自分の夢の美しさを信じる人のものだ。",
  },
  {
    phrase: "It does not matter how slowly you go as long as you do not stop.",
    translation: "止まりさえしなければ、どんなにゆっくりでも構わない。",
  },
  {
    phrase: "Discipline is the bridge between goals and accomplishment.",
    translation: "規律は、目標と達成の間にかかる橋だ。",
  },
];

function getTodayPhrase() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return ENGLISH_PHRASES[dayOfYear % ENGLISH_PHRASES.length];
}

// --- ANA Mile Section ---
const MILE_TARGET = 50000;
const CURRENT_MILES = 12450;

export default function Dashboard() {
  const [energyReceived, setEnergyReceived] = useState(false);
  const [destination, setDestination] = useState(DESTINATIONS[0]);

  useEffect(() => {
    setDestination(getDestination());
  }, []);

  // Asset progress
  const currentAsset = 7_000_000;
  const targetAsset = 100_000_000;
  const assetPercent = (currentAsset / targetAsset) * 100;

  // ANA miles
  const milePercent = (CURRENT_MILES / MILE_TARGET) * 100;

  // Today's phrase
  const todayPhrase = getTodayPhrase();

  // Current time info
  const now = new Date();
  const hours = now.getHours();
  const isMorning = hours < 12;

  return (
    <div className="min-h-screen bg-navy-900 relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-horizon-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-gold-400/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-widest text-white mb-2">
            THE BLUE HORIZON
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-3" />
          <p className="text-sm text-navy-600 tracking-wider uppercase font-light">
            Personal Goal Dashboard
          </p>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ===== 1. Asset Progress ===== */}
          <Card className="md:col-span-2">
            <CardLabel>ASSET TARGET</CardLabel>
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-3xl font-light text-white tracking-tight">
                  ¥{currentAsset.toLocaleString()}
                </p>
                <p className="text-xs text-navy-600 mt-1">
                  / ¥{targetAsset.toLocaleString()}
                </p>
              </div>
              <p className="text-gold-400 text-2xl font-light">
                {assetPercent.toFixed(1)}%
              </p>
            </div>
            <div className="w-full h-3 bg-navy-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-horizon-blue via-horizon-light to-gold-400 transition-all duration-1000 ease-out"
                style={{ width: `${assetPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-navy-600 tracking-wider">
              <span>¥0</span>
              <span>¥25M</span>
              <span>¥50M</span>
              <span>¥75M</span>
              <span>¥100M</span>
            </div>
          </Card>

          {/* ===== ANA BOARDING PASS ===== */}
          <div className="md:col-span-2 group">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#00467F] via-[#003666] to-[#001a33] border border-[#00467F]/40 shadow-2xl shadow-[#00467F]/20">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 20px), repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 20px)`,
              }} />
              {/* Top gold strip for First Class */}
              <div className="h-1.5 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500" />

              <div className="relative p-6 md:p-8">
                {/* Header row: ANA logo area + class */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <span className="text-white font-bold text-xs tracking-wider">ANA</span>
                    </div>
                    <div>
                      <p className="text-white/60 text-[10px] tracking-[0.3em] uppercase">All Nippon Airways</p>
                      <p className="text-white text-xs tracking-wider">BOARDING PASS</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-gold-500 to-gold-300 rounded-md">
                      <p className="text-[#001a33] text-[10px] font-bold tracking-[0.25em]">FIRST CLASS</p>
                    </div>
                  </div>
                </div>

                {/* Main route display */}
                <div className="flex items-center justify-between mb-8">
                  {/* Departure */}
                  <div className="text-left">
                    <p className="text-5xl md:text-6xl font-extralight text-white tracking-tight">HND</p>
                    <p className="text-white/40 text-xs mt-1 tracking-wider">TOKYO HANEDA</p>
                  </div>

                  {/* Flight path */}
                  <div className="flex-1 mx-6 md:mx-10 flex flex-col items-center gap-2">
                    <p className="text-gold-400 text-[10px] tracking-[0.2em]">NH 1040</p>
                    <div className="w-full flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full border border-gold-400/60" />
                      <div className="flex-1 h-px bg-gradient-to-r from-gold-400/60 via-gold-400/30 to-gold-400/60 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold-400 text-lg">✈</div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-gold-400/60" />
                    </div>
                    <p className="text-white/30 text-[10px] tracking-wider">DIRECT FLIGHT</p>
                  </div>

                  {/* Arrival */}
                  <div className="text-right">
                    <p className="text-5xl md:text-6xl font-extralight text-white tracking-tight">{destination.code}</p>
                    <p className="text-white/40 text-xs mt-1 tracking-wider">{destination.city}</p>
                  </div>
                </div>

                {/* Divider with tear effect */}
                <div className="relative mb-6">
                  <div className="absolute -left-8 md:-left-10 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-navy-900" />
                  <div className="absolute -right-8 md:-right-10 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-navy-900" />
                  <div className="border-t border-dashed border-white/10" />
                </div>

                {/* Passenger & flight details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <div>
                    <p className="text-white/30 text-[9px] tracking-[0.2em] mb-1">PASSENGER</p>
                    <p className="text-white text-sm font-medium tracking-wider">NAMURO TOMOKAZU</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-[9px] tracking-[0.2em] mb-1">DATE</p>
                    <p className="text-white text-sm font-medium tracking-wider">01 JAN 2040</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-[9px] tracking-[0.2em] mb-1">GATE</p>
                    <p className="text-white text-sm font-medium tracking-wider">{destination.gate}</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-[9px] tracking-[0.2em] mb-1">SEAT</p>
                    <p className="text-gold-300 text-sm font-bold tracking-wider">1A</p>
                  </div>
                </div>

                {/* Bottom: barcode area + motivational note */}
                <div className="mt-6 pt-5 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Faux barcode */}
                  <div className="flex items-end gap-[2px] h-8 opacity-30">
                    {Array.from({ length: 40 }, (_, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-sm"
                        style={{
                          width: i % 3 === 0 ? "3px" : i % 2 === 0 ? "2px" : "1px",
                          height: `${16 + ((i * 7) % 16)}px`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-white/20 text-[10px] tracking-[0.15em] italic text-center md:text-right">
                    Your dream destination awaits — keep building.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 2. Energy Received ===== */}
          <Card>
            <CardLabel>ENERGY RECEIVED</CardLabel>
            <p className="text-xs text-navy-600 mb-6">
              {isMorning
                ? "おはようございます。今朝も5時に起きましたか？"
                : "明日の朝5時に備えましょう。"}
            </p>
            <button
              onClick={() => setEnergyReceived(true)}
              disabled={energyReceived}
              className={`
                w-full py-4 rounded-lg text-sm font-medium tracking-widest uppercase transition-all duration-500
                ${
                  energyReceived
                    ? "bg-horizon-blue/20 text-horizon-light border border-horizon-blue/30 cursor-default"
                    : "bg-gradient-to-r from-horizon-blue to-horizon-glow text-white hover:shadow-lg hover:shadow-horizon-blue/25 active:scale-[0.98]"
                }
              `}
            >
              {energyReceived ? "✓  Energy Received" : "5:00 AM — Confirm"}
            </button>
            {energyReceived && (
              <p className="text-center text-xs text-horizon-light/60 mt-3 animate-fade-in">
                Today&apos;s energy has been received. Stay focused.
              </p>
            )}
          </Card>

          {/* ===== 3. ANA Mile Progress ===== */}
          <Card>
            <CardLabel>ANA MILEAGE RUN</CardLabel>
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-2xl font-light text-white">
                  {CURRENT_MILES.toLocaleString()}
                  <span className="text-sm text-navy-600 ml-1">PP</span>
                </p>
              </div>
              <p className="text-gold-400 text-lg font-light">
                {milePercent.toFixed(1)}%
              </p>
            </div>
            <div className="w-full h-2 bg-navy-800 rounded-full overflow-hidden mb-3">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-1000 ease-out"
                style={{ width: `${milePercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-navy-600">
              <span>0 PP</span>
              <span>50,000 PP</span>
            </div>
            <div className="mt-4 pt-4 border-t border-navy-700/50">
              <div className="flex justify-between text-xs">
                <span className="text-navy-600">残り</span>
                <span className="text-gold-300">
                  {(MILE_TARGET - CURRENT_MILES).toLocaleString()} PP
                </span>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-navy-600">ターゲット</span>
                <span className="text-white/70">プラチナ</span>
              </div>
            </div>
          </Card>

          {/* ===== 4. English Phrase ===== */}
          <Card className="md:col-span-2">
            <CardLabel>TODAY&apos;S ENGLISH PHRASE</CardLabel>
            <blockquote className="text-lg text-white/90 font-light leading-relaxed italic mb-3">
              &ldquo;{todayPhrase.phrase}&rdquo;
            </blockquote>
            <p className="text-sm text-navy-600 font-light">
              {todayPhrase.translation}
            </p>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12">
          <div className="w-16 h-px bg-navy-700 mx-auto mb-4" />
          <p className="text-[10px] text-navy-600 tracking-widest uppercase">
            Stay hungry. Stay foolish.
          </p>
        </footer>
      </div>
    </div>
  );
}

// --- Reusable Components ---

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-navy-800/50 backdrop-blur-sm border border-navy-700/50 rounded-2xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] text-gold-400 tracking-[0.2em] font-medium mb-4 uppercase">
      {children}
    </p>
  );
}
