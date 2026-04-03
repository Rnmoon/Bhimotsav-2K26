import IdentifyForm from './IdentifyForm'
import { ArrowRight } from 'lucide-react'

export default function IdentifyPage() {
  return (
    <div className="flex items-center justify-center pt-20 px-4 min-h-[70vh]">
      <div className="max-w-md w-full p-8 md:p-10 bg-[#0a0a0a] rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
        
        {/* Abstract Glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent-blue/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center mb-10 relative z-10">
          <div className="w-16 h-16 bg-accent-blue text-background font-black text-3xl flex items-center justify-center rounded-2xl mx-auto mb-6 rotate-3">
            E
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Get Connected</h1>
          <p className="text-gray-400 font-medium">Join the frequency. Enter your details to get your unique password.</p>
        </div>

        <IdentifyForm />
        <p className="mt-8 text-xs text-center text-gray-500 font-medium relative z-10">
          By continuing, you agree to our Terms of Service and Privacy Policy. Session secured locally.
        </p>
      </div>
    </div>
  )
}
