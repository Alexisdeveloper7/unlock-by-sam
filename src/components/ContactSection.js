"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reducirMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducirMovimiento) {
      setVisible(true);
      return;
    }

    let frameId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        /*
         * Esperamos al siguiente frame para evitar que React
         * actualice el estado dentro del cálculo del scroll.
         */
        frameId = window.requestAnimationFrame(() => {
          setVisible(true);
        });

        observer.disconnect();
      },
      {
        /*
         * Umbral bajo para que la animación comience antes
         * y no tenga que renderizarse bruscamente.
         */
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="
        relative isolate overflow-hidden bg-[#050b0a]
        px-4 py-16
        min-[390px]:px-5
        sm:px-6 sm:py-20
        lg:px-8 lg:py-28
      "
    >
      {/* 
        FONDO OPTIMIZADO:
        Se utilizan gradientes normales en lugar de círculos
        gigantes con blur, lo cual reduce mucho el uso de GPU.
      */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-20
          bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.09),transparent_48%),radial-gradient(circle_at_100%_100%,rgba(6,78,59,0.16),transparent_48%),linear-gradient(to_bottom,#050b0a,rgba(5,11,10,0.96),#050b0a)]
        "
      />

      {/* Cuadrícula decorativa solo desde tablet */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10 hidden
          bg-[linear-gradient(rgba(16,185,129,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.018)_1px,transparent_1px)]
          bg-[size:44px_44px]
          [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]
          sm:block
        "
      />

      {/* Separador superior */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent
        "
      />

      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`
            relative transform-gpu overflow-hidden rounded-[26px]
            border bg-[#07110e]
            px-5 py-12 text-center
            shadow-[0_20px_55px_rgba(0,0,0,0.28)]

            transition-[transform,opacity,border-color]
            duration-700
            ease-[cubic-bezier(0.16,1,0.3,1)]

            sm:rounded-[34px]
            sm:bg-[#07110e]/90
            sm:px-10 sm:py-16
            sm:shadow-[0_30px_90px_rgba(0,0,0,0.32)]
            sm:backdrop-blur-md
            sm:duration-1000

            lg:rounded-[40px]
            lg:px-16 lg:py-20

            ${
              visible
                ? "translate-y-0 scale-100 border-emerald-400/15 opacity-100"
                : "translate-y-7 scale-[0.985] border-emerald-400/5 opacity-0 sm:translate-y-10 sm:scale-[0.97]"
            }
          `}
        >
          {/* Fondo interno sin blur pesado */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0
              bg-[radial-gradient(circle_at_50%_0%,rgba(52,211,153,0.11),transparent_45%),radial-gradient(circle_at_0%_100%,rgba(6,95,70,0.1),transparent_42%),linear-gradient(to_bottom,rgba(255,255,255,0.018),transparent_40%,rgba(0,0,0,0.08))]
            "
          />

          {/* Línea superior */}
          <div
            aria-hidden="true"
            className={`
              pointer-events-none absolute left-6 right-6 top-0 h-px
              origin-center transform-gpu
              bg-gradient-to-r
              from-transparent via-emerald-300/75 to-transparent
              transition-transform duration-700
              ease-[cubic-bezier(0.16,1,0.3,1)]
              sm:left-12 sm:right-12 sm:duration-1000

              ${visible ? "scale-x-100" : "scale-x-0"}
            `}
            style={{ transitionDelay: "100ms" }}
          />

          {/* Línea inferior */}
          <div
            aria-hidden="true"
            className={`
              pointer-events-none absolute bottom-0 left-8 right-8 h-px
              origin-center transform-gpu
              bg-gradient-to-r
              from-transparent via-emerald-500/30 to-transparent
              transition-transform duration-700
              ease-[cubic-bezier(0.16,1,0.3,1)]
              sm:left-16 sm:right-16 sm:duration-1000

              ${visible ? "scale-x-100" : "scale-x-0"}
            `}
            style={{ transitionDelay: "180ms" }}
          />

          {/* Esquinas decorativas */}
          <div
            aria-hidden="true"
            className={`
              pointer-events-none absolute left-4 top-4
              h-7 w-7 border-l border-t border-emerald-400/25
              transform-gpu transition-[transform,opacity]
              duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              sm:left-6 sm:top-6 sm:h-10 sm:w-10

              ${
                visible
                  ? "translate-x-0 translate-y-0 opacity-100"
                  : "translate-x-3 translate-y-3 opacity-0"
              }
            `}
            style={{ transitionDelay: "160ms" }}
          />

          <div
            aria-hidden="true"
            className={`
              pointer-events-none absolute right-4 top-4
              h-7 w-7 border-r border-t border-emerald-400/25
              transform-gpu transition-[transform,opacity]
              duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              sm:right-6 sm:top-6 sm:h-10 sm:w-10

              ${
                visible
                  ? "translate-x-0 translate-y-0 opacity-100"
                  : "-translate-x-3 translate-y-3 opacity-0"
              }
            `}
            style={{ transitionDelay: "190ms" }}
          />

          <div
            aria-hidden="true"
            className={`
              pointer-events-none absolute bottom-4 left-4
              h-7 w-7 border-b border-l border-emerald-400/20
              transform-gpu transition-[transform,opacity]
              duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              sm:bottom-6 sm:left-6 sm:h-10 sm:w-10

              ${
                visible
                  ? "translate-x-0 translate-y-0 opacity-100"
                  : "translate-x-3 -translate-y-3 opacity-0"
              }
            `}
            style={{ transitionDelay: "220ms" }}
          />

          <div
            aria-hidden="true"
            className={`
              pointer-events-none absolute bottom-4 right-4
              h-7 w-7 border-b border-r border-emerald-400/20
              transform-gpu transition-[transform,opacity]
              duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              sm:bottom-6 sm:right-6 sm:h-10 sm:w-10

              ${
                visible
                  ? "translate-x-0 translate-y-0 opacity-100"
                  : "-translate-x-3 -translate-y-3 opacity-0"
              }
            `}
            style={{ transitionDelay: "250ms" }}
          />

          {/* Puntos decorativos: ocultos totalmente en móvil */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute left-5 top-1/2 hidden
              -translate-y-1/2 flex-col gap-2 opacity-30
              sm:flex
            "
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <span
                key={index}
                className={`
                  h-1 w-1 rounded-full bg-emerald-300
                  transition-[transform,opacity] duration-500

                  ${
                    visible
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: `${350 + index * 55}ms`,
                }}
              />
            ))}
          </div>

          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute right-5 top-1/2 hidden
              -translate-y-1/2 flex-col gap-2 opacity-30
              sm:flex
            "
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <span
                key={index}
                className={`
                  h-1 w-1 rounded-full bg-emerald-300
                  transition-[transform,opacity] duration-500

                  ${
                    visible
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: `${380 + index * 55}ms`,
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-3xl">
            {/* Etiqueta */}
            <div
              className={`
                inline-flex transform-gpu items-center gap-2
                rounded-full border border-emerald-400/15
                bg-emerald-500/[0.075]
                px-3 py-1.5
                text-[10px] font-bold uppercase
                tracking-[0.2em] text-emerald-300

                transition-[transform,opacity]
                duration-500
                ease-[cubic-bezier(0.16,1,0.3,1)]

                sm:px-4 sm:py-2 sm:text-xs sm:duration-700
                sm:backdrop-blur-sm

                ${
                  visible
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-3 scale-95 opacity-0"
                }
              `}
              style={{ transitionDelay: "140ms" }}
            >
              <span className="relative flex h-2 w-2">
                {/* Ping únicamente desde tablet */}
                <span
                  className="
                    absolute inset-0 hidden rounded-full
                    bg-emerald-400 opacity-30
                    motion-safe:sm:block motion-safe:sm:animate-ping
                  "
                />

                <span
                  className="
                    relative h-2 w-2 rounded-full bg-emerald-400
                    sm:shadow-[0_0_8px_rgba(52,211,153,0.65)]
                  "
                />
              </span>

              Contacto
            </div>

            {/* Título */}
            <div className="overflow-hidden">
              <h2
                className={`
                  mt-4 transform-gpu
                  text-[clamp(2rem,8.5vw,4rem)]
                  font-bold leading-[1.02]
                  tracking-[-0.045em] text-white

                  transition-[transform,opacity]
                  duration-700
                  ease-[cubic-bezier(0.16,1,0.3,1)]

                  sm:mt-5 sm:duration-900

                  ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[105%] opacity-0"
                  }
                `}
                style={{ transitionDelay: "190ms" }}
              >
                ¿Necesitas un servicio para tu{" "}
                <span
                  className="
                    bg-gradient-to-r
                    from-emerald-300 via-emerald-400 to-emerald-500
                    bg-clip-text text-transparent
                  "
                >
                  dispositivo?
                </span>
              </h2>
            </div>

            {/* Descripción */}
            <p
              className={`
                mx-auto mt-5 max-w-2xl transform-gpu
                text-sm leading-6 text-white/50

                transition-[transform,opacity]
                duration-600
                ease-[cubic-bezier(0.16,1,0.3,1)]

                sm:text-base sm:leading-7 sm:duration-800
                lg:text-lg lg:leading-8

                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }
              `}
              style={{ transitionDelay: "270ms" }}
            >
              Comunícate con nosotros para recibir información, disponibilidad y
              atención personalizada para tu dispositivo.
            </p>

            {/* Botón deshabilitado */}
            <div
              className={`
                mt-8 flex transform-gpu justify-center

                transition-[transform,opacity]
                duration-600
                ease-[cubic-bezier(0.16,1,0.3,1)]

                sm:mt-9 sm:duration-800

                ${
                  visible
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-5 scale-[0.97] opacity-0"
                }
              `}
              style={{ transitionDelay: "350ms" }}
            >
              <button
  type="button"
  aria-label="Contactar por WhatsApp"
  className="
    group relative inline-flex min-h-12
    cursor-pointer items-center justify-center
    gap-2 overflow-hidden rounded-full
    border border-emerald-300/25
    bg-emerald-500
    px-6 text-sm font-bold text-[#02130d]
    shadow-[0_10px_26px_rgba(16,185,129,0.14)]
    outline-none

    transform-gpu
    transition-[transform,background-color,border-color,box-shadow]
    duration-300
    ease-[cubic-bezier(0.16,1,0.3,1)]

    hover:-translate-y-1
    hover:scale-[1.025]
    hover:border-emerald-200/60
    hover:bg-emerald-400
    hover:shadow-[0_18px_42px_rgba(16,185,129,0.30)]

    active:translate-y-0
    active:scale-[0.96]
    active:bg-emerald-300
    active:shadow-[0_6px_16px_rgba(16,185,129,0.22)]

    focus-visible:ring-2
    focus-visible:ring-emerald-300/70
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[#07110e]

    sm:px-8 sm:text-base
  "
>
  {/* Resplandor interior */}
  <span
    aria-hidden="true"
    className="
      pointer-events-none absolute inset-0
      bg-gradient-to-r
      from-emerald-200/30 via-transparent to-emerald-300/20
      opacity-70
      transition-opacity duration-300
      group-hover:opacity-100
      group-active:opacity-50
    "
  />

  {/* Brillo que atraviesa el botón al hacer hover */}
  <span
    aria-hidden="true"
    className="
      pointer-events-none absolute inset-y-0 -left-1/2
      w-1/3 skew-x-[-20deg]
      bg-gradient-to-r
      from-transparent via-white/45 to-transparent
      transition-transform duration-700
      ease-[cubic-bezier(0.16,1,0.3,1)]
      group-hover:translate-x-[450%]
    "
  />

  {/* Círculo de presión */}
  <span
    aria-hidden="true"
    className="
      pointer-events-none absolute left-1/2 top-1/2
      h-4 w-4 -translate-x-1/2 -translate-y-1/2
      rounded-full bg-white/30 opacity-0
      transition-[transform,opacity] duration-300
      group-active:scale-[12]
      group-active:opacity-100
      group-active:duration-100
    "
  />

  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="
      relative h-5 w-5 transform-gpu
      transition-transform duration-300
      group-hover:-rotate-6
      group-hover:scale-110
      group-active:rotate-0
      group-active:scale-90
    "
  >
    <path
      d="M20.5 11.6a8.5 8.5 0 0 1-12.7 7.4L3 20.3l1.3-4.6A8.5 8.5 0 1 1 20.5 11.6Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M8.3 8.2c.2-.5.4-.5.8-.5h.5c.2 0 .4 0 .5.4l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.1.4 0 .6.7 1.2 1.6 2.1 2.8 2.7.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.8.9c.3.1.5.3.5.5 0 .3-.2 1.4-1 2-.7.6-1.6.8-2.6.5-1.1-.3-2.5-.9-4.1-2.3-1.3-1.2-2.3-2.7-2.6-3.8-.3-1-.1-2.1.4-2.9Z"
      fill="currentColor"
    />
  </svg>

  <span
    className="
      relative transform-gpu
      transition-transform duration-300
      group-hover:translate-x-0.5
      group-active:translate-x-0
    "
  >
    Contactar por WhatsApp
  </span>

  <svg
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    className="
      relative h-4 w-4 transform-gpu
      transition-[transform,opacity] duration-300
      group-hover:translate-x-1
      group-hover:scale-110
      group-active:translate-x-0
      group-active:scale-90
    "
  >
    <path
      d="M4 10h11M11 6l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>
            </div>

            {/* Indicador inferior */}
            <div
              className={`
                mx-auto mt-7 flex max-w-sm transform-gpu
                items-center justify-center gap-3

                transition-[transform,opacity]
                duration-600
                ease-[cubic-bezier(0.16,1,0.3,1)]

                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }
              `}
              style={{ transitionDelay: "430ms" }}
            >
              <span
                className="
                  h-px flex-1
                  bg-gradient-to-r
                  from-transparent to-emerald-400/25
                "
              />

              <span
                className="
                  flex items-center gap-2
                  text-[9px] font-semibold uppercase
                  tracking-[0.16em] text-white/25
                  sm:text-[10px]
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />

                Atención personalizada
              </span>

              <span
                className="
                  h-px flex-1
                  bg-gradient-to-l
                  from-transparent to-emerald-400/25
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}