// src/app/page.jsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { APP, LANGUAGES } from '@/config/theme'


function Navbar() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      borderBottom: '1px solid #1E293B',
      background: 'rgba(1, 5, 17, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #1A56DB 0%, #6366F1 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: 'white'
          }}>R</div>
          <span style={{ fontWeight: 700, fontSize: 18, color: '#F8FAFC' }}>
            {APP.name}
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {['Features', 'Pricing', 'Demo'].map(item => (
            <Link key={item} href={`#${item.toLowerCase()}`}
              style={{ color: '#94A3B8', fontSize: 14, fontWeight: 500,
                padding: '6px 14px', borderRadius: 8, transition: 'all 150ms' }}
              onMouseEnter={e => { e.target.style.color = '#F8FAFC'; e.target.style.background = '#1E293B' }}
              onMouseLeave={e => { e.target.style.color = '#94A3B8'; e.target.style.background = 'transparent' }}>
              {item}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/login">
            <button className="btn-ghost" style={{ fontSize: 14 }}>Login</button>
          </Link>
          <Link href="/signup">
            <button className="btn-primary" style={{ fontSize: 14, padding: '8px 20px' }}>
              Start Free
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', position: 'relative', overflow: 'hidden',
      paddingTop: 80,
    }}>
      <div className="bg-grid" style={{ position: 'absolute', inset: 0 }} />
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,86,219,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem',
        textAlign: 'center', position: 'relative', zIndex: 1 }}>

        <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}>
          <span className="badge-brand" style={{ fontSize: 13, padding: '6px 16px', borderRadius: 9999 }}>
            🇮🇳 Built for India — First AI Reel Maker in Regional Languages
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 4rem)',
          fontWeight: 500, lineHeight: 1.1,
          color: '#F8FAFC', marginBottom: 24, letterSpacing: '-0.02em'
        }}>
          Turn Any Topic Into a{' '}
          <span className="text-gradient">Professional Reel</span>{' '}
          in 2 Minutes
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: '#94A3B8', lineHeight: 1.7,
          maxWidth: 600, margin: '0 auto 40px',
        }}>
          AI generates Hindi, Marathi, Tamil and Telugu reels automatically.
          No camera. No editor. No technical skills needed.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center',
          flexWrap: 'wrap', marginBottom: 56 }}>
          <Link href="/signup">
            <button className="btn-primary" style={{ fontSize: 16, padding: '14px 32px', borderRadius: 12 }}>
              ⚡ Start Free — 3 Reels Free
            </button>
          </Link>
          <Link href="#demo">
            <button className="btn-secondary" style={{ fontSize: 16, padding: '14px 32px', borderRadius: 12 }}>
              ▶ Watch Demo
            </button>
          </Link>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          {LANGUAGES.filter(l => l.available).map(lang => (
            <span key={lang.id} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid #1E293B',
              borderRadius: 9999, padding: '6px 14px',
              fontSize: 13, color: '#94A3B8', fontWeight: 500,
            }}>
              {lang.flag} {lang.label}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, color: '#64748B', fontSize: 14 }}>
          <div style={{ display: 'flex' }}>
            {['S','R','A','P','M'].map((letter, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: '50%',
                background: `hsl(${i * 40}, 60%, 50%)`,
                border: '2px solid #0A0F1E',
                marginLeft: i > 0 ? -8 : 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 600, color: 'white',
              }}>{letter}</div>
            ))}
          </div>
          <span>500+ businesses creating reels daily</span>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      no: '01',
      title: 'Enter Your Topic',
      desc: 'Type your business topic or script in English or Hindi — AI handles the rest.',
      icon: '✍️'
    },
    {
      no: '02',
      title: 'Choose Language',
      desc: 'Select Hindi, Marathi, Tamil or Telugu. AI generates a native-sounding script.',
      icon: '🌐'
    },
    {
      no: '03',
      title: 'AI Generates Reel',
      desc: 'Script is written, Indian voice is added, and your reel is fully composed automatically.',
      icon: '🤖'
    },
    {
      no: '04',
      title: 'Download & Share',
      desc: 'Download your finished reel or share it directly to WhatsApp and Instagram.',
      icon: '📱'
    },
  ]

  return (
    <section id="features" style={{ padding: '100px 1.5rem', background: '#000000' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="badge-saffron" style={{ marginBottom: 16, display: 'inline-flex', padding: '6px 16px' }}>
            ⚡ Ready in 2 Minutes
          </span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800,
            color: '#F8FAFC', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How It Works
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem', maxWidth: 500, margin: '0 auto' }}>
            Four simple steps to a professional regional language reel
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
        }}>
          {steps.map((step, i) => (
            <div key={i} className="card-hover">
              <div style={{
                fontSize: 11, fontWeight: 700, color: '#1A56DB',
                letterSpacing: '0.1em', marginBottom: 16,
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                {step.no}
              </div>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'rgba(26,86,219,0.1)',
                border: '1px solid rgba(26,86,219,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, marginBottom: 16,
              }}>
                {step.icon}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F8FAFC', marginBottom: 8 }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Segments() {
  const segments = [
    {
      tag: 'SMB Mode',
      tagColor: '#1A56DB',
      title: 'Local Business Owners',
      subtitle: 'For salons, restaurants, clinics, coaching institutes and retail shops',
      points: [
        'Festival offer reels auto-generated',
        'Before & After transformation reels',
        'Convert Google reviews into viral reels',
        'Natural Indian voice with regional accent',
        'Direct WhatsApp share in one tap',
      ],
      price: 'Starting at ₹499/month',
      gradient: 'rgba(26,86,219,0.06)',
      border: 'rgba(26,86,219,0.2)',
    },
    {
      tag: 'Creator Mode',
      tagColor: '#6366F1',
      title: 'Content Creators',
      subtitle: 'For YouTubers, coaches, consultants and personal brand builders',
      points: [
        'Your photo becomes a talking avatar',
        'Clone your own voice for every reel',
        '500+ proven Hindi viral hooks library',
        'Repurpose YouTube videos into 5 reels',
        'Analytics to track what performs best',
      ],
      price: 'Starting at ₹1,999/month',
      gradient: 'rgba(99,102,241,0.06)',
      border: 'rgba(99,102,241,0.2)',
    },
  ]

  return (
    <section style={{ padding: '100px 1.5rem', background: '#000000' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800,
            color: '#F8FAFC', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Who Is It For?
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>
            Two modes built for two very different needs
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {segments.map((seg, i) => (
            <div key={i} style={{
              background: seg.gradient,
              border: `1px solid ${seg.border}`,
              borderRadius: 20, padding: 32,
              transition: 'all 200ms',
            }}>
              <span style={{
                background: `${seg.tagColor}25`, color: seg.tagColor,
                border: `1px solid ${seg.tagColor}40`,
                fontSize: 12, fontWeight: 600,
                padding: '4px 12px', borderRadius: 9999,
                display: 'inline-block', marginBottom: 20,
              }}>
                {seg.tag}
              </span>

              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#F8FAFC', marginBottom: 8 }}>
                {seg.title}
              </h3>
              <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 24, lineHeight: 1.6 }}>
                {seg.subtitle}
              </p>

              <div style={{ marginBottom: 28 }}>
                {seg.points.map((pt, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                      background: `${seg.tagColor}20`,
                      border: `1px solid ${seg.tagColor}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, color: seg.tagColor, marginTop: 1,
                    }}>✓</div>
                    <span style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.5 }}>{pt}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid ${seg.border}`, paddingTop: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: '#94A3B8' }}>{seg.price}</span>
                <Link href="/signup">
                  <button style={{
                    background: seg.tagColor, color: 'white', border: 'none',
                    padding: '8px 20px', borderRadius: 10, fontSize: 13,
                    fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    Try Free →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const plans = [
    {
      name: 'Starter', price: 499, credits: 6, segment: 'SMB',
      features: ['6 reels per month', 'Hindi + Marathi voice', '5 business templates', 'WhatsApp share'],
      popular: false, color: '#1A56DB',
    },
    {
      name: 'Business', price: 999, credits: 15, segment: 'SMB',
      features: ['15 reels per month', 'All 11 languages', 'Brand kit', 'Festival calendar', 'Before/After reel'],
      popular: true, color: '#1A56DB',
    },
    {
      name: 'Creator', price: 1999, credits: 10, segment: 'Creator',
      features: ['10 reels per month', 'Talking avatar', 'Voice cloning', 'Hook library', '11 Indian languages'],
      popular: false, color: '#6366F1',
    },
  ]

  return (
    <section id="pricing" style={{ padding: '100px 1.5rem', background: '#000000' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800,
            color: '#F8FAFC', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>
            Start with 3 free reels — no credit card required
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20, alignItems: 'start',
        }}>
          {plans.map((plan, i) => (
            <div key={i} style={{
              background: plan.popular ? 'rgba(26,86,219,0.06)' : '#111827',
              border: plan.popular ? '2px solid #1A56DB' : '1px solid #1E293B',
              borderRadius: 20, padding: 28, position: 'relative',
            }}>
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #1A56DB, #6366F1)',
                  color: 'white', fontSize: 11, fontWeight: 700,
                  padding: '4px 16px', borderRadius: 9999, whiteSpace: 'nowrap',
                }}>
                  ⭐ MOST POPULAR
                </div>
              )}

              <span style={{
                fontSize: 11, fontWeight: 600, color: plan.color,
                letterSpacing: '0.08em', display: 'block', marginBottom: 12,
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                {plan.segment.toUpperCase()}
              </span>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#F8FAFC', marginBottom: 4 }}>
                {plan.name}
              </h3>

              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.02em' }}>
                  ₹{plan.price.toLocaleString()}
                </span>
                <span style={{ color: '#64748B', fontSize: 14 }}>/month</span>
              </div>

              <div className="credit-badge" style={{ marginBottom: 24, fontSize: 12 }}>
                ⚡ {plan.credits} credits/month
              </div>

              <div style={{ marginBottom: 28 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ color: '#10B981', fontSize: 13, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 14, color: '#94A3B8' }}>{f}</span>
                  </div>
                ))}
              </div>

              <Link href="/signup" style={{ display: 'block' }}>
                <button style={{
                  width: '100%',
                  background: plan.popular ? 'linear-gradient(135deg, #1A56DB, #6366F1)' : 'transparent',
                  color: plan.popular ? 'white' : '#94A3B8',
                  border: plan.popular ? 'none' : '1px solid #1E293B',
                  padding: '12px', borderRadius: 12, fontSize: 14,
                  fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  {plan.popular ? 'Get Started →' : 'Start Free →'}
                </button>
              </Link>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
          {['🔒 UPI Accepted', '📄 GST Invoice', '✅ Cancel Anytime', '🆓 3 Reels Free'].map(b => (
            <span key={b} style={{ fontSize: 13, color: '#64748B' }}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #1E293B', padding: '40px 1.5rem', background: '#060B18' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'linear-gradient(135deg, #1A56DB 0%, #6366F1 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: 'white',
          }}>R</div>
          <span style={{ fontWeight: 700, color: '#F8FAFC', fontSize: 16 }}>{APP.name}</span>
        </div>
        <p style={{ color: '#64748B', fontSize: 13 }}>Powered by Sarvam AI 🇮🇳</p>
        <p style={{ color: '#475569', fontSize: 13 }}>© 2026 {APP.name}. Built in Nagpur, India.</p>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Segments />
      <Pricing />
      <Footer />
    </main>
  )
}