"use client";

import { useId } from "react";

export default function UnlockCoreMockup() {
  const reactId = useId().replace(/:/g, "");

  const lockBodyId = `lock-body-${reactId}`;
  const shackleMetalId = `shackle-metal-${reactId}`;
  const shackleLightId = `shackle-light-${reactId}`;

  return (
    <div
      role="img"
      aria-label="Animación de candado desbloqueándose"
      className="unlock-core relative mx-auto flex w-full max-w-[340px] select-none items-center justify-center"
    >
      <div className="lock-scene relative flex aspect-square w-full items-center justify-center overflow-visible">
        {/* Círculo exterior limpio */}
        <div
          aria-hidden="true"
          className="depth-circle absolute h-[84%] w-[84%] rounded-full border border-emerald-300/[0.07]"
        />

        {/* Órbita exterior */}
        <div
          aria-hidden="true"
          className="ring-outer absolute h-[88%] w-[88%] rounded-full border border-emerald-400/[0.13]"
        >
          <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-emerald-300" />

          <span className="absolute bottom-[-2px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-500/60" />
        </div>

        {/* Marcas técnicas */}
        <div
          aria-hidden="true"
          className="technical-ring absolute h-[79%] w-[79%] rounded-full"
        >
          <span className="technical-mark mark-top" />
          <span className="technical-mark mark-right" />
          <span className="technical-mark mark-bottom" />
          <span className="technical-mark mark-left" />
        </div>

        {/* Órbita interior */}
        <div
          aria-hidden="true"
          className="ring-inner absolute h-[70%] w-[70%] rounded-full border border-dashed border-emerald-300/[0.17]"
        />

        {/* Punto en movimiento */}
        <div
          aria-hidden="true"
          className="orbit-dot absolute h-[70%] w-[70%] rounded-full"
        >
          <span className="absolute left-1/2 top-[-5px] h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-300" />
        </div>

        {/* Partículas simples, sin resplandor */}
        <div
          aria-hidden="true"
          className="particle particle-one absolute left-[17%] top-[32%] h-1 w-1 rounded-full bg-emerald-300/45"
        />

        <div
          aria-hidden="true"
          className="particle particle-two absolute right-[17%] top-[43%] h-1.5 w-1.5 rounded-full bg-emerald-400/40"
        />

        <div
          aria-hidden="true"
          className="particle particle-three absolute bottom-[22%] left-[25%] h-1 w-1 rounded-full bg-teal-300/45"
        />

        {/* Candado */}
        <svg
          viewBox="0 0 240 250"
          aria-hidden="true"
          className="lock-svg relative z-10 h-auto w-[72%] overflow-visible"
          fill="none"
        >
          <defs>
            <linearGradient
              id={lockBodyId}
              x1="48"
              y1="100"
              x2="193"
              y2="220"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#214B3B" />
              <stop offset="0.32" stopColor="#102A20" />
              <stop offset="0.72" stopColor="#08150F" />
              <stop offset="1" stopColor="#020705" />
            </linearGradient>

            <linearGradient
              id={shackleMetalId}
              x1="72"
              y1="22"
              x2="172"
              y2="113"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#789185" />
              <stop offset="0.24" stopColor="#40594E" />
              <stop offset="0.56" stopColor="#1E342A" />
              <stop offset="0.82" stopColor="#102219" />
              <stop offset="1" stopColor="#07100C" />
            </linearGradient>

            <linearGradient
              id={shackleLightId}
              x1="74"
              y1="24"
              x2="165"
              y2="106"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D1FAE5" stopOpacity="0.65" />
              <stop offset="0.42" stopColor="#6EE7B7" stopOpacity="0.28" />
              <stop offset="1" stopColor="#10B981" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Arco del candado */}
          <g className="lock-shackle">
            {/* Parte oscura trasera */}
            <path
              d="M72 108V73C72 39 91 21 120 21C149 21 168 39 168 73V108"
              stroke="#010403"
              strokeWidth="29"
              strokeLinecap="round"
              opacity="0.75"
              transform="translate(4 6)"
            />

            {/* Arco principal */}
            <path
              d="M72 108V73C72 39 91 21 120 21C149 21 168 39 168 73V108"
              stroke={`url(#${shackleMetalId})`}
              strokeWidth="27"
              strokeLinecap="round"
            />

            {/* Detalle interior */}
            <path
              d="M76 105V74C76 43 93 27 120 27C147 27 164 43 164 74V105"
              stroke={`url(#${shackleLightId})`}
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* Parte trasera del cuerpo */}
          <rect
            x="50"
            y="107"
            width="150"
            height="118"
            rx="32"
            fill="#010403"
            opacity="0.75"
            transform="translate(4 6)"
          />

          {/* Cuerpo principal */}
          <rect
            x="45"
            y="100"
            width="150"
            height="120"
            rx="32"
            fill={`url(#${lockBodyId})`}
            stroke="rgba(110,231,183,0.24)"
            strokeWidth="2"
            className="lock-body"
          />

          {/* Línea superior discreta */}
          <path
            d="M72 101H168"
            stroke={`url(#${shackleLightId})`}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Línea lateral discreta */}
          <path
            d="M58 132V186"
            stroke="white"
            strokeOpacity="0.05"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Línea inferior */}
          <path
            d="M75 211H165"
            stroke="#6EE7B7"
            strokeOpacity="0.07"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Centro */}
          <circle
            cx="120"
            cy="160"
            r="35"
            fill="#020806"
            fillOpacity="0.86"
            stroke="#34D399"
            strokeOpacity="0.17"
            strokeWidth="2"
          />

          <circle
            cx="120"
            cy="160"
            r="28"
            stroke="#6EE7B7"
            strokeOpacity="0.05"
            strokeWidth="1"
          />

          {/* Cerradura */}
          <g className="keyhole">
            <circle cx="120" cy="151" r="10" fill="#B9C5BF" />

            <path
              d="M114 158H126L130 184H110L114 158Z"
              fill="#B9C5BF"
            />
          </g>

          {/* Check */}
          <path
            className="unlock-check"
            d="M99 160L114 175L143 143"
            stroke="#6EE7B7"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Escáner sin resplandor */}
          <g className="scan-line">
            <path
              d="M61 120H179"
              stroke="#A7F3D0"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M70 120H170"
              stroke="#34D399"
              strokeOpacity="0.11"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      <style jsx>{`
        .unlock-core {
          contain: layout paint style;
          transform: translateZ(0);
        }

        .lock-scene {
          perspective: 1000px;
          animation: sceneReveal 800ms
            cubic-bezier(0.16, 1, 0.3, 1) both;
          transform: translateZ(0);
        }

        .lock-svg {
          animation: lockFloat 5.8s ease-in-out infinite;
          transform-style: preserve-3d;
          transform-origin: center;
          will-change: transform;
        }

        .lock-shackle {
          transform-box: view-box;
          transform-origin: 168px 108px;
          animation: openShackle 7s
            cubic-bezier(0.22, 0.8, 0.25, 1) infinite;
          will-change: transform;
        }

        .lock-body {
          animation: bodyBorder 7s ease-in-out infinite;
        }

        .scan-line {
          animation: scanMovement 7s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .keyhole {
          transform-box: fill-box;
          transform-origin: center;
          animation: hideKeyhole 7s ease-in-out infinite;
        }

        .unlock-check {
          fill: none;
          opacity: 0;
          stroke-dasharray: 72;
          stroke-dashoffset: 72;
          animation: showCheck 7s ease-in-out infinite;
        }

        .ring-outer {
          animation: ringRotation 24s linear infinite;
          transform: translateZ(0);
        }

        .ring-inner {
          animation: ringRotationReverse 18s linear infinite;
          transform: translateZ(0);
        }

        .orbit-dot {
          animation: ringRotation 11s linear infinite;
          transform: translateZ(0);
        }

        .technical-ring {
          animation: ringRotationReverse 32s linear infinite;
        }

        .depth-circle {
          animation: depthMovement 5.8s ease-in-out infinite;
        }

        .technical-mark {
          position: absolute;
          display: block;
          width: 13px;
          height: 1px;
          border-radius: 9999px;
          background: rgba(110, 231, 183, 0.24);
        }

        .mark-top {
          left: 50%;
          top: 0;
          transform: translateX(-50%) rotate(90deg);
        }

        .mark-right {
          right: -5px;
          top: 50%;
          transform: translateY(-50%);
        }

        .mark-bottom {
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) rotate(90deg);
        }

        .mark-left {
          left: -5px;
          top: 50%;
          transform: translateY(-50%);
        }

        .particle {
          will-change: transform, opacity;
        }

        .particle-one {
          animation: particleFloatOne 4.2s ease-in-out infinite;
        }

        .particle-two {
          animation: particleFloatTwo 5.2s ease-in-out infinite;
        }

        .particle-three {
          animation: particleFloatThree 4.8s ease-in-out infinite;
        }

        @keyframes sceneReveal {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes lockFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotateY(-4deg)
              rotateX(2deg);
          }

          50% {
            transform: translate3d(0, -7px, 0) rotateY(4deg)
              rotateX(-1deg);
          }
        }

        @keyframes openShackle {
          0%,
          43% {
            transform: translateY(0) rotate(0deg);
          }

          53% {
            transform: translateY(-20px) rotate(0deg);
          }

          63%,
          82% {
            transform: translateY(-20px) rotate(17deg);
          }

          92% {
            transform: translateY(-20px) rotate(0deg);
          }

          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        @keyframes bodyBorder {
          0%,
          46%,
          100% {
            stroke: rgba(110, 231, 183, 0.24);
          }

          60%,
          84% {
            stroke: rgba(110, 231, 183, 0.5);
          }
        }

        @keyframes scanMovement {
          0%,
          7% {
            opacity: 0;
            transform: translateY(0);
          }

          14% {
            opacity: 0.8;
            transform: translateY(0);
          }

          41% {
            opacity: 0.8;
            transform: translateY(80px);
          }

          50%,
          100% {
            opacity: 0;
            transform: translateY(80px);
          }
        }

        @keyframes hideKeyhole {
          0%,
          53%,
          91%,
          100% {
            opacity: 1;
            transform: scale(1);
          }

          63%,
          83% {
            opacity: 0;
            transform: scale(0.65);
          }
        }

        @keyframes showCheck {
          0%,
          55% {
            opacity: 0;
            stroke-dashoffset: 72;
            transform: scale(0.9);
            transform-origin: center;
          }

          65%,
          82% {
            opacity: 1;
            stroke-dashoffset: 0;
            transform: scale(1);
          }

          91%,
          100% {
            opacity: 0;
            stroke-dashoffset: 72;
            transform: scale(0.9);
          }
        }

        @keyframes ringRotation {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ringRotationReverse {
          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0deg);
          }
        }

        @keyframes depthMovement {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(0.98);
          }

          50% {
            opacity: 0.8;
            transform: scale(1);
          }
        }

        @keyframes particleFloatOne {
          0%,
          100% {
            opacity: 0.2;
            transform: translate3d(0, 3px, 0);
          }

          50% {
            opacity: 0.65;
            transform: translate3d(3px, -6px, 0);
          }
        }

        @keyframes particleFloatTwo {
          0%,
          100% {
            opacity: 0.2;
            transform: translate3d(0, -2px, 0);
          }

          50% {
            opacity: 0.6;
            transform: translate3d(-4px, 7px, 0);
          }
        }

        @keyframes particleFloatThree {
          0%,
          100% {
            opacity: 0.2;
            transform: translate3d(0, 2px, 0);
          }

          50% {
            opacity: 0.6;
            transform: translate3d(5px, -5px, 0);
          }
        }

        /* Celulares */
        @media (max-width: 480px) {
          .unlock-core {
            max-width: min(76vw, 290px);
          }

          .lock-svg {
            width: 74%;
          }
        }

        /* Celulares horizontales */
        @media (orientation: landscape) and (max-height: 560px) {
          .unlock-core {
            max-width: min(65vh, 275px);
          }

          .lock-svg {
            width: 70%;
          }

          .particle {
            display: none;
          }
        }

        /* Accesibilidad y mejor rendimiento */
        @media (prefers-reduced-motion: reduce) {
          .lock-scene,
          .lock-svg,
          .lock-shackle,
          .lock-body,
          .scan-line,
          .keyhole,
          .unlock-check,
          .ring-outer,
          .ring-inner,
          .orbit-dot,
          .technical-ring,
          .depth-circle,
          .particle {
            animation: none;
          }

          .scan-line,
          .unlock-check {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}