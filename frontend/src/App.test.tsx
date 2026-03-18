import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders Get started', () => {
    render(<App />)
    expect(screen.getByText(/Get started/)).toBeInTheDocument()
  })
})
