'use client'

export default function DebugPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Debug Page</h1>
        <p>Testing Wagmi Provider...</p>
        <p className="text-sm text-muted-foreground">
          This page should render without errors if providers are working.
        </p>
      </div>
    </main>
  )
}

