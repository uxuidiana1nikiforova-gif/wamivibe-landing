/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronDown,
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Code2, 
  Layout, 
  Users, 
  ArrowRight,
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
import { translations, Language } from './translations';

// --- Types ---
interface FormData {
  name: string;
  email: string;
  message: string;
}

// --- Components ---

const CustomCursor = ({ isMobile }: { isMobile: boolean }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isMobile) return;
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, isMobile]);

  if (!isVisible || isMobile) return null;

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
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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

const VacationsDescription = ({ lang }: { lang: Language }) => {
  const t = translations[lang].portfolio.vacations;
  return (
    <div className="w-full h-auto lg:h-full bg-black rounded-[2rem] px-3 py-4 md:p-10 flex flex-col justify-start relative overflow-hidden border border-white/10 group/vacations">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--primary)]/10 blur-[100px] rounded-full transition-all duration-700 group-hover/vacations:bg-[var(--primary)]/20" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl md:text-2xl font-satoshi font-medium mb-4 text-white leading-tight">
            {t.title}
          </h3>
          <p className="text-base md:text-lg lg:text-xl text-white font-light leading-relaxed opacity-80">
            {t.desc}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const PortfolioSlider = ({ lang, isMobile }: { lang: Language; isMobile: boolean }) => {
  const t = translations[lang].portfolio;
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = [
    { 
      title: "Wami Vacations – HR Experience Layer ✨", 
      category: "HR Tech", 
      description: "", 
      id: "wami-vacations",
      color: "from-yellow-600/20 to-amber-600/20",
      accent: "#FBF850"
    }
  ];

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-white/10 rounded-[2rem] bg-white/5">
        <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
          {t.comingSoon}
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="w-full">
        {/* Grid of two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {/* Left Card: Wami Vacations Description */}
            <motion.div
              key={`${activeIndex}-0`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative h-auto lg:aspect-video rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex items-center justify-center group transition-colors"
            >
              <div className="w-full h-full">
                <VacationsDescription lang={lang} />
              </div>
            </motion.div>

            {/* Right Card: WAMIOFF Platform */}
            <motion.div
              key={`${activeIndex}-1`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: isMobile ? 0 : 0.1 }}
              className="relative h-auto lg:aspect-video rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex items-center justify-center group hover:border-[#FFD700]/30 transition-colors"
            >
              <div className="w-full h-full">
                <img 
                  src="/images/image_case1.svg" 
                  alt={t.wamioff.title} 
                  className="w-full h-auto lg:h-full lg:object-cover block"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Info Overlay on Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center px-3 py-4 md:p-6 text-center backdrop-blur-sm">
                <h4 className="text-xl font-bold text-white mb-2">{t.wamioff.title}</h4>
                <p className="text-zinc-300 text-sm mb-4">{t.wamioff.category}</p>
                <button className="px-6 py-2 bg-[#FFD700] text-black rounded-full text-sm font-bold whitespace-nowrap">{t.viewCase}</button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const BorderBeam = ({ delay = 0, duration = 8 }: { delay?: number; duration?: number }) => {
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
          width: "80px",
          height: "2px",
          background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
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
          backgroundColor: "var(--primary)",
          boxShadow: "0 0 10px 2px var(--primary)",
          offsetPath: "rect(0% 100% 100% 0% round 16px)",
          zIndex: 2
        }}
      />
    </div>
  );
};

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/ua')) return 'ua';
    if (path.startsWith('/de')) return 'de';
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'ua' || saved === 'de') ? saved as Language : 'en';
  });
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
  const opacityParallax = useTransform(scrollY, [0, 300], [1, 0]);

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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
      <CustomCursor isMobile={isMobile} />
      {/* Global Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none -z-10" />

      {/* --- Header --- */}
      <header className="fixed top-6 left-0 right-0 z-40 px-4 md:px-6 transition-all duration-300">
        <div className={`max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between rounded-xl transition-all duration-300 ${scrolled ? 'bg-zinc-900/60 backdrop-blur-lg shadow-lg py-3 md:py-4' : 'bg-zinc-900/20 backdrop-blur-md py-4 md:py-6'}`}>
          {/* Left: Logo */}
          <a 
            href="#home" 
            className="flex-shrink-0 flex items-center gap-2 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <img 
              src="/images/logo_animated.svg" 
              alt="WAMI Logo" 
              className="w-12 h-12 md:w-16 lg:w-20 object-contain transition-transform"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Center: Desktop Nav Links - Hidden on tablet/mobile */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link text-white hover:text-[var(--primary)] transition-colors duration-300 font-light whitespace-nowrap">{link.label}</a>
            ))}
          </nav>

          {/* Right: Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-zinc-900/40 border border-white/10 rounded-xl p-1 mr-2">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-all ${language === 'en' ? 'bg-white/10 text-[var(--primary)]' : 'text-white/40 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('de')}
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-all ${language === 'de' ? 'bg-white/10 text-[var(--primary)]' : 'text-white/40 hover:text-white'}`}
              >
                DE
              </button>
              <button 
                onClick={() => setLanguage('ua')}
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
                    href={link.href} 
                    className="text-base font-light text-white/70 hover:text-[var(--primary)] hover:translate-x-1 transition-all"
                    onClick={() => setIsMenuOpen(false)}
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

      {/* --- Hero Section --- */}
      <div className="px-4 md:px-6 relative">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[var(--primary)]/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[var(--primary)]/5 blur-[80px] rounded-full -z-10" />
        
        {/* Engineering Grid background */}
        <EngineeringGrid />
        
        <section id="home" className="pt-32 md:pt-64 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center relative">
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
      <div className="px-4 md:px-6">
        <section id="benefits" className="py-20 md:py-32 max-w-7xl mx-auto">
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

          <div className="flex flex-wrap justify-center gap-6">
            {t.benefits.items.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: isMobile ? 0 : i * 0.1 }}
                className="group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 px-3 py-4 md:p-6 rounded-2xl transition-all duration-500 flex flex-col h-full w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
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
      </div>

      {/* --- Section 2: Synergy --- */}
      <div className="px-4 md:px-6">
        <section id="expertise" className="py-20 md:py-32 max-w-7xl mx-auto">
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

          <div className="flex flex-wrap justify-center gap-6 w-full">
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
                  className="relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-3 md:p-10 min-h-[300px] flex flex-col justify-center rounded-2xl transition-all duration-500 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
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
      </div>

      {/* --- Section 3: Target --- */}
      <div className="px-4 md:px-6">
        <section id="target" className="py-20 md:py-32 max-w-7xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className={`bg-zinc-900/40 backdrop-blur-sm border border-white/5 px-3 py-4 md:px-5 md:py-8 rounded-2xl transition-all duration-500 flex flex-col h-full ${staggers[i]} ${mdStaggers[i]}`}
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
      </div>

      {/* --- Section 4: Partnership & Foundation --- */}
      <div className="px-4 md:px-6">
        <section id="partnership" className="py-20 md:py-32 max-w-7xl mx-auto">
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
      </div>

      {/* --- Section 5: Engine (Infinite Carousel) --- */}
      <div className="px-4 md:px-6">
        <section className="overflow-hidden py-20 md:py-32 max-w-7xl mx-auto">
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
      </div>

      {/* --- Section 6: Process --- */}
      <div className="px-4 md:px-6">
        <section id="process" className="py-20 md:py-32 max-w-7xl mx-auto">
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
          
          <div className={isMobile ? "" : "grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden"}>
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
                  className="bg-black p-3 md:p-10"
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
      </div>

      {/* --- Section 7: Portfolio --- */}
      <div className="px-4 md:px-6">
        <section id="portfolio" className="py-20 md:py-32 max-w-7xl mx-auto overflow-hidden">
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
      </div>

      {/* --- Section 8: FAQ --- */}
      <div className="px-4 md:px-6">
        <section id="faq" className="py-20 md:py-32 max-w-7xl mx-auto">
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
                  className={`group bg-zinc-900/40 border border-white/5 rounded-2xl p-3 md:p-6 cursor-pointer hover:border-[var(--primary)]/20 transition-colors ${viewedFaqs.includes(i) ? 'opacity-90' : ''}`}
                >
                  <summary className={`flex items-center justify-between font-medium list-none transition-colors group-hover:text-[var(--primary)] group-open:text-[var(--primary)] ${viewedFaqs.includes(i) ? 'text-white/60' : 'text-white'}`}>
                    <div className="flex items-center gap-3">
                      {viewedFaqs.includes(i) && (
                        <div className="w-1 h-1 rounded-full bg-[var(--primary)]/40" />
                      )}
                      {faq.q}
                    </div>
                    <ChevronDown className="group-open:rotate-180 transition-transform text-[var(--primary)]" />
                  </summary>
                  <p className="mt-4 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* --- New Footer / CTA Section --- */}
      <section id="contact" className="relative pt-24 pb-0 px-0 max-w-none overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12 text-center mb-20">
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
        <div className="max-w-5xl mx-auto px-4 md:px-6 mb-20">
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center gap-6 mb-12">
          <p className="text-white text-xs text-center max-w-2xl">
            {t.footer.copyright}
          </p>
        </div>

        {/* Massive Text */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full select-none pointer-events-none pb-12">
          <h1 className="flex justify-between w-full font-satoshi font-medium leading-none uppercase text-[10vw] lg:text-[9.5vw]">
            {"WAMISOFTWARE".split("").map((char, i) => (
              <span key={i} className={i < 4 ? "text-[var(--primary)]" : "text-white"}>
                {char}
              </span>
            ))}
          </h1>
        </div>
      </section>

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