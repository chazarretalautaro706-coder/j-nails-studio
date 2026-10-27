"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [fechas, setFechas] = useState<string[]>([]);
  const [year, setYear] = useState(2026);

  useEffect(() => {
    const hoy = new Date();
    setYear(hoy.getFullYear());
    
    const arr: string[] = [];
    for (let i = 0; i < 14; i++) {
      const fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i);
      if (fecha.getDay() !== 0) {
        arr.push(fecha.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }));
      }
    }
    setFechas(arr);
  }, []);

  return (
    <main className="min-h-screen bg-[#fff7f9] text-zinc-900">
      <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-black tracking-widest">J NAILS</h1>
        <a href="https://wa.me/5492210000000" className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold">Reservar</a>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-pink-500 font-bold tracking-widest text-sm mb-3">GORINA • LA PLATA</p>
        <h2 className="text-5xl md:text-6xl font-black leading-[0.9]">UÑAS QUE<br/>HABLAN<br/>POR VOS</h2>
        <p className="mt-6 text-zinc-600">Soft gel, capping y nail art. Turnos disponibles:</p>
        
        <div className="mt-6 flex gap-2 flex-wrap">
          {fechas.length === 0 ? (
            <p className="text-zinc-400">Cargando fechas...</p>
          ) : (
            fechas.map((f, i) => (
              <div key={i} className="bg-white border px-4 py-2 rounded-full text-sm font-bold">
                {f}
              </div>
            ))
          )}
        </div>

        <a href="https://wa.me/5492210000000" className="mt-8 inline-block bg-black text-white px-8 py-4 rounded-full font-bold">Reservar por WhatsApp</a>
      </section>

      <footer className="text-center py-10 text-zinc-400 text-sm">© {year} J Nails Studio • Gorina</footer>
    </main>
  );
}
