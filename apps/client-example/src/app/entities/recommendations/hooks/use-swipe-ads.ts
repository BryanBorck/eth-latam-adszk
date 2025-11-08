'use client'

import { useState, useCallback } from 'react'
import type { Advertisement, SwipeDirection, SwipeAction } from '../types'

// Mock data - will be replaced by SDK component
const MOCK_ADS: Advertisement[] = [
  {
    id: '1',
    title: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
    category: 'Electronics',
    price: '$299',
    location: 'São Paulo, BR'
  },
  {
    id: '2',
    title: 'Vintage Camera',
    description: 'Classic film camera in excellent condition',
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop',
    category: 'Photography',
    price: '$450',
    location: 'Rio de Janeiro, BR'
  },
  {
    id: '3',
    title: 'Modern Laptop',
    description: 'Latest generation laptop with high performance specs',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
    category: 'Electronics',
    price: '$1,299',
    location: 'São Paulo, BR'
  },
  {
    id: '4',
    title: 'Designer Sunglasses',
    description: 'Stylish sunglasses with UV protection',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop',
    category: 'Fashion',
    price: '$189',
    location: 'Belo Horizonte, BR'
  },
  {
    id: '5',
    title: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
    category: 'Electronics',
    price: '$399',
    location: 'Brasília, BR'
  }
]

export function useSwipeAds() {
  const [ads] = useState<Advertisement[]>(MOCK_ADS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeHistory, setSwipeHistory] = useState<SwipeAction[]>([])
  const [likedAds, setLikedAds] = useState<string[]>([])
  const [rejectedAds, setRejectedAds] = useState<string[]>([])

  const currentAd = ads[currentIndex]
  const hasMoreAds = currentIndex < ads.length

  const handleSwipe = useCallback((direction: SwipeDirection) => {
    if (!currentAd) return

    const action: SwipeAction = {
      adId: currentAd.id,
      direction,
      timestamp: new Date()
    }

    setSwipeHistory(prev => [...prev, action])

    if (direction === 'right') {
      setLikedAds(prev => [...prev, currentAd.id])
      // TODO: Send like action to SDK/backend
    } else {
      setRejectedAds(prev => [...prev, currentAd.id])
      // TODO: Send reject action to SDK/backend
    }

    setCurrentIndex(prev => prev + 1)
  }, [currentAd])

  const handleUndo = useCallback(() => {
    if (swipeHistory.length === 0 || currentIndex === 0) return

    const lastAction = swipeHistory[swipeHistory.length - 1]
    
    setSwipeHistory(prev => prev.slice(0, -1))
    setCurrentIndex(prev => prev - 1)

    if (lastAction.direction === 'right') {
      setLikedAds(prev => prev.filter(id => id !== lastAction.adId))
    } else {
      setRejectedAds(prev => prev.filter(id => id !== lastAction.adId))
    }
  }, [swipeHistory, currentIndex])

  const reset = useCallback(() => {
    setCurrentIndex(0)
    setSwipeHistory([])
    setLikedAds([])
    setRejectedAds([])
  }, [])

  return {
    currentAd,
    hasMoreAds,
    currentIndex,
    totalAds: ads.length,
    likedCount: likedAds.length,
    rejectedCount: rejectedAds.length,
    canUndo: swipeHistory.length > 0 && currentIndex > 0,
    handleSwipe,
    handleUndo,
    reset
  }
}

