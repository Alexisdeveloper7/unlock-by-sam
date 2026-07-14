"use client";

import Link from "next/link";
import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import UnlockCoreMockup from "@/components/UnlockCoreMockup";

export default function HeroSection() {
  const heroRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    let timeoutOrientacion = null;
    let frameUno = null;
    let frameDos = null;
    let frameEntrada = null;

    const mediaOrientacion = window.matchMedia(
      "(orientation: landscape)",
    );

    /*
     * Guarda la altura inicial visible del navegador.
     *
     * No utilizamos resize porque las barras del navegador
     * móvil cambian de tamaño durante el scroll.
     */
    const guardarViewport = () => {
      const viewport = window.visualViewport;

      const altura = Math.round(
        viewport?.height ||
          document.documentElement.clientHeight ||
          window.innerHeight,
      );

      const ancho = Math.round(
        viewport?.width ||
          document.documentElement.clientWidth ||
          window.innerWidth,
      );

      const movilVertical =
        ancho < 768 && ancho <= altura;

      const movilHorizontal =
        ancho > altura && ancho < 1024;

      const muyCompacto =
        movilVertical && altura < 650;

      const compacto =
        movilVertical &&
        altura >= 650 &&
        altura < 740;

      hero.style.setProperty(
        "--hero-height",
        `${altura}px`,
      );

      hero.dataset.compacto = compacto
        ? "true"
        : "false";

      hero.dataset.muyCompacto = muyCompacto
        ? "true"
        : "false";

      hero.dataset.horizontal = movilHorizontal
        ? "true"
        : "false";
    };

    const actualizarOrientacion = () => {
      if (timeoutOrientacion) {
        window.clearTimeout(timeoutOrientacion);
      }

      if (frameUno) {
        window.cancelAnimationFrame(frameUno);
      }

      if (frameDos) {
        window.cancelAnimationFrame(frameDos);
      }

      /*
       * Espera a que iOS o Android terminen de acomodar
       * completamente la nueva orientación.
       */
      timeoutOrientacion = window.setTimeout(() => {
        frameUno = window.requestAnimationFrame(() => {
          frameDos =
            window.requestAnimationFrame(
              guardarViewport,
            );
        });
      }, 140);
    };

    guardarViewport();

    frameEntrada = window.requestAnimationFrame(() => {
      setVisible(true);
    });

    window.addEventListener(
      "orientationchange",
      actualizarOrientacion,
    );

    if (mediaOrientacion.addEventListener) {
      mediaOrientacion.addEventListener(
        "change",
        actualizarOrientacion,
      );
    } else {
      mediaOrientacion.addListener?.(
        actualizarOrientacion,
      );
    }

    return () => {
      if (timeoutOrientacion) {
        window.clearTimeout(timeoutOrientacion);
      }

      if (frameUno) {
        window.cancelAnimationFrame(frameUno);
      }

      if (frameDos) {
        window.cancelAnimationFrame(frameDos);
      }

      if (frameEntrada) {
        window.cancelAnimationFrame(frameEntrada);
      }

      window.removeEventListener(
        "orientationchange",
        actualizarOrientacion,
      );

      if (mediaOrientacion.removeEventListener) {
        mediaOrientacion.removeEventListener(
          "change",
          actualizarOrientacion,
        );
      } else {
        mediaOrientacion.removeListener?.(
          actualizarOrientacion,
        );
      }
    };
  }, []);

  const irAServicios = () => {
  const seccion = document.getElementById("servicios");

  if (!seccion) return;

  const movimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const alturaHeader =
    window.innerWidth >= 640 ? 72 : 68;

  const posicion =
    seccion.getBoundingClientRect().top +
    window.scrollY -
    alturaHeader;

  window.scrollTo({
    top: Math.max(0, posicion),
    behavior: movimientoReducido ? "auto" : "smooth",
  });
};

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="
        group
        relative
        isolate
        h-[var(--hero-height)]
        min-h-[var(--hero-height)]
        overflow-hidden
        bg-[#050b0a]
        [--hero-height:100svh]

        data-[horizontal=true]:h-auto
        data-[horizontal=true]:min-h-[max(var(--hero-height),540px)]
        data-[horizontal=true]:overflow-x-clip
        data-[horizontal=true]:overflow-y-visible
      "
    >
      {/* Fondo optimizado sin blur */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20
          overflow-hidden
        "
      >
        {/* Luz superior */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_-15%,rgba(16,185,129,0.18)_0%,rgba(16,185,129,0.065)_30%,transparent_58%)]
          "
        />

        {/* Luz inferior */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_110%,rgba(6,95,70,0.16)_0%,rgba(6,78,59,0.05)_32%,transparent_55%)]
          "
        />

        {/* Cuadrícula */}
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(rgba(52,211,153,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.025)_1px,transparent_1px)]
            opacity-45
            [background-size:38px_38px]
            sm:[background-size:44px_44px]
          "
        />

        {/* Oscurecimiento inferior */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[45%]
            bg-gradient-to-t
            from-[#050b0a]
            via-[#050b0a]/70
            to-transparent
          "
        />
      </div>

      {/* Contenido completo */}
      <div
        className="
          relative
          mx-auto
          grid
          h-full
          w-full
          max-w-7xl
          grid-cols-1
          grid-rows-[auto_auto]
          place-content-center
          place-items-center
          gap-6
          px-4
          pb-6
          pt-[86px]

          max-[350px]:px-3

          group-data-[compacto=true]:gap-3
          group-data-[compacto=true]:pb-4
          group-data-[compacto=true]:pt-[78px]

          group-data-[muy-compacto=true]:gap-2
          group-data-[muy-compacto=true]:pb-3
          group-data-[muy-compacto=true]:pt-[72px]

          group-data-[horizontal=true]:h-auto
          group-data-[horizontal=true]:min-h-[max(var(--hero-height),540px)]
          group-data-[horizontal=true]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
          group-data-[horizontal=true]:grid-rows-1
          group-data-[horizontal=true]:gap-5
          group-data-[horizontal=true]:px-5
          group-data-[horizontal=true]:pb-5
          group-data-[horizontal=true]:pt-[82px]

          sm:gap-7
          sm:px-6
          sm:pb-7
          sm:pt-[92px]

          lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]
          lg:grid-rows-1
          lg:gap-10
          lg:px-8
          lg:pb-8
          lg:pt-[96px]

          xl:gap-16
        "
      >
        {/* Mockup */}
        <div
          className={`
            relative
            order-1
            mx-auto
            flex
            w-full
            items-center
            justify-center
            overflow-visible

            transition-[opacity,transform]
            duration-700
            ease-[cubic-bezier(0.16,1,0.3,1)]
            will-change-transform

            motion-reduce:transition-none

            group-data-[horizontal=true]:order-1

            lg:order-2

            ${
              visible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-5 scale-[0.96] opacity-0"
            }
          `}
        >
          {/* Resplandor */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              aspect-square
              w-[min(86vw,340px)]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[radial-gradient(circle,rgba(16,185,129,0.11)_0%,rgba(16,185,129,0.04)_38%,transparent_70%)]

              group-data-[compacto=true]:w-[250px]
              group-data-[muy-compacto=true]:w-[185px]
              group-data-[horizontal=true]:w-[min(38vw,320px)]

              sm:w-[370px]
              lg:w-[410px]
            "
          />

          {/* Anillo decorativo */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              aspect-square
              w-[min(82vw,320px)]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-emerald-300/[0.055]

              group-data-[compacto=true]:w-[235px]
              group-data-[muy-compacto=true]:w-[170px]
              group-data-[horizontal=true]:w-[min(36vw,305px)]

              sm:w-[350px]
              lg:w-[390px]
            "
          />

          {/* Tamaño del mockup */}
          <div
            className="
              relative
              z-10
              w-[min(72vw,280px)]
              overflow-visible

              group-data-[compacto=true]:w-[200px]
              group-data-[muy-compacto=true]:w-[145px]
              group-data-[horizontal=true]:w-[min(31vw,260px)]

              sm:w-[290px]
              lg:w-[310px]
            "
          >
            <UnlockCoreMockup />
          </div>
        </div>

        {/* Texto */}
        <div
          className="
            order-2 mt-7
            flex
            w-full
            max-w-[760px]
            flex-col
            items-center
            text-center

            group-data-[horizontal=true]:order-2
            group-data-[horizontal=true]:max-w-[520px]

            lg:order-1
            lg:max-w-xl
          "
        >
          {/* Etiqueta */}
          <div
            className={`
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-emerald-400/20
              bg-emerald-400/[0.07]
              px-3.5
              py-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.17em]
              text-emerald-300

              transition-[opacity,transform]
              duration-500
              delay-100
              ease-out

              motion-reduce:transition-none

              group-data-[compacto=true]:px-3
              group-data-[compacto=true]:py-1.5
              group-data-[compacto=true]:text-[9px]

              group-data-[muy-compacto=true]:px-2.5
              group-data-[muy-compacto=true]:py-1.5
              group-data-[muy-compacto=true]:text-[8px]
              group-data-[muy-compacto=true]:tracking-[0.13em]

              group-data-[horizontal=true]:px-3
              group-data-[horizontal=true]:py-1.5
              group-data-[horizontal=true]:text-[9px]

              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }
            `}
          >
            <span
              aria-hidden="true"
              className="
                h-2
                w-2
                shrink-0
                rounded-full
                bg-emerald-400
                shadow-[0_0_10px_rgba(52,211,153,0.6)]
              "
            />

            <span>Soluciones GSM profesionales</span>
          </div>

          {/* Título */}
          <h1
            className={`
              mt-3
              max-w-[760px]
              text-[clamp(2rem,8.6vw,3.3rem)]
              font-bold
              leading-[0.97]
              tracking-[-0.05em]
              text-white

              transition-[opacity,transform]
              duration-700
              delay-150
              ease-[cubic-bezier(0.16,1,0.3,1)]

              motion-reduce:transition-none

              group-data-[compacto=true]:mt-2.5
              group-data-[compacto=true]:text-[clamp(1.65rem,7.5vw,2.25rem)]

              group-data-[muy-compacto=true]:mt-2
              group-data-[muy-compacto=true]:text-[clamp(1.4rem,6.8vw,1.85rem)]

              group-data-[horizontal=true]:mt-3
              group-data-[horizontal=true]:text-[clamp(1.75rem,4vw,2.8rem)]

              sm:mt-4
              sm:text-[clamp(2.7rem,6.8vw,4.2rem)]

              lg:text-[clamp(2.8rem,4.5vw,4.4rem)]

              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }
            `}
          >
            Desbloquea tu celular de forma{" "}
            <span className="relative inline-block">
              <span
                className="
                  bg-gradient-to-r
                  from-emerald-200
                  via-emerald-400
                  to-green-500
                  bg-clip-text
                  text-transparent
                "
              >
                rápida y segura.
              </span>

              <span
                aria-hidden="true"
                className={`
                  absolute
                  -bottom-1
                  left-0
                  h-px
                  w-full
                  origin-center
                  bg-gradient-to-r
                  from-transparent
                  via-emerald-300/70
                  to-transparent

                  transition-[opacity,transform]
                  duration-700
                  delay-700
                  ease-out

                  motion-reduce:transition-none

                  ${
                    visible
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0"
                  }
                `}
              />
            </span>
          </h1>

          {/* Descripción */}
          <p
            className={`
              mt-3
              max-w-[570px]
              text-sm
              leading-6
              text-white/55

              transition-[opacity,transform]
              duration-600
              delay-200
              ease-out

              motion-reduce:transition-none

              group-data-[compacto=true]:mt-2.5
              group-data-[compacto=true]:text-xs
              group-data-[compacto=true]:leading-5

              group-data-[muy-compacto=true]:mt-2
              group-data-[muy-compacto=true]:max-w-[340px]
              group-data-[muy-compacto=true]:text-[11px]
              group-data-[muy-compacto=true]:leading-[1.05rem]

              group-data-[horizontal=true]:mt-2.5
              group-data-[horizontal=true]:text-xs
              group-data-[horizontal=true]:leading-5

              sm:mt-4
              sm:text-base
              sm:leading-7

              lg:text-lg
              lg:leading-8

              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }
            `}
          >
            Servicios especializados de desbloqueo y liberación
            para diferentes dispositivos, modelos y operadores.
          </p>

          {/* Botones */}
          <div
            className={`
              mt-5
              grid
              w-full
              max-w-[420px]
              grid-cols-2
              gap-3

              transition-[opacity,transform]
              duration-600
              delay-300
              ease-out

              motion-reduce:transition-none

              group-data-[compacto=true]:mt-3.5
              group-data-[compacto=true]:max-w-[380px]
              group-data-[compacto=true]:gap-2.5

              group-data-[muy-compacto=true]:mt-3
              group-data-[muy-compacto=true]:max-w-[340px]
              group-data-[muy-compacto=true]:gap-2

              group-data-[horizontal=true]:mt-4
              group-data-[horizontal=true]:max-w-[360px]
              group-data-[horizontal=true]:gap-2.5

              sm:mt-6
              sm:max-w-[440px]
              sm:gap-3.5

              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }
            `}
          >
            {/* Botón principal */}
           <button
  type="button"
  onClick={irAServicios}
  className="
    group
    relative
    isolate
    inline-flex
    min-h-12
    touch-manipulation
    items-center
    justify-center
    gap-2
    overflow-hidden
    whitespace-nowrap
    rounded-full
    border
    border-emerald-300/20
    bg-emerald-400
    px-5
    py-3
    text-[13px]
    font-bold
    text-[#02130d]
    outline-none
    shadow-[0_12px_30px_rgba(16,185,129,0.2)]

    [-webkit-tap-highlight-color:transparent]

    transition-[transform,background-color,border-color,box-shadow]
    duration-200
    ease-[cubic-bezier(0.16,1,0.3,1)]

    hover:-translate-y-0.5
    hover:border-emerald-100/60
    hover:bg-emerald-300
    hover:shadow-[0_16px_36px_rgba(16,185,129,0.27)]

    active:translate-y-px
    active:scale-[0.96]
    active:border-emerald-100/80
    active:bg-emerald-500
    active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)]

    focus-visible:ring-2
    focus-visible:ring-emerald-200
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[#050b0a]

    motion-reduce:transition-none

    max-[350px]:gap-1.5
    max-[350px]:px-3
    max-[350px]:text-[11px]

    group-data-[compacto=true]:min-h-11
    group-data-[compacto=true]:px-4
    group-data-[compacto=true]:py-2.5
    group-data-[compacto=true]:text-xs

    group-data-[muy-compacto=true]:min-h-10
    group-data-[muy-compacto=true]:px-3
    group-data-[muy-compacto=true]:py-2
    group-data-[muy-compacto=true]:text-[10px]

    group-data-[horizontal=true]:min-h-11
    group-data-[horizontal=true]:px-4
    group-data-[horizontal=true]:py-2.5
    group-data-[horizontal=true]:text-xs

    sm:min-h-[52px]
    sm:px-7
    sm:text-sm
  "
>
  {/* Resplandor interior al presionar */}
  <span
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      inset-0
      scale-75
      rounded-full
      bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_70%)]
      opacity-0

      transition-[opacity,transform]
      duration-200
      ease-out

      group-active:scale-100
      group-active:opacity-100
    "
  />

  <span
    className="
      relative
      transition-transform
      duration-200
      group-active:scale-[0.98]
    "
  >
    Ver servicios
  </span>

  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
    className="
      relative
      hidden
      h-4
      w-4
      shrink-0

      transition-transform
      duration-200

      group-hover:translate-x-0.5
      group-active:-translate-x-px
      group-active:scale-90

      min-[370px]:block

      group-data-[muy-compacto=true]:hidden
    "
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>

            {/* Botón secundario */}
         <button
  type="button"
  className="
    group
    relative
    isolate
    inline-flex
    min-h-12
    touch-manipulation
    items-center
    justify-center
    overflow-hidden
    whitespace-nowrap
    rounded-full
    border
    border-white/15
    bg-white/[0.055]
    px-5
    py-3
    text-[13px]
    font-semibold
    text-white
    outline-none

    [-webkit-tap-highlight-color:transparent]

    transition-[transform,background-color,border-color,box-shadow,color]
    duration-200
    ease-[cubic-bezier(0.16,1,0.3,1)]

    hover:-translate-y-0.5
    hover:border-emerald-400/35
    hover:bg-emerald-400/[0.09]
    hover:text-emerald-100
    hover:shadow-[0_10px_26px_rgba(0,0,0,0.2)]

    active:translate-y-px
    active:scale-[0.96]
    active:border-emerald-300/70
    active:bg-emerald-400/[0.14]
    active:text-emerald-100
    active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.28),0_0_0_3px_rgba(52,211,153,0.12)]

    focus-visible:ring-2
    focus-visible:ring-emerald-400/60
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[#050b0a]

    motion-reduce:transition-none

    max-[350px]:px-3
    max-[350px]:text-[11px]

    group-data-[compacto=true]:min-h-11
    group-data-[compacto=true]:px-4
    group-data-[compacto=true]:py-2.5
    group-data-[compacto=true]:text-xs

    group-data-[muy-compacto=true]:min-h-10
    group-data-[muy-compacto=true]:px-3
    group-data-[muy-compacto=true]:py-2
    group-data-[muy-compacto=true]:text-[10px]

    group-data-[horizontal=true]:min-h-11
    group-data-[horizontal=true]:px-4
    group-data-[horizontal=true]:py-2.5
    group-data-[horizontal=true]:text-xs

    sm:min-h-[52px]
    sm:px-7
    sm:text-sm
  "
>
  {/* Fondo que aparece al presionar */}
  <span
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      inset-0
      -z-10
      scale-75
      rounded-full
      bg-[radial-gradient(circle,rgba(52,211,153,0.22)_0%,transparent_70%)]
      opacity-0

      transition-[opacity,transform]
      duration-200
      ease-out

      group-active:scale-100
      group-active:opacity-100
    "
  />

  {/* Borde interior que aparece durante el clic */}
  <span
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      inset-[3px]
      rounded-full
      border
      border-emerald-200/0
      opacity-0

      transition-[opacity,border-color,transform]
      duration-200
      ease-out

      group-active:scale-[0.98]
      group-active:border-emerald-200/40
      group-active:opacity-100
    "
  />

  <span className="relative transition-transform duration-200 group-active:scale-[0.98]">
    Contactar
  </span>
</button>
          </div>

          {/* Beneficios */}
          <div
            className={`
              mt-4
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-4
              gap-y-2
              text-[10px]
              text-white/40

              transition-[opacity,transform]
              duration-600
              delay-[380ms]
              ease-out

              motion-reduce:transition-none

              group-data-[compacto=true]:mt-3
              group-data-[compacto=true]:text-[9px]

              group-data-[muy-compacto=true]:hidden

              group-data-[horizontal=true]:mt-3
              group-data-[horizontal=true]:gap-x-3
              group-data-[horizontal=true]:text-[9px]

              sm:mt-5
              sm:text-xs

              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }
            `}
          >
            <span className="inline-flex items-center gap-2">
              <span
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-emerald-400/10
                  bg-emerald-400/[0.08]
                  text-[11px]
                  text-emerald-400
                "
              >
                ✓
              </span>

              Atención personalizada
            </span>

            <span className="inline-flex items-center gap-2">
              <span
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-emerald-400/10
                  bg-emerald-400/[0.08]
                  text-[11px]
                  text-emerald-400
                "
              >
                ✓
              </span>

              Procesos seguros
            </span>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-emerald-400/20
          to-transparent
        "
      />
    </section>
  );
}