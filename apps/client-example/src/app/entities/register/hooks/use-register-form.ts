'use client'

import { useState, ChangeEvent, useEffect } from 'react'
import { UserData } from '@/contexts/user-context'

interface FormErrors {
  age?: string
  gender?: string
  occupation?: string
  city?: string
  state?: string
  country?: string
}

interface UseRegisterFormProps {
  initialData?: UserData | null
}

export function useRegisterForm({ initialData }: UseRegisterFormProps = {}) {
  const [formData, setFormData] = useState<UserData>({
    age: null,
    gender: '',
    occupation: '',
    city: '',
    state: '',
    country: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load initial data when provided
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? (value ? parseInt(value, 10) : null) : value,
    }))

    // Clear field error on input
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age'
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender'
    }

    if (!formData.occupation || formData.occupation.trim().length < 2) {
      newErrors.occupation = 'Please enter your occupation'
    }

    if (!formData.city || formData.city.trim().length < 2) {
      newErrors.city = 'Please enter your city'
    }

    if (!formData.state || formData.state.trim().length < 2) {
      newErrors.state = 'Please enter your state'
    }

    if (!formData.country || formData.country.trim().length < 2) {
      newErrors.country = 'Please enter your country'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({
      age: null,
      gender: '',
      occupation: '',
      city: '',
      state: '',
      country: '',
    })
    setErrors({})
    setIsSubmitting(false)
  }

  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validateForm,
    resetForm,
  }
}

