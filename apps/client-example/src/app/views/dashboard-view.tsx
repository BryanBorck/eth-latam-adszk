'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/user-context'
import { useWallet } from '@/contexts/wallet-context'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  User, 
  Wallet, 
  Target,
  Copy,
  CheckCircle,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'

export function DashboardView() {
  const router = useRouter()
  const { userData } = useUser()
  const { walletData, disconnectWallet } = useWallet()
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = () => {
    if (walletData?.address) {
      navigator.clipboard.writeText(walletData.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleLogout = () => {
    disconnectWallet()
    router.push('/')
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Button
                variant="ghost"
                onClick={() => router.push('/')}
                className="mb-2 -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold">ADSZK Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Privacy-Preserving Recommendations Platform
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>

          {/* User & Wallet Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* User Info Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Profile Information</h3>
                  <p className="text-sm text-muted-foreground">Your registered details</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age:</span>
                  <span className="font-medium">{userData?.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gender:</span>
                  <span className="font-medium">{userData?.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Occupation:</span>
                  <span className="font-medium">{userData?.occupation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{userData?.city}, {userData?.state}</span>
                </div>
              </div>
              <Button
                variant="link"
                onClick={() => router.push('/register')}
                className="mt-4 p-0 h-auto"
              >
                Update profile
              </Button>
            </div>

            {/* Wallet Info Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-full bg-green-500/10">
                  <Wallet className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Wallet Connected</h3>
                  <p className="text-sm text-muted-foreground">Active connection</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Address</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-mono break-all">{walletData?.address}</p>
                    <button
                      onClick={handleCopyAddress}
                      className="p-1 hover:bg-accent rounded transition-colors flex-shrink-0"
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Balance:</span>
                  <span className="text-sm font-medium">{walletData?.balance} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Network:</span>
                  <span className="text-sm font-medium">{walletData?.network}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-blue-500/10">
                  <Target className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Recommendations</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-purple-500/10">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Encrypted Attributes Matched</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations Action */}
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="w-full sm:w-auto min-w-[250px]"
              onClick={() => router.push('/recommendations')}
            >
              Get Recommendations
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

