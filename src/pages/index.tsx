'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

const sections = [
  {
    title: 'Interesting Facts About the Milky Way',
    facts: [
      'The Milky Way is 100,000 light-years wide.',
      'It contains 100–400 billion stars.',
      'We live in the Orion Arm.',
      'It moves at 2.1 million km/h.',
      'A black hole sits at its center.',
      'The Milky Way is still growing.',
    ],
  },
  {
    title: 'Facts About the Sun',
    facts: [
      'The Sun is 4.6 billion years old.',
      'It makes up 99.8% of the mass of the Solar System.',
      'The core temperature is around 15 million °C.',
      'Light takes 8 minutes to reach Earth.',
      'It will eventually become a red giant.',
      'The Sun’s magnetic field is very strong.',
    ],
  },
  {
    title: 'Facts About Mars',
    facts: [
      'Mars is called the Red Planet.',
      'It has the tallest mountain in the Solar System: Olympus Mons.',
      'Mars has two moons: Phobos and Deimos.',
      'Mars’ atmosphere is mostly carbon dioxide.',
      'Evidence suggests Mars once had water.',
      'Mars has the largest dust storms in the Solar System.',
    ],
  },
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const meteorCanvasRef = useRef<HTMLCanvasElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const exploreParticlesRef = useRef<HTMLCanvasElement>(null);
  const nebulaCanvasRef = useRef<HTMLCanvasElement>(null);


  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX = useTransform(mouseX, [0, 1], [-30, 30]);
  const parallaxY = useTransform(mouseY, [0, 1], [-30, 30]);

  const isInView = useInView(exploreRef, { margin: '-100px', once: false });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      animate(mouseX, e.clientX / window.innerWidth, { duration: 0.5 });
      animate(mouseY, e.clientY / window.innerHeight, { duration: 0.5 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!backgroundCanvasRef.current) return;
    const canvas = backgroundCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
    }));

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      particlesArray.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }, []);

  useEffect(() => {
    if (!meteorCanvasRef.current) return;
    const canvas = meteorCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const meteorsArray: any[] = [];

    function spawnMeteor() {
      meteorsArray.push({
        x: Math.random() * canvas.width,
        y: 0,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 4 + 2,
        opacity: 1,
      });
      setTimeout(spawnMeteor, Math.random() * 3000 + 2000);
    }

    spawnMeteor();

    function animateMeteors() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      meteorsArray.forEach((m, i) => {
        m.x += m.speedX;
        m.y += m.speedY;
        m.opacity -= 0.01;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.speedX * 5, m.y - m.speedY * 5);
        ctx.strokeStyle = `rgba(255,255,255,${m.opacity})`;
        ctx.lineWidth = m.size;
        ctx.stroke();
        if (m.opacity <= 0) meteorsArray.splice(i, 1);
      });
      requestAnimationFrame(animateMeteors);
    }

    animateMeteors();
  }, [showIntro]);

  useEffect(() => {
    if (!exploreParticlesRef.current) return;
    const canvas = exploreParticlesRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      opacity: Math.random(),
    }));

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 182, 193, ${p.opacity})`;
        ctx.fill();
      });
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }, []);

  useEffect(() => {
    if (!nebulaCanvasRef.current) return;
    const canvas = nebulaCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const nebulasArray = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 300 + 200,
      color: ['rgba(173,216,230,0.15)', 'rgba(147,112,219,0.15)', 'rgba(255,182,193,0.15)'][Math.floor(Math.random() * 3)],
      speedX: Math.random() * 0.1 - 0.05,
      speedY: Math.random() * 0.1 - 0.05,
    }));
  
    function animateNebulas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nebulasArray.forEach((n) => {
        n.x += n.speedX;
        n.y += n.speedY;
  
        if (n.x < -n.size || n.x > canvas.width + n.size) n.speedX *= -1;
        if (n.y < -n.size || n.y > canvas.height + n.size) n.speedY *= -1;
  
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size);
        gradient.addColorStop(0, n.color);
        gradient.addColorStop(1, 'transparent');
  
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();
      });
  
      requestAnimationFrame(animateNebulas);
    }
  
    animateNebulas();
  }, []);
  

  const handleExplore = () => {
    const section = document.getElementById('explore');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
          >
            <canvas ref={backgroundCanvasRef} className="absolute w-full h-full" />
            <h1 className="text-7xl font-bold text-white z-10">WELCOME!</h1>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <div className="relative min-h-screen bg-gradient-to-b from-black via-slate-900 to-black flex flex-col items-center justify-center overflow-hidden">
          <canvas ref={nebulaCanvasRef} className="absolute w-full h-full z-[1] pointer-events-none" />
          <canvas ref={backgroundCanvasRef} className="absolute w-full h-full z-0" />
          <canvas ref={meteorCanvasRef} className="absolute w-full h-full z-10" />

          <motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }}
  className="absolute top-10 flex gap-2 text-8xl font-bold text-white z-20"
>
  {"SPACE".split("").map((char, index) => (
    <motion.span
      key={index}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{ textShadow: '0 0 30px rgba(255,255,255,0.9)' }}
    >
      {char}
    </motion.span>
  ))}
</motion.div>


          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExplore}
            className="mt-0 px-6 py-3 bg-gray-400 text-black font-semibold rounded-full shadow-lg hover:bg-gray-800 z-30"
          >
            Explore
          </motion.button>
        </div>
      )}

      {/* Explore section */}
      <div id="explore" ref={exploreRef} className="min-h-screen bg-black relative flex flex-col items-center justify-center overflow-hidden">
        <canvas ref={exploreParticlesRef} className="absolute w-full h-full z-0 pointer-events-none" />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center z-10"
          >
            <motion.h2
              className="text-5xl font-bold text-white mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 0.8 }}
              transition={{ duration: 1 }}
            >
              {sections[currentSection].title}
            </motion.h2>

            <div className="flex flex-col gap-4 text-center">
              {sections[currentSection].facts.map((fact, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
                  className="text-white text-2xl"
                >
                  {fact}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button onClick={prevSection} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-4xl">
          ❮
        </button>
        <button onClick={nextSection} className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-4xl">
          ❯
        </button>
      </div>

      {/* Space Timeline section */}
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
        <motion.h2
          className="text-5xl font-bold text-white mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Space Timeline
        </motion.h2>

        <div className="flex flex-col gap-8 max-w-4xl">
          {[
            { year: '13.8 Billion Years Ago', event: 'The Big Bang occurs, creating the universe.' },
            { year: '13.6 Billion Years Ago', event: 'First stars form.' },
            { year: '4.6 Billion Years Ago', event: 'The Sun and Solar System form.' },
            { year: '3.5 Billion Years Ago', event: 'First life appears on Earth.' },
            { year: '66 Million Years Ago', event: 'Extinction of the dinosaurs (asteroid impact).' },
            { year: '1969', event: 'Humans land on the Moon (Apollo 11).' },
            { year: '2021', event: 'James Webb Space Telescope launched.' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="text-white"
            >
              <h3 className="text-3xl font-semibold">{item.year}</h3>
              <p className="text-xl">{item.event}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 0px;
          height: 0px;
        }
        ::-webkit-scrollbar-thumb {
          background: transparent;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        html {
          scrollbar-width: none;
        }
        body {
          -ms-overflow-style: none;
        }
      `}</style>
    </>
  );
}
