"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Desbloqueo por IMEI",
    description:
      "Servicios de liberación para diferentes marcas, modelos y operadores.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5 sm:h-6 sm:w-6"
      >
        <rect
          x="7"
          y="2.5"
          width="10"
          height="19"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M10 5.5h4M10.5 18.5h3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M9.5 12.5 11 14l3.5-4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Eliminación de FRP",
    description:
      "Soluciones para dispositivos protegidos por cuentas y bloqueos FRP.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5 sm:h-6 sm:w-6"
      >
        <path
          d="M7.5 10V7.5a4.5 4.5 0 0 1 8.77-1.4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <rect
          x="5"
          y="10"
          width="14"
          height="10.5"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M12 14v2.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Servicios remotos",
    description:
      "Soporte y soluciones especializadas sin necesidad de acudir físicamente.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5 sm:h-6 sm:w-6"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="12"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M8 20h8M12 16v4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="m9 10 2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Herramientas GSM",
    description:
      "Acceso a servicios, herramientas y procesos para técnicos y revendedores.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5 sm:h-6 sm:w-6"
      >
        <path
          d="m14.5 6.5 3-3a4 4 0 0 1-5 5l-7.8 7.8a2.2 2.2 0 0 0 3.1 3.1l7.8-7.8a4 4 0 0 1 5-5l-3 3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const initialCardTransforms = [
  "translate3d(-18px, 38px, 0) scale(0.96) rotate(-1deg)",
  "translate3d(18px, 42px, 0) scale(0.96) rotate(1deg)",
  "translate3d(-18px, 42px, 0) scale(0.96) rotate(-1deg)",
  "translate3d(18px, 38px, 0) scale(0.96) rotate(1deg)",
];

function ContactIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
    >
      <path
        d="M5.5 6.5h13A2.5 2.5 0 0 1 21 9v7a2.5 2.5 0 0 1-2.5 2.5H9l-4.5 3v-3.05A2.5 2.5 0 0 1 2 16V9a2.5 2.5 0 0 1 2.5-2.5h1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M7 11h10M7 14.5h6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleContactClick = () => {
    const contactSection = document.getElementById("contacto");

    if (!contactSection) return;

    const headerOffset = 88;
    const sectionTop =
      contactSection.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    window.scrollTo({
      top: Math.max(sectionTop, 0),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const prefersReducedMotion = motionQuery.matches;

    setReducedMotion(prefersReducedMotion);

    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        animationFrameRef.current = window.requestAnimationFrame(() => {
          setIsVisible(true);
        });

        observer.disconnect();
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="
        relative isolate overflow-hidden
        bg-[#050b0a]
        px-4 py-16
        min-[390px]:px-5
        sm:px-6 sm:py-20
        lg:px-8 lg:py-28
      "
    >
      {/* Fondo principal */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-30
          bg-[radial-gradient(circle_at_50%_-10%,rgba(16,185,129,0.13),transparent_34%),radial-gradient(circle_at_105%_48%,rgba(6,78,59,0.13),transparent_35%),radial-gradient(circle_at_-10%_100%,rgba(16,185,129,0.06),transparent_38%)]
        "
      />

      {/* Resplandor superior: desactivado en móvil */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute
          left-1/2 top-[-170px] -z-20
          hidden h-[380px] w-[650px]
          -translate-x-1/2 rounded-full
          bg-emerald-500/[0.08]
          blur-[130px]
          transition-[opacity,transform]
          duration-[1400ms]
          ease-[cubic-bezier(0.16,1,0.3,1)]
          motion-reduce:transition-none
          sm:block

          ${
            isVisible
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-10 scale-75 opacity-0"
          }
        `}
      />

      {/* Cuadrícula tecnológica ligera */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-20
          bg-[linear-gradient(rgba(16,185,129,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.018)_1px,transparent_1px)]
          bg-[size:32px_32px]
          [mask-image:linear-gradient(to_bottom,black,transparent_95%)]
          sm:bg-[size:44px_44px]
        "
      />

      {/* Oscurecimiento */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-gradient-to-b
          from-[#050b0a]/60
          via-transparent
          to-[#050b0a]
        "
      />

      {/* Separador superior animado */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0 top-0
          h-px overflow-hidden
        "
      >
        <div
          className={`
            mx-auto h-full
            bg-gradient-to-r
            from-transparent
            via-emerald-400/45
            to-transparent
            transition-[width,opacity]
            duration-1000
            ease-[cubic-bezier(0.16,1,0.3,1)]
            motion-reduce:transition-none

            ${
              isVisible
                ? "w-full opacity-100"
                : "w-0 opacity-0"
            }
          `}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        {/* Encabezado */}
        <div className="relative mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <div
            className={`
              inline-flex transform-gpu items-center gap-2
              rounded-full
              border border-emerald-400/15
              bg-emerald-500/[0.07]
              px-3 py-1.5
              text-[10px] font-bold uppercase
              tracking-[0.2em] text-emerald-300
              transition-[transform,opacity]
              duration-700
              ease-[cubic-bezier(0.16,1,0.3,1)]
              motion-reduce:transition-none
              sm:px-4 sm:py-2 sm:text-xs
              sm:backdrop-blur-sm

              ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-5 scale-90 opacity-0"
              }
            `}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="
                  absolute inset-0 hidden rounded-full
                  bg-emerald-400 opacity-30
                  motion-safe:sm:block
                  motion-safe:sm:animate-ping
                "
              />

              <span
                className="
                  relative h-2 w-2 rounded-full
                  bg-emerald-400
                  shadow-[0_0_10px_rgba(52,211,153,0.7)]
                "
              />
            </span>

            Servicios especializados
          </div>

          <div className="overflow-hidden pb-1">
            <h2
              className={`
                mt-4 transform-gpu
                text-[clamp(2rem,9vw,3.75rem)]
                font-bold leading-[1.02]
                tracking-[-0.045em] text-white
                transition-[transform,opacity]
                duration-[900ms]
                ease-[cubic-bezier(0.16,1,0.3,1)]
                motion-reduce:transition-none
                sm:mt-5

                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-[110%] opacity-0"
                }
              `}
              style={{
                transitionDelay: reducedMotion ? "0ms" : "70ms",
              }}
            >
              Soluciones para cada{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-emerald-200
                  via-emerald-400
                  to-emerald-500
                  bg-clip-text text-transparent
                "
              >
                dispositivo.
              </span>
            </h2>
          </div>

          <p
            className={`
              mx-auto mt-4 max-w-xl transform-gpu
              text-sm leading-6 text-white/50
              transition-[transform,opacity]
              duration-700
              ease-[cubic-bezier(0.16,1,0.3,1)]
              motion-reduce:transition-none
              sm:mt-5 sm:text-base sm:leading-7
              lg:mx-0

              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }
            `}
            style={{
              transitionDelay: reducedMotion ? "0ms" : "170ms",
            }}
          >
            Selecciona el servicio que necesitas y contáctanos para recibir
            atención rápida y personalizada.
          </p>

          <div className="mx-auto mt-7 flex max-w-xs items-center gap-3 lg:mx-0">
            <div className="h-px flex-1 overflow-hidden bg-white/[0.05]">
              <div
                className={`
                  h-full origin-left transform-gpu
                  bg-gradient-to-r
                  from-emerald-500/10
                  via-emerald-400/80
                  to-transparent
                  transition-transform
                  duration-1000
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  motion-reduce:transition-none

                  ${isVisible ? "scale-x-100" : "scale-x-0"}
                `}
                style={{
                  transitionDelay: reducedMotion ? "0ms" : "260ms",
                }}
              />
            </div>

            <span
              className={`
                h-1.5 w-1.5 transform-gpu
                border border-emerald-400/70
                bg-[#050b0a]
                transition-[transform,opacity]
                duration-700
                ease-[cubic-bezier(0.16,1,0.3,1)]
                motion-reduce:transition-none

                ${
                  isVisible
                    ? "rotate-45 scale-100 opacity-100"
                    : "rotate-[225deg] scale-0 opacity-0"
                }
              `}
              style={{
                transitionDelay: reducedMotion ? "0ms" : "330ms",
              }}
            />
          </div>
        </div>

        {/* Tarjetas */}
        <div
          className="
            mt-10 grid gap-4
            sm:mt-12 sm:grid-cols-2
            lg:mt-16 lg:grid-cols-4
            lg:gap-5
          "
        >
          {services.map((service, index) => {
            const cardDelay = reducedMotion
              ? "0ms"
              : `${280 + index * 95}ms`;

            return (
              <div
                key={service.title}
                className={`
                  h-full transform-gpu
                  transition-[transform,opacity]
                  duration-[850ms]
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  motion-reduce:transition-none

                  ${isVisible ? "" : "will-change-transform"}
                `}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translate3d(0,0,0) scale(1) rotate(0deg)"
                    : initialCardTransforms[index],
                  transitionDelay: cardDelay,
                }}
              >
                <article
                  className="
                    group relative isolate
                    flex h-full min-h-[290px] flex-col
                    overflow-hidden rounded-[1.5rem]
                    border border-white/[0.08]
                    bg-white/[0.025]
                    p-5
                    [contain:layout_paint]
                    transition-[transform,border-color,background-color,box-shadow]
                    duration-300
                    ease-out
                    active:scale-[0.99]
                    active:border-emerald-400/20
                    active:bg-emerald-500/[0.035]
                    sm:min-h-[330px]
                    sm:rounded-[1.75rem]
                    sm:p-6
                    sm:backdrop-blur-sm
                    lg:hover:-translate-y-2
                    lg:hover:border-emerald-400/25
                    lg:hover:bg-emerald-500/[0.04]
                    lg:hover:shadow-[0_24px_70px_rgba(0,0,0,0.3),0_0_35px_rgba(16,185,129,0.06)]
                  "
                >
                  {/* Fondo interno */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute inset-0 -z-20
                      bg-gradient-to-br
                      from-emerald-500/[0.035]
                      via-transparent
                      to-transparent
                    "
                  />

                  {/* Resplandor interno */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute
                      -right-16 -top-20 -z-10
                      h-44 w-44 rounded-full
                      bg-[radial-gradient(circle,rgba(16,185,129,0.11),transparent_68%)]
                      opacity-60
                      transition-[opacity,transform]
                      duration-500
                      lg:group-hover:scale-125
                      lg:group-hover:opacity-100
                    "
                  />

                  {/* Puntos decorativos */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute
                      right-5 top-5 -z-10
                      grid grid-cols-3 gap-1
                      opacity-20
                      transition-[opacity,transform]
                      duration-500
                      sm:right-6 sm:top-6
                      lg:group-hover:translate-x-1
                      lg:group-hover:-translate-y-1
                      lg:group-hover:opacity-50
                    "
                  >
                    {Array.from({ length: 9 }).map((_, dotIndex) => (
                      <span
                        key={dotIndex}
                        className="
                          h-0.5 w-0.5
                          rounded-full bg-emerald-300
                        "
                      />
                    ))}
                  </div>

                  {/* Línea superior */}
                  <div
                    aria-hidden="true"
                    className={`
                      absolute inset-x-5 top-0 h-px
                      origin-center transform-gpu
                      bg-gradient-to-r
                      from-transparent
                      via-emerald-400/80
                      to-transparent
                      transition-transform
                      duration-1000
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      motion-reduce:transition-none
                      sm:inset-x-6

                      ${isVisible ? "scale-x-100" : "scale-x-0"}
                    `}
                    style={{
                      transitionDelay: reducedMotion
                        ? "0ms"
                        : `${420 + index * 95}ms`,
                    }}
                  />

                  {/* Icono */}
                  <div className="relative w-fit">
                    <div
                      className="
                        flex h-12 w-12 items-center justify-center
                        rounded-2xl
                        border border-emerald-400/15
                        bg-emerald-500/[0.08]
                        text-emerald-300
                        shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_25px_rgba(0,0,0,0.15)]
                        transition-[transform,border-color,background-color,color,box-shadow]
                        duration-300
                        sm:h-[52px] sm:w-[52px]
                        lg:group-hover:-rotate-[6deg]
                        lg:group-hover:scale-110
                        lg:group-hover:border-emerald-400/35
                        lg:group-hover:bg-emerald-500/[0.14]
                        lg:group-hover:text-emerald-200
                        lg:group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(16,185,129,0.1)]
                      "
                    >
                      {service.icon}
                    </div>

                    <span
                      className="
                        absolute -bottom-1 -right-1
                        flex h-3 w-3 items-center justify-center
                        rounded-full
                        border-2 border-[#080e0c]
                        bg-emerald-400
                        shadow-[0_0_10px_rgba(52,211,153,0.55)]
                      "
                    >
                      <span className="h-1 w-1 rounded-full bg-[#050b0a]" />
                    </span>
                  </div>

                  {/* Información */}
                  <div className="mt-6 sm:mt-8">
                    <h3
                      className="
                        text-lg font-semibold
                        leading-tight tracking-[-0.02em]
                        text-white
                        transition-colors duration-300
                        sm:text-xl
                        lg:group-hover:text-emerald-50
                      "
                    >
                      {service.title}
                    </h3>

                    <p
                      className="
                        mt-3 text-[13px] leading-6
                        text-white/45
                        transition-colors duration-300
                        sm:text-sm sm:leading-7
                        lg:group-hover:text-white/65
                      "
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Estado y botón */}
                  <div className="mt-auto pt-6 sm:pt-7">
                    <div
                      className="
                        border-t border-white/[0.07]
                        pt-4
                        sm:pt-5
                      "
                    >
                      <div className="mb-4 flex items-center gap-2.5">
                        <span
                          className="
                            relative flex h-2 w-2
                            items-center justify-center
                          "
                        >
                          <span
                            className="
                              absolute hidden h-full w-full
                              rounded-full bg-emerald-400/25
                              motion-safe:sm:block
                              motion-safe:sm:animate-ping
                            "
                          />

                          <span
                            className="
                              relative h-1.5 w-1.5
                              rounded-full bg-emerald-400
                              shadow-[0_0_8px_rgba(52,211,153,0.7)]
                            "
                          />
                        </span>

                        <span
                          className="
                            text-[10px] font-bold uppercase
                            tracking-[0.18em]
                            text-emerald-300/75
                            transition-colors duration-300
                            sm:text-[11px]
                            lg:group-hover:text-emerald-300
                          "
                        >
                          Servicio disponible
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleContactClick}
                        aria-label={`Ir a contacto para solicitar ${service.title}`}
                        className="
                          group/button relative
                          flex min-h-11 w-full
                          touch-manipulation items-center
                          justify-between gap-3
                          overflow-hidden rounded-xl
                          border border-emerald-400/20
                          bg-emerald-500/[0.09]
                          px-4 py-3
                          text-[12px] font-bold
                          text-emerald-200
                          shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
                          transition-[transform,border-color,background-color,color,box-shadow]
                          duration-300
                          active:scale-[0.97]
                          active:bg-emerald-500/[0.16]
                          sm:text-[13px]
                          lg:hover:border-emerald-400/40
                          lg:hover:bg-emerald-500/[0.15]
                          lg:hover:text-white
                          lg:hover:shadow-[0_12px_30px_rgba(16,185,129,0.1)]
                        "
                      >
                        {/* Brillo únicamente al pasar el cursor */}
                        <span
                          aria-hidden="true"
                          className="
                            pointer-events-none absolute
                            inset-y-0 left-[-45%]
                            hidden w-[35%]
                            skew-x-[-20deg]
                            bg-gradient-to-r
                            from-transparent
                            via-white/10
                            to-transparent
                            transition-transform
                            duration-700
                            lg:block
                            lg:group-hover/button:translate-x-[430%]
                          "
                        />

                        <span
                          className="
                            relative z-10
                            flex items-center gap-2
                          "
                        >
                          <ContactIcon />
                          Contactar
                        </span>

                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                          className="
                            relative z-10
                            h-4 w-4 shrink-0
                            transition-transform duration-300
                            group-hover/button:translate-x-1
                          "
                        >
                          <path
                            d="M3 8h9M9 4.5 12.5 8 9 11.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* Pie de sección */}
        <div
          className={`
            mt-10 flex transform-gpu
            items-center justify-center gap-3
            transition-[transform,opacity]
            duration-700
            ease-[cubic-bezier(0.16,1,0.3,1)]
            motion-reduce:transition-none
            sm:mt-12

            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }
          `}
          style={{
            transitionDelay: reducedMotion ? "0ms" : "780ms",
          }}
        >
          <span
            className="
              h-px w-8
              bg-gradient-to-r
              from-transparent
              to-emerald-400/35
            "
          />

          <p
            className="
              text-center text-[10px]
              font-medium uppercase
              tracking-[0.16em] text-white/25
              sm:text-xs
            "
          >
            Atención rápida y personalizada
          </p>

          <span
            className="
              h-px w-8
              bg-gradient-to-l
              from-transparent
              to-emerald-400/35
            "
          />
        </div>
      </div>
    </section>
  );
}