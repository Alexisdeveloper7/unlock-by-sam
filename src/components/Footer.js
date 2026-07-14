"use client";

import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const reducirMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducirMovimiento) {
      setVisible(true);
      return;
    }

    let frameId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        frameId = window.requestAnimationFrame(() => {
          setVisible(true);
        });

        observer.disconnect();
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 20px 0px",
      },
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative isolate overflow-hidden border-t border-emerald-400/10 bg-[#040806]"
    >
      {/* Fondo ligero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_50%,rgba(16,185,129,0.07),transparent_36%),radial-gradient(circle_at_90%_50%,rgba(6,78,59,0.08),transparent_34%)]"
      />

      {/* Línea superior animada */}
      <div
        aria-hidden="true"
        className={
          "pointer-events-none absolute inset-x-0 top-0 h-px origin-center transform-gpu bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] " +
          (visible ? "scale-x-100" : "scale-x-0")
        }
      />

      <div
        className={
          "relative mx-auto flex w-full max-w-7xl transform-gpu flex-col gap-4 px-5 py-6 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 sm:py-7 md:flex-row md:items-center md:justify-between md:gap-8 lg:px-8 " +
          (visible
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0")
        }
      >
        {/* Marca */}
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={
              "flex h-10 w-10 shrink-0 transform-gpu items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-500/10 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] " +
              (visible
                ? "scale-100 rotate-0 opacity-100"
                : "scale-75 -rotate-6 opacity-0")
            }
            style={{ transitionDelay: "100ms" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-5 w-5 text-emerald-400"
            >
              <path
                d="M8 10V7.5a4 4 0 0 1 8 0"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <path
                d="M6.5 10h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />

              <path
                d="M12 14v2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="min-w-0">
            <p
              className={
                "transform-gpu text-lg font-bold tracking-[-0.025em] text-white transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] " +
                (visible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0")
              }
              style={{ transitionDelay: "150ms" }}
            >
              Unlock <span className="text-emerald-400">by Sam</span>
            </p>

            <p
              className={
                "mt-0.5 transform-gpu text-xs leading-5 text-white/35 transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-sm " +
                (visible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-3 opacity-0")
              }
              style={{ transitionDelay: "210ms" }}
            >
              Soluciones profesionales para dispositivos móviles.
            </p>
          </div>
        </div>

        {/* Información derecha */}
        <div
          className={
            "flex transform-gpu flex-col gap-2 border-t border-white/[0.06] pt-4 transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] sm:flex-row sm:items-center sm:justify-between md:flex-col md:items-end md:border-0 md:pt-0 lg:flex-row lg:items-center lg:gap-5 " +
            (visible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0")
          }
          style={{ transitionDelay: "270ms" }}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400/25 motion-safe:animate-ping" />

              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-[11px] font-medium text-white/40 sm:text-xs">
              Atención disponible
            </span>
          </div>

          <p className="text-[11px] leading-5 text-white/25 sm:text-xs">
            © {currentYear} Unlock by Sam. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}