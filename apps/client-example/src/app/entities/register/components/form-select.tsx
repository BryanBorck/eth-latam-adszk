'use client'

import React from 'react'

interface FormSelectProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
  error?: string
  placeholder?: string
  required?: boolean
}

export function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  error,
  placeholder = 'Select...',
  required = true,
}: FormSelectProps) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-lg border bg-card text-foreground transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary
          ${error ? 'border-destructive' : 'border-input'}
        `}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}

