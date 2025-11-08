'use client'

import React from 'react'
import { RegisterForm } from '../entities/register/components/register-form'
import { UserCircle, ArrowLeft, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useUser } from '@/contexts/user-context'

export function RegisterView() {
  const router = useRouter()
  const { userData, isRegistered } = useUser()

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push('/')}
              className="mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <UserCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {isRegistered ? 'Update Registration' : 'User Registration'}
                </h1>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                  {isRegistered ? 'Update your personal information' : 'Fill in your personal information'}
                </p>
              </div>
            </div>
          </div>

          {/* Info Alert for Existing Data */}
          {isRegistered && userData && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-blue-500 font-medium mb-1">
                  Existing data loaded
                </p>
                <p className="text-xs text-muted-foreground">
                  Your previously saved information has been loaded into the form. You can update any field and save the changes.
                </p>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-card border border-border rounded-lg p-4 md:p-8 shadow-lg">
            <RegisterForm />
          </div>

          {/* Info text */}
          <p className="text-xs md:text-sm text-muted-foreground text-center mt-6">
            Your data will be stored locally and persisted across sessions.
          </p>
        </div>
      </div>
    </div>
  )
}

