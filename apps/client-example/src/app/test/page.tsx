'use client'

import { useEffect, useState } from 'react'

export default function TestPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log('Test page mounted')
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Test Page</h1>
        <p>This is a simple test without any Wagmi hooks.</p>
        <p className="text-green-500">✓ Page mounted successfully</p>
      </div>
    </main>
  )
}

