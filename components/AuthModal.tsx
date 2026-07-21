'use client';

import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { X, Mail, Lock, User, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { loginWithEmail, registerWithEmail, loginWithGoogle, error, setError } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      // Firebase Auth: min. 6 znaków hasła, poprawny e-mail
      if (password.length < 6) {
        setError('Hasło musi mieć co najmniej 6 znaków.');
        return;
      }
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        if (!name.trim() || name.trim().length < 2) {
          setError('Podaj imię (min. 2 znaki).');
          return;
        }
        await registerWithEmail(email, password, name);
      }
      onClose();
    } catch {
      // Error handled by AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      // Error handled by AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md overflow-hidden bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10"
        >
          {/* Header */}
          <div className="relative px-6 py-6 border-b-2 border-black bg-[#F8F7F3] text-center">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 border border-black bg-white hover:bg-black hover:text-white text-black transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-[#1A1A1A]">
              {isLogin ? 'Witaj w BLUE.JEANS' : 'Dołącz do BLUE.JEANS'}
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-wide text-stone-500 mt-1">
              {isLogin ? 'Zaloguj się na swoje konto jeansowe' : 'Utwórz konto, aby śledzić zamówienia'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-[#FDFCFB]">
            {error && (
              <div className="flex items-start gap-2.5 p-3 bg-red-50 text-red-700 text-xs border-2 border-red-200 font-bold uppercase tracking-wider">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-black">Twoje Imię</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-4 text-black" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Np. Jarek"
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black text-xs font-bold uppercase focus:outline-hidden focus:bg-[#F8F7F3] transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-black">Adres E-mail</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-4 text-black" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="twoj@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black text-xs font-bold uppercase focus:outline-hidden focus:bg-[#F8F7F3] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-wider text-black">Hasło</label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => alert('W celu zresetowania hasła skontaktuj się ze wsparciem: 123-464-9874')}
                    className="text-[10px] text-[#E11D48] font-black uppercase tracking-wider hover:underline"
                  >
                    Zapomniałeś?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-4 text-black" />
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 znaków"
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black text-xs font-bold uppercase focus:outline-hidden focus:bg-[#F8F7F3] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all py-3.5 text-xs font-bold uppercase tracking-widest cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isLogin ? (
                'Zaloguj się →'
              ) : (
                'Utwórz konto →'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative px-6 py-2 text-center bg-[#FDFCFB]">
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 border-t-2 border-black" />
            <span className="relative bg-[#FDFCFB] px-3 text-[9px] uppercase font-black text-stone-500 tracking-widest">
              LUB METODA SOCIAL
            </span>
          </div>

          {/* Google & Switch Mode */}
          <div className="p-6 pt-2 space-y-4 bg-[#FDFCFB]">
            <button
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-black bg-white hover:bg-[#F8F7F3] text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Zaloguj przez Google</span>
            </button>

            <div className="text-center text-[11px] text-stone-600 pt-2 font-bold uppercase tracking-wider">
              {isLogin ? 'Nie masz konta?' : 'Masz już konto?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                type="button"
                className="text-[#E11D48] font-black hover:underline ml-1.5 focus:outline-hidden cursor-pointer"
              >
                {isLogin ? 'Zarejestruj się' : 'Zaloguj się'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
