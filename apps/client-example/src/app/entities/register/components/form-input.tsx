'use client'

import React from 'react'

interface FormInputProps {
  label: string
  name: string
  type?: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
  required?: boolean
}

export function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = true,
}: FormInputProps) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border bg-card text-foreground transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary
          ${error ? 'border-destructive' : 'border-input'}
        `}
        required={required}
      />
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}

