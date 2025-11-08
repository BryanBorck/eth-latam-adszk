'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, X, Heart, RotateCcw, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSwipeAds } from '@/app/entities/recommendations/hooks/use-swipe-ads'
import { SwipeCard } from '@/app/entities/recommendations/components/swipe-card'
import { useUser } from '@/contexts/user-context'
import { useWallet } from '@/contexts/wallet-context'

export function RecommendationsView() {
  const router = useRouter()
  const { isRegistered } = useUser()
  const { isConnected } = useWallet()
  const {
    currentAd,
    hasMoreAds,
    currentIndex,
    totalAds,
    canUndo,
    handleSwipe,
    handleUndo,
    reset
  } = useSwipeAds()

  // Protect route
  if (!isConnected || !isRegistered) {
    router.push('/')
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-bold">Recommendations</h3>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={reset}
            disabled={currentIndex === 0}
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {/* Card Stack */}
        <div className="relative w-full max-w-sm mx-auto aspect-[3/4] mb-6">
          {hasMoreAds && currentAd ? (
            <>
              {/* Next card preview (optional) */}
              {currentIndex + 1 < totalAds && (
                <div className="absolute top-2 left-2 right-2 bottom-2 bg-card border border-border rounded-2xl opacity-50 scale-95" />
              )}
              
              {/* Current card */}
              <SwipeCard
                key={currentAd.id}
                ad={currentAd}
                onSwipe={handleSwipe}
              />
            </>
          ) : (
            <div className="absolute inset-0 bg-card border border-border rounded-2xl flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">All Done!</h2>
              <p className="text-muted-foreground mb-6">
                You&apos;ve reviewed all available recommendations. Check back later for more!
              </p>
              <Button onClick={reset}>
                Review Again
              </Button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {hasMoreAds && currentAd && (
          <div className="flex items-center justify-center gap-6">
            <Button
              size="icon"
              variant="outline"
              className="w-16 h-16 rounded-full border-2 border-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => handleSwipe('left')}
            >
              <X className="w-8 h-8" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="w-12 h-12 rounded-full"
              onClick={handleUndo}
              disabled={!canUndo}
            >
              <RotateCcw className="w-5 h-5" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="w-16 h-16 rounded-full border-2 border-green-500 hover:bg-green-500 hover:text-white"
              onClick={() => handleSwipe('right')}
            >
              <Heart className="w-8 h-8" />
            </Button>
          </div>
        )}

        {/* Instructions */}
        {hasMoreAds && currentAd && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Swipe right to like • Swipe left to pass
            </p>
          </div>
        )}

        {/* SDK Integration Note */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-sm text-blue-500 font-medium mb-1">
            🔌 SDK Integration Ready
          </p>
          <p className="text-xs text-muted-foreground">
            This component is prepared to receive segmented advertisement data from the SDK.
            Replace the mock data in <code className="text-xs bg-muted px-1 py-0.5 rounded">use-swipe-ads.ts</code> with SDK integration.
          </p>
        </div>
      </div>
    </div>
  )
}

