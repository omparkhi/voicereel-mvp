import './globals.css'

export const metadata = {
  title: 'Your App — Apna kaam bolne do',
  description: "India's first AI Reel maker",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
      </head>
      <body className="bg-dark text-content antialiased">
        {children}
      </body>
    </html>
  )
}

