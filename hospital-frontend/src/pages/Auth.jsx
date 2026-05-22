import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const { loginUser, registerUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    let result;
    
    if (isLogin) {
      // Call your backend login API
      result = await loginUser(formData.email, formData.password);
    } else {
      // Call your backend register API
      result = await registerUser(formData.name, formData.email, formData.password);
    }

    if (result.success) {
      navigate('/dashboard'); // Go to dashboard if successful
    }
    
    setSubmitLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950">
      
      {/* LEFT SIDE - FORM */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-slate-500 mb-8">
            {isLogin ? 'Enter your credentials to access your dashboard' : 'Enter details to start your free trial'}
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Show Name field ONLY if Sign Up */}
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white" 
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white" 
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type={showPass ? "text" : "password"} 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                placeholder="Min 8 characters" 
                className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white" 
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* MAIN SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={submitLoading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center space-x-2 transition-colors disabled:opacity-70"
            >
              {submitLoading ? (
                <Loader2 size={22} className="animate-spin" /> // Spinning loader when calling API
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* TOGGLE SIGN UP / SIGN IN BUTTON */}
          <p className="mt-8 text-center text-slate-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)} 
              className="ml-2 text-blue-600 font-bold hover:underline cursor-pointer"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - VISUAL */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white text-center">
          <h1 className="text-5xl font-black mb-6">Manage Everything<br />In One Place.</h1>
          <p className="text-xl text-blue-100 max-w-md">Experience the future of hospital management with AI-powered tools.</p>
        </div>
      </div>

    </div>
  );
};

export default Auth;