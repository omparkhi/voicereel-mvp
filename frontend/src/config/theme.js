// Central config — import karo har jagah
// Kabhi bhi hardcode mat karo colors

export const SEGMENTS = {
  smb: {
    id: 'smb',
    label: 'SMB Mode',
    sublabel: 'Business ke liye',
    icon: 'Store',
    plans: ['starter', 'business', 'business_pro'],
    features: {
      avatar: false,
      voiceClone: false,
      festivalCal: true,
      beforeAfter: true,
      reviewConverter: true,
      brandKit: true,
    },
  },
  creator: {
    id: 'creator',
    label: 'Creator Mode',
    sublabel: 'Creators ke liye',
    icon: 'Mic',
    plans: ['creator', 'creator_pro', 'agency'],
    features: {
      avatar: true,
      voiceClone: true,
      festivalCal: false,
      beforeAfter: false,
      reviewConverter: false,
      brandKit: true,
    },
  },
}

export const PLANS = {
  free:         { id: 'free',         name: 'Free',         price: 0,    credits: 3,  segment: 'both' },
  starter:      { id: 'starter',      name: 'Starter',      price: 499,  credits: 6,  segment: 'smb', popular: false },
  business:     { id: 'business',     name: 'Business',     price: 999,  credits: 15, segment: 'smb', popular: true  },
  business_pro: { id: 'business_pro', name: 'Business Pro', price: 1499, credits: 30, segment: 'smb', popular: false },
  creator:      { id: 'creator',      name: 'Creator',      price: 1999, credits: 10, segment: 'creator', popular: false },
  creator_pro:  { id: 'creator_pro',  name: 'Creator Pro',  price: 3499, credits: 25, segment: 'creator', popular: true  },
  agency:       { id: 'agency',       name: 'Agency',       price: 5999, credits: 60, segment: 'both', popular: false },
}

export const LANGUAGES = [
  { id: 'hindi',   label: 'Hindi',   flag: '🇮🇳', sarvamCode: 'hi-IN', available: true },
  { id: 'marathi', label: 'Marathi', flag: '🇮🇳', sarvamCode: 'mr-IN', available: true },
  { id: 'tamil',   label: 'Tamil',   flag: '🇮🇳', sarvamCode: 'ta-IN', available: true },
  { id: 'telugu',  label: 'Telugu',  flag: '🇮🇳', sarvamCode: 'te-IN', available: true },
  { id: 'english', label: 'English', flag: '🇬🇧', sarvamCode: 'en-IN', available: true },
]

export const CREDITS = {
  smb_30sec:      1,
  creator_30sec:  1,
  creator_60sec:  2,
  before_after:   1,
  repurpose_pack: 4,
  extra_smb:      79,
  extra_creator:  149,
  referral_bonus: 3,
  signup_free:    3,
}

export const API_ENDPOINTS = {
  signup:       '/api/auth/signup',
  login:        '/api/auth/login',
  me:           '/api/auth/me',
  uploadPhoto:  '/api/upload/photo',
  generateReel: '/api/generate/reel',
  reelStatus:   (id) => `/api/reel/${id}/status`,
  reelDownload: (id) => `/api/reel/${id}/download`,
  reels:        '/api/reels',
  createOrder:  '/api/payment/create-order',
  verifyPayment:'/api/payment/verify',
  credits:      '/api/credits',
}

export const APP = {
  name:     'Reel AI',
  tagline:  'Apna kaam bolne do',
  url:      'https://yoursite.in',
  support:  'support@yoursite.in',
}