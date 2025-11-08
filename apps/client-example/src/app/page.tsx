'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { UserCircle, CheckCircle, Wallet, Copy, LogOut } from 'lucide-react'
import { useUser } from '@/contexts/user-context'
import { useWallet } from '@/contexts/wallet-context'
import { useState } from 'react'

export default function Home() {
  const { userData, isRegistered, isLoading: userLoading } = useUser()
  const { walletData, isConnected, isLoading: walletLoading, connectWallet, disconnectWallet } = useWallet()
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = () => {
    if (walletData?.address) {
      navigator.clipboard.writeText(walletData.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-2xl space-y-6 md:space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">ADSZK Recomendations</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Privacy-Preserving Encryption Platform
          </p>
        </div>

        {/* Wallet Connection Status */}
        {walletLoading ? (
          <div className="bg-card border border-border rounded-lg p-4 md:p-6">
            <div className="flex items-start gap-3">
              <Skeleton className="w-5 h-5 rounded-full mt-0.5 flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-1/3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          </div>
        ) : isConnected && walletData ? (
          <div className="bg-card border border-border rounded-lg p-4 md:p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-2">Wallet Connected</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <p className="font-mono break-all">{walletData.address}</p>
                    <button
                      onClick={handleCopyAddress}
                      className="p-1 hover:bg-accent rounded transition-colors flex-shrink-0"
                      title="Copy address"
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p>
                    <span className="font-medium">Balance:</span> {walletData.balance} ETH
                  </p>
                  <p>
                    <span className="font-medium">Network:</span> {walletData.network}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={disconnectWallet}
                  className="mt-3 w-full sm:w-auto"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg p-4 md:p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Connect Your Wallet</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Connect your wallet to access the platform
                </p>
                <Button
                  onClick={connectWallet}
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* User Registration Status */}
        {userLoading ? (
          <div className="bg-card border border-border rounded-lg p-4 md:p-6">
            <div className="flex items-start gap-3">
              <Skeleton className="w-5 h-5 rounded-full mt-0.5 flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-1/3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          </div>
        ) : isRegistered && userData ? (
          <div className="bg-card border border-border rounded-lg p-4 md:p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-2">Profile Registered</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <p><span className="font-medium">Age:</span> {userData.age} years</p>
                  <p><span className="font-medium">Gender:</span> {userData.gender}</p>
                  <p><span className="font-medium">Occupation:</span> {userData.occupation}</p>
                  <p className="sm:col-span-2"><span className="font-medium">Location:</span> {userData.city}, {userData.state}, {userData.country}</p>
                </div>
                <Button
                  variant="link"
                  onClick={() => router.push('/register')}
                  className="mt-2 p-0 h-auto text-primary"
                >
                  Update registration
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg p-4 md:p-6">
            <div className="flex items-start gap-3">
              <UserCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Complete your registration</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Register your information to personalize your experience
                </p>
                <Button
                  onClick={() => router.push('/register')}
                  size="sm"
                >
                  Register now
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button - Only show when both wallet and profile are ready */}
        {isConnected && isRegistered && !walletLoading && !userLoading && (
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => router.push('/dashboard')}
              size="lg"
              className="w-full sm:w-auto min-w-[200px]"
            >
              Access Dashboard
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
