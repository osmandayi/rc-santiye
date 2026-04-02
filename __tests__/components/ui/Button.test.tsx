import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Tıkla</Button>)
    expect(screen.getByRole('button', { name: 'Tıkla' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Tıkla</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders as disabled', () => {
    render(<Button disabled>Tıkla</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
