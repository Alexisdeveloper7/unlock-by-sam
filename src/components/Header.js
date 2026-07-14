"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const LIMITE_SCROLL = 32;
const ALTURA_HEADER_MOVIL = 68;
const ALTURA_HEADER_DESKTOP = 72;

export default function Header() {
  const [scrolleado, setScrolleado] = useState(false);
  const [inicializado, setInicializado] = useState(false);
  const [entradaActiva, setEntradaActiva] =
    useState(false);

  const [logoPresionado, setLogoPresionado] =
    useState(false);

  const [botonPresionado, setBotonPresionado] =
    useState(false);

  /*
   * Este estado controla únicamente el borde duradero.
   * La presión del botón termina antes para no sentirse lenta.
   */
  const [bordeBotonActivo, setBordeBotonActivo] =
    useState(false);

  const scrollFrameRef = useRef(null);
  const primerFrameRef = useRef(null);
  const segundoFrameRef = useRef(null);

  const logoTimeoutRef = useRef(null);
  const botonTimeoutRef = useRef(null);

  const bordeBotonTimeoutRef = useRef(null);
  const bordeBotonFrameRef = useRef(null);

  useLayoutEffect(() => {
    const obtenerScrollActual = () =>
      Math.max(
        window.scrollY || 0,
        document.documentElement.scrollTop || 0,
        document.scrollingElement?.scrollTop || 0,
      );

    const actualizarHeader = () => {
      const nuevoEstado =
        obtenerScrollActual() > LIMITE_SCROLL;

      setScrolleado((estadoActual) =>
        estadoActual === nuevoEstado
          ? estadoActual
          : nuevoEstado,
      );
    };

    const detectarScroll = () => {
      if (scrollFrameRef.current !== null) return;

      scrollFrameRef.current =
        window.requestAnimationFrame(() => {
          actualizarHeader();
          scrollFrameRef.current = null;
        });
    };

    actualizarHeader();
    setInicializado(true);

    primerFrameRef.current =
      window.requestAnimationFrame(() => {
        segundoFrameRef.current =
          window.requestAnimationFrame(() => {
            setEntradaActiva(true);
          });
      });

    window.addEventListener("scroll", detectarScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        detectarScroll,
      );

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(
          scrollFrameRef.current,
        );
      }

      if (primerFrameRef.current !== null) {
        window.cancelAnimationFrame(
          primerFrameRef.current,
        );
      }

      if (segundoFrameRef.current !== null) {
        window.cancelAnimationFrame(
          segundoFrameRef.current,
        );
      }

      if (bordeBotonFrameRef.current !== null) {
        window.cancelAnimationFrame(
          bordeBotonFrameRef.current,
        );
      }

      if (logoTimeoutRef.current !== null) {
        window.clearTimeout(logoTimeoutRef.current);
      }

      if (botonTimeoutRef.current !== null) {
        window.clearTimeout(botonTimeoutRef.current);
      }

      if (bordeBotonTimeoutRef.current !== null) {
        window.clearTimeout(
          bordeBotonTimeoutRef.current,
        );
      }
    };
  }, []);

  const obtenerAlturaHeader = () =>
    window.innerWidth >= 640
      ? ALTURA_HEADER_DESKTOP
      : ALTURA_HEADER_MOVIL;

  const navegarASeccion = (id) => {
    const movimientoReducido = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (id === "inicio") {
      window.scrollTo({
        top: 0,
        behavior: movimientoReducido
          ? "auto"
          : "smooth",
      });

      return;
    }

    const seccion = document.getElementById(id);

    if (!seccion) return;

    const posicion =
      seccion.getBoundingClientRect().top +
      window.scrollY -
      obtenerAlturaHeader();

    window.scrollTo({
      top: Math.max(0, posicion),
      behavior: movimientoReducido
        ? "auto"
        : "smooth",
    });
  };

  const presionarLogo = () => {
    if (logoTimeoutRef.current !== null) {
      window.clearTimeout(logoTimeoutRef.current);
    }

    setLogoPresionado(true);
  };

  const liberarLogo = () => {
    if (logoTimeoutRef.current !== null) {
      window.clearTimeout(logoTimeoutRef.current);
    }

    logoTimeoutRef.current = window.setTimeout(() => {
      setLogoPresionado(false);
      logoTimeoutRef.current = null;
    }, 140);
  };

  /*
   * Reinicia la animación del borde para que funcione
   * aunque el usuario presione varias veces seguidas.
   */
  const activarBordeBoton = () => {
    if (bordeBotonTimeoutRef.current !== null) {
      window.clearTimeout(
        bordeBotonTimeoutRef.current,
      );
    }

    if (bordeBotonFrameRef.current !== null) {
      window.cancelAnimationFrame(
        bordeBotonFrameRef.current,
      );
    }

    setBordeBotonActivo(false);

    bordeBotonFrameRef.current =
      window.requestAnimationFrame(() => {
        setBordeBotonActivo(true);

        bordeBotonTimeoutRef.current =
          window.setTimeout(() => {
            setBordeBotonActivo(false);
            bordeBotonTimeoutRef.current = null;
          }, 650);
      });
  };

  const presionarBoton = () => {
    if (botonTimeoutRef.current !== null) {
      window.clearTimeout(botonTimeoutRef.current);
    }

    setBotonPresionado(true);
    activarBordeBoton();
  };

  const liberarBoton = () => {
    if (botonTimeoutRef.current !== null) {
      window.clearTimeout(botonTimeoutRef.current);
    }

    /*
     * La compresión dura poco.
     * El borde sigue activo independientemente.
     */
    botonTimeoutRef.current = window.setTimeout(() => {
      setBotonPresionado(false);
      botonTimeoutRef.current = null;
    }, 170);
  };

  const esTeclaDeActivacion = (event) =>
    event.key === "Enter" || event.key === " ";

  return (
    <header
      className={`
        fixed
        inset-x-0
        top-0
        z-[100]
        isolate
        w-full
        border-b
        pt-[env(safe-area-inset-top)]

        [backface-visibility:hidden]
        [-webkit-backface-visibility:hidden]
        [transform:translate3d(0,0,0)]

        transition-[opacity,transform,background-color,border-color,box-shadow]
        duration-500
        ease-[cubic-bezier(0.16,1,0.3,1)]

        motion-reduce:transform-none
        motion-reduce:transition-none

        ${
          inicializado
            ? "visible"
            : "invisible pointer-events-none"
        }

        ${
          entradaActiva
            ? "translate-y-0 opacity-100"
            : "-translate-y-3 opacity-0"
        }

        ${
          scrolleado
            ? `
                border-emerald-400/10
                bg-[#06100c]/[0.98]
                shadow-[0_10px_30px_rgba(0,0,0,0.34)]

                md:bg-[#06100c]/92
                md:backdrop-blur-md
              `
            : `
                border-transparent
                bg-transparent
                shadow-none
              `
        }
      `}
    >
      <div
        className="
          relative
          mx-auto
          flex
          h-[68px]
          w-full
          max-w-7xl
          items-center
          justify-between
          gap-2
          px-3

          min-[360px]:gap-3
          min-[360px]:px-5

          sm:h-[72px]
          sm:px-6

          md:px-8
        "
      >
        {/* Logo */}
        <button
          type="button"
          aria-label="Volver al inicio"
          onClick={() => navegarASeccion("inicio")}
          onPointerDown={presionarLogo}
          onPointerUp={liberarLogo}
          onPointerCancel={liberarLogo}
          onPointerLeave={liberarLogo}
          onBlur={() => setLogoPresionado(false)}
          onKeyDown={(event) => {
            if (
              esTeclaDeActivacion(event) &&
              !event.repeat
            ) {
              presionarLogo();
            }
          }}
          onKeyUp={(event) => {
            if (esTeclaDeActivacion(event)) {
              liberarLogo();
            }
          }}
          className={`
            group
            relative
            isolate
            flex
            min-w-0
            touch-manipulation
            items-center
            justify-center
            rounded-xl
            border
            px-2
            py-2.5
            outline-none

            [-webkit-tap-highlight-color:transparent]
            [backface-visibility:hidden]

            transition-[transform,background-color,border-color,box-shadow]
            duration-200
            ease-out

            focus-visible:ring-2
            focus-visible:ring-emerald-400/60
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#06100c]

            motion-reduce:transform-none
            motion-reduce:transition-none

            min-[360px]:px-2.5

            ${
              logoPresionado
                ? `
                    translate-y-px
                    scale-[0.96]
                    border-emerald-300/45
                    bg-emerald-400/[0.08]
                    shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)]
                  `
                : `
                    translate-y-0
                    scale-100
                    border-transparent
                    bg-transparent

                    hover:-translate-y-0.5
                    hover:border-emerald-400/20
                    hover:bg-emerald-400/[0.055]
                    hover:shadow-[0_8px_22px_rgba(0,0,0,0.2)]
                  `
            }
          `}
        >
          {/* Borde breve del logo */}
          <span
            aria-hidden="true"
            className={`
              pointer-events-none
              absolute
              inset-0
              rounded-xl
              border
              border-emerald-300/65

              transition-[opacity,transform]
              duration-200
              ease-out

              ${
                logoPresionado
                  ? "scale-100 opacity-100"
                  : "scale-[0.93] opacity-0"
              }
            `}
          />

          {/* Fondo del hover */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              -z-10
              rounded-xl

              bg-gradient-to-r
              from-transparent
              via-emerald-300/[0.08]
              to-transparent

              opacity-0
              transition-opacity
              duration-200

              group-hover:opacity-100
            "
          />

          {/* Nombre */}
          <span
            className={`
              relative
              whitespace-nowrap
              text-[16px]
              font-[900]
              leading-none
              tracking-[-0.05em]
              text-white

              transition-transform
              duration-200
              ease-out

              min-[360px]:text-[17px]
              sm:text-[19px]

              ${
                logoPresionado
                  ? "scale-[0.98]"
                  : "scale-100"
              }
            `}
          >
            Unlock

            <span
              className="
                ml-1
                bg-gradient-to-r
                from-emerald-300
                via-emerald-400
                to-green-300
                bg-clip-text
                font-[750]
                tracking-[-0.045em]
                text-transparent
              "
            >
              by Sam
            </span>
          </span>

          {/* Línea inferior del logo */}
          <span
            aria-hidden="true"
            className={`
              pointer-events-none
              absolute
              bottom-1.5
              left-1/2
              h-px
              w-[calc(100%-20px)]
              -translate-x-1/2
              origin-center

              bg-gradient-to-r
              from-transparent
              via-emerald-400
              to-transparent

              transition-[opacity,transform]
              duration-200

              ${
                logoPresionado
                  ? "scale-x-75 opacity-40"
                  : `
                      scale-x-0
                      opacity-0

                      group-hover:scale-x-100
                      group-hover:opacity-100
                    `
              }
            `}
          />
        </button>

        {/* Botón principal */}
        <button
          type="button"
          onClick={() =>
            navegarASeccion("contacto")
          }
          onPointerDown={presionarBoton}
          onPointerUp={liberarBoton}
          onPointerCancel={liberarBoton}
          onPointerLeave={liberarBoton}
          onBlur={() => setBotonPresionado(false)}
          onKeyDown={(event) => {
            if (
              esTeclaDeActivacion(event) &&
              !event.repeat
            ) {
              presionarBoton();
            }
          }}
          onKeyUp={(event) => {
            if (esTeclaDeActivacion(event)) {
              liberarBoton();
            }
          }}
          className={`
            group
            relative
            isolate
            inline-flex
            h-[42px]
            shrink-0
            touch-manipulation
            items-center
            justify-center
            gap-1.5
            overflow-visible
            whitespace-nowrap
            rounded-full
            border
            px-3
            text-[#02110b]
            outline-none

            [-webkit-tap-highlight-color:transparent]
            [backface-visibility:hidden]

            transition-[transform,background-color,border-color,box-shadow]
            duration-200
            ease-out

            focus-visible:ring-2
            focus-visible:ring-emerald-200
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#06100c]

            motion-reduce:transform-none
            motion-reduce:transition-none

            min-[360px]:gap-2
            min-[360px]:px-4

            sm:h-[44px]
            sm:px-5

            ${
              botonPresionado
                ? `
                    translate-y-px
                    scale-[0.955]
                    border-emerald-100/80
                    bg-emerald-500
                    shadow-[inset_0_2px_6px_rgba(0,0,0,0.22)]
                  `
                : `
                    translate-y-0
                    scale-100
                    border-emerald-100/45
                    bg-gradient-to-b
                    from-emerald-300
                    to-emerald-500
                    shadow-[0_8px_24px_rgba(16,185,129,0.23),inset_0_1px_0_rgba(255,255,255,0.45)]

                    hover:-translate-y-0.5
                    hover:border-white/75
                    hover:from-emerald-200
                    hover:to-emerald-400
                    hover:shadow-[0_12px_30px_rgba(16,185,129,0.3),inset_0_1px_0_rgba(255,255,255,0.65)]
                  `
            }
          `}
        >
          {/* Borde exterior duradero del clic */}
          <span
            aria-hidden="true"
            className={`
              pointer-events-none
              absolute
              -inset-[5px]
              rounded-full
              border-2
              border-emerald-200/90

              shadow-[0_0_0_1px_rgba(167,243,208,0.18),0_0_24px_rgba(16,185,129,0.38)]

              transition-[opacity,transform]
              duration-500
              ease-[cubic-bezier(0.16,1,0.3,1)]

              motion-reduce:transition-none

              ${
                bordeBotonActivo
                  ? "scale-100 opacity-100"
                  : "scale-[0.92] opacity-0"
              }
            `}
          />

          {/* Segundo borde interior */}
          <span
            aria-hidden="true"
            className={`
              pointer-events-none
              absolute
              -inset-[2px]
              rounded-full
              border
              border-white/70

              transition-[opacity,transform]
              duration-500
              delay-75
              ease-out

              motion-reduce:transition-none

              ${
                bordeBotonActivo
                  ? "scale-100 opacity-70"
                  : "scale-[0.96] opacity-0"
              }
            `}
          />

          {/* Fondo verde suave durante el clic */}
          <span
            aria-hidden="true"
            className={`
              pointer-events-none
              absolute
              inset-0
              -z-10
              rounded-full
              bg-emerald-100/20

              transition-opacity
              duration-500
              ease-out

              ${
                bordeBotonActivo
                  ? "opacity-100"
                  : "opacity-0"
              }
            `}
          />

          {/* Brillo superior */}
          <span
            aria-hidden="true"
            className={`
              pointer-events-none
              absolute
              inset-x-3
              top-[1px]
              -z-10
              h-[43%]
              rounded-full

              bg-gradient-to-b
              from-white/45
              to-transparent

              transition-opacity
              duration-200

              ${
                botonPresionado
                  ? "opacity-20"
                  : "opacity-65 group-hover:opacity-95"
              }
            `}
          />

          {/* Texto */}
          <span
            className={`
              relative
              text-[11px]
              font-[850]
              leading-none
              tracking-[-0.02em]

              transition-transform
              duration-200

              min-[360px]:text-[13px]
              sm:text-[14px]

              ${
                botonPresionado
                  ? "scale-[0.98]"
                  : "scale-100 group-hover:-translate-x-px"
              }
            `}
          >
            Solicitar servicio
          </span>

          {/* Flecha */}
          <span
            className={`
              relative
              flex
              h-5
              w-5
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#02110b]/10

              transition-[transform,background-color]
              duration-200
              ease-out

              max-[350px]:hidden

              sm:h-[22px]
              sm:w-[22px]

              ${
                botonPresionado
                  ? `
                      -translate-x-px
                      scale-[0.9]
                      bg-[#02110b]/18
                    `
                  : `
                      translate-x-0
                      scale-100

                      group-hover:translate-x-0.5
                      group-hover:bg-[#02110b]/15
                    `
              }
            `}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="
                h-3.5
                w-3.5
                stroke-current
                stroke-[2.2]

                sm:h-4
                sm:w-4
              "
            >
              <path
                d="M4.5 10h11M11 5.5l4.5 4.5-4.5 4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>

      {/* Línea inferior al hacer scroll */}
      <span
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          inset-x-0
          bottom-[-1px]
          h-px
          origin-center

          bg-gradient-to-r
          from-transparent
          via-emerald-400/65
          to-transparent

          transition-[opacity,transform]
          duration-500
          ease-[cubic-bezier(0.16,1,0.3,1)]

          motion-reduce:transition-none

          ${
            scrolleado
              ? "scale-x-100 opacity-100"
              : "scale-x-75 opacity-0"
          }
        `}
      />
    </header>
  );
}