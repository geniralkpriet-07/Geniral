import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

interface ResetPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

enum ResetSteps {
  REQUEST_OTP,
  VERIFY_OTP,
  RESET_PASSWORD,
  SUCCESS
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentStep, setCurrentStep] = useState(ResetSteps.REQUEST_OTP)
  const { requestPasswordReset, verifyOTP, resetPassword } = useAuth()

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      await requestPasswordReset(email)
      setCurrentStep(ResetSteps.VERIFY_OTP)
    } catch (error: any) {
      setError(error.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      await verifyOTP(email, otp)
      setCurrentStep(ResetSteps.RESET_PASSWORD)
    } catch (error: any) {
      setError(error.message || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    // Validation
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      await resetPassword(email, otp, newPassword)
      setCurrentStep(ResetSteps.SUCCESS)
      // Clear form
      setOtp('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error: any) {
      setError(error.message || 'Password reset failed')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setError('')
    setEmail('')
    setOtp('')
    setNewPassword('')
    setConfirmPassword('')
    setCurrentStep(ResetSteps.REQUEST_OTP)
    onClose()
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case ResetSteps.REQUEST_OTP:
        return (
          <form onSubmit={handleRequestOTP} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-md font-medium transition-colors ${loading ? 'bg-[#8080ff]/20 cursor-not-allowed' : 'bg-[#8080ff]/30 hover:bg-[#8080ff]/40'}`}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </form>
        )
      
      case ResetSteps.VERIFY_OTP:
        return (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <p className="text-sm text-white/70 mb-4">
              We've sent a verification code to <span className="text-purple-400">{email}</span>. 
              Please check your email and enter the code below.
            </p>
            
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-white/80 mb-2">
                Verification Code (OTP)
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
            </div>

            <div className="pt-2 flex space-x-3">
              <button
                type="button"
                onClick={() => setCurrentStep(ResetSteps.REQUEST_OTP)}
                className="w-1/2 py-2 rounded-md font-medium transition-colors bg-white/10 hover:bg-white/20"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className={`w-1/2 py-2 rounded-md font-medium transition-colors ${loading || otp.length !== 6 ? 'bg-[#8080ff]/20 cursor-not-allowed' : 'bg-[#8080ff]/30 hover:bg-[#8080ff]/40'}`}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        )
      
      case ResetSteps.RESET_PASSWORD:
        return (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-white/80 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                placeholder="Enter new password"
                minLength={6}
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                placeholder="Confirm new password"
                minLength={6}
              />
            </div>

            <div className="pt-2 flex space-x-3">
              <button
                type="button"
                onClick={() => setCurrentStep(ResetSteps.VERIFY_OTP)}
                className="w-1/2 py-2 rounded-md font-medium transition-colors bg-white/10 hover:bg-white/20"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`w-1/2 py-2 rounded-md font-medium transition-colors ${loading ? 'bg-[#8080ff]/20 cursor-not-allowed' : 'bg-[#8080ff]/30 hover:bg-[#8080ff]/40'}`}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )
      
      case ResetSteps.SUCCESS:
        return (
          <div className="text-center py-6">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Password Reset Successful!</h3>
            <p className="text-white/70 mb-6">
              Your password has been reset successfully. You can now log in with your new password.
            </p>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-[#8080ff]/30 hover:bg-[#8080ff]/40 text-white rounded-md font-medium transition-colors"
            >
              Back to Login
            </button>
          </div>
        )
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0a0a18]/95 backdrop-blur-xl border border-purple-500/20 rounded-lg shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              {currentStep === ResetSteps.SUCCESS ? 'Success' : 'Reset Password'}
            </h2>
            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-200 text-sm">
              {error}
            </div>
          )}
          
          {renderStepContent()}
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordModal
