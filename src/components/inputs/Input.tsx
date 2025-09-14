import { cn } from '@lib/cn'
import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    helper?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, helper, id, ...props }, ref) => {
        const autoId = React.useId()          // always called
        const inputId = id ?? autoId          // pick one

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={inputId} className="mb-1.5 block text-sm text-neutral-600">
                        {label}
                    </label>
                )}
                <input
                    id={inputId}
                    ref={ref}
                    className={cn(
                        'w-full h-11 px-3 rounded-md border bg-[var(--surface)] text-[var(--text)]',
                        'border-[var(--border)] placeholder:text-neutral-400',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500',
                        className
                    )}
                    {...props}
                />
                {helper && <p className="mt-1 text-xs text-neutral-500">{helper}</p>}
            </div>
        )
    }
)
Input.displayName = 'Input'
