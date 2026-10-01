import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function SignUpForm({ onSignUp, onGoToSignIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!name || !email || !password) {
      setErrorMessage('Please fill in your name, email and password');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignUp({
        name: name,
        email: email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        streak: 1,
        xp: 100,
        level: 'New Scholar',
        track: 'Cognitive Science & AI',
      });
    }, 350);
  };

  return (
    <div className="w-full h-full bg-[#faf7f2] text-stone-900 flex flex-col justify-between p-5 sm:p-8 lg:p-9 select-none relative overflow-hidden font-sans border-l border-stone-200">
      {/* Header */}
      <div className="relative z-10 pt-0.5">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-semibold text-stone-500">
          Registration
        </span>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold tracking-tight mt-1 text-stone-900">
          Sign Up
        </h2>
        <p className="text-[11px] sm:text-xs mt-1 font-normal leading-relaxed text-stone-600">
          Create your account to start studying with AI.
        </p>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="relative z-10 space-y-2.5 sm:space-y-3 my-auto py-1">
        {errorMessage && (
          <div className="p-2.5 rounded-xl border bg-red-50 border-red-200 text-red-700 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold tracking-wider uppercase text-stone-700">
            Full Name
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 w-4 h-4 pointer-events-none text-stone-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivers"
              className="w-full bg-white border border-stone-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold tracking-wider uppercase text-stone-700">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 w-4 h-4 pointer-events-none text-stone-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@university.edu"
              className="w-full bg-white border border-stone-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold tracking-wider uppercase text-stone-700">
            Password
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 w-4 h-4 pointer-events-none text-stone-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full bg-white border border-stone-300 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition-all shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-5 font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 bg-stone-900 hover:bg-stone-800 text-white"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Footer Switcher */}
      <div className="relative z-10 text-center pt-3 border-t border-stone-200">
        <p className="text-xs text-stone-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onGoToSignIn();
            }}
            className="font-bold hover:underline ml-1 cursor-pointer text-stone-900"
          >
            Sign In →
          </button>
        </p>
      </div>
    </div>
  );
}
