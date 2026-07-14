"use client";

import { useEffect, useRef, useState } from "react";

const benefits = [
  {
    title: "Atención personalizada",
    description: "Comunicación directa para resolver cada solicitud.",
    number: "01",
  },
  {
    title: "Procesos claros y seguros",
    description: "Información precisa antes de comenzar cualquier servicio.",
    number: "02",
  },
  {
    title: "Clientes y revendedores",
    description: "Soluciones adaptadas tanto a usuarios como a profesionales.",
    number: "03",
  },
  {
    title: "Soporte durante el proceso",
    description: "Acompañamiento desde la solicitud hasta la finalización.",
    number: "04",
  },
];

const easing = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /*
     * Si el usuario tiene reducidas las animaciones
     * o el navegador no soporta IntersectionObserver,
     * mostramos todo inmediatamente.
     */
    if (reduceMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    let animationFrame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        /*
         * requestAnimationFrame evita actualizar React
         * en mitad del cálculo de scroll del navegador.
         */
        animationFrame = window.requestAnimationFrame(() => {
          setVisible(true);
        });

        /*
         * La animación ocurre una sola vez.
         * Después se elimina completamente el observer.
         */
        observer.disconnect();
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const revealClass = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-5 opacity-0 will-change-[transform,opacity]";

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="
        relative isolate overflow-hidden
        bg-[#050b08]
        bg-[radial-gradient(circle_at_90%_18%,rgba(16,185,129,0.08),transparent_32%),radial-gradient(circle_at_5%_95%,rgba(5,150,105,0.06),transparent_34%)]
        px-4 py-16
        [contain-intrinsic-size:auto_900px]
        [content-visibility:auto]
        min-[380px]:px-5
        sm:py-20
        md:px-8 md:py-24
        lg:py-28
      "
    >
      {/*
       * La cuadrícula tecnológica se oculta en móvil.
       * Solo se procesa desde tablet para ahorrar renderizado.
       */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-20
          hidden opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)]
          [background-size:48px_48px]
          [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)]
          md:block
        "
      />

      {/* Línea superior */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute left-1/2 top-0
          h-px w-full max-w-5xl
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent via-emerald-400/30 to-transparent
          transition-[opacity,transform]
          duration-700
          motion-reduce:transition-none

          ${
            visible
              ? "scale-x-100 opacity-100"
              : "scale-x-75 opacity-0"
          }
        `}
        style={{
          transitionTimingFunction: easing,
        }}
      />

      <div
        className="
          relative mx-auto grid w-full max-w-7xl
          items-center gap-10
          sm:gap-12
          lg:grid-cols-[0.92fr_1.08fr]
          lg:gap-14
          xl:gap-20
        "
      >
        {/* Información */}
        <div className="relative z-10">
          {/* Etiqueta */}
          <div
            className={`
              flex items-center gap-3
              transition-[opacity,transform]
              duration-500
              motion-reduce:transform-none
              motion-reduce:transition-none

              ${
                visible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0 will-change-[transform,opacity]"
              }
            `}
            style={{
              transitionTimingFunction: easing,
            }}
          >
            <span
              aria-hidden="true"
              className="
                relative flex h-8 w-8 items-center justify-center
                rounded-full
                border border-emerald-400/20
                bg-emerald-400/[0.08]
              "
            >
              <span
                className="
                  h-1.5 w-1.5 rounded-full bg-emerald-400
                  md:shadow-[0_0_10px_rgba(52,211,153,0.65)]
                "
              />

              <span
                className="
                  absolute inset-1 rounded-full
                  border border-emerald-300/10
                "
              />
            </span>

            <p
              className="
                text-[11px] font-bold uppercase
                tracking-[0.22em] text-emerald-400
                sm:text-xs sm:tracking-[0.26em]
              "
            >
              Sobre la empresa
            </p>
          </div>

          {/* Título */}
          <h2
            className={`
              mt-5 max-w-2xl
              text-[32px] font-[850]
              leading-[1.07] tracking-[-0.04em]
              text-white
              transition-[opacity,transform]
              duration-700
              motion-reduce:transform-none
              motion-reduce:transition-none
              min-[380px]:text-[36px]
              sm:text-[46px]
              lg:text-[52px]
              xl:text-[58px]

              ${revealClass}
            `}
            style={{
              transitionDelay: visible ? "60ms" : "0ms",
              transitionTimingFunction: easing,
            }}
          >
            Tecnología y confianza en cada{" "}
            <span
              className="
                bg-gradient-to-r
                from-emerald-300 via-emerald-400 to-green-300
                bg-clip-text text-transparent
              "
            >
              solución
            </span>
          </h2>

          {/* Línea debajo del título */}
          <div
            aria-hidden="true"
            className={`
              mt-6 h-px max-w-[180px]
              origin-left
              bg-gradient-to-r
              from-emerald-400/75
              via-emerald-400/25
              to-transparent
              transition-[opacity,transform]
              duration-700
              motion-reduce:transition-none

              ${
                visible
                  ? "scale-x-100 opacity-100"
                  : "scale-x-0 opacity-0"
              }
            `}
            style={{
              transitionDelay: visible ? "120ms" : "0ms",
              transitionTimingFunction: easing,
            }}
          />

          {/* Descripción */}
          <div
            className={`
              mt-6 max-w-xl
              transition-[opacity,transform]
              duration-700
              motion-reduce:transform-none
              motion-reduce:transition-none

              ${revealClass}
            `}
            style={{
              transitionDelay: visible ? "120ms" : "0ms",
              transitionTimingFunction: easing,
            }}
          >
            <p
              className="
                text-[15px] leading-7 text-zinc-400
                sm:text-base sm:leading-8
              "
            >
              En{" "}
              <span className="font-semibold text-zinc-200">
                Unlock by Sam
              </span>{" "}
              ayudamos a clientes, técnicos y revendedores a encontrar
              soluciones para sus dispositivos móviles mediante servicios
              confiables y atención directa.
            </p>

            <p
              className="
                mt-4 text-[15px] leading-7 text-zinc-400
                sm:text-base sm:leading-8
              "
            >
              Nuestro objetivo es ofrecer procesos sencillos, información clara
              y acompañamiento durante cada solicitud.
            </p>
          </div>

          {/* Atención directa */}
          <div
            className={`
              mt-7 flex items-center gap-3
              transition-[opacity,transform]
              duration-[600ms]
              motion-reduce:transform-none
              motion-reduce:transition-none

              ${revealClass}
            `}
            style={{
              transitionDelay: visible ? "180ms" : "0ms",
              transitionTimingFunction: easing,
            }}
          >
            <span
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-full
                border border-emerald-400/15
                bg-emerald-400/[0.06]
              "
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="
                  h-4 w-4
                  stroke-emerald-400 stroke-[1.8]
                "
              >
                <path
                  d="M7 12.5 10.2 16 17 8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <div>
              <p className="text-sm font-semibold text-zinc-200">
                Atención directa
              </p>

              <p className="mt-0.5 text-xs text-zinc-500">
                Sin intermediarios innecesarios
              </p>
            </div>
          </div>
        </div>

        {/* Panel de beneficios */}
        <div
          className={`
            relative z-10
            transition-[opacity,transform]
            duration-700
            motion-reduce:transform-none
            motion-reduce:transition-none

            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-7 opacity-0 will-change-[transform,opacity]"
            }
          `}
          style={{
            transitionDelay: visible ? "100ms" : "0ms",
            transitionTimingFunction: easing,
          }}
        >
          {/*
           * El blur exterior solamente aparece desde tablet.
           * En móvil no se procesa.
           */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              inset-x-[12%] bottom-[-20px]
              hidden h-20 rounded-full
              bg-emerald-500/10
              blur-[42px]
              md:block
            "
          />

          <div
            className="
              relative overflow-hidden
              rounded-[24px]
              border border-white/[0.08]
              bg-[#07100c]
              p-2.5
              shadow-[0_18px_45px_rgba(0,0,0,0.28)]
              sm:rounded-[28px] sm:p-3
              md:bg-[#07100c]/95
              md:backdrop-blur-sm
              lg:p-3.5
            "
          >
            {/*
             * Gradiente adicional oculto en celulares pequeños.
             */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-0
                hidden
                bg-[radial-gradient(circle_at_90%_0%,rgba(52,211,153,0.09),transparent_36%)]
                sm:block
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute
                inset-x-10 top-0 h-px
                bg-gradient-to-r
                from-transparent
                via-emerald-300/40
                to-transparent
              "
            />

            <div className="relative space-y-2.5 sm:space-y-3">
              {benefits.map((benefit, index) => {
                /*
                 * Retraso corto.
                 * Antes las tarjetas tardaban demasiado y superponían
                 * muchos efectos al mismo tiempo.
                 */
                const delay = 180 + index * 65;

                return (
                  <article
                    key={benefit.title}
                    className={`
                      group/card relative overflow-hidden
                      rounded-[18px]
                      border border-white/[0.07]
                      bg-[#0a1510]
                      p-4
                      [backface-visibility:hidden]
                      transition-[opacity,transform,border-color,background-color,box-shadow]
                      duration-500
                      motion-reduce:transform-none
                      motion-reduce:transition-none
                      sm:rounded-[21px]
                      sm:p-5

                      md:hover:border-emerald-400/20
                      md:hover:bg-[#0c1913]
                      md:hover:shadow-[0_12px_30px_rgba(0,0,0,0.22)]

                      ${
                        visible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0 will-change-[transform,opacity]"
                      }
                    `}
                    style={{
                      transitionDelay: visible ? `${delay}ms` : "0ms",
                      transitionTimingFunction: easing,
                    }}
                  >
                    {/*
                     * Indicador hover únicamente desde desktop/tablet.
                     * Los celulares no calculan este efecto.
                     */}
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none absolute
                        inset-y-0 left-0
                        hidden w-[3px]
                        bg-gradient-to-b
                        from-transparent
                        via-emerald-400/35
                        to-transparent
                        opacity-0
                        transition-opacity
                        duration-300
                        md:block
                        md:group-hover/card:opacity-100
                      "
                    />

                    <div className="flex items-center gap-3.5 sm:gap-4">
                      {/* Icono */}
                      <div
                        className="
                          relative flex h-11 w-11 shrink-0
                          items-center justify-center
                          rounded-[14px]
                          border border-emerald-400/15
                          bg-emerald-400/[0.07]
                          transition-[transform,border-color,background-color]
                          duration-300
                          motion-reduce:transform-none
                          sm:h-12 sm:w-12

                          md:group-hover/card:-rotate-2
                          md:group-hover/card:scale-[1.03]
                          md:group-hover/card:border-emerald-400/25
                          md:group-hover/card:bg-emerald-400/[0.1]
                        "
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="
                            h-5 w-5
                            stroke-emerald-400 stroke-[1.9]
                          "
                        >
                          <path
                            d="M7 12.5 10.2 16 17 8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <span
                          aria-hidden="true"
                          className="
                            absolute inset-1
                            rounded-[10px]
                            border border-white/[0.025]
                          "
                        />
                      </div>

                      {/* Texto */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3
                            className="
                              text-[14px] font-bold
                              leading-5 tracking-[-0.02em]
                              text-zinc-100
                              min-[380px]:text-[15px]
                              sm:text-base
                            "
                          >
                            {benefit.title}
                          </h3>

                          <span
                            className="
                              shrink-0 font-mono
                              text-[10px] font-medium
                              tracking-[0.12em]
                              text-emerald-400/45
                              transition-colors
                              duration-300
                              md:group-hover/card:text-emerald-400/75
                            "
                          >
                            {benefit.number}
                          </span>
                        </div>

                        <p
                          className="
                            mt-1
                            text-[12px] leading-5
                            text-zinc-500
                            min-[380px]:text-[13px]
                            sm:mt-1.5 sm:text-sm
                          "
                        >
                          {benefit.description}
                        </p>
                      </div>

                      {/* Flecha */}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="
                          hidden h-4 w-4 shrink-0
                          stroke-emerald-400/40 stroke-[1.8]
                          transition-[transform,stroke]
                          duration-300
                          motion-reduce:transform-none
                          min-[430px]:block
                          md:group-hover/card:translate-x-0.5
                          md:group-hover/card:stroke-emerald-400
                        "
                      >
                        <path
                          d="M4.5 10h11M11 5.5l4.5 4.5-4.5 4.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute
          bottom-0 left-1/2
          h-px w-full max-w-7xl
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent via-white/[0.07] to-transparent
          transition-[opacity,transform]
          duration-700
          motion-reduce:transition-none

          ${
            visible
              ? "scale-x-100 opacity-100"
              : "scale-x-75 opacity-0"
          }
        `}
        style={{
          transitionDelay: visible ? "260ms" : "0ms",
          transitionTimingFunction: easing,
        }}
      />
    </section>
  );
}