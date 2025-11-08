'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface UserData {
  age: number | null
  gender: string
  occupation: string
  city: string
  state: string
  country: string
}

interface UserContextType {
  userData: UserData | null
  setUserData: (data: UserData) => void
  clearUserData: () => void
  isRegistered: boolean
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const STORAGE_KEY = 'eth-latam-user-data'

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserDataState] = useState<UserData | null>(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load data from localStorage on mount (client-side only)
  useEffect(() => {
    setIsMounted(true)
    
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem(STORAGE_KEY)
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData)
          setUserDataState(parsed)
          setIsRegistered(true)
        } catch (error) {
          console.error('Error loading user data:', error)
        }
      }
      setIsLoading(false)
    }
  }, [])

  const setUserData = (data: UserData) => {
    setUserDataState(data)
    setIsRegistered(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  }

  const clearUserData = () => {
    setUserDataState(null)
    setIsRegistered(false)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <UserContext.Provider
        value={{
          userData: null,
          setUserData: () => {},
          clearUserData: () => {},
          isRegistered: false,
          isLoading: true,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        clearUserData,
        isRegistered,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

