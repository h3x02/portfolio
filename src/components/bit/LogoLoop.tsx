'use client'

import React, { useRef, useEffect, useState } from 'react'

export type LogoItem =
    | React.ReactNode
    | {
        node: React.ReactNode
        href?: string
        title?: string
        ariaLabel?: string
    }
    | {
        src: string
        alt?: string
        href?: string
        title?: string
        width?: number
        height?: number
    }

interface LogoLoopProps {
    logos: LogoItem[]
    gap?: string
    speed?: number
    direction?: 'left' | 'right'
    className?: string
    logoHeight?: number
    pauseOnHover?: boolean
}

/** Merge class names safely */
function cx(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

/** Observe element resize and trigger callback */
function useResizeObserver(
    refs: React.RefObject<Element>[],
    callback: () => void
) {
    useEffect(() => {
        if (!refs || refs.length === 0) return
        const observer = new ResizeObserver(callback)
        refs.forEach(r => {
            if (r.current) observer.observe(r.current)
        })
        return () => observer.disconnect()
    }, [refs, callback])
}

/** Wait until all <img> tags inside a ref have finished loading */
function useImageLoader(ref: React.RefObject<HTMLElement>, callback: () => void) {
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const imgs = Array.from(el.querySelectorAll('img'))
        if (imgs.length === 0) {
            callback()
            return
        }

        let loaded = 0
        const check = () => {
            loaded++
            if (loaded === imgs.length) callback()
        }

        imgs.forEach(img => {
            if (img.complete) check()
            else {
                img.addEventListener('load', check)
                img.addEventListener('error', check)
            }
        })

        return () => {
            imgs.forEach(img => {
                img.removeEventListener('load', check)
                img.removeEventListener('error', check)
            })
        }
    }, [ref, callback])
}

export const LogoLoop: React.FC<LogoLoopProps> = ({
    logos,
    gap = '3rem',
    speed = 50,
    direction = 'left',
    className,
    logoHeight = 40,
    pauseOnHover = false,
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const seqRef = useRef<HTMLUListElement>(null)

    const [seqWidth, setSeqWidth] = useState(0)
    const [copyCount, setCopyCount] = useState(2)
    const [isHovered, setIsHovered] = useState(false)
    const [targetVelocity, setTargetVelocity] = useState(0)

    useEffect(() => {
        setTargetVelocity(direction === 'left' ? -speed : speed)
    }, [speed, direction])

    // measure width
    const updateDimensions = () => {
        if (!containerRef.current || !seqRef.current) return
        const containerWidth = containerRef.current.offsetWidth
        const sw = seqRef.current.scrollWidth
        const neededCopies = Math.ceil(containerWidth / sw) + 1
        setSeqWidth(sw)
        setCopyCount(Math.max(2, neededCopies))
    }

    useResizeObserver([containerRef as React.RefObject<Element>, seqRef as React.RefObject<Element>], updateDimensions)
    useImageLoader(seqRef as React.RefObject<HTMLElement>, updateDimensions)

    // animation loop
    useEffect(() => {
        if (!trackRef.current || seqWidth <= 0) return
        const track = trackRef.current

        let offset = 0
        let currentVelocity = 0
        let lastTime = performance.now()
        let frame: number

        const animate = (time: number) => {
            const delta = (time - lastTime) / 1000
            lastTime = time

            const damping = 5
            currentVelocity += (targetVelocity - currentVelocity) * damping * delta
            if (!(pauseOnHover && isHovered)) {
                offset += currentVelocity * delta
            }

            // seamless wrap
            if (offset >= seqWidth) offset -= seqWidth
            else if (offset <= -seqWidth) offset += seqWidth

            track.style.transform = `translateX(${-offset}px)`
            frame = requestAnimationFrame(animate)
        }

        frame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frame)
    }, [seqWidth, targetVelocity, isHovered, pauseOnHover])

    // properly render different logo types
    const renderLogo = (item: LogoItem, key: React.Key) => {
        if (React.isValidElement(item)) {
            return <li key={key}>{item}</li>
        }

        if (typeof item === 'object' && item !== null && 'node' in item) {
            const content = item.node
            return (
                <li key={key}>
                    {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer" title={item.title}>
                            {content}
                        </a>
                    ) : (
                        content
                    )}
                </li>
            )
        }

        if (typeof item === 'object' && item !== null && 'src' in item) {
            return (
                <li key={key}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                        <img
                            src={item.src}
                            alt={item.alt ?? ''}
                            width={item.width}
                            height={item.height}
                            loading="lazy"
                        />
                    </a>
                </li>
            )
        }

        return null
    }

    return (
        <div
            ref={containerRef}
            className={cx('overflow-hidden w-full', className)}
            style={{ height: `${logoHeight}px` }}
            onMouseEnter={() => pauseOnHover && setIsHovered(true)}
            onMouseLeave={() => pauseOnHover && setIsHovered(false)}
        >
            <div
                ref={trackRef}
                className={cx(
                    'flex flex-nowrap whitespace-nowrap will-change-transform select-none',
                    'motion-reduce:transform-none'
                )}
            >
                {Array.from({ length: copyCount }).map((_, copyIndex) => (
                    <ul
                        key={copyIndex}
                        ref={copyIndex === 0 ? seqRef : null}
                        className="flex items-center justify-center"
                        style={{
                            gap,
                            height: `${logoHeight}px`,
                            flexShrink: 0,
                            margin: 0,
                            padding: 0,
                            listStyle: 'none',
                        }}
                    >
                        {logos.map((logo, i) => renderLogo(logo, `${copyIndex}-${i}`))}
                    </ul>
                ))}
            </div>
        </div>
    )
}
