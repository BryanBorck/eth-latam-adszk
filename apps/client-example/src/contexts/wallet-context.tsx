'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface WalletData {
  address: string
  balance: string
  network: string
}

interface WalletContextType {
  walletData: WalletData | null
  isConnected: boolean
  isLoading: boolean
  connectWallet: () => void
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const STORAGE_KEY = 'eth-latam-wallet-data'

// Mock wallet address generator
const generateMockAddress = () => {
  return '0x' + Array.from({ length: 40 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
}

const generateMockBalance = () => {
  return (Math.random() * 10).toFixed(4)
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load wallet data from localStorage on mount
  useEffect(() => {
    setIsMounted(true)
    
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem(STORAGE_KEY)
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData)
          setWalletData(parsed)
          setIsConnected(true)
        } catch (error) {
          console.error('Error loading wallet data:', error)
        }
      }
      setIsLoading(false)
    }
  }, [])

  const connectWallet = () => {
    // Simulate wallet connection delay
    setIsLoading(true)
    
    setTimeout(() => {
      const mockWallet: WalletData = {
        address: generateMockAddress(),
        balance: generateMockBalance(),
        network: 'Ethereum Mainnet',
      }
      
      setWalletData(mockWallet)
      setIsConnected(true)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockWallet))
      }
      
      setIsLoading(false)
    }, 1000)
  }

  const disconnectWallet = () => {
    setWalletData(null)
    setIsConnected(false)
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <WalletContext.Provider
        value={{
          walletData: null,
          isConnected: false,
          isLoading: true,
          connectWallet: () => {},
          disconnectWallet: () => {},
        }}
      >
        {children}
      </WalletContext.Provider>
    )
  }

  return (
    <WalletContext.Provider
      value={{
        walletData,
        isConnected,
        isLoading,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

