'use client'
import { useState } from 'react'
import Link from 'next/link'
import { APP } from '@/config/theme'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Both fields are required')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')
      localStorage.setItem('token', data.token)
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err.message)
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
      <div className="bg-grid" style={{ position: 'absolute', inset: 0 }} />

      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translateX(-50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,86,219,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>

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
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#F8FAFC', marginBottom: 6 }}>
              Welcome back
            </h1>
            <p style={{ color: '#94A3B8', fontSize: 14 }}>
              Log in to continue creating reels
            </p>
          </div>

          <form onSubmit={handleSubmit}>
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
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#94A3B8' }}>
                  Password
                </label>
                <Link href="/forgot-password"
                  style={{ fontSize: 12, color: '#60A5FA' }}>
                  Forgot password?
                </Link>
              </div>
              <input
                name="password"
                type="password"
                placeholder="Your password"
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
                marginBottom: 16, marginTop: 12,
              }}>
                <span style={{ fontSize: 13, color: '#F87171' }}>⚠ {error}</span>
              </div>
            )}

            <div style={{ marginTop: 24 }}>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center',
                  padding: '13px', fontSize: 15 }}>
                {loading ? 'Logging in...' : 'Log In →'}
              </button>
            </div>
          </form>
        </div>

        {/* Signup link */}
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#64748B' }}>
          Don't have an account?{' '}
          <Link href="/signup" style={{ color: '#60A5FA', fontWeight: 600 }}>
            Sign up free →
          </Link>
        </p>
      </div>
    </div>
  )
}