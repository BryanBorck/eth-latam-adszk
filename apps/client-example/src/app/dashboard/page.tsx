'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/user-context'
import { useWallet } from '@/contexts/wallet-context'
import { DashboardView } from '../views/dashboard-view'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardPage() {
  const router = useRouter()
  const { isRegistered, isLoading: userLoading } = useUser()
  const { isConnected, isLoading: walletLoading } = useWallet()

  const isLoading = userLoading || walletLoading
  const hasAccess = isConnected && isRegistered

  useEffect(() => {
    // Redirect to home if requirements are not met
    if (!isLoading && !hasAccess) {
      router.push('/')
    }
  }, [isLoading, hasAccess, router])

  // Show loading while checking access
  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="w-full max-w-4xl space-y-4">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-64 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </main>
    )
  }

  // Don't render dashboard if no access
  if (!hasAccess) {
    return null
  }

  return <DashboardView />
}

