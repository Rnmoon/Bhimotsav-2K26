'use client'

import { useState } from 'react'
import { identifyUser } from '@/app/actions'
import { ArrowRight, Copy, Check, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function IdentifyForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    
    try {
      const result = await identifyUser(formData)
      
      if (result.error) {
        setError(result.error)
      } else if (result.user_token) {
        setToken(result.user_token as string)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (token) {
      navigator.clipboard.writeText(token)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (token) {
    return (
      <div className="space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl text-center">
          <div className="w-12 h-12 bg-green-500 text-background rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={24} strokeWidth={3} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Login Successful!</h2>
          <p className="text-gray-400 text-sm mb-6">Your unique login password has been secured.</p>
          
          <div className="relative group">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">Your Unique Password</label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-4 rounded-xl font-mono text-sm text-accent-blue break-all">
              <span className="flex-1 text-left">{token}</span>
              <button 
                onClick={copyToClipboard}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                title="Copy to clipboard"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>
          
          <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">
            Please save this password. You can use it to log in from other devices with your mobile number.
          </p>
        </div>

        <button
          onClick={() => router.push('/events/games')}
          className="w-full flex justify-center items-center gap-3 py-4 px-4 border text-base font-bold text-background bg-accent-blue border-accent-blue hover:bg-blue-500 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all uppercase tracking-widest"
        >
          Continue to Events <ArrowRight size={20} />
        </button>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-6 relative z-10">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-sm font-medium">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-bold tracking-wide text-gray-300 mb-2 uppercase">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          required
          disabled={loading}
          className="mt-1 block w-full bg-white/5 border border-white/10 text-white rounded-xl focus:ring-accent-blue focus:border-accent-blue p-4 outline-none transition-all placeholder-gray-600 font-medium disabled:opacity-50"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-bold tracking-wide text-gray-300 mb-2 uppercase">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          autoComplete="tel"
          pattern="[0-9]{10}"
          required
          title="10 digit mobile number"
          disabled={loading}
          className="mt-1 block w-full bg-white/5 border border-white/10 text-white rounded-xl focus:ring-accent-blue focus:border-accent-blue p-4 outline-none transition-all placeholder-gray-600 font-medium disabled:opacity-50"
          placeholder="9876543210"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center gap-3 py-4 px-4 border text-base font-bold text-background bg-accent-blue border-accent-blue hover:bg-blue-500 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all uppercase tracking-widest mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          <>Log In <ArrowRight size={20} /></>
        )}
      </button>
    </form>
  )
}
