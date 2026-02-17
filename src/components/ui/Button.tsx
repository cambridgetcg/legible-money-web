import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-mono transition-all duration-200',
          'focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#00ff41] focus-visible:outline-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-[#00ff41] text-[#0a0a0a] hover:shadow-[0_0_16px_#00ff4140] active:bg-[#00cc33]':
              variant === 'primary',
            'border border-[#333] text-[#00ff41] hover:border-[#00ff41] hover:shadow-[0_0_10px_#00ff4120]':
              variant === 'secondary',
            'text-[#e0e0e0] hover:text-[#00ff41] hover:bg-[#ffffff08]':
              variant === 'ghost',
            'px-3 py-1.5 text-xs rounded-[4px]': size === 'sm',
            'px-4 py-2 text-sm rounded-[4px]': size === 'md',
            'px-6 py-3 text-base rounded-[4px]': size === 'lg',
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
