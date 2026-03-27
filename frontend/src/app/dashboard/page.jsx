// src/app/dashboard/page.jsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { APP, CREDITS } from '@/config/theme'

// ── SIDEBAR ──────────────────────────────────────────────────
function Sidebar({ user }) {
  const navItems = [
    { icon: '⊞', label: 'Dashboard', href: '/dashboard', active: true },
    { icon: '✦', label: 'Create Reel', href: '/dashboard/generate', active: false },
    { icon: '▣', label: 'My Reels', href: '/dashboard/reels', active: false },
    { icon: '◈', label: 'Credits', href: '/dashboard/credits', active: false },
    { icon: '◎', label: 'Settings', href: '/dashboard/settings', active: false },
  ]

  return (
    <aside style={{
      width: 240, minHeight: '100vh', flexShrink: 0,
      background: '#0D1117',
      borderRight: '1px solid #1E293B',
      display: 'flex', flexDirection: 'column',
      padding: '20px 12px',
      position: 'sticky', top: 0, height: '100vh',
    }}>
      {/* Logo */}
      <Link href="/" style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 12px', marginBottom: 28,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #1A56DB 0%, #6366F1 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 800, color: 'white', flexShrink: 0,
        }}>R</div>
        <span style={{ fontWeight: 800, fontSize: 16, color: '#F8FAFC' }}>
          {APP.name}
        </span>
      </Link>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map(item => (
          <Link key={item.href} href={item.href} className={`nav-item ${item.active ? 'active' : ''}`}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Credits badge */}
      <div style={{
        background: 'rgba(245,158,11,0.08)',
        border: '1px solid rgba(245,158,11,0.2)',
        borderRadius: 12, padding: '12px 14px', marginBottom: 12,
      }}>
        <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600,
          letterSpacing: '0.08em', marginBottom: 6 }}>
          CREDITS REMAINING
        </div>
        <div style={{ display: 'flex', alignItems: 'center',
          justifyContent: 'space-between' }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: '#F59E0B' }}>
            {user?.credits ?? 0}
          </span>
          <Link href="/dashboard/credits">
            <button style={{
              background: 'rgba(245,158,11,0.15)',
              border: '1px solid rgba(245,158,11,0.3)',
              color: '#F59E0B', fontSize: 11, fontWeight: 700,
              padding: '4px 10px', borderRadius: 6, cursor: 'pointer',
              fontFamily: 'inherit',
            }}>
              Top Up
            </button>
          </Link>
        </div>
        {/* Credit bar */}
        <div style={{
          height: 4, background: '#1E293B', borderRadius: 9999, marginTop: 10,
        }}>
          <div style={{
            height: '100%', borderRadius: 9999,
            background: 'linear-gradient(90deg, #F59E0B, #D97706)',
            width: `${Math.min(((user?.credits ?? 0) / 15) * 100, 100)}%`,
            transition: 'width 500ms',
          }} />
        </div>
      </div>

      {/* User */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 12px',
        borderTop: '1px solid #1E293B', marginTop: 4,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #1A56DB, #6366F1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: 'white',
        }}>
          {user?.name?.[0]?.toUpperCase() ?? 'U'}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#F8FAFC',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.name ?? 'User'}
          </div>
          <div style={{ fontSize: 11, color: '#64748B',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.email ?? ''}
          </div>
        </div>
      </div>
    </aside>
  )
}

// ── TOPBAR ───────────────────────────────────────────────────
function Topbar({ user }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div style={{
      height: 64, borderBottom: '1px solid #1E293B',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      background: '#0A0F1E',
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#F8FAFC' }}>
          {greeting}, {user?.name?.split(' ')[0] ?? 'there'}!
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="credit-badge">
          ⚡ {user?.credits ?? 0} credits
        </div>
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1A56DB, #6366F1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, color: 'white', cursor: 'pointer',
        }}>
          {user?.name?.[0]?.toUpperCase() ?? 'U'}
        </div>
      </div>
    </div>
  )
}

// ── STAT CARD ────────────────────────────────────────────────
function StatCard({ label, value, sub, color = '#1A56DB' }) {
  return (
    <div style={{
      background: '#111827', border: '1px solid #1E293B',
      borderRadius: 14, padding: '20px 22px',
    }}>
      <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600,
        letterSpacing: '0.07em', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color, marginBottom: 4 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 12, color: '#64748B' }}>{sub}</div>}
    </div>
  )
}

// ── REEL CARD ────────────────────────────────────────────────
function ReelCard({ reel }) {
  const statusMap = {
    done:       { label: 'Done',       className: 'status-done' },
    processing: { label: 'Processing', className: 'status-processing' },
    failed:     { label: 'Failed',     className: 'status-failed' },
    pending:    { label: 'Pending',    className: 'status-pending' },
  }
  const status = statusMap[reel.status] ?? statusMap.pending

  return (
    <div style={{
      background: '#111827', border: '1px solid #1E293B',
      borderRadius: 14, overflow: 'hidden',
      transition: 'all 200ms', cursor: 'pointer',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#1A56DB'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#1E293B'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Thumbnail */}
      <div style={{
        aspectRatio: '16/9', background: '#0F172A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {reel.outputVideoUrl ? (
          <video src={reel.outputVideoUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ fontSize: 32, opacity: 0.3 }}>🎬</div>
        )}
        {/* Status overlay */}
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <span className={status.className}>{status.label}</span>
        </div>
        {/* Mode badge */}
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <span style={{
            background: reel.mode === 'creator'
              ? 'rgba(99,102,241,0.8)' : 'rgba(26,86,219,0.8)',
            color: 'white', fontSize: 10, fontWeight: 700,
            padding: '3px 8px', borderRadius: 6,
            backdropFilter: 'blur(4px)',
          }}>
            {reel.mode === 'creator' ? 'CREATOR' : 'SMB'}
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#F8FAFC',
          marginBottom: 4, overflow: 'hidden',
          textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {reel.topic ?? 'Untitled Reel'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center',
          justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: '#64748B' }}>
            {reel.language ?? 'Hindi'}
          </span>
          <span style={{ fontSize: 11, color: '#64748B' }}>
            {new Date(reel.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'short'
            })}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── EMPTY STATE ──────────────────────────────────────────────
function EmptyReels() {
  return (
    <div style={{
      gridColumn: '1 / -1', textAlign: 'center',
      padding: '60px 20px',
      background: '#111827', border: '1px dashed #1E293B',
      borderRadius: 16,
    }}>
      <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.4 }}>🎬</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#F8FAFC', marginBottom: 8 }}>
        No reels yet
      </div>
      <div style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>
        Create your first AI reel in under 2 minutes
      </div>
      <Link href="/dashboard/generate">
        <button className="btn-primary">
          ✦ Create First Reel
        </button>
      </Link>
    </div>
  )
}

// ── SKELETON ─────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{ background: '#111827', border: '1px solid #1E293B', borderRadius: 14, overflow: 'hidden' }}>
      <div className="skeleton" style={{ aspectRatio: '16/9', borderRadius: 0 }} />
      <div style={{ padding: '14px 16px' }}>
        <div className="skeleton" style={{ height: 14, width: '70%', marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 11, width: '40%' }} />
      </div>
    </div>
  )
}

// ── MODE SELECTOR ────────────────────────────────────────────
function ModeCard({ mode, selected, onClick }) {
  const isCreator = mode === 'creator'
  const color = isCreator ? '#6366F1' : '#1A56DB'

  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, background: selected
          ? `rgba(${isCreator ? '99,102,241' : '26,86,219'},0.1)`
          : '#0F172A',
        border: selected
          ? `2px solid ${color}`
          : '1px solid #1E293B',
        borderRadius: 14, padding: '18px 20px',
        cursor: 'pointer', textAlign: 'left',
        transition: 'all 200ms', fontFamily: 'inherit',
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 8 }}>
        {isCreator ? '🎬' : '🏪'}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC', marginBottom: 4 }}>
        {isCreator ? 'Creator Mode' : 'SMB Mode'}
      </div>
      <div style={{ fontSize: 12, color: '#64748B' }}>
        {isCreator ? 'Talking avatar + voice clone' : 'Business content + templates'}
      </div>
      {selected && (
        <div style={{
          marginTop: 10, fontSize: 11, fontWeight: 700,
          color, display: 'flex', alignItems: 'center', gap: 4,
        }}>
          ✓ Selected
        </div>
      )}
    </button>
  )
}

// ── MAIN DASHBOARD ───────────────────────────────────────────
export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [reels, setReels] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMode, setSelectedMode] = useState('smb')

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const token = localStorage.getItem('token')
//         if (!token) { window.location.href = '/login'; return }

//         const [userRes, reelsRes] = await Promise.all([
//           fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reels`, {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//         ])

//         if (!userRes.ok) { window.location.href = '/login'; return }

//         const userData = await userRes.json()
//         const reelsData = reelsRes.ok ? await reelsRes.json() : []

//         setUser(userData.user)
//         setReels(reelsData.reels ?? [])
//         setSelectedMode(userData.user?.segment ?? 'smb')
//       } catch {
//         window.location.href = '/login'
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchData()
//   }, [])

  const doneReels = reels.filter(r => r.status === 'done').length
  const processingReels = reels.filter(r => r.status === 'processing').length

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0F1E' }}>
      <Sidebar user={user} />

      <div style={{ flex: 1, overflow: 'auto' }}>
        <Topbar user={user} />

        <main style={{ padding: '28px 28px 60px' }}>

          {/* Stats row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 16, marginBottom: 32,
          }}>
            <StatCard
              label="CREDITS LEFT"
              value={loading ? '—' : user?.credits ?? 0}
              sub="Reels remaining"
              color="#F59E0B"
            />
            <StatCard
              label="TOTAL REELS"
              value={loading ? '—' : reels.length}
              sub="All time"
              color="#60A5FA"
            />
            <StatCard
              label="COMPLETED"
              value={loading ? '—' : doneReels}
              sub="Successfully done"
              color="#10B981"
            />
            <StatCard
              label="IN PROGRESS"
              value={loading ? '—' : processingReels}
              sub="Being generated"
              color="#6366F1"
            />
          </div>

          {/* Create New Reel section */}
          <div style={{
            background: '#111827', border: '1px solid #1E293B',
            borderRadius: 18, padding: 24, marginBottom: 32,
          }}>
            <div style={{ marginBottom: 18 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#F8FAFC', marginBottom: 4 }}>
                Create New Reel
              </h2>
              <p style={{ fontSize: 13, color: '#64748B' }}>
                Choose your mode and start generating
              </p>
            </div>

            {/* Mode selector */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <ModeCard
                mode="smb"
                selected={selectedMode === 'smb'}
                onClick={() => setSelectedMode('smb')}
              />
              <ModeCard
                mode="creator"
                selected={selectedMode === 'creator'}
                onClick={() => setSelectedMode('creator')}
              />
            </div>

            {/* CTA */}
            <Link href={`/dashboard/generate?mode=${selectedMode}`}>
              <button className="btn-primary" style={{ fontSize: 15, padding: '12px 28px' }}>
                ✦ Start Creating →
              </button>
            </Link>

            {user?.credits === 0 && (
              <div style={{
                marginTop: 14, background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.15)',
                borderRadius: 10, padding: '10px 14px',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ fontSize: 13, color: '#F87171' }}>
                  ⚠ No credits left —{' '}
                  <Link href="/dashboard/credits"
                    style={{ color: '#60A5FA', fontWeight: 600 }}>
                    Top up here
                  </Link>
                </span>
              </div>
            )}
          </div>

          {/* Recent Reels */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: 18 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#F8FAFC' }}>
                Recent Reels
              </h2>
              {reels.length > 0 && (
                <Link href="/dashboard/reels"
                  style={{ fontSize: 13, color: '#60A5FA', fontWeight: 600 }}>
                  View all →
                </Link>
              )}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 16,
            }}>
              {loading ? (
                [1,2,3,4].map(i => <SkeletonCard key={i} />)
              ) : reels.length === 0 ? (
                <EmptyReels />
              ) : (
                reels.slice(0, 8).map(reel => (
                  <ReelCard key={reel._id} reel={reel} />
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
