'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { animate, stagger } from 'animejs';

export default function Home() {
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // ================= SPLIT TEXT =================
    if (titleRef.current) {
      const el = titleRef.current;

      if (el.dataset.split === 'true') return;
      el.dataset.split = 'true';

      const text = el.innerText;

      el.innerHTML = text
        .split('')
        .map(
          (char) =>
            `<span class="letter inline-block">${
              char === ' ' ? '&nbsp;' : char
            }</span>`
        )
        .join('');

      animate('.letter', {
        y: [40, 0],
        opacity: [0, 1],
        delay: stagger(30),
        duration: 800,
        easing: 'easeOutExpo',
      });
    }

    // ================= SCRAMBLE TEXT =================
    let interval: NodeJS.Timeout;

    if (descriptionRef.current) {
      const finalText = descriptionRef.current.innerText;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
      let iteration = 0;

      interval = setInterval(() => {
        if (!descriptionRef.current) return;

        descriptionRef.current.innerText = finalText
          .split('')
          .map((letter, index) => {
            if (letter === ' ') return ' ';
            if (index < iteration) return finalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= finalText.length) clearInterval(interval);
        iteration += 1 / 2;
      }, 25);
    }

    // ================= SCROLL ANIMATION =================
    const sections = document.querySelectorAll('.reveal');

    const onScroll = () => {
      sections.forEach((el) => {
        const top = el.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <main className="overflow-x-hidden bg-[#1a0000] text-white">

      {/* ================= HERO ================= */}
      <section className="min-h-screen bg-[#e21d0f] text-black relative overflow-hidden">

        <nav className="flex justify-between items-center px-10 py-6 text-sm">
          <span className="text-2xl">+</span>
          <h1 className="italic text-xl">Kibar Mustofa - 2341720034 - frontend - UI/UX - GameDev</h1>
          <span className="uppercase tracking-widest">Portfolio</span>
        </nav>

        <h1
          ref={titleRef}
          className="text-center mx-auto px-10 text-[50px] md:text-[90px] leading-tight font-serif max-w-5xl"
        >
          Front-End Developer / UI Designer / <span className="whitespace-nowrap">Game Developer</span>
        </h1>
                <p
          ref={descriptionRef}
          className="absolute left-10 bottom-24 max-w-xs text-xs"
        >
          Saya membangun UI modern menggunakan Next.js, React, dan Tailwind.
        </p>

        <p className="absolute right-10 bottom-24 max-w-xs text-xs text-right">
          Mahasiswa Politeknik Negeri Malang fokus UI/UX dan Web Development.
        </p>

        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          <Image
            src="/image/profile.png"
            alt="profile"
            width={420}
            height={680}
            className="object-contain"
            priority
          />
        </div>

        <h2 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[120px] opacity-10 italic select-none">
          Kibar
        </h2>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs animate-bounce">
          ↓ Scroll
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="reveal px-10 py-20 bg-[#1a0000]">
        <h2 className="text-3xl mb-6 text-red-400">About Me</h2>
        <p className="max-w-2xl text-gray-300">
          Saya memiliki pengalaman dalam project berbasis PBL, desain UI menggunakan Figma,
          serta pengembangan web menggunakan HTML, CSS, JavaScript, dan Next.js.
        </p>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="reveal px-10 py-20 bg-[#220000]">
        <h2 className="text-3xl mb-6 text-red-400">Experience</h2>
        <p className="max-w-2xl text-gray-300">
          Berpengalaman dalam membuat website, desain UI, serta menggunakan framework modern
          seperti Laravel dan React.
        </p>
      </section>

      {/* ================= PROJECT ================= */}
      <section className="reveal px-10 py-20 bg-[#1a0000]">
        <h2 className="text-3xl mb-10 text-red-400">Projects</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              img: '/image/project1.png',
              title: 'Sistem Informasi Bebas Tanggungan',
              desc: 'HTML, CSS, PHP, MySQL',
            },
            {
              img: '/image/project2.png',
              title: 'SARPOLMA',
              desc: 'Laravel, Bootstrap',
            },
            {
              img: '/image/project3.png',
              title: 'JA-WARA App',
              desc: 'Flutter, FastAPI',
            },
          ].map((p, i) => (
            <div
              key={i}
              className="bg-red-900/20 border border-red-500/20 rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <Image
                src={p.img}
                alt={p.title}
                width={400}
                height={200}
                className="object-cover w-full h-[200px]"
              />
              <div className="p-4">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-400">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= UI DESIGN ================= */}
      <section className="reveal px-10 py-20 bg-[#220000]">
        <h2 className="text-3xl mb-10 text-red-400">UI Design</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { img: '/image/ui1.png', title: 'Web Comic UI' },
            { img: '/image/ui2.png', title: 'InfiniGrowth UI' },
          ].map((ui, i) => (
            <div
              key={i}
              className="bg-red-900/20 border border-red-500/20 rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <Image
                src={ui.img}
                alt={ui.title}
                width={600}
                height={300}
                className="object-cover w-full h-[300px]"
              />
              <div className="p-4">
                <h3>{ui.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-gray-400 text-center py-16">
        <p>Email: kibarmustofa115@gmail.com</p>
        <p>GitHub: github.com/kibarmustofa</p>
        <p>LinkedIn: linkedin.com/in/kibar-mustofa</p>
      </footer>

      {/* ================= STYLE ANIMATION ================= */}
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(60px);
          transition: all 0.8s ease;
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

    </main>
  );
}