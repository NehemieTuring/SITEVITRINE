import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, UserCircle, Database, LayoutPanelTop } from 'lucide-react';

const ClientArea: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="container mx-auto px-4 py-24 min-h-[80vh] flex items-center justify-center">
      {!isLoggedIn ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-10 bg-white dark:bg-card border border-border rounded-[3rem] shadow-2xl space-y-8"
        >
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-serif font-black tracking-tighter text-gradient leading-tight">Member Portal</h2>
            <p className="text-muted-foreground">Access your creative projects and invoices.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-6">
            <div className="space-y-2">
               <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center space-x-2">
                  <User size={14} /> <span>Email</span>
               </label>
               <input 
                 type="email" 
                 placeholder="your@email.com" 
                 className="w-full p-4 bg-muted/40 border-transparent rounded-2xl focus:outline-none focus:border-accent transition-all"
               />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center space-x-2">
                  <Lock size={14} /> <span>Password</span>
               </label>
               <input 
                 type="password" 
                 placeholder="••••••••" 
                 className="w-full p-4 bg-muted/40 border-transparent rounded-2xl focus:outline-none focus:border-accent transition-all"
               />
            </div>
            <button className="w-full py-5 bg-brand text-white font-black rounded-2xl hover:bg-accent hover:text-brand transition-all shadow-xl hover:shadow-accent/20 flex items-center justify-center space-x-3">
               <span>Sign In</span>
               <ArrowRight size={20} />
            </button>
          </form>

          <div className="text-center text-sm text-muted-foreground underline cursor-pointer hover:text-accent">
             Forgot password?
          </div>
        </motion.div>
      ) : (
        <div className="w-full max-w-5xl space-y-12">
            <div className="flex justify-between items-center mb-12">
               <h1 className="text-4xl font-serif font-bold">Welcome, Jean DuPont</h1>
               <button 
                 onClick={() => setIsLoggedIn(false)}
                 className="px-6 py-2 bg-muted text-foreground rounded-full hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
               >
                 Logout
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { title: 'Active Projects', icon: <LayoutPanelTop />, count: 3, color: 'bg-blue-500' },
                 { title: 'Invoices', icon: <Database />, count: 12, color: 'bg-purple-500' },
                 { title: 'Assets', icon: <UserCircle />, count: 45, color: 'bg-amber-500' },
               ].map((card, i) => (
                 <div key={i} className="p-8 bg-card border border-border rounded-[2.5rem] shadow-lg flex flex-col items-center">
                    <div className={`w-16 h-16 ${card.color} text-white rounded-2xl flex items-center justify-center mb-6`}>
                       {React.cloneElement(card.icon as any, { size: 32 })}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{card.title}</h3>
                    <div className="text-3xl font-black text-accent">{card.count}</div>
                 </div>
               ))}
            </div>

            <div className="p-12 bg-muted/30 border border-white/5 rounded-[3rem] text-center space-y-6">
                <h3 className="text-2xl font-serif font-bold">Your Latest Assets</h3>
                <div className="h-40 flex items-center justify-center text-muted-foreground italic border-2 border-dashed border-white/10 rounded-3xl">
                   No files uploaded in the last 7 days.
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ClientArea;
