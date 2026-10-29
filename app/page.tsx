"use client";

import { useState, useEffect } from "react";

const servicios = [
  {
    nombre: "SOFT GEL",
    descripcion: "Extensiones elegantes y resistentes.",
    precio: 22000,
    categoria: "EXTENSIONES",
    duracion: "90 min",
    imagen: "/soft-gel.jpeg",
  },
  {
    nombre: "Kapping Polygel",
    descripcion: "Refuerzo, nivelación y extensión natural.",
    precio: 20000,
    categoria: "FORTALECIMIENTO",
    duracion: "80 min",
    imagen: "/kapping-polygel.jpeg",
  },
  {
    nombre: "SEMIPERMANENTE",
    descripcion: "Color brillante y duradero.",
    precio: 15000,
    categoria: "ESMALTADO",
    duracion: "60 min",
    imagen: "/semi.jpeg",
  },
  {
    nombre: "Kapping Gel",
    descripcion: "Base fortalecedora para uñas naturales.",
    precio: 18000,
    categoria: "FORTALECIMIENTO",
    duracion: "75 min",
    imagen: "/kapping-gel.jpeg",
  },
];
const horarios = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"];
const WHATSAPP_ESTUDIO = "5492214555453";
const INSTAGRAM_ESTUDIO = "jnailsstudio.lp";

const formatoPrecio = (precio: number) =>
  precio.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

const fechaLocal = (fecha: Date) => {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
};

export default function Home() {
  const [fechas, setFechas] = useState<Date[]>([]);
  const [servicioElegido, setServicioElegido] = useState("Soft Gel");
  const [fechaElegida, setFechaElegida] = useState("");
  const [horaElegida, setHoraElegida] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // FIX: Todo lo de new Date() ahora solo corre en el navegador
  useEffect(() => {
    const hoy = new Date();
    const arr: Date[] = [];
    for (let i = 0; i < 14; i++) {
      const fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i);
      if (fecha.getDay() !== 0) arr.push(fecha);
    }
    setFechas(arr);
  }, []);

  const servicio = servicios.find((item) => item.nombre === servicioElegido)!;

  function solicitarTurno(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMensaje("");
    if (!fechaElegida || !horaElegida) {
      setError("Elegí una fecha y un horario para continuar.");
      return;
    }
    if (!nombre.trim() || !telefono.trim()) {
      setError("Completá tu nombre y tu teléfono.");
      return;
    }

    const fechaLegible = (valor: string) => {
      const [anio, mes, dia] = valor.split("-").map(Number);
      return new Date(anio, mes - 1, dia).toLocaleDateString("es-AR", {
        weekday: "long", day: "numeric", month: "long",
      });
    };

    const texto = [
      "Hola! Quiero consultar por un turno en J Nails Studio.", "",
      `Servicio: ${servicio.nombre}`,
      `Precio publicado: ${formatoPrecio(servicio.precio)}`,
      `Fecha: ${fechaLegible(fechaElegida)}`,
      `Horario solicitado: ${horaElegida}`,
      `Nombre: ${nombre.trim()}`,
      `Teléfono: ${telefono.trim()}`, "",
      "Quedo a la espera de la confirmación. Gracias!",
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_ESTUDIO}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setMensaje("Se abrió WhatsApp con tu solicitud. ¡Queda pendiente de confirmación!");
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#49352f]">
      <header className="sticky top-0 z-40 border-b border-[#eadbd3] bg-[#fffaf7]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <a href="#inicio" className="leading-tight">
            <span className="block text-xl tracking-[0.18em]">J <span className="font-light">NAILS STUDIO</span></span>
            <span className="mt-1 block text-[9px] tracking-[0.34em] text-[#b77a85]">BEAUTY · DETAIL · ELEGANCE</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a className="transition hover:text-[#b77a85]" href="#servicios">Servicios</a>
            <a className="transition hover:text-[#b77a85]" href="#estudio">El estudio</a>
            <a className="transition hover:text-[#b77a85]" href="#reservar">Turnos</a>
            <a href={`https://instagram.com/${INSTAGRAM_ESTUDIO}`} target="_blank" className="text-[#b77a85] hover:text-pink-600">IG: @{INSTAGRAM_ESTUDIO}</a>
          </nav>
          <a href="#reservar" className="rounded-full bg-[#b87986] px-5 py-3 text-sm text-white">Reservar turno ↗</a>
        </div>
      </header>

      <section id="inicio" className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:grid-cols-2 md:px-10 md:py-24">
        <div className="py-4">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#b66d7d]">TU MOMENTO, TU BELLEZA</p>
          <h1 className="mt-6 text-5xl font-light leading-[1.12] tracking-tight md:text-7xl">La elegancia<br />está en los<br /><span className="font-serif italic text-[#bd7c89]">pequeños detalles.</span></h1>
          <p className="mt-7 max-w-md text-base leading-8 text-[#826c64]">Diseños únicos, terminaciones delicadas y un momento dedicado exclusivamente a vos.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#servicios" className="rounded-full bg-[#b87986] px-7 py-4 text-sm text-white">Descubrir servicios ↗</a>
            <a href={`https://wa.me/${WHATSAPP_ESTUDIO}`} target="_blank" className="rounded-full border border-green-500 px-7 py-4 text-sm text-green-600">WhatsApp Directo</a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-lg pb-5">
          <div className="absolute -right-3 -top-3 h-full w-full rounded-t-full border border-[#d9b5ad]" />
          <img src="/portada.jpeg" alt="Portada J Nails Studio - Uñas negras" className="relative h-[440px] w-full rounded-t-full object-cover shadow-xl md:h-[590px]" />
        </div>
      </section>

      <section id="servicios" className="bg-[#f5ebe6] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {servicios.map((item) => (
              <article key={item.nombre} className="group overflow-hidden rounded-2xl border border-[#eadbd4] bg-[#fffaf7]">
               <div className="relative overflow-hidden bg-[#fdf2ec] flex items-center justify-center">
  <img src={item.imagen} alt={item.nombre} className="w-full aspect-[4/3] object-contain p-2" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#fffaf7]/95 px-3 py-2 text-[10px] tracking-[0.15em] text-[#986a70]">{item.categoria}</span>
                </div>
                <div className="flex min-h-[265px] flex-col p-6">
                  <h3 className="mt-3 text-xl font-medium">{item.nombre}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#826c64]">{item.descripcion}</p>
                  <div className="mt-auto flex items-end justify-between gap-2 pt-6">
                    <p className="text-xl font-medium">{formatoPrecio(item.precio)}</p>
                    <button type="button" onClick={() => { setServicioElegido(item.nombre); document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth" }); }} className="rounded-full border border-[#bd7c89] px-4 py-3 text-xs text-[#a86473]">Elegir ↗</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reservar" className="bg-[#f5ebe6] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <form onSubmit={solicitarTurno} className="grid overflow-hidden rounded-3xl border border-[#e8d7cf] bg-[#fffaf7] lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-9 p-6 md:p-10">
              <div>
                <label className="mt-4 block text-sm font-medium">¿Qué servicio querés?</label>
                <select value={servicioElegido} onChange={(e) => setServicioElegido(e.target.value)} className="mt-3 w-full rounded-xl border border-[#e5d5cd] bg-white px-4 py-4 text-sm">
                  {servicios.map((item) => (<option key={item.nombre} value={item.nombre}>{item.nombre} — {formatoPrecio(item.precio)}</option>))}
                </select>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-[#b66d7d]">FECHA</p>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {fechas.length === 0 ? <p className="text-sm text-[#b77a85]">Cargando fechas...</p> :
                    fechas.map((fecha) => {
                      const valor = fechaLocal(fecha);
                      const seleccionada = fechaElegida === valor;
                      return (<button key={valor} type="button" onClick={() => { setFechaElegida(valor); setHoraElegida(""); setError(""); }} className={`rounded-xl border px-2 py-4 text-center ${seleccionada ? "border-[#b87986] bg-[#b87986] text-white" : "border-[#eadbd4] bg-white"}`}><span className="block text-xs capitalize">{fecha.toLocaleDateString("es-AR", { weekday: "short" })}</span><span className="mt-1 block text-xl">{fecha.getDate()}</span></button>);
                    })}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-[#b66d7d]">HORARIO</p>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {horarios.map((hora) => (<button key={hora} type="button" onClick={() => { setHoraElegida(hora); setError(""); }} className={`rounded-full border px-3 py-3 text-sm ${horaElegida === hora ? "border-[#b87986] bg-[#b87986] text-white" : "border-[#e5d5cd] bg-white"}`}>{hora}</button>))}
                </div>
              </div>
            </div>
            <div className="border-t border-[#eadbd4] bg-white p-6 md:p-10 lg:border-l lg:border-t-0">
              <h3 className="mt-4 font-serif text-3xl">Casi listo ♡</h3>
              <label className="mt-7 block text-sm font-medium">Nombre y apellido</label>
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="Cómo te llamás" className="mt-2 w-full rounded-xl border border-[#e5d5cd] px-4 py-3" />
              <label className="mt-5 block text-sm font-medium">Tu teléfono</label>
              <input value={telefono} onChange={(e) => setTelefono(e.target.value)} required type="tel" placeholder="Tu número" className="mt-2 w-full rounded-xl border border-[#e5d5cd] px-4 py-3" />
              {error && (<p className="mt-4 text-sm text-red-700">{error}</p>)}
              {mensaje && (<p className="mt-4 rounded-xl border bg-[#fffaf7] p-4 text-sm">{mensaje}</p>)}
              <button type="submit" className="mt-6 w-full rounded-full bg-[#b87986] px-6 py-4 text-sm font-medium text-white hover:bg-[#9f606e]">Solicitar turno por WhatsApp ↗</button>
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#eadbd4] bg-[#fffaf7] px-5 py-10 text-center">
        <p className="text-lg tracking-[0.2em]">J NAILS STUDIO</p>
        <p className="mt-2 font-serif italic text-[#b87986]">Belleza en cada detalle ♡</p>
        <div className="mt-6 flex justify-center gap-6 text-sm">
          <a href={`https://wa.me/${WHATSAPP_ESTUDIO}`} target="_blank" className="text-green-600 font-bold">WhatsApp: 221 455-5453</a>
          <a href={`https://instagram.com/${INSTAGRAM_ESTUDIO}`} target="_blank" className="text-pink-600">Instagram: @{INSTAGRAM_ESTUDIO}</a>
        </div>
      </footer>
      <a href={`https://wa.me/${WHATSAPP_ESTUDIO}?text=Hola%20J%20Nails%20Studio!%20Quiero%20un%20turno%20💅`} target="_blank" className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-3xl text-white shadow-xl">💬</a>
    </main>
  );
}
