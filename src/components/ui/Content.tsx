'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

type ImagePosition = 'left' | 'right' | 'none'

type ContentProps = {
    /** Label above the title (e.g., your Badge) */
    badge?: React.ReactNode
    /** Main heading */
    title: React.ReactNode
    /** Supporting copy */
    description?: React.ReactNode
    /** Provide either an image src OR a custom React node via renderImage */
    imageSrc?: string
    imageAlt?: string
    /** Override the image markup entirely (e.g., <Image ... />). Ignored if imagePosition==='none' */
    renderImage?: React.ReactNode
    /** Where to place the image (or 'none' to hide) */
    imagePosition?: ImagePosition
    /** Optional width to constrain the text column (defaults to ~547px you used) */
    textMaxWidthClassName?: string
    /** Additional classes for the outer section */
    className?: string
    /** Children (checkbox list, buttons, anything else) */
    children?: React.ReactNode
    titleClassName?: string

}

/**
 * Reusable feature section with optional image (left/right) and a text column.
 * Title + description are explicit props; anything else goes in `children`.
 */
export function Content({
                            badge,
                            title,
                            description,
                            imageSrc,
                            imageAlt = 'Feature image',
                            renderImage,
                            imagePosition = 'none',
                            textMaxWidthClassName = 'w-[547px] max-md:w-full max-md:max-w-[600px]',
                            className,
                            children,
    titleClassName,
                        }: ContentProps) {
    const showImage = imagePosition !== 'none' && (imageSrc || renderImage)

    const ImageBlock = (
        <div>
            {renderImage ?? (
                <div
                    className="bg-gray-100 rounded-xl w-[520px] aspect-[4/3] max-md:w-full"
                    role="img"
                    aria-label={imageAlt}
                    style={
                        imageSrc
                            ? {
                                backgroundImage: `url(${imageSrc})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }
                            : undefined
                    }
                />
            )}
        </div>
    )

    return (
        <section
            className={cn(
                'flex relative flex-col gap-2 justify-center items-center self-stretch px-20 py-24 mb-24',
                'max-md:gap-10 max-md:px-10 max-md:py-16 max-sm:px-5 max-sm:py-10',
                className
            )}
            aria-labelledby="content-title"
        >
            <div
                className={cn(
                    'flex relative gap-20 justify-center items-center',
                    'max-md:flex-col max-md:gap-10'
                )}
            >
                {/* Image (left) */}
                {showImage && imagePosition === 'left' && ImageBlock}

                {/* Text column */}
                <div className={cn('flex relative flex-col gap-10 items-start', textMaxWidthClassName)}>
                    <header className="flex relative flex-col gap-6 items-start self-stretch">
                        <div className="flex relative flex-col gap-4 items-start self-stretch">
                            {badge}
                            <h1
                                id="content-title"
                                className={cn(
                                    "relative self-stretch text-6xl font-semibold tracking-tighter leading-[63px] text-zinc-800 max-md:text-5xl max-md:leading-[50px] max-sm:text-3xl max-sm:tracking-tighter max-sm:leading-10",
                                    titleClassName
                                )}
                            >
                                {title}
                            </h1>
                        </div>
                        {description ? (
                            <p className="relative self-stretch text-lg leading-8 text-gray-500 max-md:text-base max-md:leading-7 max-sm:text-sm max-sm:leading-6">
                                {description}
                            </p>
                        ) : null}
                    </header>

                    {/* Anything you want: checkboxes, CTAs, etc. */}
                    {children}
                </div>

                {/* Image (right) */}
                {showImage && imagePosition === 'right' && ImageBlock}
            </div>
        </section>
    )
}