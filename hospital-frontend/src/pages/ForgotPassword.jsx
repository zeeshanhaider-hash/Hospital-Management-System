import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const ForgotPassword = () => {
  const { forgotPassword } = React.useContext(UserContext);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await forgotPassword(email);
    setLoading(false);
    if (result.success) {
      setSent(true);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <Link to="/login" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6">
          <FiArrowLeft />
          <span>Back to Login</span>
        </Link>

        <div className="text-center mb-8">
          <span className="text-5xl">🔐</span>
          <h2 className="mt-4 text-3xl font-bold text-gray-800">Forgot Password</h2>
          <p className="mt-2 text-gray-600">Enter your email to reset password</p>
        </div>

        {sent ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <span className="text-5xl">📧</span>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Email Sent!</h3>
            <p className="mt-2 text-gray-600">
              Check your inbox and follow the instructions to reset your password.
            </p>
            <Link
              to="/login"
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;