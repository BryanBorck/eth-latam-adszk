'use client'

import React from 'react'
import { FormInput } from './form-input'
import { FormSelect } from './form-select'
import { Button } from '@/components/ui/button'
import { useRegisterForm } from '../hooks/use-register-form'
import { useUser } from '@/contexts/user-context'
import { useRouter } from 'next/navigation'

const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
]

export function RegisterForm() {
  const { userData, setUserData } = useUser()
  
  const {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validateForm,
    resetForm,
  } = useRegisterForm({ initialData: userData })

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Save data to global context
    setUserData(formData)
    
    setIsSubmitting(false)
    
    // Redirect to home
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <FormInput
          label="Age"
          name="age"
          value={formData.age || ''}
          onChange={handleChange}
          error={errors.age}
          placeholder="E.g., 25"
        />

        <FormSelect
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          options={GENDERS}
          error={errors.gender}
          placeholder="Select your gender"
        />
      </div>

      <FormInput
        label="Occupation"
        name="occupation"
        value={formData.occupation}
        onChange={handleChange}
        error={errors.occupation}
        placeholder="E.g., Software Developer"
      />

      <FormInput
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        error={errors.city}
        placeholder="E.g., São Paulo"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <FormInput
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          error={errors.state}
          placeholder="E.g., SP"
        />

        <FormInput
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          error={errors.country}
          placeholder="E.g., Brazil"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? (userData ? 'Updating...' : 'Registering...') : (userData ? 'Update' : 'Register')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={resetForm}
          disabled={isSubmitting}
          className="flex-1"
        >
          Clear
        </Button>
      </div>
    </form>
  )
}

