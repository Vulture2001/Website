'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

type ImagePosition = 'left' | 'right' | 'none'

export type ContentProps = {
    badge?: React.ReactNode
    title: React.ReactNode
    description?: React.ReactNode
    imageSrc?: string
    imageAlt?: string
    renderImage?: React.ReactNode
    imagePosition?: ImagePosition
    textMaxWidthClassName?: string
    className?: string
    children?: React.ReactNode
    titleClassName?: string

    // overrides
    sectionPaddingClassName?: string
    columnsWrapperClassName?: string
    textColumnClassName?: string
    headerStackClassName?: string
    titleBlockClassName?: string
}

/* ---------------------------------- */
/* Internal: Image block              */
/* ---------------------------------- */
function ContentImage({
                          imageSrc,
                          imageAlt = 'Feature image',
                          renderImage,
                      }: {
    imageSrc?: string
    imageAlt?: string
    renderImage?: React.ReactNode
}) {
    if (renderImage) return <>{renderImage}</>

    if (imageSrc) {
        return (
            <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full max-w-[520px] aspect-[4/3] rounded-xl object-cover h-auto"
                loading="lazy"
            />
        )
    }

    return (
        <div
            aria-hidden
            className="w-full max-w-[520px] aspect-[4/3] rounded-xl bg-gray-100"
        />
    )
}

/* ---------------------------------- */
/* Public: Content                    */
/* ---------------------------------- */
export function Content({
                            badge,
                            title,
                            description,
                            imageSrc,
                            imageAlt = 'Feature image',
                            renderImage,
                            imagePosition = 'none',
                            textMaxWidthClassName = 'max-w-[550px] w-full',
                            className,
                            children,
                            titleClassName,

                            sectionPaddingClassName,
                            columnsWrapperClassName,
                            textColumnClassName,
                            headerStackClassName,
                            titleBlockClassName,
                        }: ContentProps) {
    const showImage = imagePosition !== 'none' && (imageSrc || renderImage)
    const headingId = React.useId()

    return (
        <section
            className={cn(
                'mb-14 flex flex-col items-center justify-center',
                // padding that scales per screen size
                'px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-24',
                sectionPaddingClassName,
                className
            )}
            aria-labelledby={headingId}
        >
            <div
                className={cn(
                    // grid layout instead of flex for more control
                    'grid items-center justify-center gap-12 sm:gap-16 lg:gap-20',
                    showImage && imagePosition !== null
                        ? 'lg:grid-cols-2'
                        : 'lg:grid-cols-1',
                    columnsWrapperClassName
                )}
            >
                {showImage && imagePosition === 'left' && (
                    <ContentImage
                        imageSrc={imageSrc}
                        imageAlt={imageAlt}
                        renderImage={renderImage}
                    />
                )}

                <div
                    className={cn(
                        'flex flex-col items-start gap-6',
                        textMaxWidthClassName,
                        textColumnClassName
                    )}
                >
                    <header
                        className={cn(
                            'flex flex-col items-start self-stretch gap-6',
                            headerStackClassName
                        )}
                    >
                        <div
                            className={cn(
                                'flex flex-col items-start self-stretch mt-2 gap-2',
                                titleBlockClassName
                            )}
                        >
                            {badge && <div className="mb-4">{badge}</div>}
                            <h1
                                id={headingId}
                                className={cn(
                                    // responsive typography with clamp
                                    'font-semibold tracking-tighter text-zinc-800',
                                    'text-[clamp(2rem,5vw,3rem)] leading-[1.1]',
                                    titleClassName
                                )}
                            >
                                {title}
                            </h1>
                        </div>

                        {description ? (
                            <p className="self-stretch text-base sm:text-lg leading-relaxed text-gray-500">
                                {description}
                            </p>
                        ) : null}
                    </header>

                    {children}
                </div>

                {showImage && imagePosition === 'right' && (
                    <ContentImage
                        imageSrc={imageSrc}
                        imageAlt={imageAlt}
                        renderImage={renderImage}
                    />
                )}
            </div>
        </section>
    )
}
