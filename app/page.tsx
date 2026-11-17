"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Volume2,
  VolumeX,
  Sparkles,
  Heart,
  CheckCircle,
  Gift,
  ChevronDown,
} from "lucide-react";

// =========================================================================
// 👑 تاریخ اور وقت تبدیل کرنے کی جگہ (100% Working Live Timer)
// =========================================================================
const WEDDING_CONFIG = {
  // 1. کارڈ پر نظر آنے والی تحریر
  displayDate: "Monday, 28 December 2026",
  displayTime: "07:30 PM Sharp",

  // 2. ٹائمر کی تاریخ (ہمیشہ موجودہ سال یا اگلا سال رکھیں تاکہ ٹائمر چلے)
  targetYear: 2026,
  targetMonth: 12, // مہینہ: 12 (دسمبر)
  targetDay: 28, // دن: 28
  targetHour: 19, // شام 7 بجے (19)
  targetMinute: 30, // 30 منٹ

  // 3. نام
  groomName: "Ali",
  groomParents: "Son of Mr. & Mrs. Ahmed",
  brideName: "Ayesha",
  brideParents: "Daughter of Mr. & Mrs. Hassan",

  // 4. وینیو
  venueName: "Royal Palm Golf & Country Club",
  venueAddress: "Bab-e-Azam Grand Marquee, Canal Bank Road, Lahore",
  mapsLink: "https://maps.google.com",
};

// ================= 1. INTERACTIVE SCRATCH BOX COMPONENT =================
function RoyalScratchBox({ onRevealed }: { onRevealed?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#E5C158");
    grad.addColorStop(0.25, "#FFF7DE");
    grad.addColorStop(0.5, "#C49A2D");
    grad.addColorStop(0.75, "#FBF1CF");
    grad.addColorStop(1, "#997316");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(120, 80, 10, 0.45)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    ctx.font = "bold 12px 'Cinzel Decorative', serif";
    ctx.fillStyle = "#4A3205";
    ctx.textAlign = "center";
    ctx.fillText("✧ SCRATCH WITH LOVE ✧", width / 2, height / 2 - 4);

    ctx.font = "italic 13px 'Cormorant Garamond', serif";
    ctx.fillStyle = "#63470E";
    ctx.fillText(
      "Touch & scratch to reveal secret note",
      width / 2,
      height / 2 + 18,
    );
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    if (!isScratched) {
      setIsScratched(true);
      if (onRevealed) onRevealed();
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "330px",
        height: "125px",
        margin: "0 auto",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(196, 154, 45, 0.28)",
        border: "1.5px solid #D4AF37",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #FFFDF8 0%, #FAF0D6 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        <Sparkles size={18} color="#9E2A2B" style={{ marginBottom: "4px" }} />
        <h4
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "19px",
            color: "#6E1B1C",
            margin: "0 0 4px 0",
            fontWeight: 700,
          }}
        >
          VIP Guest Table Reserved
        </h4>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "13px",
            fontStyle: "italic",
            color: "#5C4A38",
            margin: 0,
          }}
        >
          "Your auspicious presence is the most cherished gift for our new
          life."
        </p>
      </div>

      <canvas
        ref={canvasRef}
        width={330}
        height={125}
        onMouseDown={(e) => {
          isDrawing.current = true;
          scratch(e.clientX, e.clientY);
        }}
        onMouseMove={(e) => {
          if (isDrawing.current) scratch(e.clientX, e.clientY);
        }}
        onMouseUp={() => (isDrawing.current = false)}
        onTouchMove={(e) => {
          if (e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          cursor: "grab",
          touchAction: "none",
        }}
      />
    </div>
  );
}

// ================= 2. SWANS LAKE ANIMATION (HEART SHAPE) =================
function SwansLakeAnimation() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "480px",
        height: "230px",
        margin: "10px auto 15px auto",
        borderRadius: "180px 180px 20px 20px",
        overflow: "hidden",
        border: "1.5px solid #DFC9AC",
        boxShadow:
          "inset 0 0 30px rgba(0,0,0,0.05), 0 15px 35px rgba(180, 140, 100, 0.18)",
        background:
          "linear-gradient(180deg, #FDF7ED 0%, #F5E8D3 35%, #DCECF5 75%, #CCE0ED 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <svg
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          opacity: 0.35,
          pointerEvents: "none",
        }}
        viewBox="0 0 400 240"
        fill="none"
      >
        <rect
          x="25"
          y="30"
          width="20"
          height="180"
          fill="#A88B6E"
          opacity="0.35"
          rx="2"
        />
        <rect
          x="18"
          y="20"
          width="34"
          height="12"
          fill="#8C6E52"
          opacity="0.45"
          rx="2"
        />
        <rect
          x="355"
          y="30"
          width="20"
          height="180"
          fill="#A88B6E"
          opacity="0.35"
          rx="2"
        />
        <rect
          x="348"
          y="20"
          width="34"
          height="12"
          fill="#8C6E52"
          opacity="0.45"
          rx="2"
        />
        <path
          d="M35 30 C35 -15, 365 -15, 365 30"
          stroke="#8C6E52"
          strokeWidth="4"
          fill="none"
        />
      </svg>

      <motion.div
        animate={{
          scale: [0.9, 1.15, 0.9],
          y: [-2, -10, -2],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "95px",
          zIndex: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#9E2A2B",
        }}
      >
        <Heart size={26} fill="#9E2A2B" stroke="none" />
        <span
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "9px",
            letterSpacing: "0.2em",
            fontWeight: 700,
            color: "#6E1B1C",
            marginTop: "2px",
          }}
        >
          ETERNAL LOVE
        </span>
      </motion.div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "110px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 6,
        }}
      >
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: -26, opacity: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, -3.5, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="98" height="98" viewBox="0 0 100 100" fill="none">
              <path
                d="M28 65 C40 58, 75 58, 86 68 C89 71, 85 82, 65 83 C45 83, 18 80, 20 72 C21 68, 24 65, 28 65 Z"
                fill="#FFFFFF"
                stroke="#D6C4B0"
                strokeWidth="1.2"
              />
              <path
                d="M45 64 C55 55, 75 58, 80 68 C68 68, 55 68, 45 64 Z"
                fill="#FAF7F2"
                stroke="#E5D6C5"
                strokeWidth="0.8"
              />
              <path
                d="M30 68 C20 54, 22 36, 38 26 C48 18, 59 22, 61 32 C62 38, 58 44, 55 48 C51 53, 44 60, 42 66"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M30 68 C20 54, 22 36, 38 26 C48 18, 59 22, 61 32 C62 38, 58 44, 55 48 C51 53, 44 60, 42 66"
                fill="none"
                stroke="#DEC9B0"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <polygon points="61,32 70,35 62,37" fill="#E88338" />
              <circle cx="59" cy="31" r="1.5" fill="#221B17" />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 26, opacity: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          style={{ transform: "scaleX(-1)" }}
        >
          <motion.div
            animate={{ y: [0, -3.5, 0] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          >
            <svg width="98" height="98" viewBox="0 0 100 100" fill="none">
              <path
                d="M28 65 C40 58, 75 58, 86 68 C89 71, 85 82, 65 83 C45 83, 18 80, 20 72 C21 68, 24 65, 28 65 Z"
                fill="#FFFFFF"
                stroke="#D6C4B0"
                strokeWidth="1.2"
              />
              <path
                d="M45 64 C55 55, 75 58, 80 68 C68 68, 55 68, 45 64 Z"
                fill="#FAF7F2"
                stroke="#E5D6C5"
                strokeWidth="0.8"
              />
              <path
                d="M30 68 C20 54, 22 36, 38 26 C48 18, 59 22, 61 32 C62 38, 58 44, 55 48 C51 53, 44 60, 42 66"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M30 68 C20 54, 22 36, 38 26 C48 18, 59 22, 61 32 C62 38, 58 44, 55 48 C51 53, 44 60, 42 66"
                fill="none"
                stroke="#DEC9B0"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <polygon points="61,32 70,35 62,37" fill="#E88338" />
              <circle cx="59" cy="31" r="1.5" fill="#221B17" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      <div
        style={{
          width: "100%",
          height: "24px",
          background:
            "linear-gradient(180deg, rgba(200, 225, 238, 0.7) 0%, rgba(160, 198, 220, 0.95) 100%)",
          borderTop: "1.5px solid rgba(255,255,255,0.7)",
        }}
      />
    </div>
  );
}

// ================= 3. MAIN WEDDING CARD COMPONENT =================
export default function RealisticLuxuryWeddingCard() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🔥 100% Guaranteed Live Real-Time Countdown Logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date construct
    const targetDate = new Date(
      WEDDING_CONFIG.targetYear,
      WEDDING_CONFIG.targetMonth - 1, // JS Months are 0-indexed
      WEDDING_CONFIG.targetDay,
      WEDDING_CONFIG.targetHour,
      WEDDING_CONFIG.targetMinute,
      0,
    ).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Agar date guzar jaye toh 00 rahe
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime(); // Immediate run on mount
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerRoyalShower = () => {
    const colors = ["#FADBD8", "#FFF2D1", "#F6DDDF", "#FFFFFF", "#E8C87A"];
    for (let i = 0; i < 85; i++) {
      const petal = document.createElement("div");
      petal.style.position = "fixed";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.top = "-25px";
      petal.style.width = Math.random() * 14 + 8 + "px";
      petal.style.height = Math.random() * 18 + 10 + "px";
      petal.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      petal.style.zIndex = "99999";
      petal.style.pointerEvents = "none";
      petal.style.borderRadius = "80% 0 80% 0";
      petal.style.boxShadow = "0 0 10px rgba(220, 180, 140, 0.4)";
      petal.style.transition =
        "transform 3.8s cubic-bezier(0.2, 0.8, 0.25, 1), opacity 3.8s ease";
      document.body.appendChild(petal);

      setTimeout(() => {
        petal.style.transform = `translate(${
          Math.random() * 220 - 110
        }px, 105vh) rotate(${Math.random() * 720}deg)`;
        petal.style.opacity = "0";
      }, 20);

      setTimeout(() => petal.remove(), 3900);
    }
  };

  const handleUnlockPalace = () => {
    setIsUnlocked(true);
    triggerRoyalShower();
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Audio play blocked:", e));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim()) {
      setIsSubmitted(true);
      triggerRoyalShower();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        backgroundColor: "#F6F1E8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isUnlocked ? "40px 12px 100px 12px" : "16px",
      }}
    >
      <audio ref={audioRef} src="/sajna.mp3" loop preload="auto" />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Amiri:wght@700&display=swap"
      />

      <style>{`
        @keyframes floatRays {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
          100% { transform: translateY(0px); }
        }
        @keyframes waxPulseGlow {
          0%, 100% {
            box-shadow: 0 14px 40px rgba(138, 38, 38, 0.45), 0 0 0 1.5px rgba(255,255,255,0.7);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 20px 55px rgba(138, 38, 38, 0.75), 0 0 0 3px rgba(255,255,255,0.9);
            transform: scale(1.04);
          }
        }
        .envelope-shadow {
          box-shadow: 0 30px 90px rgba(120, 90, 60, 0.28), 0 10px 30px rgba(0, 0, 0, 0.08);
        }
        .grand-card-shadow {
          box-shadow: 0 35px 95px rgba(160, 120, 80, 0.22), 0 10px 30px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      {/* Luxury Ambient Silk Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 35%, #FFFFFF 0%, #F9F4EB 55%, #EFE4D2 100%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Floating Music Button */}
      {isUnlocked && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={toggleMusic}
          style={{
            position: "fixed",
            bottom: "26px",
            right: "26px",
            zIndex: 9999,
            backgroundColor: "#FFFFFF",
            border: "1.5px solid #C4A265",
            borderRadius: "50px",
            padding: "10px 18px",
            display: "flex",
            alignItems: "center",
            gap: "9px",
            cursor: "pointer",
            color: "#4A3B2C",
            boxShadow: "0 10px 25px rgba(196, 162, 101, 0.28)",
            backdropFilter: "blur(8px)",
          }}
        >
          {isPlaying ? (
            <>
              <Volume2 size={18} color="#9E2A2B" />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  color: "#9E2A2B",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Music Playing
              </span>
            </>
          ) : (
            <>
              <VolumeX size={18} color="#8F8175" />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  color: "#8F8175",
                  textTransform: "uppercase",
                }}
              >
                Music Paused
              </span>
            </>
          )}
        </motion.button>
      )}

      {/* ================= 1. STARTING SCREEN: 100% REALISTIC ENVELOPE ================= */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.35,
              filter: "blur(20px)",
              transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
            }}
            transition={{ duration: 1 }}
            style={{
              position: "relative",
              zIndex: 50,
              width: "100%",
              maxWidth: "420px",
              height: "640px",
              borderRadius: "26px",
              background: "#FBF7EF",
              border: "1.5px solid #D9C5A7",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              cursor: "pointer",
            }}
            className="envelope-shadow"
            onClick={handleUnlockPalace}
          >
            {/* Fine Paper Texture Pattern */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(#CBB799 0.75px, transparent 0.75px)",
                backgroundSize: "20px 20px",
                opacity: 0.25,
                pointerEvents: "none",
              }}
            />

            {/* Embossed Flowers */}
            <div
              style={{
                position: "absolute",
                left: "-10px",
                top: "22%",
                height: "60%",
                width: "90px",
                pointerEvents: "none",
                opacity: 0.45,
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 300" fill="none">
                <path
                  d="M10 20 Q50 80 20 150 T40 280"
                  stroke="#877054"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="45"
                  cy="70"
                  r="12"
                  fill="#E8DEC8"
                  stroke="#877054"
                  strokeWidth="1"
                />
                <circle
                  cx="35"
                  cy="130"
                  r="10"
                  fill="#E8DEC8"
                  stroke="#877054"
                  strokeWidth="1"
                />
                <circle
                  cx="50"
                  cy="200"
                  r="14"
                  fill="#E8DEC8"
                  stroke="#877054"
                  strokeWidth="1"
                />
              </svg>
            </div>

            <div
              style={{
                position: "absolute",
                right: "-10px",
                top: "22%",
                height: "60%",
                width: "90px",
                pointerEvents: "none",
                opacity: 0.45,
                transform: "scaleX(-1)",
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 300" fill="none">
                <path
                  d="M10 20 Q50 80 20 150 T40 280"
                  stroke="#877054"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="45"
                  cy="70"
                  r="12"
                  fill="#E8DEC8"
                  stroke="#877054"
                  strokeWidth="1"
                />
                <circle
                  cx="35"
                  cy="130"
                  r="10"
                  fill="#E8DEC8"
                  stroke="#877054"
                  strokeWidth="1"
                />
                <circle
                  cx="50"
                  cy="200"
                  r="14"
                  fill="#E8DEC8"
                  stroke="#877054"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Top Triangular Flap */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "340px",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background:
                  "linear-gradient(180deg, #FFFDF8 0%, #F5EDE0 70%, #EADDC9 100%)",
                filter: "drop-shadow(0 14px 22px rgba(80, 55, 30, 0.18))",
                zIndex: 4,
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 340"
                fill="none"
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                <g
                  stroke="#7D6548"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  opacity="0.85"
                >
                  <path d="M50 15 Q110 90 180 280" />
                  <path d="M80 60 C105 50 115 35 120 20" />
                  <ellipse
                    cx="120"
                    cy="20"
                    rx="6"
                    ry="3"
                    fill="#E2D4BC"
                    stroke="#7D6548"
                  />
                  <path d="M105 110 C135 100 145 80 150 65" />
                  <ellipse
                    cx="150"
                    cy="65"
                    rx="7"
                    ry="4"
                    fill="#E2D4BC"
                    stroke="#7D6548"
                  />
                  <path d="M135 170 C165 160 175 140 180 120" />
                  <ellipse
                    cx="180"
                    cy="120"
                    rx="6"
                    ry="3"
                    fill="#E2D4BC"
                    stroke="#7D6548"
                  />
                </g>
                <g
                  stroke="#7D6548"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  opacity="0.85"
                  transform="translate(400, 0) scale(-1, 1)"
                >
                  <path d="M50 15 Q110 90 180 280" />
                  <path d="M80 60 C105 50 115 35 120 20" />
                  <ellipse
                    cx="120"
                    cy="20"
                    rx="6"
                    ry="3"
                    fill="#E2D4BC"
                    stroke="#7D6548"
                  />
                  <path d="M105 110 C135 100 145 80 150 65" />
                  <ellipse
                    cx="150"
                    cy="65"
                    rx="7"
                    ry="4"
                    fill="#E2D4BC"
                    stroke="#7D6548"
                  />
                  <path d="M135 170 C165 160 175 140 180 120" />
                  <ellipse
                    cx="180"
                    cy="120"
                    rx="6"
                    ry="3"
                    fill="#E2D4BC"
                    stroke="#7D6548"
                  />
                </g>
              </svg>
            </div>

            {/* Bottom Triangular Flap */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "280px",
                clipPath: "polygon(0 100%, 100% 100%, 50% 0)",
                background: "linear-gradient(0deg, #F9F3E7 0%, #EFE3D0 100%)",
                zIndex: 3,
                filter: "drop-shadow(0 -8px 15px rgba(80, 55, 30, 0.08))",
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 280"
                fill="none"
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                <g
                  stroke="#7D6548"
                  strokeWidth="1.3"
                  opacity="0.8"
                  transform="translate(0, 280) scale(1, -1)"
                >
                  <path d="M50 20 Q110 90 180 260" />
                  <path d="M90 70 C115 60 120 40 125 30" />
                  <ellipse
                    cx="125"
                    cy="30"
                    rx="6"
                    ry="3"
                    fill="#E2D4BC"
                    stroke="#7D6548"
                  />
                  <path d="M120 130 C150 120 155 100 160 85" />
                  <ellipse
                    cx="160"
                    cy="85"
                    rx="6"
                    ry="3"
                    fill="#E2D4BC"
                    stroke="#7D6548"
                  />
                </g>
                <g
                  stroke="#7D6548"
                  strokeWidth="1.3"
                  opacity="0.8"
                  transform="translate(400, 280) scale(-1, -1)"
                >
                  <path d="M50 20 Q110 90 180 260" />
                  <path d="M90 70 C115 60 120 40 125 30" />
                  <ellipse
                    cx="125"
                    cy="30"
                    rx="6"
                    ry="3"
                    fill="#E2D4BC"
                    stroke="#7D6548"
                  />
                  <path d="M120 130 C150 120 155 100 160 85" />
                  <ellipse
                    cx="160"
                    cy="85"
                    rx="6"
                    ry="3"
                    fill="#E2D4BC"
                    stroke="#7D6548"
                  />
                </g>
              </svg>
            </div>

            {/* Realistic Wax Seal */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              style={{
                position: "relative",
                zIndex: 10,
                width: "116px",
                height: "116px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "waxPulseGlow 3s infinite ease-in-out",
                cursor: "pointer",
              }}
            >
              <svg width="116" height="116" viewBox="0 0 100 100">
                <defs>
                  <radialGradient id="waxRadial" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#C43B3E" />
                    <stop offset="40%" stopColor="#8F2225" />
                    <stop offset="75%" stopColor="#631416" />
                    <stop offset="100%" stopColor="#3B090B" />
                  </radialGradient>
                  <radialGradient id="innerBevel" cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="rgba(255, 200, 200, 0.45)" />
                    <stop offset="70%" stopColor="rgba(0, 0, 0, 0.25)" />
                    <stop offset="100%" stopColor="rgba(0, 0, 0, 0.65)" />
                  </radialGradient>
                </defs>

                <path
                  d="M50 5 C64 4, 76 11, 85 20 C95 30, 97 45, 94 58 C91 72, 85 84, 73 91 C60 98, 43 97, 30 92 C18 86, 7 76, 5 62 C3 48, 8 35, 17 24 C26 13, 36 6, 50 5 Z"
                  fill="url(#waxRadial)"
                  filter="drop-shadow(0 8px 14px rgba(70, 10, 12, 0.6))"
                />

                <circle
                  cx="50"
                  cy="51"
                  r="34"
                  fill="url(#waxRadial)"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.2"
                />
                <circle cx="50" cy="51" r="34" fill="url(#innerBevel)" />

                <g
                  stroke="#FDE8E8"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.95"
                >
                  <path
                    d="M50 33 C46 33 44 36 44 40 C44 46 50 50 50 50 C50 50 56 46 56 40 C56 36 54 33 50 33 Z"
                    fill="rgba(255,255,255,0.15)"
                  />
                  <path d="M47 37 C47 35 48.5 34 50 34 C51.5 34 53 35 53 37 C53 40 50 42 50 42" />
                  <path d="M40 43 C37 43 36 45 36 48 C36 52 41 55 41 55" />
                  <path d="M60 43 C63 43 64 45 64 48 C64 52 59 55 59 55" />
                  <path d="M50 50 L50 67" strokeWidth="1.8" />
                  <path d="M50 57 Q43 54 41 49" />
                  <path d="M50 60 Q57 57 59 52" />
                  <path
                    d="M50 62 Q40 64 38 60 Q44 59 50 62"
                    fill="rgba(255,255,255,0.1)"
                  />
                  <path
                    d="M50 64 Q60 66 62 62 Q56 61 50 64"
                    fill="rgba(255,255,255,0.1)"
                  />
                </g>
              </svg>
            </motion.div>

            <div
              style={{
                position: "relative",
                zIndex: 10,
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <ChevronDown
                size={19}
                color="#755B44"
                style={{ animation: "floatRays 1.6s infinite ease-in-out" }}
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "14px",
                  letterSpacing: "0.45em",
                  color: "#69513D",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textShadow: "0 1px 1px rgba(255,255,255,0.8)",
                }}
              >
                TAP TO OPEN
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 2. THE REVEALED GRAND CARD (EXPANDS FROM CENTER) ================= */}
      {isUnlocked && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.6,
            filter: "blur(14px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="grand-card-shadow"
          style={{
            width: "100%",
            maxWidth: "780px",
            backgroundColor: "#FFFDF9",
            borderRadius: "28px",
            border: "2px solid #E2D3BE",
            padding: "48px 24px",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 10,
            color: "#2C241E",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "12px",
              border: "1.5px solid rgba(196, 162, 101, 0.4)",
              borderRadius: "20px",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "18px",
              border: "1px dashed rgba(196, 162, 101, 0.25)",
              borderRadius: "16px",
              pointerEvents: "none",
            }}
          />

          <main
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: "clamp(28px, 8vw, 38px)",
                color: "#261E18",
                marginBottom: "14px",
                fontWeight: 700,
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>

            {/* Groom Name */}
            <div style={{ margin: "4px 0 2px 0" }}>
              <h1
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "clamp(52px, 12vw, 92px)",
                  margin: 0,
                  lineHeight: 1.05,
                  color: "#1F1A16",
                  fontWeight: "normal",
                }}
              >
                {WEDDING_CONFIG.groomName}
              </h1>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "16px",
                  color: "#52443A",
                  margin: "4px 0 10px 0",
                  fontStyle: "italic",
                }}
              >
                {WEDDING_CONFIG.groomParents}
              </p>
            </div>

            <span
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "42px",
                color: "#9E2A2B",
                margin: "2px 0",
              }}
            >
              &
            </span>

            {/* Bride Name */}
            <div style={{ margin: "2px 0 18px 0" }}>
              <h1
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "clamp(52px, 12vw, 92px)",
                  margin: 0,
                  lineHeight: 1.05,
                  color: "#1F1A16",
                  fontWeight: "normal",
                }}
              >
                {WEDDING_CONFIG.brideName}
              </h1>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "16px",
                  color: "#52443A",
                  margin: "4px 0 0 0",
                  fontStyle: "italic",
                }}
              >
                {WEDDING_CONFIG.brideParents}
              </p>
            </div>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(18px, 4vw, 21px)",
                color: "#382E25",
                fontStyle: "italic",
                margin: "12px 0 18px 0",
              }}
            >
              Request the honour of your blissful presence
            </p>

            {/* Swans Lake Animation */}
            <SwansLakeAnimation />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                margin: "12px 0 28px 0",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "16px",
                  color: "#7D6957",
                }}
              >
                Scroll down for event celebration
              </span>
              <ChevronDown
                size={18}
                color="#C4A265"
                style={{ animation: "floatRays 1.6s infinite ease-in-out" }}
              />
            </div>

            {/* ================= 3. VENUE DETAILS SECTION ================= */}
            <section
              style={{
                width: "100%",
                background: "linear-gradient(180deg, #FFFFFF 0%, #FAF4EB 100%)",
                border: "1.5px solid #DFCBB3",
                borderRadius: "160px 160px 20px 20px",
                padding: "48px 20px 32px 20px",
                boxSizing: "border-box",
                marginBottom: "32px",
                boxShadow: "0 10px 30px rgba(180, 140, 100, 0.12)",
              }}
            >
              <div
                style={{
                  color: "#9E2A2B",
                  fontSize: "15px",
                  letterSpacing: "0.2em",
                  marginBottom: "6px",
                }}
              >
                ✧ ✦ ✧
              </div>

              <span
                style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  color: "#836248",
                  display: "block",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                The Grand Auspicious Union
              </span>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(26px, 6vw, 34px)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "#2C2219",
                  textTransform: "uppercase",
                  margin: "0 0 22px 0",
                }}
              >
                Barat & Walima
              </h2>

              {/* DATE & TIME */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  color: "#4A3E31",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "16px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Calendar size={18} color="#9E2A2B" />
                  <span>{WEDDING_CONFIG.displayDate}</span>
                </div>
                <span style={{ color: "#C4A265" }}>•</span>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Clock size={18} color="#9E2A2B" />
                  <span>{WEDDING_CONFIG.displayTime}</span>
                </div>
              </div>

              {/* VENUE */}
              <div
                style={{
                  borderTop: "1px solid rgba(196, 162, 101, 0.35)",
                  paddingTop: "22px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    color: "#751F20",
                    marginBottom: "6px",
                  }}
                >
                  <MapPin size={18} />
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(18px, 4.5vw, 22px)",
                      fontWeight: 700,
                      margin: 0,
                      textTransform: "uppercase",
                    }}
                  >
                    {WEDDING_CONFIG.venueName}
                  </h3>
                </div>

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "15px",
                    color: "#6B5848",
                    margin: "0 0 22px 0",
                  }}
                >
                  {WEDDING_CONFIG.venueAddress}
                </p>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  href={WEDDING_CONFIG.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    background:
                      "linear-gradient(135deg, #9E2A2B 0%, #6E1B1C 100%)",
                    color: "#FFFFFF",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "14px 28px",
                    textDecoration: "none",
                    borderRadius: "50px",
                    boxShadow: "0 6px 20px rgba(158, 42, 43, 0.35)",
                  }}
                >
                  <Navigation size={15} />
                  Navigate To Venue
                </motion.a>
              </div>
            </section>

            {/* ================= 4. ✨ INTERACTIVE SCRATCH BOX ✨ ================= */}
            <section
              style={{
                width: "100%",
                margin: "0 0 32px 0",
                padding: "22px 14px",
                background: "#FAF4E8",
                borderRadius: "18px",
                border: "1.5px dashed #D4AF37",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <Gift size={20} color="#9E2A2B" />
                <span
                  style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: "13px",
                    letterSpacing: "0.25em",
                    color: "#73573D",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  Royal Mystery Box
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "14px",
                  color: "#695847",
                  margin: "0 0 16px 0",
                }}
              >
                Scratch with your finger or mouse to unlock your special
                message!
              </p>

              <RoyalScratchBox onRevealed={() => triggerRoyalShower()} />
            </section>

            {/* ================= 5. LIVE COUNTDOWN TIMER ================= */}
            <section style={{ width: "100%", margin: "0 0 32px 0" }}>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  letterSpacing: "0.35em",
                  color: "#856B55",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "16px",
                  fontWeight: 600,
                }}
              >
                ✦ Counting Every Auspicious Moment ✦
              </span>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  maxWidth: "440px",
                  margin: "0 auto",
                }}
              >
                {[
                  { label: "Days", val: timeLeft.days },
                  { label: "Hours", val: timeLeft.hours },
                  { label: "Mins", val: timeLeft.minutes },
                  { label: "Secs", val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #E0CDB9",
                      padding: "14px 4px",
                      borderRadius: "14px",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(24px, 6vw, 32px)",
                        fontWeight: 700,
                        display: "block",
                        lineHeight: 1,
                        color: "#9E2A2B",
                      }}
                    >
                      {String(item.val).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#7A6857",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ================= 6. RSVP FORM SECTION ================= */}
            <section
              style={{
                width: "100%",
                background: "linear-gradient(145deg, #FFFFFF 0%, #FAF5ED 100%)",
                border: "1.5px solid #DFCBB3",
                padding: "32px 20px",
                boxSizing: "border-box",
                borderRadius: "18px",
                boxShadow: "0 8px 30px rgba(180, 140, 100, 0.12)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  letterSpacing: "0.35em",
                  color: "#876D58",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: 600,
                }}
              >
                Honour Us With Your Grace
              </span>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(24px, 5.5vw, 30px)",
                  letterSpacing: "0.12em",
                  color: "#2C2219",
                  textTransform: "uppercase",
                  margin: "0 0 22px 0",
                  fontWeight: 700,
                }}
              >
                RSVP & Attendance
              </h2>

              {!isSubmitted ? (
                <form
                  onSubmit={handleRSVP}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    maxWidth: "380px",
                    margin: "0 auto",
                  }}
                >
                  <input
                    type="text"
                    required
                    placeholder="ENTER YOUR FULL NAME"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #D5C2AD",
                      padding: "15px 18px",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "14px",
                      letterSpacing: "0.15em",
                      color: "#30261E",
                      boxSizing: "border-box",
                      outline: "none",
                      borderRadius: "10px",
                    }}
                  />

                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #D5C2AD",
                      padding: "15px 18px",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "14px",
                      letterSpacing: "0.15em",
                      color: "#30261E",
                      boxSizing: "border-box",
                      outline: "none",
                      cursor: "pointer",
                      borderRadius: "10px",
                    }}
                  >
                    <option value="1">1 GUEST ATTENDING</option>
                    <option value="2">2 GUESTS ATTENDING</option>
                    <option value="3">3 GUESTS ATTENDING</option>
                    <option value="Family">ENTIRE FAMILY ATTENDING</option>
                  </select>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{
                      backgroundColor: "#9E2A2B",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "10px",
                      padding: "16px 20px",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      boxShadow: "0 6px 20px rgba(158, 42, 43, 0.3)",
                    }}
                  >
                    Confirm Presence
                  </motion.button>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "10px 0" }}>
                  <CheckCircle
                    size={40}
                    color="#9E2A2B"
                    style={{ margin: "0 auto 12px auto" }}
                  />
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "24px",
                      color: "#2C2219",
                      margin: "0 0 8px 0",
                    }}
                  >
                    Attendance Confirmed
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "16px",
                      color: "#6B5848",
                      fontStyle: "italic",
                      margin: 0,
                    }}
                  >
                    We eagerly await your auspicious presence, {guestName}!
                  </p>
                </div>
              )}
            </section>
          </main>
        </motion.div>
      )}
    </div>
  );
}
