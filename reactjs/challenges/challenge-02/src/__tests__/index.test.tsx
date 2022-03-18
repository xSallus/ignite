import { render, screen } from '@testing-library/react'
import App from '../pages'

describe('Home', () => {
  it('renders a heading', () => {
    render(<App />)

    const span = screen.getByRole('paragraph', {
      name: /Watch/i,
    })

    expect(span).toBeInTheDocument()
  })
})
