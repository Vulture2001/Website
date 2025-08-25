import { cn } from '@/lib/cn'
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('mx-auto w-full max-w-[1336px] px-4 lg:px-6', className)} {...props} />
}
