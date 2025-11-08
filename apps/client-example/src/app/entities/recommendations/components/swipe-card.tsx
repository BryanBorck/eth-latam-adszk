'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, Tag } from 'lucide-react'
import type { Advertisement, SwipeDirection } from '../types'

interface SwipeCardProps {
  ad: Advertisement
  onSwipe: (direction: SwipeDirection) => void
}

export function SwipeCard({ ad, onSwipe }: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const startPosRef = useRef({ x: 0, y: 0 })

  const SWIPE_THRESHOLD = 100

  useEffect(() => {
    setPosition({ x: 0, y: 0 })
    setRotation(0)
  }, [ad.id])

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true)
    startPosRef.current = { x: clientX, y: clientY }
  }

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return

    const deltaX = clientX - startPosRef.current.x
    const deltaY = clientY - startPosRef.current.y
    
    setPosition({ x: deltaX, y: deltaY })
    setRotation(deltaX * 0.1)
  }

  const handleEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const { x } = position

    if (Math.abs(x) > SWIPE_THRESHOLD) {
      const direction: SwipeDirection = x > 0 ? 'right' : 'left'
      
      // Animate out
      const exitX = x > 0 ? 1000 : -1000
      setPosition({ x: exitX, y: position.y })
      
      setTimeout(() => {
        onSwipe(direction)
        setPosition({ x: 0, y: 0 })
        setRotation(0)
      }, 300)
    } else {
      // Return to center
      setPosition({ x: 0, y: 0 })
      setRotation(0)
    }
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY)
  }

  const handleMouseUp = () => {
    handleEnd()
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleStart(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleMove(touch.clientX, touch.clientY)
  }

  const handleTouchEnd = () => {
    handleEnd()
  }

  const opacity = Math.abs(position.x) / SWIPE_THRESHOLD
  const showLike = position.x > 30
  const showReject = position.x < -30

  return (
    <div
      ref={cardRef}
      className="absolute top-0 left-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
        {/* Image */}
        <div className="relative h-[60%] bg-muted">
          <Image
            src={ad.imageUrl}
            alt={ad.title}
            fill
            className="object-cover"
            draggable={false}
            unoptimized
          />
          
          {/* Swipe indicators */}
          {showLike && (
            <div 
              className="absolute top-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-2xl border-4 border-green-400 rotate-12"
              style={{ opacity: Math.min(opacity, 1) }}
            >
              LIKE
            </div>
          )}
          {showReject && (
            <div 
              className="absolute top-8 left-8 bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-2xl border-4 border-red-400 -rotate-12"
              style={{ opacity: Math.min(opacity, 1) }}
            >
              NOPE
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 h-[40%] flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-2xl font-bold">{ad.title}</h2>
            {ad.price && (
              <span className="text-xl font-bold text-primary">{ad.price}</span>
            )}
          </div>

          <p className="text-muted-foreground mb-4 line-clamp-2">
            {ad.description}
          </p>

          <div className="mt-auto space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="w-4 h-4" />
              <span>{ad.category}</span>
            </div>
            {ad.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{ad.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

