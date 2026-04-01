/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useInView, useSpring } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronDown,
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Anchor,
  Flame,
  Code2, 
  Layout, 
  Users, 
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  Linkedin,
  Youtube,
  Globe,
  MessageSquare,
  Rocket,
  User,
  Target,
  Layers,
  Sparkles,
  Activity,
  Star,
  Copy,
  Mail,
  ExternalLink,
  Languages
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { translations, Language } from './translations';

// --- Types ---
interface FormData {
  name: string;
  email: string;
  message: string;
}

// --- Components ---

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDevice, setIsMouseDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsMouseDevice(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(isClickable);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseover', handleMouseOver);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isMouseDevice || !isVisible) return null;

  return (
    <>
      {/* Main Cursor Dot - Instant follow */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[var(--primary)] rounded-full pointer-events-none z-[100001]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isClicked ? 0.8 : (isHovering ? 1.2 : 1),
          backgroundColor: isHovering ? "#FFFFFF" : "var(--primary)"
        }}
        transition={{ 
          x: { type: 'tween', duration: 0 },
          y: { type: 'tween', duration: 0 },
          scale: { type: 'spring', damping: 25, stiffness: 600 }
        }}
      />
      {/* Glowing Outer Circle - Contraction effect on hover */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 border border-[var(--primary)]/40 rounded-full pointer-events-none z-[100000]"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isClicked ? 0.5 : (isHovering ? 0.6 : 1),
          opacity: isHovering ? 1 : 0.5,
          borderColor: isHovering ? "#FFFFFF" : "var(--primary)"
        }}
        transition={{ 
          x: { type: 'tween', duration: 0 },
          y: { type: 'tween', duration: 0 },
          scale: { type: 'spring', damping: 30, stiffness: 800 }
        }}
      />
      {/* Click Ripple Effect */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ opacity: 0.5, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-6 h-6 border border-[var(--primary)] rounded-full pointer-events-none z-[9998]"
            style={{
              x: mousePosition.x - 12,
              y: mousePosition.y - 12,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Modal = ({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void; lang: Language }) => {
  const t = translations[lang].modal;
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please check your connection.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#111] border border-neutral-800 rounded-3xl p-3 md:p-8 max-w-md w-full relative shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            >
              <X size={24} />
            </button>

            {!submitted ? (
              <>
                <h3 className="mb-6 text-white">{t.title}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white">{t.name}</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-neutral-800 bg-black text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder={t.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white">{t.email}</label>
                    <input 
                      required
                      type="email" 
                      className="w-full px-4 py-3 rounded-xl border border-neutral-800 bg-black text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder={t.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white">{t.message}</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-800 bg-black text-white focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                      placeholder={t.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full mt-4">
                    {t.send}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="bg-[var(--primary)]/10 text-[var(--primary)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="mb-2 text-white">{t.successTitle}</h3>
                <p className="text-white mb-6">{t.successDesc}</p>
                <button 
                  onClick={() => { setSubmitted(false); onClose(); }}
                  className="btn-primary w-full"
                >
                  {t.back}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EmailSelectorModal = ({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void; lang: Language }) => {
  const t = translations[lang].emailModal;
  const email = 'info@wamisoftware.com';
  const [copied, setCopied] = useState(false);

  const options = [
    {
      name: 'Gmail',
      icon: <Globe size={20} />,
      url: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
      color: 'hover:bg-red-500/10 hover:text-red-500'
    },
    {
      name: 'Outlook',
      icon: <Mail size={20} />,
      url: `https://outlook.office.com/mail/deeplink/compose?to=${email}`,
      color: 'hover:bg-blue-500/10 hover:text-blue-500'
    },
    {
      name: 'Default App',
      icon: <ExternalLink size={20} />,
      url: `mailto:${email}`,
      color: 'hover:bg-green-500/10 hover:text-green-500'
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-3xl p-3 md:p-8 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-white text-xl mb-2">{t.title}</h3>
            <p className="text-neutral-500 text-sm mb-8">{t.desc}</p>

            <div className="space-y-3">
              {options.map((opt) => (
                <a
                  key={opt.name}
                  href={opt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className={`flex items-center gap-4 w-full p-4 bg-neutral-800/50 border border-neutral-800 rounded-2xl text-white transition-all ${opt.color}`}
                >
                  {opt.icon}
                  <span className="font-medium">{t.openIn} {opt.name}</span>
                </a>
              ))}
              
              <button
                onClick={handleCopy}
                className="flex items-center gap-4 w-full p-4 bg-neutral-800/50 border border-neutral-800 rounded-2xl text-white hover:bg-white/5 transition-all"
              >
                {copied ? <CheckCircle2 size={20} className="text-green-500" /> : <Copy size={20} />}
                <span className="font-medium">{copied ? t.copied : t.copy}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const HypothesisVisual = () => (
  <div className="relative w-full h-52 bg-black/40 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
    <div className="absolute inset-0 grid-background opacity-20" />
    
    {/* Central AI Node */}
    <motion.div 
      className="relative w-16 h-16 bg-zinc-900 rounded-full border border-[var(--primary)]/30 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(251,248,80,0.1)]"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <div className="text-[var(--primary)] font-display text-lg drop-shadow-[0_0_8px_rgba(251,248,80,0.5)]">Ai</div>
      <motion.div 
        className="absolute inset-0 rounded-full border border-[var(--primary)]/40"
        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
    
    {/* Floating Data Nodes */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-[var(--primary)] rounded-full"
        initial={{ 
          x: Math.random() * 200 - 100, 
          y: Math.random() * 200 - 100,
          opacity: 0 
        }}
        animate={{ 
          x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
          y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
          opacity: [0, 0.8, 0]
        }}
        transition={{ 
          duration: Math.random() * 5 + 5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ))}

    {/* Connection Lines */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <motion.div
        key={i}
        className="absolute w-20 h-px bg-gradient-to-r from-[var(--primary)]/40 to-transparent origin-left"
        style={{ rotate: angle, left: '50%' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
      />
    ))}
    
    {/* Right Side UI Elements */}
    <div className="absolute right-6 space-y-3">
      {[1, 2, 3].map((_, i) => (
        <motion.div 
          key={i}
          className="w-10 h-10 bg-zinc-900/90 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden"
          animate={{ x: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.6 }}
        >
          <div className="w-6 h-1 bg-[var(--primary)]/30 rounded-full relative">
            <motion.div 
              className="absolute inset-0 bg-[var(--primary)] rounded-full"
              animate={{ width: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const CostVisual = () => (
  <div className="relative w-full h-52 bg-black/40 rounded-xl overflow-hidden border border-white/5 p-6 flex flex-col justify-between">
    <div className="absolute inset-0 grid-background opacity-20" />
    
    <div className="flex justify-between items-start relative z-10">
      <motion.div 
        className="text-[var(--primary)] font-display text-2xl drop-shadow-[0_0_12px_rgba(251,248,80,0.6)]"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        -70%
      </motion.div>
      <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse shadow-[0_0_8px_var(--primary)]" />
    </div>

    <div className="flex items-end gap-3 h-24 relative z-10">
      {[95, 80, 65, 45, 25].map((height, i) => (
        <div key={i} className="flex-1 bg-zinc-800/20 rounded-t-md relative overflow-hidden h-full border-x border-t border-white/5">
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-[var(--primary)] shadow-[0_0_20px_rgba(251,248,80,0.4)]"
            initial={{ height: "100%" }}
            animate={{ 
              height: [`${height}%`, `${height + 5}%`, `${height}%`] 
            }}
            transition={{ 
              height: { duration: 2, delay: i * 0.1, ease: "circOut" },
              repeat: Infinity,
              repeatType: "reverse",
              duration: 3 + i * 0.5
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      ))}
    </div>
  </div>
);

const OversightVisual = () => (
  <div className="relative w-full h-52 bg-black/40 rounded-xl overflow-hidden border border-white/5 font-mono text-[11px] p-6">
    <div className="absolute inset-0 grid-background opacity-20" />
    <div className="space-y-2 text-white">
      <div className="flex gap-2"><span className="text-blue-400">Class</span> <span className="text-white">Architect</span> {'{'}</div>
      <div className="pl-4 flex gap-2"><span className="text-purple-400">private</span> <span className="text-white">integrity:</span> <span className="text-yellow-200">boolean;</span></div>
      <div className="pl-4 flex gap-2"><span className="text-blue-400">constructor</span>() {'{'}</div>
      <motion.div 
        className="pl-8 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        this.integrity = <span className="text-green-400">true</span>;
      </motion.div>
      <div className="pl-4">{'}'}</div>
      <div className="flex gap-2"><span className="text-blue-400">function</span> <span className="text-white">validate</span>() ...</div>
    </div>
    <motion.div 
      className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--primary)]/25 to-transparent h-12 w-full"
      animate={{ top: ['-20%', '100%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const EngineeringGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    const gridSize = 44;
    const dots: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = [];
    const maxDots = 15;

    const createDot = () => {
      const isHorizontal = Math.random() > 0.5;
      const x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
      const y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
      
      return {
        x,
        y,
        vx: isHorizontal ? (Math.random() > 0.5 ? 1 : -1) * 0.5 : 0,
        vy: !isHorizontal ? (Math.random() > 0.5 ? 1 : -1) * 0.5 : 0,
        life: 0,
        maxLife: Math.random() * 200 + 100
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const time = Date.now() * 0.001;
      const shiftX = Math.sin(time * 0.5) * 2;
      const shiftY = Math.cos(time * 0.5) * 2;
      
      // Draw subtle grid lines that softly pulse and shift
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.02 + Math.sin(time) * 0.01})`;
      ctx.lineWidth = 1;

      for (let x = shiftX; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = shiftY; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
      
      // Update and draw dots
      if (dots.length < maxDots && Math.random() < 0.05) {
        dots.push(createDot());
      }

      ctx.fillStyle = '#FBF850'; // Yellow accent
      
      for (let i = dots.length - 1; i >= 0; i--) {
        const dot = dots[i];
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.life++;

        const opacity = Math.sin((dot.life / dot.maxLife) * Math.PI) * 0.8;
        ctx.globalAlpha = opacity;
        
        // Add glow to the node
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#FBF850';
        
        // Draw the node relative to grid shift
        ctx.beginPath();
        ctx.arc(dot.x + shiftX, dot.y + shiftY, 2, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow for trail
        ctx.shadowBlur = 0;

        // Draw a subtle trail or connection relative to grid shift
        ctx.beginPath();
        ctx.moveTo(dot.x + shiftX, dot.y + shiftY);
        ctx.lineTo(dot.x + shiftX - dot.vx * 40, dot.y + shiftY - dot.vy * 40);
        ctx.strokeStyle = '#FBF850';
        ctx.lineWidth = 1;
        ctx.stroke();

        if (dot.life >= dot.maxLife || dot.x < -100 || dot.x > width + 100 || dot.y < -100 || dot.y > height + 100) {
          dots.splice(i, 1);
        }
      }

      // Draw connections between nearby dots relative to grid shift
      ctx.lineWidth = 0.5;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const d1 = dots[i];
          const d2 = dots[j];
          const dist = Math.sqrt((d1.x - d2.x) ** 2 + (d1.y - d2.y) ** 2);
          
          if (dist < 150) {
            const connOpacity = (1 - dist / 150) * 0.3;
            ctx.globalAlpha = connOpacity;
            ctx.strokeStyle = '#FBF850';
            ctx.beginPath();
            ctx.moveTo(d1.x + shiftX, d1.y + shiftY);
            ctx.lineTo(d2.x + shiftX, d2.y + shiftY);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

const TeamFoundationVisual = ({ lang }: { lang: Language }) => {
  const [isMobile, setIsMobile] = useState(false);
  const t = translations[lang].hero.supportNodes;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const radius = isMobile ? 110 : 170;
  
  return (
    <div className={`relative w-full ${isMobile ? 'h-[400px]' : 'h-[550px]'} bg-black/40 rounded-3xl overflow-hidden border border-white/5 flex items-center justify-center`}>
      <div className="absolute inset-0 grid-background opacity-20" />
      
      {/* Wrapper to shift content slightly top-left as requested, but centered on mobile */}
      <div className={`relative w-full h-full flex items-center justify-center`}>
        {/* Central Project Core */}
        <motion.div 
          className="relative z-20 w-28 h-28 md:w-36 md:h-36 bg-zinc-900 rounded-full border-2 border-[var(--primary)] flex items-center justify-center shadow-[0_0_50px_rgba(251,248,80,0.2)]"
          animate={{ 
            boxShadow: ["0_0_25px_rgba(251,248,80,0.1)", "0_0_70px_rgba(251,248,80,0.3)", "0_0_25px_rgba(251,248,80,0.1)"],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-center">
            <div className="text-[var(--primary)] font-display text-[10px] md:text-[11px] uppercase tracking-widest mb-1">Developers</div>
            <div className="text-white font-display text-xl md:text-2xl uppercase tracking-tighter font-medium">Core</div>
          </div>
          
          {/* Orbiting Rings */}
          <motion.div 
            className="absolute inset-[-15px] md:inset-[-25px] rounded-full border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-[-40px] md:inset-[-65px] rounded-full border border-white/5 border-dashed"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Support Nodes */}
        {[
          { label: t.analysts, angle: 0 },
          { label: t.designers, angle: 72 },
          { label: t.qa, angle: 144 },
          { label: t.devs, angle: 216 },
          { label: t.devops, angle: 288 },
        ].map((node, i) => {
          const x = Math.cos((node.angle * Math.PI) / 180) * radius;
          const y = Math.sin((node.angle * Math.PI) / 180) * radius;
          
          return (
            <React.Fragment key={i}>
              {/* Connection Line / Ray */}
              <div 
                className="absolute origin-bottom z-10"
                style={{ 
                  height: radius - (isMobile ? 40 : 60), // Adjusted to end before the pill and core
                  width: '1px',
                  left: '50%',
                  bottom: '50%',
                  transform: `rotate(${node.angle + 90}deg)`,
                }}
              >
                <motion.div 
                  className="w-full h-full bg-gradient-to-t from-[var(--primary)]/30 via-[var(--primary)]/5 to-transparent"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.15 }}
                />
                {/* Traveling Pulse (Ray effect) - Smoother and more subtle */}
                <motion.div 
                  className="absolute left-[-1.5px] w-[4px] h-24 bg-gradient-to-t from-transparent via-[var(--primary)] to-transparent blur-[3px]"
                  animate={{ 
                    bottom: ['-20%', '120%'],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: i * 0.7,
                    ease: "linear"
                  }}
                />
              </div>
              
              {/* Unified Floating Node */}
              <motion.div
                className="absolute z-30 px-4 py-1.5 md:px-5 md:py-2.5 bg-zinc-900/90 border border-white/10 rounded-full backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.9)] flex items-center gap-2.5"
                style={{ 
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  x: "-50%",
                  y: "-50%"
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{ 
                  // Unified floating animation for the entire container
                  translateY: [0, -8 - i * 1.5, 0],
                  translateX: [0, 6 + i * 0.8, 0],
                  rotate: [-1, 1, -1],
                }}
                transition={{ 
                  opacity: { duration: 1, delay: i * 0.1 },
                  scale: { duration: 1, delay: i * 0.1 },
                  translateY: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
                  translateX: { duration: 8 + i, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 10 + i, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[var(--primary)] shadow-[0_0_12px_var(--primary)]" />
                <span className="text-[10px] md:text-[13px] uppercase tracking-widest text-white font-semibold whitespace-nowrap">{node.label}</span>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const ProjectDescription = ({ title, desc, icon }: { title: string; desc: string; icon?: React.ReactNode }) => {
  return (
    <div className="w-full h-auto lg:h-full bg-black/40 px-3 py-4 md:p-10 flex flex-col justify-start relative overflow-hidden group/project">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--primary)]/10 blur-[100px] rounded-full transition-all duration-700 group-hover/project:bg-[var(--primary)]/20" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl md:text-2xl font-satoshi font-medium mb-4 text-white leading-tight flex items-start gap-2">
            {icon && <span className="text-[var(--primary)] flex-shrink-0 mt-1">{icon}</span>}
            <span>{title}</span>
          </h3>
          <p className="text-base md:text-lg lg:text-xl text-white font-light leading-relaxed opacity-80">
            {desc}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const PortfolioSlider = ({ lang, isMobile }: { lang: Language; isMobile: boolean }) => {
  const t = translations[lang].portfolio;
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const projects = [
    {
      id: "balance-pulse",
      title: t.balancePulse.title,
      desc: t.balancePulse.desc,
      image: "/images/case-cover-1.png",
      imageAlt: t.balancePulse.title,
      overlayTitle: t.balancePulse.title,
      overlayCategory: t.balancePulse.category,
      icon: <Sparkles size={20} />
    },
    {
      id: "city-survival-kit",
      title: t.citySurvivalKit.title,
      desc: t.citySurvivalKit.desc,
      image: "/images/cover-city-kit.png",
      imageAlt: t.citySurvivalKit.title,
      overlayTitle: t.citySurvivalKit.title,
      overlayCategory: t.citySurvivalKit.category,
      icon: <Sparkles size={20} />
    },
    { 
      id: "wami-vacations",
      title: t.vacations.title,
      desc: t.vacations.desc,
      image: "/images/image_case1.svg",
      imageAlt: t.vacations.title,
      overlayTitle: t.vacations.title,
      overlayCategory: "HR Tech",
      icon: <Sparkles size={20} />
    }
  ];

  const langPrefix = lang === 'en' ? '' : `/${lang}`;

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl sm:rounded-[2rem] bg-white/5">
        <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
          {t.comingSoon}
        </p>
      </div>
    );
  }

  const currentProject = projects[activeIndex];

  return (
    <div className="relative">
      <div className="w-full">
        {/* Grid of two cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
          <AnimatePresence mode="wait">
            {/* Left Card: Project Description */}
            <motion.div
              key={`${activeIndex}-left`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.01 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              onClick={() => navigate(`${langPrefix}/${currentProject.id}`)}
              className="relative h-auto md:aspect-video lg:aspect-video rounded-2xl sm:rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex items-center justify-center group transition-colors cursor-pointer hover:border-[var(--primary)]/30"
            >
              <div className="w-full h-full">
                <ProjectDescription 
                  title={currentProject.title} 
                  desc={currentProject.desc} 
                  icon={(currentProject as any).icon}
                />
              </div>
            </motion.div>

            {/* Right Card: Image/Placeholder */}
            <motion.div
              key={`${activeIndex}-right`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.01 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, delay: isMobile ? 0 : 0.1 }}
              onClick={() => navigate(`${langPrefix}/${currentProject.id}`)}
              className="relative h-auto md:aspect-video lg:aspect-video rounded-2xl sm:rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex items-center justify-center group hover:border-[var(--primary)]/30 transition-colors cursor-pointer"
            >
              <div className="w-full h-full">
                {currentProject.image ? (
                  <img 
                    src={currentProject.image} 
                    alt={currentProject.imageAlt} 
                    className="w-full h-auto lg:h-full lg:object-cover block"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black/40 border border-dashed border-white/10">
                    <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Visual Coming Soon</span>
                  </div>
                )}
              </div>

              {/* Mobile "View Case" Button - Visible only on mobile/tablet */}
              {!isMobile && (
                <div className="lg:hidden absolute bottom-6 right-6 z-30">
                  <Link 
                    to={`${langPrefix}/${currentProject.id}`}
                    className="px-5 py-2.5 bg-[var(--primary)] text-black rounded-full text-sm font-bold shadow-[0_10px_20px_rgba(251,248,80,0.3)] flex items-center gap-2 active:scale-95 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t.viewCase}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
              
              {/* Mobile "View Case" Button for true mobile - using isMobile prop */}
              {isMobile && (
                <div className="absolute bottom-4 right-4 z-30">
                  <Link 
                    to={`${langPrefix}/${currentProject.id}`}
                    className="px-4 py-2 bg-[var(--primary)] text-black rounded-full text-xs font-bold shadow-[0_10px_20px_rgba(251,248,80,0.3)] flex items-center gap-2 active:scale-95 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t.viewCase}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}

              {/* Info Overlay on Hover - Desktop Only */}
              <div className="absolute inset-0 bg-black/60 opacity-0 lg:group-hover:opacity-100 transition-opacity hidden lg:flex flex-col items-center justify-center px-3 py-4 md:p-6 text-center backdrop-blur-sm">
                <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  {(currentProject as any).icon && <span className="text-[var(--primary)] flex-shrink-0">{(currentProject as any).icon}</span>}
                  {currentProject.overlayTitle}
                </h4>
                <p className="text-zinc-300 text-sm mb-4">{currentProject.overlayCategory}</p>
                <Link 
                  to={`${langPrefix}/${currentProject.id}`}
                  className="px-6 py-2 bg-[var(--primary)] text-black rounded-full text-sm font-bold whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t.viewCase}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-6 mt-12">
        <button 
          onClick={() => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)}
          className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-all hover:border-[var(--primary)]/50 text-white group"
          aria-label="Previous project"
        >
          <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={24} />
        </button>
        
        <div className="flex items-center gap-3">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'bg-[var(--primary)] w-10' : 'bg-white/10 w-4 hover:bg-white/30'}`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={() => setActiveIndex((prev) => (prev + 1) % projects.length)}
          className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-all hover:border-[var(--primary)]/50 text-white group"
          aria-label="Next project"
        >
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
        </button>
      </div>
    </div>
  );
};

const BorderBeam = ({ 
  delay = 0, 
  duration = 8, 
  color = "var(--primary)",
  size = "80px"
}: { 
  delay?: number; 
  duration?: number;
  color?: string;
  size?: string;
}) => {
  return (
    <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
      <motion.div
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
        style={{
          position: "absolute",
          width: size,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          offsetPath: "rect(0% 100% 100% 0% round 16px)",
          filter: "blur(2px)",
          zIndex: 1,
          opacity: 0.6
        }}
      />
      {/* The "Firefly" dot */}
      <motion.div
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
        style={{
          position: "absolute",
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          backgroundColor: color,
          boxShadow: `0 0 10px 2px ${color}`,
          offsetPath: "rect(0% 100% 100% 0% round 16px)",
          zIndex: 2
        }}
      />
    </div>
  );
};

const FeaturePath = ({ t, isMobile }: { t: any; isMobile: boolean }) => {
  const features = [
    {
      title: t.portfolio.balancePulse.motivationTitle,
      desc: t.portfolio.balancePulse.motivationDesc,
      side: 'right'
    },
    {
      title: t.portfolio.balancePulse.dopamineDeepDiveTitle,
      desc: t.portfolio.balancePulse.dopamineDeepDiveDesc,
      side: 'left'
    },
    {
      title: t.portfolio.balancePulse.aiTutorTitle,
      desc: t.portfolio.balancePulse.aiTutorDesc,
      side: 'right'
    },
    {
      title: t.portfolio.balancePulse.forecastingTitle,
      desc: t.portfolio.balancePulse.forecastingDesc,
      side: 'left'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 5000); // Change card every 5 seconds

    return () => clearInterval(interval);
  }, [features.length, isPaused]);

  useEffect(() => {
    const updateConstraints = () => {
      setWindowWidth(window.innerWidth);
      if (scrollRef.current) {
        const fullWidth = scrollRef.current.scrollWidth;
        const visibleWidth = scrollRef.current.offsetWidth;
        setDragConstraints({ left: -(fullWidth - visibleWidth), right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    // Threshold for swipe
    const swipeThreshold = 50;
    const velocityThreshold = 500;

    if (offset < -swipeThreshold || velocity < -velocityThreshold) {
      setActiveIndex(prev => Math.min(prev + 1, features.length - 1));
    } else if (offset > swipeThreshold || velocity > velocityThreshold) {
      setActiveIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const handleScroll = () => {
    if (scrollRef.current && !isMobile) { // Only for non-drag scroll if any
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth - 32;
      const index = Math.round(scrollPosition / (cardWidth + 16));
      setActiveIndex(index);
    }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative max-w-7xl mx-auto py-20 md:py-32 sm:overflow-hidden overflow-visible border-t border-white/5"
    >
      <div className="relative z-10">
        {/* Key features Header */}
        <div className="mb-20 md:mb-32 flex flex-col items-start">
          <div className="text-left max-w-2xl">
            <motion.h3 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-light text-[var(--primary)] leading-tight mb-6"
            >
              {t.portfolio.balancePulse.featuresTitle}
            </motion.h3>
            <motion.p 
              variants={itemVariants}
              className="text-white font-light text-lg md:text-xl leading-relaxed opacity-80"
            >
              {t.portfolio.balancePulse.featuresDesc}
            </motion.p>
          </div>
          <div className="w-full md:w-1/2 h-[1px] bg-[var(--primary)]/20 mt-6" />
        </div>

        {/* The Path SVG */}
        <motion.div 
          variants={itemVariants}
          className="absolute top-[200px] lg:top-[380px] left-0 w-full h-[1200px] hidden sm:block pointer-events-none"
        >
          <svg width="100%" height="100%" viewBox="0 0 800 1450" fill="none" preserveAspectRatio="xMidYMin meet">
            <motion.path 
              d="M 400, 120 S 100, 120, 100, 360 C 100, 480, 700, 480, 700, 600 S 100, 720, 100, 840 S 700, 960, 700, 1080 S 400, 1200, 400, 1320" 
              stroke="white" 
              strokeOpacity="0.15" 
              strokeWidth="2" 
              strokeDasharray="12 12" 
              animate={{
                strokeDashoffset: [0, -24],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Node -1: Start (Top center) */}
            <circle cx="400" cy="120" r="6" fill="var(--primary)" />
            <motion.circle 
              cx="400" cy="120" r="12" 
              stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="1"
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0 }}
            />
            
            {/* Node 0: Motivation (Left of card) */}
            <circle cx="100" cy="360" r="6" fill="white" fillOpacity="0.4" />
            <motion.circle 
              cx="100" cy="360" r="12" 
              stroke="white" strokeOpacity="0.15" strokeWidth="1"
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Node 1: Dopamine (Right of card) */}
            <circle cx="700" cy="600" r="6" fill="white" fillOpacity="0.4" />
            <motion.circle 
              cx="700" cy="600" r="12" 
              stroke="white" strokeOpacity="0.15" strokeWidth="1"
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />

            {/* Node 2: AI Tutor (Left of card) */}
            <circle cx="100" cy="840" r="6" fill="white" fillOpacity="0.4" />
            <motion.circle 
              cx="100" cy="840" r="12" 
              stroke="white" strokeOpacity="0.15" strokeWidth="1"
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />

            {/* Node 3: Forecasting (Right of card) */}
            <circle cx="700" cy="1080" r="6" fill="white" fillOpacity="0.4" />
            <motion.circle 
              cx="700" cy="1080" r="12" 
              stroke="white" strokeOpacity="0.15" strokeWidth="1"
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />

            {/* Node 4: End (Bottom center) */}
            <circle cx="400" cy="1320" r="6" fill="white" fillOpacity="0.4" />
            <motion.circle 
              cx="400" cy="1320" r="12" 
              stroke="white" strokeOpacity="0.15" strokeWidth="1"
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            />

            {/* Animated Bubbles along the path */}
            {[0, 0.2, 0.4, 0.6, 0.8].map((startOffset, i) => (
              <motion.circle
                key={i}
                r="3"
                fill="#71717a"
                fillOpacity="0.4"
                animate={{
                  offsetDistance: ["0%", "100%"],
                  opacity: [0, 0.5, 0],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  delay: startOffset * 15,
                }}
                style={{
                  offsetPath: "path('M 400, 120 S 100, 120, 100, 360 C 100, 480, 700, 480, 700, 600 S 100, 720, 100, 840 S 700, 960, 700, 1080 S 400, 1200, 400, 1320')",
                }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Features List */}
        <div className="relative sm:block overflow-hidden sm:overflow-visible min-h-[320px] sm:min-h-0">
          {isMobile ? (
            <div className="relative w-full h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 40, rotateY: 15, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, rotateY: -15, scale: 0.95 }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    const threshold = 50;
                    if (info.offset.x < -threshold) {
                      setActiveIndex((prev) => Math.min(prev + 1, features.length - 1));
                    } else if (info.offset.x > threshold) {
                      setActiveIndex((prev) => Math.max(prev - 1, 0));
                    }
                  }}
                  onPointerDown={() => setIsPaused(true)}
                  onPointerUp={() => setIsPaused(false)}
                  onPointerLeave={() => setIsPaused(false)}
                  className="absolute inset-0 bg-white/[0.003] backdrop-blur-3xl border border-white/5 p-8 flex flex-col justify-center rounded-[2rem] shadow-2xl cursor-grab active:cursor-grabbing"
                  style={{ perspective: "1000px", touchAction: "none" }}
                >
                  <BorderBeam delay={activeIndex * 1} duration={15} color="white" size="120px" />
                  <div className="absolute top-5 right-6 font-mono text-[10px] text-[var(--primary)] opacity-50">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
                  </div>
                  <h4 className="text-xl md:text-2xl font-satoshi font-medium text-[var(--primary)] mb-4 tracking-tight">
                    {features[activeIndex].title}
                  </h4>
                  <p className="text-base md:text-lg lg:text-xl text-white font-satoshi font-light leading-relaxed opacity-80">
                    {features[activeIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              ref={scrollRef}
              variants={listVariants}
              className="sm:block sm:space-x-0 pb-12 sm:pb-0 relative sm:px-0"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className={`flex-shrink-0 w-full flex flex-col sm:flex-row items-center sm:mr-0 ${
                    feature.side === 'right' ? 'sm:justify-end' : 'sm:justify-start'
                  } sm:h-[240px] md:h-[240px] relative`}
                >
                  {/* Feature Card */}
                  <motion.div
                    initial={{ 
                      opacity: 0, 
                      scale: 0.96,
                      y: 40,
                      rotateX: -10
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      rotateX: 0
                    }}
                    animate={{
                      y: [0, -15, 0],
                      rotateX: [0, 1.2, -1.2, 0],
                      rotateY: [0, 1.2, -1.2, 0],
                      scale: [1, 1.005, 1],
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      y: {
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      },
                      rotateX: {
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      },
                      rotateY: {
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.7
                      },
                      scale: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.4
                      },
                      opacity: { duration: 1 },
                      initialY: { type: "spring", damping: 25, stiffness: 120 }
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="w-full sm:w-[69%] md:w-[70%] lg:w-[48%] bg-white/[0.003] backdrop-blur-3xl border border-white/5 p-8 md:p-10 rounded-[2rem] shadow-2xl relative group overflow-hidden sm:h-[240px] md:h-[240px] flex flex-col justify-center"
                  >
                    <BorderBeam delay={index * 1} duration={15} color="white" size="120px" />
                    <h4 className="text-xl md:text-2xl font-satoshi font-medium text-[var(--primary)] mb-4 tracking-tight">
                      {feature.title}
                    </h4>
                    <p className="text-base md:text-lg lg:text-xl text-white font-satoshi font-light leading-relaxed opacity-80">
                      {feature.desc}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Mobile Scroll Indicators */}
        <div className="flex sm:hidden justify-center space-x-2 mt-4">
          {features.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'bg-[var(--primary)] w-4' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Final Solution Footer */}
        <div className="mt-32 flex flex-col items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-right max-w-2xl"
          >
            <h3 className="text-3xl md:text-4xl font-satoshi font-medium text-[var(--primary)] mb-6">
              {t.portfolio.balancePulse.overallTitle}
            </h3>
            <p className="text-white font-light text-lg md:text-xl leading-relaxed opacity-80 italic">
              {t.portfolio.balancePulse.overallDesc}
            </p>
          </motion.div>
          <div className="w-full md:w-1/2 h-[1px] bg-[var(--primary)]/20 mt-6" />
        </div>
      </div>
    </motion.div>
  );
};

const CaseStudyCitySurvivalKit = ({ lang, isMobile }: { lang: Language; isMobile: boolean }) => {
  const t = translations[lang];
  const navigate = useNavigate();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const nextProjectRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const x = useMotionValue(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const features = [
    {
      title: 'Essential map',
      desc: 'Verified nearby services (banks, hospitals, transport, SIM cards)',
      side: 'right'
    },
    {
      title: 'Bureaucracy flow',
      desc: 'Step-by-step guides (documents, bank account, legalization) in a roadmap format',
      side: 'left'
    },
    {
      title: 'AI assistant',
      desc: 'Answers questions and guides users through processes (adapted to user status)',
      side: 'right'
    },
    {
      title: 'Life hacks feed',
      desc: 'Local tips from residents',
      side: 'left'
    },
    {
      title: 'Cost simulator',
      desc: 'Forecasts cost of living in the city',
      side: 'right'
    },
    {
      title: 'Emotional layer',
      desc: 'Basic support + community recommendations',
      side: 'left'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length, isPaused]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  // Motion values for the interactive lens
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);
  
  const lensClipPath = useTransform([lensX, lensY], ([lx, ly]: [number, number]) => {
    const radius = isMobile ? 55 : 110;
    return `circle(${radius}px at calc(50% + ${lx}px) calc(50% + ${ly}px))`;
  });

  const calculateCenter = () => {
    if (imageRef.current && constraintsRef.current) {
      const imgWidth = imageRef.current.offsetWidth;
      const containerWidth = constraintsRef.current.offsetWidth;
      x.set(-(imgWidth - containerWidth) / 2);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    
    let observer: ResizeObserver | null = null;
    if (constraintsRef.current) {
      observer = new ResizeObserver(() => {
        calculateCenter();
      });
      observer.observe(constraintsRef.current);
    }

    calculateCenter();
    const timer = setTimeout(calculateCenter, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const title = 'City survival kit';
    const desc = 'Product for relocation with AI assistant. Not just a city guide, but a full-fledged “operating system” for life in a new place. The product helps people adapt quickly — from basic needs to understanding local rules and the environment.';
    const url = 'https://ais-dev-cwvt74vynqvryz7jxzv277-527915966303.europe-west2.run.app/city-survival-kit';
    const image = 'https://ais-dev-cwvt74vynqvryz7jxzv277-527915966303.europe-west2.run.app/images/cover-city-kit.png';
    document.title = title;
    
    const metaTags = [
      { name: 'description', content: desc },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: image }
    ];

    metaTags.forEach(tag => {
      const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (tag.name) element.setAttribute('name', tag.name);
        if (tag.property) element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });
  }, [lang, t]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 font-satoshi relative">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto pt-28 md:pt-36 px-6 relative z-30 flex justify-start pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2.5 text-white/50 hover:text-primary transition-all duration-300 group cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-md p-2 rounded-xl shadow-2xl border-none outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
            <ArrowLeft className="w-4 h-4 group-hover:text-primary transition-colors" />
          </div>
          <span className="text-[11px] font-light uppercase tracking-widest select-none">{t.portfolio.back}</span>
        </button>
      </div>

      <div className="pt-4 md:pt-8 pb-16 md:pb-32 max-w-7xl mx-auto relative min-h-[60vh] flex flex-col items-center justify-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[var(--primary)]/5 blur-[120px] rounded-full -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full relative flex flex-col lg:block"
        >
          <div className="relative lg:absolute lg:inset-0 z-20 p-0 lg:p-16 mb-8 lg:mb-0 flex flex-col justify-start lg:pt-48 items-start pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-3xl pointer-events-auto"
            >
              <span className="inline-block font-mono text-[13px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--primary)] mb-3 md:mb-6 border-b border-[var(--primary)]/30 pb-1">
                {t.portfolio.citySurvivalKit.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-normal text-white mb-3 md:mb-6 leading-tight">
                <span>City survival kit</span>
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-4xl text-white font-satoshi font-normal max-w-2xl leading-tight opacity-95">
                Product for relocation with AI assistant
              </h2>
            </motion.div>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl h-[400px] md:h-[500px] lg:h-auto">
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent z-10 pointer-events-none" />
            <img 
              src="/images/cover-citi-kit-2.png" 
              alt="City Survival Kit Cover" 
              className="w-full h-full object-cover lg:object-contain object-[82%_center] lg:object-center block"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>

      {/* Goal of the Project Section */}
      <div className="max-w-7xl mx-auto py-20 md:py-32 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-light text-[var(--primary)] leading-tight"
            >
              Goal of the project
            </motion.h2>
          </div>
          <div className="lg:col-span-7 lg:pt-5">
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white font-light text-lg md:text-xl leading-relaxed opacity-80"
            >
              {lang === 'ua'
                ? 'Створити не просто путівник містом, а повноцінну «операційну систему» для життя на новому місці. Проект має на меті допомогти людям швидко адаптуватися на новому місці, охоплюючи все — від базових потреб до розуміння місцевих правил та навколишнього середовища.'
                : lang === 'de'
                ? 'Nicht nur einen Stadtführer zu erstellen, sondern ein vollwertiges „Betriebssystem“ für das Leben an einem neuen Ort. Das Projekt zielt darauf ab, Menschen zu helfen, sich schnell an einem neuen Ort zurechtzufinden, und deckt alles ab – von den Grundbedürfnissen bis hin zum Verständnis lokaler Regeln und der Umgebung.'
                : 'To create not just a city guide, but a full-fledged “operating system” for life in a new place. The project aims to help people adapt quickly in a new place, covering everything from basic needs to understanding local rules and the surrounding environment.'
              }
            </motion.p>
          </div>
        </div>
      </div>

      {/* Secondary Image Section */}
      <div className="max-w-7xl mx-auto pb-20 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl h-[400px] md:h-[500px] lg:h-auto"
        >
          <img 
            src="/images/image1-city-kit.png" 
            alt="City Survival Kit Visual" 
            className="w-full h-full object-cover lg:object-contain object-center block"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Core Concept Section */}
      <div className="max-w-7xl mx-auto py-20 md:py-32 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start mb-20 md:mb-32">
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-light text-[var(--primary)] leading-tight"
            >
              {lang === 'ua' ? 'Основна концепція' : lang === 'de' ? 'Kernkonzept' : 'Core concept'}
            </motion.h2>
          </div>
          <div className="lg:col-span-7 lg:pt-5">
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white font-light text-lg md:text-xl leading-relaxed opacity-80"
            >
              {lang === 'ua'
                ? 'Цифровий компаньйон для релокації, який усуває хаос після переїзду, супроводжуючи користувачів через місцеву бюрократію, основні послуги та культурний контекст.'
                : lang === 'de'
                ? 'Ein digitaler Begleiter für den Umzug, der das Chaos nach dem Einzug beseitigt, indem er die Nutzer durch die lokale Bürokratie, wichtige Dienstleistungen und den kulturellen Kontext führt.'
                : 'A digital companion for relocation that eliminates post-move chaos by guiding users through local bureaucracy, essential services, and cultural context.'
              }
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-3 lg:gap-12">
          {/* Target Audience Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-8 md:p-12 rounded-[2rem] flex flex-col h-full group overflow-hidden"
          >
            <BorderBeam delay={0} duration={12} />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
                <Users size={24} className="text-[var(--primary)]" />
              </div>
              <h3 className="text-xl md:text-2xl font-satoshi font-medium text-white tracking-tight">
                {lang === 'ua' ? 'Цільова аудиторія' : lang === 'de' ? 'Zielgruppe' : 'Target audience'}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3 mt-auto pb-4 -mx-2 px-2">
              {(lang === 'ua' 
                ? ['Релоканти', 'Цифрові кочівники', 'Студенти', 'Експати', 'Біженці']
                : lang === 'de'
                ? ['Relocators', 'Digitale Nomaden', 'Studenten', 'Expats', 'Flüchtlinge']
                : ['Relocators', 'Digital nomads', 'Students', 'Expats', 'Refugees']
              ).map((item) => (
                <span key={item} className="whitespace-nowrap px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-white/5 border border-white/10 text-[10px] md:text-[11px] lg:text-xs font-mono uppercase tracking-[0.2em] text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Problems it solves Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-8 md:p-12 rounded-[2rem] flex flex-col h-full group overflow-hidden"
          >
            <BorderBeam delay={3} duration={15} />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
                <Target size={24} className="text-[var(--primary)]" />
              </div>
              <h3 className="text-xl md:text-2xl font-satoshi font-medium text-white tracking-tight">
                {lang === 'ua' ? 'Проблеми, які вирішує' : lang === 'de' ? 'Gelöste Probleme' : 'Problems it solves'}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3 mt-auto pb-4 -mx-2 px-2">
              {(lang === 'ua'
                ? ['Хаос після релокації', 'Нерозуміння бюрократії', 'Пошук сервісів', 'Культурний контекст']
                : lang === 'de'
                ? ['Chaos nach Umzug', 'Bürokratie-Dschungel', 'Service-Suche', 'Kulturkontext']
                : ['Chaos after relocation', 'Bureaucracy confusion', 'Finding services', 'Cultural context']
              ).map((item) => (
                <span key={item} className="whitespace-nowrap px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-white/5 border border-white/10 text-[10px] md:text-[11px] lg:text-xs font-mono uppercase tracking-[0.2em] text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Key features Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative max-w-7xl mx-auto py-20 md:py-32 sm:overflow-hidden overflow-visible border-t border-white/5"
      >
        <div className="relative z-10">
          {/* Key features Header */}
          <div className="mb-20 md:mb-32 flex flex-col items-start px-6">
            <div className="text-left max-w-2xl">
              <motion.h3 
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-light text-[var(--primary)] leading-tight mb-6"
              >
                Key features
              </motion.h3>
              <motion.p 
                variants={itemVariants}
                className="text-white font-light text-lg md:text-xl leading-relaxed opacity-80"
              >
                Tools that help you adapt quickly to a new city: find nearby services, follow bureaucracy guides, get AI support, discover local tips, forecast expenses, and receive basic emotional support.
              </motion.p>
            </div>
            <div className="w-full md:w-1/2 h-[1px] bg-[var(--primary)]/20 mt-6" />
          </div>

          {/* The Path SVG */}
          <motion.div 
            variants={itemVariants}
            className="absolute top-[200px] lg:top-[380px] left-0 w-full h-[1400px] hidden sm:block pointer-events-none"
          >
            <svg width="100%" height="100%" viewBox="0 0 800 1650" fill="none" preserveAspectRatio="xMidYMin meet">
              <motion.path 
                d="M 400, 120 S 100, 120, 100, 360 C 100, 480, 700, 480, 700, 600 S 100, 720, 100, 840 S 700, 960, 700, 1080 S 100, 1200, 100, 1320 S 700, 1440, 700, 1560 S 400, 1680, 400, 1800" 
                stroke="white" 
                strokeOpacity="0.15" 
                strokeWidth="2" 
                strokeDasharray="12 12" 
                animate={{
                  strokeDashoffset: [0, -24],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Nodes along the path */}
              <circle cx="400" cy="120" r="6" fill="var(--primary)" />
              <motion.circle 
                cx="400" cy="120" r="12" 
                stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="1"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {[360, 600, 840, 1080, 1320, 1560].map((y, i) => (
                <React.Fragment key={i}>
                  <circle cx={i % 2 === 0 ? 100 : 700} cy={y} r="6" fill="white" fillOpacity="0.4" />
                  <motion.circle 
                    cx={i % 2 === 0 ? 100 : 700} cy={y} r="12" 
                    stroke="white" strokeOpacity="0.15" strokeWidth="1"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                </React.Fragment>
              ))}

              <circle cx="400" cy="1800" r="6" fill="white" fillOpacity="0.4" />
              <motion.circle 
                cx="400" cy="1800" r="12" 
                stroke="white" strokeOpacity="0.15" strokeWidth="1"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: 3 }}
              />

              {/* Animated Bubbles along the path */}
              {[0, 0.2, 0.4, 0.6, 0.8].map((startOffset, i) => (
                <motion.circle
                  key={i}
                  r="3"
                  fill="#71717a"
                  fillOpacity="0.4"
                  animate={{
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 0.5, 0],
                    scale: [0.5, 1.2, 0.5]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: startOffset * 15,
                  }}
                  style={{
                    offsetPath: "path('M 400, 120 S 100, 120, 100, 360 C 100, 480, 700, 480, 700, 600 S 100, 720, 100, 840 S 700, 960, 700, 1080 S 100, 1200, 100, 1320 S 700, 1440, 700, 1560 S 400, 1680, 400, 1800')",
                  }}
                />
              ))}
            </svg>
          </motion.div>

          {/* Features List */}
          <div className="relative sm:block overflow-hidden sm:overflow-visible min-h-[320px] sm:min-h-0 px-6">
            {isMobile ? (
              <div className="relative w-full h-[320px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 40, rotateY: 15, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -40, rotateY: -15, scale: 0.95 }}
                    transition={{ 
                      duration: 0.6,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      const threshold = 50;
                      if (info.offset.x < -threshold) {
                        setActiveIndex((prev) => Math.min(prev + 1, features.length - 1));
                      } else if (info.offset.x > threshold) {
                        setActiveIndex((prev) => Math.max(prev - 1, 0));
                      }
                    }}
                    onPointerDown={() => setIsPaused(true)}
                    onPointerUp={() => setIsPaused(false)}
                    onPointerLeave={() => setIsPaused(false)}
                    className="absolute inset-0 bg-white/[0.003] backdrop-blur-3xl border border-white/5 p-8 flex flex-col justify-center rounded-[2rem] shadow-2xl cursor-grab active:cursor-grabbing"
                    style={{ perspective: "1000px", touchAction: "none" }}
                  >
                    <BorderBeam delay={activeIndex * 1} duration={15} color="white" size="120px" />
                    <div className="absolute top-5 right-6 font-mono text-[10px] text-[var(--primary)] opacity-50">
                      {String(activeIndex + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
                    </div>
                    <h4 className="text-xl md:text-2xl font-satoshi font-medium text-[var(--primary)] mb-4 tracking-tight">
                      {features[activeIndex].title}
                    </h4>
                    <p className="text-base md:text-lg lg:text-xl text-white font-satoshi font-light leading-relaxed opacity-80">
                      {features[activeIndex].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                ref={scrollRef}
                variants={listVariants}
                className="sm:block sm:space-x-0 pb-12 sm:pb-0 relative sm:px-0"
              >
                {features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className={`flex-shrink-0 w-full flex flex-col sm:flex-row items-center sm:mr-0 ${
                      feature.side === 'right' ? 'sm:justify-end' : 'sm:justify-start'
                    } sm:h-[240px] md:h-[240px] relative`}
                  >
                    {/* Feature Card */}
                    <motion.div
                      initial={{ 
                        opacity: 0, 
                        scale: 0.96,
                        y: 40,
                        rotateX: -10
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        rotateX: 0
                      }}
                      animate={{
                        y: [0, -15, 0],
                        rotateX: [0, 1.2, -1.2, 0],
                        rotateY: [0, 1.2, -1.2, 0],
                        scale: [1, 1.005, 1],
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ 
                        y: {
                          duration: 7,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        },
                        rotateX: {
                          duration: 9,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3
                        },
                        rotateY: {
                          duration: 11,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.7
                        },
                        scale: {
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.4
                        },
                        opacity: { duration: 1 },
                        initialY: { type: "spring", damping: 25, stiffness: 120 }
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="w-full sm:w-[69%] md:w-[70%] lg:w-[48%] bg-white/[0.003] backdrop-blur-3xl border border-white/5 p-8 md:p-10 rounded-[2rem] shadow-2xl relative group overflow-hidden sm:h-[240px] md:h-[240px] flex flex-col justify-center"
                    >
                      <BorderBeam delay={index * 1} duration={15} color="white" size="120px" />
                      <h4 className="text-xl md:text-2xl font-satoshi font-medium text-[var(--primary)] mb-4 tracking-tight">
                        {feature.title}
                      </h4>
                      <p className="text-base md:text-lg lg:text-xl text-white font-satoshi font-light leading-relaxed opacity-80">
                        {feature.desc}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Mobile Scroll Indicators */}
          <div className="flex sm:hidden justify-center space-x-2 mt-4">
            {features.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'bg-[var(--primary)] w-4' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Final Solution Footer */}
          <div className="mt-32 flex flex-col items-end px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-right max-w-2xl"
            >
              <h3 className="text-3xl md:text-4xl font-satoshi font-medium text-[var(--primary)] mb-6">
                Overall
              </h3>
              <p className="text-white font-light text-lg md:text-xl leading-relaxed opacity-80 italic">
                Reduces stress and adaptation time in a new city, providing a sense of control and clarity
              </p>
            </motion.div>
            <div className="w-full md:w-1/2 h-[1px] bg-[var(--primary)]/20 mt-6" />
          </div>
        </div>
      </motion.div>

      {/* Desktop Visual Showcase Section */}
      <div className="hidden lg:block max-w-7xl mx-auto pb-20 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl"
        >
          <img 
            src="/images/image-kit.png" 
            alt="City Survival Kit Full View" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Mobile/Tablet Visual Showcase Section */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-20 md:pb-32">
        <div className="space-y-12">
          {/* image-kit-1: Draggable with Blur Overlays */}
          <div className="relative">
            <motion.div
              ref={constraintsRef}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl h-[400px] md:h-[500px]"
            >
              <motion.div 
                drag="x"
                dragConstraints={constraintsRef}
                style={{ x }}
                className="h-full w-fit cursor-grab active:cursor-grabbing"
              >
                <img 
                  ref={imageRef}
                  onLoad={calculateCenter}
                  src="/images/image-kit-1.png" 
                  alt="City Survival Kit Visual 1 Mobile" 
                  className="h-full w-auto max-w-none block pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Edge Blur Overlays */}
              <div 
                className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-zinc-950/25 via-zinc-950/5 to-transparent backdrop-blur-md z-10 pointer-events-none"
                style={{ maskImage: 'linear-gradient(to right, black 20%, transparent)' }}
              />
              <div 
                className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-zinc-950/25 via-zinc-950/5 to-transparent backdrop-blur-md z-10 pointer-events-none"
                style={{ maskImage: 'linear-gradient(to left, black 20%, transparent)' }}
              />
            </motion.div>
            
            {/* Mobile Hint */}
            <div className="mt-4 flex items-center justify-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest opacity-50">
              <ArrowRight className="rotate-180" size={12} />
              <span>Drag to explore</span>
              <ArrowRight size={12} />
            </div>
          </div>

          {/* image-kit-2: Card-like (Size matched to image-dopamin-2) */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-4 md:p-6 rounded-[2rem] overflow-hidden flex items-center justify-center w-full sm:w-[calc(50%-8px)] md:w-[calc(50%-6px)]"
            >
              <img 
                src="/images/image-kit-2.png" 
                alt="City Survival Kit Visual 2 Mobile" 
                className="w-full h-auto rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto py-20 md:py-32 border-t border-white/5 flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-9xl font-satoshi font-bold text-white leading-tight tracking-tighter text-center mb-16 md:mb-24"
        >
          {t.portfolio.citySurvivalKit.servicesTitle}
        </motion.h2>

        <div className="w-full max-w-4xl space-y-0 px-4">
          {t.portfolio.citySurvivalKit.servicesItems.map((item: any, i: number) => (
            <ServiceItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Teamvoice Section */}
      <div className="w-full max-w-7xl mx-auto py-20 md:py-32 border-t border-white/5 flex flex-col items-center md:px-0">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-9xl font-satoshi font-bold text-white leading-tight tracking-tighter text-center mb-16 md:mb-24"
        >
          {t.portfolio.citySurvivalKit.teamVoiceTitle}
        </motion.h2>

        {/* Mobile Carousel */}
        <div className="w-full md:hidden">
          <TeamVoiceMobileCarousel items={t.portfolio.citySurvivalKit.teamVoiceItems} />
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:block w-full max-w-6xl px-6 space-y-12">
          {t.portfolio.citySurvivalKit.teamVoiceItems.map((item: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2.5fr] gap-4 md:gap-12 items-start border-b border-white/5 pb-12 last:border-0"
            >
              <div className="text-xs md:text-sm text-white/40 font-mono uppercase tracking-[0.2em] pt-1">
                {item.name}
              </div>
              <div className="text-base md:text-lg text-white/70 font-satoshi font-medium uppercase tracking-wider pt-0.5">
                {item.role}
              </div>
              <div className="text-lg md:text-xl text-white font-satoshi font-light leading-relaxed opacity-80">
                {item.quote}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Next Project Section */}
      <div className="max-w-7xl mx-auto py-20 md:py-32 border-t border-white/5 flex flex-col items-center overflow-hidden">
        <div ref={nextProjectRef} className="relative group block w-full max-w-4xl py-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-9xl font-satoshi font-bold text-white/10 blur-[1px] leading-tight tracking-tighter text-center select-none"
          >
            {t.portfolio.nextProject}
          </motion.h2>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{
              clipPath: lensClipPath,
              WebkitClipPath: lensClipPath
            }}
          >
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-satoshi font-bold text-white leading-tight tracking-tighter text-center">
              {t.portfolio.nextProject}
            </h2>
          </motion.div>
          
          <motion.div 
            drag
            dragElastic={0.1}
            dragConstraints={nextProjectRef}
            onTap={() => navigate(lang === 'en' ? '/wami-vacations' : `/${lang}/wami-vacations`)}
            style={{ x: lensX, y: lensY }}
            whileHover={{ scale: 1.02 }}
            whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer w-[100px] h-[100px] md:w-[180px] md:h-[180px] lg:w-[250px] lg:h-[250px] flex items-center justify-center z-20"
          >
            <img 
              src="/images/LENS (Mask Group).png" 
              alt="Lens Mask" 
              className="w-full h-full object-contain opacity-90 pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <Link to={lang === 'en' ? "/wami-vacations" : `/${lang}/wami-vacations`} className="mt-12 group flex items-center gap-3 text-white/50 hover:text-[var(--primary)] transition-colors duration-300">
          <span className="text-sm font-light uppercase tracking-widest">{t.portfolio.goToNextCase}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

const CaseStudyBalancePulse = ({ lang, isMobile }: { lang: Language; isMobile: boolean }) => {
  const t = translations[lang];
  const navigate = useNavigate();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const nextProjectRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const x = useMotionValue(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Motion values for the interactive lens
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);
  
  const lensClipPath = useTransform([lensX, lensY], ([lx, ly]: [number, number]) => {
    const radius = isMobile ? 55 : 110;
    return `circle(${radius}px at calc(50% + ${lx}px) calc(50% + ${ly}px))`;
  });

  const calculateCenter = () => {
    if (imageRef.current && constraintsRef.current) {
      const imgWidth = imageRef.current.offsetWidth;
      const containerWidth = constraintsRef.current.offsetWidth;
      // Center the image by calculating the offset difference
      x.set(-(imgWidth - containerWidth) / 2);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    
    // Use ResizeObserver for more reliable centering
    let observer: ResizeObserver | null = null;
    if (constraintsRef.current) {
      observer = new ResizeObserver(() => {
        calculateCenter();
      });
      observer.observe(constraintsRef.current);
    }

    // Also try initial calculation
    calculateCenter();
    // Small delay to ensure layout has settled
    const timer = setTimeout(calculateCenter, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const isTabletOrMobile = windowWidth < 1024;

  useEffect(() => {
    const title = 'The balance pulse';
    const desc = 'A personal financial coaching experience that goes beyond traditional budgeting tools, focusing on the psychology of spending. The system helps users distinguish essential needs from impulsive desires, enabling more conscious and sustainable financial decisions.';
    const url = 'https://ais-dev-cwvt74vynqvryz7jxzv277-527915966303.europe-west2.run.app/balance-pulse';
    const image = 'https://ais-dev-cwvt74vynqvryz7jxzv277-527915966303.europe-west2.run.app/images/case-cover-1.png';
    document.title = title;
    
    const metaTags = [
      { name: 'description', content: desc },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: image }
    ];

    metaTags.forEach(tag => {
      const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (tag.name) element.setAttribute('name', tag.name);
        if (tag.property) element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });
  }, [lang, t]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const ChipGroup = ({ 
    items
  }: { 
    items: string[]
  }) => {
    return (
      <div className="flex flex-wrap gap-2 md:gap-3 mt-auto pb-4 -mx-2 px-2">
        {items.map((item) => (
          <span key={item} className="whitespace-nowrap px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-white/5 border border-white/10 text-[10px] md:text-[11px] lg:text-xs font-mono uppercase tracking-[0.2em] text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300">
            {item}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 font-satoshi relative">
      {/* Back Button - Positioned at the top right, outside of the main content motion div for better clickability */}
      <div className="max-w-7xl mx-auto pt-28 md:pt-36 px-6 relative z-30 flex justify-start pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2.5 text-white/50 hover:text-primary transition-all duration-300 group cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-md p-2 rounded-xl shadow-2xl border-none outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
            <ArrowLeft className="w-4 h-4 group-hover:text-primary transition-colors" />
          </div>
          <span className="text-[11px] font-light uppercase tracking-widest select-none">{t.portfolio.back}</span>
        </button>
      </div>

      <div className="pt-4 md:pt-8 pb-16 md:pb-32 max-w-7xl mx-auto relative min-h-[60vh] flex flex-col items-center justify-center">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[var(--primary)]/5 blur-[120px] rounded-full -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full relative flex flex-col lg:block"
        >
          {/* Text Content - Above image on mobile/tablet, Overlay on desktop */}
          <div className="relative lg:absolute lg:inset-0 z-20 p-0 lg:p-16 mb-8 lg:mb-0 flex flex-col justify-start lg:pt-48 items-start pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-3xl pointer-events-auto"
            >
              <span className="inline-block font-mono text-[13px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--primary)] mb-3 md:mb-6 border-b border-[var(--primary)]/30 pb-1">
                Fintech
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-normal text-white mb-3 md:mb-6 leading-tight">
                <span>{t.portfolio.balancePulse.title}</span>
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-4xl text-white font-satoshi font-normal max-w-2xl leading-tight opacity-95">
                AI coach for conscious financial decisions based on spending psychology
              </h2>
            </motion.div>
          </div>

          {/* Image Container */}
          <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl h-[400px] md:h-[500px] lg:h-auto">
            {/* Black Gradient Overlay for Readability - Desktop Only */}
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent z-10 pointer-events-none" />
            
            <img 
              src="/images/cover-balance-pulse.png" 
              alt="Balance Pulse Cover" 
              className="w-full h-full object-cover lg:object-contain object-[85%_center] lg:object-center block"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>

      {/* Goal of the Project Section */}
      <div className="max-w-7xl mx-auto py-20 md:py-32 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-light text-[var(--primary)] leading-tight"
            >
              {t.portfolio.balancePulse.goalTitle}
            </motion.h2>
          </div>
          <div className="lg:col-span-7 lg:pt-5">
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white font-light text-lg md:text-xl leading-relaxed opacity-80"
            >
              {t.portfolio.balancePulse.goalDesc}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Secondary Image Section */}
      <div className="max-w-7xl mx-auto pb-20 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl h-[400px] md:h-[500px] lg:h-auto"
        >
          <img 
            src="/images/image-balance-pulse-2.png" 
            alt="Balance Pulse Visual" 
            className="w-full h-full object-cover lg:object-contain object-center block"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Core Concept Section */}
      <div className="max-w-7xl mx-auto py-20 md:py-32 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start mb-20 md:mb-32">
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-light text-[var(--primary)] leading-tight"
            >
              {t.portfolio.balancePulse.conceptTitle}
            </motion.h2>
          </div>
          <div className="lg:col-span-7 lg:pt-5">
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white font-light text-lg md:text-xl leading-relaxed opacity-80"
            >
              {t.portfolio.balancePulse.conceptDesc}
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-3 lg:gap-12">
          {/* Essential Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-8 md:p-12 rounded-[2rem] flex flex-col h-full group overflow-hidden"
          >
            <BorderBeam delay={0} duration={12} />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
                <Anchor size={24} className="text-[var(--primary)]" />
              </div>
              <h3 className="text-xl md:text-2xl font-satoshi font-medium text-white tracking-tight">
                {t.portfolio.balancePulse.essentialTitle}
              </h3>
            </div>

            <p className="text-base md:text-lg lg:text-xl text-white font-satoshi font-light leading-relaxed mb-12 opacity-90">
              {t.portfolio.balancePulse.essentialDesc}
            </p>

            <ChipGroup 
              items={['Rent', 'Health', 'Groceries', 'Education']} 
            />
          </motion.div>

          {/* Dopamine Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-8 md:p-12 rounded-[2rem] flex flex-col h-full group overflow-hidden"
          >
            <BorderBeam delay={3} duration={15} />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
                <Flame size={24} className="text-[var(--primary)]" />
              </div>
              <h3 className="text-xl md:text-2xl font-satoshi font-medium text-white tracking-tight">
                {t.portfolio.balancePulse.dopamineTitle}
              </h3>
            </div>

            <p className="text-base md:text-lg lg:text-xl text-white font-satoshi font-light leading-relaxed mb-12 opacity-90">
              {t.portfolio.balancePulse.dopamineDesc}
            </p>

            <ChipGroup 
              items={['Coffee', 'Shopping', 'Taxis', 'Entertainment']} 
            />
          </motion.div>
        </div>
      </div>

      {/* Feature Path Section */}
      <FeaturePath t={t} isMobile={isMobile} />

      {/* Dopamine Image Section */}
      <div className="max-w-7xl mx-auto py-20 md:py-32 border-t border-white/5">
        <motion.div
          ref={constraintsRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl h-[400px] md:h-[500px] lg:h-auto"
        >
          {/* Mobile/Tablet Image - Draggable */}
          <motion.div 
            drag="x"
            dragConstraints={constraintsRef}
            style={{ x }}
            className="lg:hidden h-full w-fit cursor-grab active:cursor-grabbing"
          >
            <img 
              ref={imageRef}
              onLoad={calculateCenter}
              src="/images/image-dopamin-1.png" 
              alt="Dopamine Concept Visual Mobile" 
              className="h-full w-auto max-w-none block pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Edge Blur Overlays for Mobile */}
          <div 
            className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-zinc-950/25 via-zinc-950/5 to-transparent backdrop-blur-md z-10 pointer-events-none lg:hidden"
            style={{ maskImage: 'linear-gradient(to right, black 20%, transparent)' }}
          />
          <div 
            className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-zinc-950/25 via-zinc-950/5 to-transparent backdrop-blur-md z-10 pointer-events-none lg:hidden"
            style={{ maskImage: 'linear-gradient(to left, black 20%, transparent)' }}
          />
          
          {/* Desktop Image */}
          <img 
            src="/images/image-dopamin.png" 
            alt="Dopamine Concept Visual Desktop" 
            className="hidden lg:block w-full h-full object-cover lg:object-contain object-center block"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        {/* Mobile Hint */}
        <div className="lg:hidden mt-4 flex items-center justify-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest opacity-50">
          <ArrowRight className="rotate-180" size={12} />
          <span>Drag to explore</span>
          <ArrowRight size={12} />
        </div>
      </div>

      {/* Second Dopamine Image Section for Mobile/Tablet */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-20 md:pb-32">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-4 md:p-6 rounded-[2rem] overflow-hidden flex items-center justify-center w-full sm:w-[calc(50%-8px)] md:w-[calc(50%-6px)]"
          >
            <BorderBeam delay={5} duration={15} />
            <img 
              src="/images/image-dopamin-2.png" 
              alt="Dopamine Concept Visual 2" 
              className="w-full h-auto rounded-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto py-20 md:py-32 border-t border-white/5 flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-9xl font-satoshi font-bold text-white leading-tight tracking-tighter text-center mb-16 md:mb-24"
        >
          {t.portfolio.balancePulse.servicesTitle}
        </motion.h2>

        <div className="w-full max-w-4xl space-y-0 px-4">
          {t.portfolio.balancePulse.servicesItems.map((item: any, i: number) => (
            <ServiceItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Teamvoice Section */}
      <div className="w-full max-w-7xl mx-auto py-20 md:py-32 border-t border-white/5 flex flex-col items-center md:px-0">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-9xl font-satoshi font-bold text-white leading-tight tracking-tighter text-center mb-16 md:mb-24"
        >
          {t.portfolio.balancePulse.teamVoiceTitle}
        </motion.h2>

        {/* Mobile Carousel */}
        <div className="w-full md:hidden">
          <TeamVoiceMobileCarousel items={t.portfolio.balancePulse.teamVoiceItems} />
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:block w-full max-w-6xl px-6 space-y-12">
          {t.portfolio.balancePulse.teamVoiceItems.map((item: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2.5fr] gap-4 md:gap-12 items-start border-b border-white/5 pb-12 last:border-0"
            >
              <div className="text-xs md:text-sm text-white/40 font-mono uppercase tracking-[0.2em] pt-1">
                {item.name}
              </div>
              <div className="text-base md:text-lg text-white/70 font-satoshi font-medium uppercase tracking-wider pt-0.5">
                {item.role}
              </div>
              <div className="text-lg md:text-xl text-white font-satoshi font-light leading-relaxed opacity-80">
                {item.quote}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Next Project Section */}
      <div className="max-w-7xl mx-auto py-20 md:py-32 border-t border-white/5 flex flex-col items-center overflow-hidden">
        <div ref={nextProjectRef} className="relative group block w-full max-w-4xl py-20">
          {/* Blurred Background Text */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-9xl font-satoshi font-bold text-white/10 blur-[1px] leading-tight tracking-tighter text-center select-none"
          >
            {t.portfolio.nextProject}
          </motion.h2>
          
          {/* Sharp Text Layer (Masked to be visible only inside the lens) */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{
              clipPath: lensClipPath,
              WebkitClipPath: lensClipPath
            }}
          >
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-satoshi font-bold text-white leading-tight tracking-tighter text-center">
              {t.portfolio.nextProject}
            </h2>
          </motion.div>
          
          {/* Lens Image Overlay - Draggable */}
          <motion.div 
            drag
            dragElastic={0.1}
            dragConstraints={nextProjectRef}
            onTap={() => navigate(lang === 'en' ? '/city-survival-kit' : `/${lang}/city-survival-kit`)}
            style={{ x: lensX, y: lensY }}
            whileHover={{ scale: 1.02 }}
            whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer w-[100px] h-[100px] md:w-[180px] md:h-[180px] lg:w-[250px] lg:h-[250px] flex items-center justify-center z-20"
          >
            <img 
              src="/images/LENS (Mask Group).png" 
              alt="Lens Mask" 
              className="w-full h-full object-contain opacity-90 pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Link to Next Case - Separate from the interactive lens to allow clicking */}
        <Link to={lang === 'en' ? '/city-survival-kit' : `/${lang}/city-survival-kit`} className="mt-12 group flex items-center gap-3 text-white/50 hover:text-[var(--primary)] transition-colors duration-300">
          <span className="text-sm font-light uppercase tracking-widest">{t.portfolio.goToNextCase}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
};

const CaseStudyWamiVacations = ({ lang, isMobile }: { lang: Language; isMobile: boolean }) => {
  const t = translations[lang];
  const navigate = useNavigate();
  const nextProjectRef = useRef<HTMLDivElement>(null);
  
  // Motion values for the interactive lens
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);
  
  const lensClipPath = useTransform([lensX, lensY], ([lx, ly]: [number, number]) => {
    const radius = isMobile ? 55 : 110;
    return `circle(${radius}px at calc(50% + ${lx}px) calc(50% + ${ly}px))`;
  });

  useEffect(() => {
    const title = lang === 'ua' ? 'Wami vacations — Wami Vibe' : 'Wami vacations — Wami Vibe';
    const desc = t.portfolio.vacations.desc;
    document.title = title;
    
    const metaTags = [
      { name: 'description', content: desc },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: 'https://ais-dev-cwvt74vynqvryz7jxzv277-527915966303.europe-west2.run.app/images/cover-wami-vacations.png' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: 'https://ais-dev-cwvt74vynqvryz7jxzv277-527915966303.europe-west2.run.app/images/cover-wami-vacations.png' }
    ];

    metaTags.forEach(tag => {
      const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (tag.name) element.setAttribute('name', tag.name);
        if (tag.property) element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });
  }, [lang, t]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 font-satoshi relative">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto pt-28 md:pt-36 px-6 relative z-30 flex justify-start pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2.5 text-white/50 hover:text-primary transition-all duration-300 group cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-md p-2 rounded-xl shadow-2xl border-none outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
            <ArrowLeft className="w-4 h-4 group-hover:text-primary transition-colors" />
          </div>
          <span className="text-[11px] font-light uppercase tracking-widest select-none">{t.portfolio.back}</span>
        </button>
      </div>

      <div className="pt-4 md:pt-8 pb-16 md:pb-32 max-w-7xl mx-auto relative min-h-[60vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full text-center"
        >
          <span className="inline-block font-mono text-[13px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--primary)] mb-3 md:mb-6 border-b border-[var(--primary)]/30 pb-1">
            HR Tech
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-satoshi font-normal text-white mb-6 leading-tight flex items-center justify-center gap-4">
            <Sparkles className="text-[var(--primary)] flex-shrink-0 w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14" />
            <span>{t.portfolio.vacations.title}</span>
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl text-white/70 font-satoshi max-w-3xl mx-auto leading-relaxed">
            {t.portfolio.vacations.desc}
          </h2>
        </motion.div>
      </div>

      {/* Next Project Section (linking back to Balance Pulse for now) */}
      <div className="max-w-7xl mx-auto py-20 md:py-32 border-t border-white/5 flex flex-col items-center overflow-hidden">
        <div ref={nextProjectRef} className="relative group block w-full max-w-4xl py-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-9xl font-satoshi font-bold text-white/10 blur-[1px] leading-tight tracking-tighter text-center select-none"
          >
            {t.portfolio.nextProject}
          </motion.h2>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{
              clipPath: lensClipPath,
              WebkitClipPath: lensClipPath
            }}
          >
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-satoshi font-bold text-white leading-tight tracking-tighter text-center">
              {t.portfolio.nextProject}
            </h2>
          </motion.div>
          
          <motion.div 
            drag
            dragElastic={0.1}
            dragConstraints={nextProjectRef}
            onTap={() => navigate(lang === 'en' ? '/balance-pulse' : `/${lang}/balance-pulse`)}
            style={{ x: lensX, y: lensY }}
            whileHover={{ scale: 1.02 }}
            whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer w-[100px] h-[100px] md:w-[180px] md:h-[180px] lg:w-[250px] lg:h-[250px] flex items-center justify-center z-20"
          >
            <img 
              src="/images/LENS (Mask Group).png" 
              alt="Lens Mask" 
              className="w-full h-full object-contain opacity-90 pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <Link to={lang === 'en' ? "/balance-pulse" : `/${lang}/balance-pulse`} className="mt-12 group flex items-center gap-3 text-white/50 hover:text-[var(--primary)] transition-colors duration-300">
          <span className="text-sm font-light uppercase tracking-widest">{t.portfolio.goToNextCase}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

const TeamVoiceMobileCarousel = ({ items }: { items: any[] }) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length, isPaused]);

  return (
    <div className="w-full overflow-hidden relative flex flex-col">
      <div className="relative w-full grid grid-cols-1 grid-rows-1">
        {/* Invisible stack to maintain equal height based on tallest item */}
        {items.map((item, i) => (
          <div 
            key={`ghost-${i}`} 
            className="col-start-1 row-start-1 invisible pointer-events-none px-3 py-12 text-left"
            aria-hidden="true"
          >
            <div className="text-lg font-satoshi font-light leading-relaxed mb-8">
              {item.quote}
            </div>
            <div className="mt-auto">
              <div className="text-sm font-satoshi font-medium uppercase tracking-wider mb-1">
                {item.role}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em]">
                {item.name}
              </div>
            </div>
          </div>
        ))}

        {/* Visible animated card */}
        <div className="col-start-1 row-start-1 relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) setIndex((prev) => (prev + 1) % items.length);
                if (info.offset.x > 50) setIndex((prev) => (prev - 1 + items.length) % items.length);
              }}
              onPointerDown={() => setIsPaused(true)}
              onPointerUp={() => setIsPaused(false)}
              onPointerLeave={() => setIsPaused(false)}
              className="w-full h-full flex flex-col justify-start text-left cursor-grab active:cursor-grabbing bg-white/[0.03] rounded-xl px-3 py-12 backdrop-blur-sm"
            >
              <div className="text-lg text-white font-satoshi font-light leading-relaxed opacity-90 mb-8">
                {items[index].quote}
              </div>
              <div className="mt-auto">
                <div className="text-sm text-white/70 font-satoshi font-medium uppercase tracking-wider mb-1">
                  {items[index].role}
                </div>
                <div className="text-[10px] text-white/40 font-mono uppercase tracking-[0.2em]">
                  {items[index].name}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {items.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === index ? 'bg-[var(--primary)] w-6' : 'bg-white/10'}`}
          />
        ))}
      </div>
    </div>
  );
};

const ServiceItem = ({ item, index }: { item: any, index: number, key?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  
  // Extremely focused trigger zone (middle 30% of the screen)
  // This forces a very distinct "one-by-one" sequence for both opening and closing
  const isInView = useInView(triggerRef, { 
    amount: 0.5, 
    margin: "-35% 0px -35% 0px" 
  });

  useEffect(() => {
    setIsOpen(isInView);
  }, [isInView]);

  return (
    <div className="group border-b border-white/10 overflow-hidden last:border-0">
      <button 
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-start pt-6 md:pt-8 transition-all duration-1000 ease-[0.16,1,0.3,1] ${isOpen ? 'pb-2 md:pb-3' : 'pb-6 md:pb-8'} cursor-pointer text-left group`}
      >
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 }}
          className={`text-xl md:text-2xl font-satoshi font-medium tracking-tight transition-all duration-1000 ${isOpen ? 'text-[var(--primary)]' : 'text-white group-hover:text-[var(--primary)]'}`}
        >
          {item.q}
        </motion.h3>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              // Uniform slow duration (2.5s) for both opening and closing
              // This creates the "liquid" feel the user requested
              duration: 2.5,
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            <div className="pb-6 md:pb-8 text-left">
              <motion.p 
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1.8, 
                  delay: 0.4,
                  ease: "easeOut"
                }}
                className="text-white font-light text-lg md:text-xl leading-relaxed opacity-80 max-w-2xl"
              >
                {item.a}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer = ({ t, setIsModalOpen, setIsEmailSelectorOpen }: { t: any, setIsModalOpen: (val: boolean) => void, setIsEmailSelectorOpen: (val: boolean) => void }) => {
  return (
    <section id="contact" className="relative pt-24 pb-0 px-0 max-w-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="inline-block font-mono text-[13px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--primary)] mb-6 border-b border-[var(--primary)]/30 pb-1">
            {t.contact.label}
          </span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[34px] md:text-[40px] font-satoshi font-medium tracking-tight text-white mb-12"
        >
          {t.contact.title}
        </motion.h2>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          onClick={() => setIsModalOpen(true)}
          className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 mx-auto group"
        >
          {t.contact.cta} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Social Links Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mb-20">
        <div className="flex flex-col gap-3 items-center">
          {/* First Row: 3 items */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'info@wamisoftware.com', href: 'mailto:info@wamisoftware.com', isEmail: true },
              { label: 'YouTube', href: 'https://www.youtube.com/@WamiSoftWare_IT' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/company/wamisoftware/posts/?feedView=all' },
            ].map((link, i) => (
              <a 
                key={i} 
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : "_blank"}
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (link.isEmail) {
                    e.preventDefault();
                    setIsEmailSelectorOpen(true);
                  }
                }}
                className="px-6 py-3 border border-neutral-800 rounded-xl text-sm font-medium text-white hover:bg-white hover:text-black transition-all flex items-center gap-2 group cursor-pointer"
              >
                {link.label} <ArrowRight size={14} className="-rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>
          {/* Second Row: 5 items */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Facebook', href: 'https://www.facebook.com/wamisoftware/' },
              { label: 'Medium', href: 'https://medium.com/@info.wamisoftware' },
              { label: 'Instagram', href: 'https://www.instagram.com/wamisoftware?igsh=cW50a3ZxbzdldXlz&utm_source=qr' },
              { label: 'TikTok', href: 'https://www.tiktok.com/@wamisoftware?_r=1&_t=ZS-94nCY0hmzDz' },
              { label: 'Clutch', href: 'https://clutch.co/profile/wamisoftware?_gl=1*1bla7gf*_gcl_au*MTE4NTE5Mzc0MS4xNzQ3MDQ1Nzk4*FPAU*MTcyMTEyMzIwMi4xNzQ3MDQ1Nzk4*_ga*MTgyOTk2OTQ3My4xNzQ3MDQ1Nzk4*_ga_D0WFGX8X3V*czE3NDcxNDMzMzAkbzYkZzEkdDE3NDcxNDQ2NjIkajYwJGwwJGgyMDIwNjY3NjQ0*_fplc*RFZOb2JjS1RzT1R4anpSTjdibU92SWw0WUNhVktLdGszSmRSVzVycUxlTlZseWtQbWFrdGpzOE5GelFyMnJ4TiUyQmRLdHElMkY3eUl4TlY1RW54ZlZVZTJMeDIzNmhCa3l3aG1QUlpZOCUyRjdFdGRoV2NqQnZ5aHRiUkxyc3BmT3dRJTNEJTNE' },
            ].map((link, i) => (
              <a 
                key={i} 
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-neutral-800 rounded-xl text-sm font-medium text-white hover:bg-white hover:text-black transition-all flex items-center gap-2 group"
              >
                {link.label} <ArrowRight size={14} className="-rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright and Back to Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex flex-col items-center gap-6 mb-12">
        <p className="text-white text-xs text-center max-w-2xl">
          {t.footer.copyright}
        </p>
      </div>

      {/* Massive Text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 w-full select-none pointer-events-none pb-12">
        <h1 className="flex justify-center gap-x-[0.2vw] w-full font-satoshi font-medium leading-none uppercase text-[10vw] lg:text-[7.8vw]">
          {"WAMISOFTWARE".split("").map((char, i) => (
            <span key={i} className={i < 4 ? "text-[var(--primary)]" : "text-white"}>
              {char}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (!hash) {
      // Small delay to ensure the DOM has updated and layout shifts are minimized
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);
  
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

const HomeRoute = ({ 
  language, 
  isMobile, 
  handleLanguageChange, 
  scrolled, 
  isMenuOpen, 
  setIsMenuOpen, 
  expertiseIndex, 
  setExpertiseIndex, 
  isExpertisePaused, 
  setIsExpertisePaused, 
  processIndex, 
  setProcessIndex, 
  isProcessPaused, 
  setIsProcessPaused, 
  openFaqIndex, 
  setOpenFaqIndex, 
  viewedFaqs, 
  setViewedFaqs,
  t
}: any) => (
  <>
    <Navigation 
      scrolled={scrolled} 
      isMenuOpen={isMenuOpen} 
      setIsMenuOpen={setIsMenuOpen} 
      lang={language} 
      handleLanguageChange={handleLanguageChange}
    />
    <Hero t={t} isMobile={isMobile} />
    <Benefits t={t} isMobile={isMobile} />
    <Expertise 
      t={t} 
      isMobile={isMobile} 
      expertiseIndex={expertiseIndex} 
      setExpertiseIndex={setExpertiseIndex} 
      isExpertisePaused={isExpertisePaused} 
      setIsExpertisePaused={setIsExpertisePaused} 
    />
    <Process 
      t={t} 
      isMobile={isMobile} 
      processIndex={processIndex} 
      setProcessIndex={setProcessIndex} 
      isProcessPaused={isProcessPaused} 
      setIsProcessPaused={setIsProcessPaused} 
    />
    <Portfolio t={t} isMobile={isMobile} lang={language} />
    <FAQ 
      t={t} 
      openFaqIndex={openFaqIndex} 
      setOpenFaqIndex={setOpenFaqIndex} 
      viewedFaqs={viewedFaqs} 
      setViewedFaqs={setViewedFaqs} 
    />
  </>
);

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState<Language>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/ua')) return 'ua';
    if (path.startsWith('/de')) return 'de';
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'ua' || saved === 'de') ? saved as Language : 'en';
  });

  useEffect(() => {
    const path = location.pathname;
    let newLang: Language = 'en';
    if (path.startsWith('/ua')) newLang = 'ua';
    else if (path.startsWith('/de')) newLang = 'de';
    else {
      const saved = localStorage.getItem('language');
      newLang = (saved === 'en' || saved === 'ua' || saved === 'de') ? saved as Language : 'en';
    }
    
    if (newLang !== language) {
      setLanguage(newLang);
    }
  }, [location.pathname, language]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Update URL if needed
    const currentPath = location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(ua|de)/, '');
    const newPath = lang === 'en' ? pathWithoutLang || '/' : `/${lang}${pathWithoutLang}`;
    navigate(newPath);
  };

  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailSelectorOpen, setIsEmailSelectorOpen] = useState(false);
  const [expertiseIndex, setExpertiseIndex] = useState(0);
  const [processIndex, setProcessIndex] = useState(0);
  const [isExpertisePaused, setIsExpertisePaused] = useState(false);
  const [isProcessPaused, setIsProcessPaused] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [viewedFaqs, setViewedFaqs] = useState<number[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();
  const { pathname, hash } = useLocation();
  const isHomePage = pathname === '/';
  const opacityParallax = useTransform(scrollY, [0, 300], [1, 0]);

  const t = translations[language];

  useEffect(() => {
    if (isHomePage) {
      const title = 'Wami Vibe — Digital Product Design Studio';
      const desc = 'We create digital products that people love. From strategy to design and development, we help you build the future.';
      const url = 'https://ais-dev-cwvt74vynqvryz7jxzv277-527915966303.europe-west2.run.app';
      const image = 'https://ais-dev-cwvt74vynqvryz7jxzv277-527915966303.europe-west2.run.app/images/og-image.png';
      document.title = title;
      
      const metaTags = [
        { name: 'description', content: desc },
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:image', content: image },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: desc },
        { name: 'twitter:image', content: image }
      ];

      metaTags.forEach(tag => {
        const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
        let element = document.querySelector(selector);
        if (!element) {
          element = document.createElement('meta');
          if (tag.name) element.setAttribute('name', tag.name);
          if (tag.property) element.setAttribute('property', tag.property);
          document.head.appendChild(element);
        }
        element.setAttribute('content', tag.content);
      });
    }
  }, [isHomePage, language]);

  useEffect(() => {
    if (hash) {
      const id = hash.substring(1);
      const scrollWithRetry = (retries = 0) => {
        const el = document.getElementById(id);
        if (el) {
          const headerOffset = isMobile ? 80 : 160; 
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else if (retries < 30) {
          setTimeout(() => scrollWithRetry(retries + 1), 100);
        }
      };
      // Increased delay to allow page transition and rendering to complete
      const timer = setTimeout(() => scrollWithRetry(), 200);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash, isMobile]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobile || isExpertisePaused) return;
    const interval = setInterval(() => {
      setExpertiseIndex((prev) => (prev + 1) % t.expertise.items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile, t.expertise.items.length, isExpertisePaused]);

  useEffect(() => {
    if (!isMobile || isProcessPaused) return;
    const interval = setInterval(() => {
      setProcessIndex((prev) => (prev + 1) % t.process.items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile, t.process.items.length, isProcessPaused]);

  const navLinks = [
    { label: t.nav.benefits, href: '#benefits' },
    { label: t.nav.expertise, href: '#expertise' },
    { label: t.nav.target, href: '#target' },
    { label: t.nav.partnership, href: '#partnership' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.portfolio, href: '#portfolio' },
    { label: t.nav.faq, href: '#faq' },
    { label: t.nav.contacts, href: '#contact' },
  ];

  const aiTools = [
    { name: 'OpenAI', slug: 'openai' },
    { name: 'Anthropic', slug: 'anthropic' },
    { name: 'Claude', slug: 'claude' },
    { name: 'Gemini', slug: 'googlegemini' },
    { name: 'Vercel', slug: 'vercel' },
    { name: 'Supabase', slug: 'supabase' },
    { name: 'Replit', slug: 'replit' },
    { name: 'GitHub', slug: 'github' }
  ];

  const faqs = t.faq.items;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black relative overflow-x-hidden">
      <CustomCursor />
      {/* Global Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none -z-10" />

      {/* --- Header --- */}
      <header className="fixed top-6 left-0 right-0 z-40 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 transition-all duration-300">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between rounded-xl transition-all duration-300 ${scrolled ? 'bg-zinc-900/60 backdrop-blur-lg shadow-lg py-3 md:py-4' : 'bg-zinc-900/20 backdrop-blur-md py-4 md:py-6'}`}>
          {/* Left: Logo */}
          <Link 
            to={language === 'en' ? "/" : `/${language}`} 
            className="flex-shrink-0 flex items-center gap-2 group"
            onClick={() => {
              setIsMenuOpen(false);
              if (isHomePage) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img 
              src="/images/logo_animated.svg" 
              alt="WAMI Logo" 
              className="w-12 h-12 md:w-16 lg:w-20 object-contain transition-transform"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Center: Desktop Nav Links - Hidden on tablet/mobile */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={isHomePage ? link.href : `${language === 'en' ? '' : `/${language}`}/${link.href}`} 
                onClick={(e) => {
                  if (isHomePage && link.href.startsWith('#')) {
                    e.preventDefault();
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="nav-link text-white hover:text-[var(--primary)] transition-colors duration-300 font-light whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-zinc-900/40 border border-white/10 rounded-xl p-1 mr-2">
              <button 
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-all ${language === 'en' ? 'bg-white/10 text-[var(--primary)]' : 'text-white/40 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => handleLanguageChange('de')}
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-all ${language === 'de' ? 'bg-white/10 text-[var(--primary)]' : 'text-white/40 hover:text-white'}`}
              >
                DE
              </button>
              <button 
                onClick={() => handleLanguageChange('ua')}
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-all ${language === 'ua' ? 'bg-white/10 text-[var(--primary)]' : 'text-white/40 hover:text-white'}`}
              >
                UA
              </button>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)} 
              className="hidden sm:block firefly-btn whitespace-nowrap text-sm md:text-base px-4 md:px-6"
            >
              <span className="firefly-track"></span>
              {t.nav.vibeCheck}
            </button>
            
            <button className="xl:hidden p-2 text-white hover:text-[var(--primary)] transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Nav Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-4 right-4 md:left-6 md:right-6 mt-2 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-6 xl:hidden flex flex-col gap-4 shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.label} 
                    href={isHomePage ? link.href : `${language === 'en' ? '' : `/${language}`}/${link.href}`} 
                    className="text-base font-light text-white/70 hover:text-[var(--primary)] hover:translate-x-1 transition-all"
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      if (isHomePage && link.href.startsWith('#')) {
                        e.preventDefault();
                        const element = document.querySelector(link.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="h-px bg-white/5 my-2" />
              <button 
                onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }}
                className="btn-primary w-full py-3 text-lg whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {t.nav.getVibeCheck}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <Routes>
        {['/', '/ua', '/de'].map(path => (
          <Route key={path} path={path} element={
            <>
              {/* --- Hero Section --- */}
      <div className="relative">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[var(--primary)]/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[var(--primary)]/5 blur-[80px] rounded-full -z-10" />
        
        {/* Engineering Grid background */}
        <EngineeringGrid />
        
        <section id="home" className="pt-32 md:pt-64 pb-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex flex-col items-center text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="text-sm md:text-xs font-medium tracking-wider uppercase text-white">{t.hero.badge}</span>
          </motion.div>
          <motion.h1 
            className="max-w-5xl mb-6 mx-auto flex flex-col md:flex-row items-center justify-center gap-x-4 flex-wrap"
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {t.hero.title1}
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-[var(--primary)]"
            >
              {t.hero.title2}
            </motion.span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl mb-10 mx-auto text-white font-light text-lg md:text-xl leading-relaxed opacity-80"
          >
            {t.hero.description}
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: "0 0 50px rgba(var(--primary-rgb), 0.25)"
            }}
            transition={{ 
              delay: 1.2, 
              duration: 2.5,
              ease: [0.16, 1, 0.3, 1] 
            }}
            whileHover={isMobile ? undefined : "hover"}
            whileTap={isMobile ? undefined : "tap"}
            onClick={() => setIsModalOpen(true)}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 group relative whitespace-nowrap text-lg"
          >
            <span className="flex items-center gap-2 relative z-10">
              {t.hero.cta}
              <motion.span
                variants={{
                  hover: { x: 4 },
                  tap: { x: 0 }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </span>
            
            {/* Intense omnidirectional glow layers */}
            <motion.div 
              variants={{
                hover: { opacity: 0.6, scale: 1.2 },
                tap: { scale: 0.95 }
              }}
              className="absolute -inset-2 bg-[var(--primary)]/20 blur-3xl rounded-xl -z-10 opacity-30 transition-opacity duration-700"
            />
            <motion.div 
              variants={{
                hover: { opacity: 0.4, scale: 1.4 },
                tap: { scale: 0.95 }
              }}
              className="absolute -inset-4 bg-[var(--primary)]/10 blur-[60px] rounded-xl -z-20 opacity-20 transition-opacity duration-1000"
            />
          </motion.button>
        </section>
      </div>

      {/* --- Section 1: Benefits --- */}
      <section id="benefits" className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-block font-mono text-[13px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--primary)] mb-6 border-b border-[var(--primary)]/30 pb-1">
            {t.benefits.label}
          </span>
          <h2 className="text-[34px] md:text-[40px] font-satoshi font-medium tracking-tight text-white mb-6">
            {t.benefits.title}
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6">
          {t.benefits.items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: isMobile ? 0 : i * 0.1 }}
              className="group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 px-3 py-4 md:p-6 rounded-2xl transition-all duration-500 flex flex-col h-full w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
                <div className="mb-8">
                  {i === 0 && <HypothesisVisual />}
                  {i === 1 && <CostVisual />}
                  {i === 2 && <OversightVisual />}
                </div>
                <h3 className="text-xl font-satoshi font-medium mb-2 text-white transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-lg md:text-xl text-white font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

      {/* --- Section 2: Synergy --- */}
      <section id="expertise" className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-block font-mono text-[13px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--primary)] mb-6 border-b border-[var(--primary)]/30 pb-1">
            {t.expertise.label}
          </span>
          <h2 className="text-[34px] md:text-[40px] font-satoshi font-medium tracking-tight text-white mb-6">
            {t.expertise.title}
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 w-full">
          {isMobile ? (
            <div className="relative w-full h-[380px] sm:h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={expertiseIndex}
                  initial={{ opacity: 0, x: 40, rotateY: 15, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, rotateY: -15, scale: 0.95 }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={() => setIsExpertisePaused(true)}
                  onDragEnd={(_, info) => {
                    const threshold = 50;
                    if (info.offset.x < -threshold) {
                      setExpertiseIndex((prev) => (prev + 1) % t.expertise.items.length);
                    } else if (info.offset.x > threshold) {
                      setExpertiseIndex((prev) => (prev - 1 + t.expertise.items.length) % t.expertise.items.length);
                    }
                    setIsExpertisePaused(false);
                  }}
                  onPointerDown={() => setIsExpertisePaused(true)}
                  onPointerUp={() => setIsExpertisePaused(false)}
                  onPointerLeave={() => setIsExpertisePaused(false)}
                  className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-3 md:p-10 flex flex-col justify-center rounded-2xl cursor-grab active:cursor-grabbing"
                  style={{ perspective: "1000px", touchAction: "none" }}
                >
                  <BorderBeam delay={expertiseIndex * 1.5} duration={10 + expertiseIndex} />
                  <div className="absolute top-5 right-6 font-mono text-[10px] text-[var(--primary)] opacity-50">
                    {String(expertiseIndex + 1).padStart(2, '0')} / {String(t.expertise.items.length).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-satoshi font-medium mb-3 text-[var(--primary)] relative z-10">
                    {t.expertise.items[expertiseIndex].title}
                  </h3>
                  <p className="text-lg text-white font-light leading-relaxed">
                    {t.expertise.items[expertiseIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
              {/* Pagination Dots */}
              <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                {t.expertise.items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setExpertiseIndex(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === expertiseIndex ? 'bg-[var(--primary)] w-4' : 'bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            t.expertise.items.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: isMobile ? 0 : i * 0.1,
                  ease: "easeOut"
                }}
                className="relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-3 md:p-10 min-h-[300px] flex flex-col justify-center rounded-2xl transition-all duration-500 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <BorderBeam delay={i * 1.5} duration={10 + i} />
                <h3 className="text-xl font-satoshi font-medium mb-4 text-[var(--primary)] relative z-10">
                  {item.title}
                </h3>
                <p className="text-lg md:text-xl text-white font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* --- Section 3: Target --- */}
      <section id="target" className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-block font-mono text-[13px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--primary)] mb-6 border-b border-[var(--primary)]/30 pb-1">
            {t.target.label}
          </span>
          <h2 className="text-[34px] md:text-[40px] font-satoshi font-medium tracking-tight text-white mb-6">
            {t.target.title}
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6">
          {t.target.items.map((item, i) => {
            const icons = [Rocket, User, Target, Layers];
            const Icon = icons[i];
            const staggers = ["lg:translate-y-0", "lg:translate-y-12", "lg:translate-y-0", "lg:translate-y-12"];
            const mdStaggers = ["md:translate-y-0", "md:translate-y-8", "md:translate-y-0", "md:translate-y-8"];
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: isMobile ? 0 : i * 0.15,
                  ease: "easeOut"
                }}
                className={`bg-zinc-900/40 backdrop-blur-sm border border-white/5 px-3 py-4 md:px-5 md:py-8 rounded-2xl transition-all duration-500 flex flex-col h-full w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] ${staggers[i]} ${mdStaggers[i]}`}
              >
                  <div className="relative w-full h-48 bg-[#080808] rounded-xl overflow-hidden border border-white/5 flex items-center justify-center mb-8 group/icon">
                    {/* Subtle Grid Background */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                        maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
                      }}
                    />
                    
                    {/* Focused Spotlight Effect */}
                    <div 
                      className="absolute inset-0 opacity-40"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(251,248,80,0.15) 0%, transparent 60%)',
                      }}
                    />
                    
                    {/* Floating Particles */}
                    {[...Array(6)].map((_, idx) => (
                      <motion.div
                        key={idx}
                        className="absolute w-1 h-1 bg-[var(--primary)]/60 rounded-full"
                        initial={{ 
                          x: Math.random() * 200 - 100, 
                          y: Math.random() * 200 - 100,
                          opacity: 0 
                        }}
                        animate={{ 
                          y: [0, -60, 0],
                          x: [0, Math.random() * 40 - 20, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2 + Math.random() * 3,
                          repeat: Infinity,
                          delay: Math.random() * 3,
                          ease: "easeInOut"
                        }}
                      />
                    ))}

                    <div className="relative z-10 text-white">
                      <Icon 
                        size={56} 
                        strokeWidth={1.2}
                        className="drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        style={{
                          strokeDasharray: 100,
                          strokeDashoffset: 100,
                        }}
                      />
                      {/* Animated Overlay for Drawing Effect */}
                      <motion.div
                        className="absolute inset-0 text-white"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.15 + 0.5 }}
                      >
                        <motion.div
                          animate={{
                            y: [0, -12, 0],
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <Icon size={56} strokeWidth={1.2} />
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    {/* Central Glow */}
                    <div className="absolute w-24 h-24 bg-[var(--primary)]/5 blur-3xl rounded-full" />
                  </div>
                  <h3 className="text-xl font-satoshi font-medium mb-4 text-[var(--primary)]">
                    {item.title}
                  </h3>
                  <p className="text-lg md:text-xl text-white font-light leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

      {/* --- Section 4: Partnership & Foundation --- */}
      <section id="partnership" className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block font-mono text-[13px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--primary)] mb-6 border-b border-[var(--primary)]/30 pb-1">
                  {t.partnership.label}
                </span>
                <h2 className="text-[28px] md:text-[40px] font-satoshi font-medium leading-[1.2] text-white mb-8 tracking-tight">
                  {t.partnership.title1}
                  <span className="relative inline-block px-1">
                    <span className="relative z-10 text-white italic font-serif">{t.partnership.titleAlone}</span>
                    <motion.span 
                      className="absolute top-[58%] left-0 w-full h-[3px] bg-white -z-0"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "circOut" }}
                      style={{ originX: 0, translateY: "-50%" }}
                    />
                  </span>
                  {t.partnership.title2}
                  <span className="relative inline-block">
                    <span className="relative z-10 italic font-serif text-[var(--primary)] drop-shadow-[0_0_10px_rgba(251,248,80,0.3)]">
                      {t.partnership.titleTogether}
                    </span>
                  </span>
                  {t.partnership.title3}
                </h2>
                <p className="text-lg md:text-xl text-white font-light leading-relaxed mb-12 max-w-2xl">
                  {t.partnership.description.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  })}
                </p>
                
                <div className="grid grid-cols-2 gap-12 border-t border-white/5 pt-12">
                  {t.partnership.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">{stat.label}</div>
                      <div className="text-5xl font-display text-[var(--primary)] mb-1">{stat.value}<span className="text-white">{stat.unit}</span></div>
                      <div className="text-xs text-white/50 uppercase tracking-wider">{stat.desc}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <TeamFoundationVisual lang={language} />
              </motion.div>
            </div>
          </div>
        </section>

      {/* --- Section 5: Engine (Infinite Carousel) --- */}
      <section className="overflow-hidden py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex whitespace-nowrap">
            <div className="flex gap-20 animate-scroll items-center">
              {[...aiTools, ...aiTools, ...aiTools].map((tool, i) => (
                <div key={i} className="flex items-center gap-6 opacity-30 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 group">
                  <img 
                    src={`https://cdn.simpleicons.org/${tool.slug}/white`} 
                    alt={tool.name} 
                    className="h-12 w-auto brightness-200 group-hover:brightness-100 transition-all" 
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-2xl font-display font-light text-white tracking-wide">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* --- Section 6: Process --- */}
      <section id="process" className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-block font-mono text-[13px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--primary)] mb-6 border-b border-[var(--primary)]/30 pb-1">
            {t.process.label}
          </span>
          <h2 className="text-[34px] md:text-[40px] font-satoshi font-medium tracking-tight text-white">
            {t.process.title}
          </h2>
        </motion.div>
        
        <div className={isMobile ? "" : "flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6"}>
          {isMobile ? (
              <div className="relative w-full h-[320px] sm:h-[280px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={processIndex}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragStart={() => setIsProcessPaused(true)}
                    onDragEnd={(_, info) => {
                      const threshold = 50;
                      if (info.offset.x < -threshold) {
                        setProcessIndex((prev) => (prev + 1) % t.process.items.length);
                      } else if (info.offset.x > threshold) {
                        setProcessIndex((prev) => (prev - 1 + t.process.items.length) % t.process.items.length);
                      }
                      setIsProcessPaused(false);
                    }}
                    onPointerDown={() => setIsProcessPaused(true)}
                    onPointerUp={() => setIsProcessPaused(false)}
                    onPointerLeave={() => setIsProcessPaused(false)}
                    className="absolute inset-0 bg-black p-3 rounded-3xl border border-white/10 flex flex-col justify-center cursor-grab active:cursor-grabbing"
                    style={{ touchAction: "none" }}
                  >
                    <div className="flex justify-between items-start mb-8">
                      <span className="font-mono text-[var(--primary)] text-sm tracking-widest">
                        0{processIndex + 1}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                    </div>
                    <h3 className="text-xl font-satoshi font-medium mb-4 text-white">
                      {t.process.items[processIndex].title}
                    </h3>
                    <p className="text-lg text-white font-light leading-relaxed opacity-80">
                      {t.process.items[processIndex].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
                {/* Pagination Dots */}
                <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                  {t.process.items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setProcessIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === processIndex ? 'bg-[var(--primary)] w-4' : 'bg-white/20'}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              t.process.items.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: isMobile ? 0 : i * 0.1,
                    ease: "easeOut"
                  }}
                  className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-3 md:p-10 rounded-2xl w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-[var(--primary)] text-sm tracking-widest">
                      0{i + 1}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                  </div>
                  <h3 className="text-xl font-satoshi font-medium mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-lg md:text-xl text-white font-light leading-relaxed opacity-80">
                    {step.desc}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </section>

      {/* --- Section 7: Portfolio --- */}
      <section id="portfolio" className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block font-mono text-[13px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--primary)] mb-6 border-b border-[var(--primary)]/30 pb-1">
            {t.portfolio.label}
          </span>
          <h2 className="text-[34px] md:text-[40px] font-satoshi font-medium tracking-tight text-white">
            {t.portfolio.title}
          </h2>
        </motion.div>

        <PortfolioSlider lang={language} isMobile={isMobile} />
      </section>

      {/* --- Section 8: FAQ --- */}
      <section id="faq" className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block font-mono text-[13px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--primary)] mb-6 border-b border-[var(--primary)]/30 pb-1">
              {t.faq.label}
            </span>
            <h2 className="text-[34px] md:text-[40px] font-satoshi font-medium tracking-tight text-white">
              {t.faq.title}
            </h2>
          </div>
          <div className="space-y-4">
            {t.faq.items.map((faq, i) => (
              <details 
                key={i} 
                open={openFaqIndex === i}
                onToggle={(e) => {
                  if ((e.target as HTMLDetailsElement).open) {
                    setOpenFaqIndex(i);
                    if (!viewedFaqs.includes(i)) {
                      setViewedFaqs(prev => [...prev, i]);
                    }
                  } else if (openFaqIndex === i) {
                    setOpenFaqIndex(null);
                  }
                }}
                className={`group bg-zinc-900/40 border border-white/5 rounded-2xl cursor-pointer hover:border-[var(--primary)]/20 transition-colors ${viewedFaqs.includes(i) ? 'opacity-90' : ''}`}
              >
                <summary className={`flex items-center justify-between font-medium list-none transition-colors p-3 md:p-6 group-hover:text-[var(--primary)] group-open:text-[var(--primary)] ${viewedFaqs.includes(i) ? 'text-white/60' : 'text-white'}`}>
                  <div className="flex items-center gap-3">
                    {viewedFaqs.includes(i) && (
                      <div className="w-1 h-1 rounded-full bg-[var(--primary)]/40" />
                    )}
                    {faq.q}
                  </div>
                  <ChevronDown className="group-open:rotate-180 transition-transform text-[var(--primary)]" />
                </summary>
                <p 
                  onClick={() => setOpenFaqIndex(null)}
                  className="px-3 pb-3 md:px-6 md:pb-6 leading-relaxed text-white"
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  } />
))}

<Route path="/balance-pulse" element={<CaseStudyBalancePulse lang={language} isMobile={isMobile} />} />
<Route path="/ua/balance-pulse" element={<CaseStudyBalancePulse lang={language} isMobile={isMobile} />} />
<Route path="/de/balance-pulse" element={<CaseStudyBalancePulse lang={language} isMobile={isMobile} />} />

<Route path="/city-survival-kit" element={<CaseStudyCitySurvivalKit lang={language} isMobile={isMobile} />} />
<Route path="/ua/city-survival-kit" element={<CaseStudyCitySurvivalKit lang={language} isMobile={isMobile} />} />
<Route path="/de/city-survival-kit" element={<CaseStudyCitySurvivalKit lang={language} isMobile={isMobile} />} />

<Route path="/wami-vacations" element={<CaseStudyWamiVacations lang={language} isMobile={isMobile} />} />
<Route path="/ua/wami-vacations" element={<CaseStudyWamiVacations lang={language} isMobile={isMobile} />} />
<Route path="/de/wami-vacations" element={<CaseStudyWamiVacations lang={language} isMobile={isMobile} />} />

{/* Fallback for old /case/ links */}
<Route path="/case/city-survival-kit" element={<Navigate to="/city-survival-kit" replace />} />
<Route path="/case/balance-pulse" element={<Navigate to="/balance-pulse" replace />} />
<Route path="/case/wami-vacations" element={<Navigate to="/wami-vacations" replace />} />
</Routes>

<Footer t={t} setIsModalOpen={setIsModalOpen} setIsEmailSelectorOpen={setIsEmailSelectorOpen} />

      {/* --- Modal --- */}

      {/* --- Modal --- */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang={language} />
      <EmailSelectorModal isOpen={isEmailSelectorOpen} onClose={() => setIsEmailSelectorOpen(false)} lang={language} />

      {/* --- Fixed Scroll to Top Button --- */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={isMobile ? undefined : { scale: 1.1 }}
            whileTap={isMobile ? undefined : { scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[9999] w-14 h-14 bg-[var(--primary)] text-black rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(251,248,80,0.3)] hover:shadow-[0_15px_40px_rgba(251,248,80,0.5)] transition-all group"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}