// components/BackgroundDots.jsx
import { useMemo } from 'react'

function rand(min, max) {
    return Math.random() * (max - min) + min
}

export default function BackgroundDots({ count = 50 }) {
    const dots = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            left: rand(0, 100),
            top: rand(0, 100), // scattered anywhere across the full page height
            size: rand(1.5, 3.5),
            duration: rand(6, 14),
            delay: rand(0, 14),
            rise: rand(40, 90), // px — a short local drift, not a full-page journey
            drift: rand(-20, 20), // px of side-to-side sway
            maxOpacity: rand(0.35, 0.9),
        }))
    }, [count])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
            {dots.map((dot) => (
                <span
                    key={dot.id}
                    className="dot"
                    style={{
                        left: `${dot.left}%`,
                        top: `${dot.top}%`,
                        width: `${dot.size}px`,
                        height: `${dot.size}px`,
                        animationDuration: `${dot.duration}s`,
                        animationDelay: `-${dot.delay}s`,
                        '--rise': `${dot.rise}px`,
                        '--drift': `${dot.drift}px`,
                        '--max-opacity': dot.maxOpacity,
                    }}
                />
            ))}
            <style jsx>{`
                .dot {
                    position: absolute;
                    border-radius: 9999px;
                    background: white;
                    opacity: 0;
                    box-shadow: 0 0 6px rgba(255, 255, 255, 0.7);
                    animation-name: rise-twinkle;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                }

                @keyframes rise-twinkle {
                    0% {
                        transform: translate(0, 0);
                        opacity: 0;
                    }
                    10% {
                        opacity: var(--max-opacity);
                    }
                    25% {
                        transform: translate(var(--drift), calc(var(--rise) * -0.25));
                    }
                    50% {
                        opacity: calc(var(--max-opacity) * 0.25);
                        transform: translate(calc(var(--drift) * -1), calc(var(--rise) * -0.5));
                    }
                    75% {
                        opacity: var(--max-opacity);
                        transform: translate(var(--drift), calc(var(--rise) * -0.75));
                    }
                    95% {
                        opacity: 0;
                    }
                    100% {
                        transform: translate(0, calc(var(--rise) * -1));
                        opacity: 0;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .dot {
                        animation: none;
                        opacity: 0.25;
                    }
                }
            `}</style>
        </div>
    )
}