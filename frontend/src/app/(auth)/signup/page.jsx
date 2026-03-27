'use client'
import { useState } from 'react'
import Link from 'next/link'
import { APP, SEGMENTS } from '@/config/theme'

export default function SignupPage() {
  const [step, setStep] = useState(1) // 1 = details, 2 = segment select
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    segment: '',
  })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  function handleStep1(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setStep(2)
  }

  async function handleSubmit(selectedSegment) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, segment: selectedSegment }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Signup failed')
      localStorage.setItem('token', data.token)
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err.message)
      setStep(1)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0A0F1E',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid bg */}
      <div className="bg-grid" style={{ position: 'absolute', inset: 0 }} />

      {/* Glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translateX(-50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,86,219,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #1A56DB 0%, #6366F1 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 800, color: 'white',
            }}>R</div>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#F8FAFC' }}>
              {APP.name}
            </span>
          </Link>
        </div>

        {/* Card */}
        <div style={{
          background: '#111827',
          border: '1px solid #1E293B',
          borderRadius: 20, padding: 32,
        }}>

          {/* Step 1 — Account Details */}
          {step === 1 && (
            <>
              <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: '#F8FAFC', marginBottom: 6 }}>
                  Create your account
                </h1>
                <p style={{ color: '#94A3B8', fontSize: 14 }}>
                  Start free — 3 reels on us, no card needed
                </p>
              </div>

              {/* Free badge */}
              <div style={{
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: 10, padding: '10px 14px',
                display: 'flex', alignItems: 'center', gap: 10,
                marginBottom: 24,
              }}>
                <span style={{ fontSize: 16 }}>⚡</span>
                <span style={{ fontSize: 13, color: '#34D399', fontWeight: 600 }}>
                  3 free reels included — no credit card required
                </span>
              </div>

              <form onSubmit={handleStep1}>
                {/* Name */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#94A3B8',
                    display: 'block', marginBottom: 6 }}>
                    Full Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Om Parkhi"
                    value={form.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                {/* Email */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#94A3B8',
                    display: 'block', marginBottom: 6 }}>
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="om@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                {/* Password */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#94A3B8',
                    display: 'block', marginBottom: 6 }}>
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Min 6 characters"
                    value={form.password}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div style={{
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: 10, padding: '10px 14px',
                    marginBottom: 16,
                  }}>
                    <span style={{ fontSize: 13, color: '#F87171' }}>⚠ {error}</span>
                  </div>
                )}

                <button type="submit" className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: 15 }}>
                  Continue →
                </button>
              </form>
            </>
          )}

          {/* Step 2 — Segment Selection */}
          {step === 2 && (
            <>
              <button onClick={() => setStep(1)} style={{
                background: 'none', border: 'none', color: '#94A3B8',
                fontSize: 13, cursor: 'pointer', marginBottom: 20,
                display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: 'inherit', padding: 0,
              }}>
                ← Back
              </button>

              <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: '#F8FAFC', marginBottom: 6 }}>
                  How will you use it?
                </h1>
                <p style={{ color: '#94A3B8', fontSize: 14 }}>
                  We'll customize your experience based on your needs
                </p>
              </div>

              {/* Segment Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 16 }}>

                {/* SMB Card */}
                <button
                  onClick={() => handleSubmit('smb')}
                  disabled={loading}
                  style={{
                    background: 'rgba(26,86,219,0.06)',
                    border: '1px solid rgba(26,86,219,0.2)',
                    borderRadius: 14, padding: '20px',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 200ms', fontFamily: 'inherit',
                    opacity: loading ? 0.6 : 1,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#1A56DB'
                    e.currentTarget.style.background = 'rgba(26,86,219,0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(26,86,219,0.2)'
                    e.currentTarget.style.background = 'rgba(26,86,219,0.06)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: 'rgba(26,86,219,0.15)',
                      border: '1px solid rgba(26,86,219,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20,
                    }}>🏪</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#F8FAFC', marginBottom: 3 }}>
                        Business Owner
                      </div>
                      <div style={{ fontSize: 13, color: '#94A3B8' }}>
                        Salon, restaurant, clinic, coaching, retail
                      </div>
                    </div>
                    <div style={{ marginLeft: 'auto', color: '#1A56DB', fontSize: 18 }}>→</div>
                  </div>
                </button>

                {/* Creator Card */}
                <button
                  onClick={() => handleSubmit('creator')}
                  disabled={loading}
                  style={{
                    background: 'rgba(99,102,241,0.06)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    borderRadius: 14, padding: '20px',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 200ms', fontFamily: 'inherit',
                    opacity: loading ? 0.6 : 1,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#6366F1'
                    e.currentTarget.style.background = 'rgba(99,102,241,0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'
                    e.currentTarget.style.background = 'rgba(99,102,241,0.06)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: 'rgba(99,102,241,0.15)',
                      border: '1px solid rgba(99,102,241,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20,
                    }}>🎬</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#F8FAFC', marginBottom: 3 }}>
                        Content Creator
                      </div>
                      <div style={{ fontSize: 13, color: '#94A3B8' }}>
                        YouTuber, coach, consultant, founder
                      </div>
                    </div>
                    <div style={{ marginLeft: 'auto', color: '#6366F1', fontSize: 18 }}>→</div>
                  </div>
                </button>
              </div>

              {loading && (
                <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: 13, marginTop: 12 }}>
                  Setting up your account...
                </div>
              )}

              {error && (
                <div style={{
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  borderRadius: 10, padding: '10px 14px', marginTop: 12,
                }}>
                  <span style={{ fontSize: 13, color: '#F87171' }}>⚠ {error}</span>
                </div>
              )}
            </>
          )}

          {/* Progress dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
            {[1, 2].map(s => (
              <div key={s} style={{
                width: s === step ? 20 : 6,
                height: 6, borderRadius: 9999,
                background: s === step ? '#1A56DB' : '#1E293B',
                transition: 'all 300ms',
              }} />
            ))}
          </div>
        </div>

        {/* Login link */}
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#64748B' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#60A5FA', fontWeight: 600 }}>
            Log in →
          </Link>
        </p>
      </div>
    </div>
  )
}