'use client'
import { useState, useEffect, useRef } from 'react'
import css from './block-slider.module.scss'

export const Block_Slider = ({ images = []}) => {
    const [isPaused, setIsPaused] = useState(false)
    const sliderRef = useRef(null)

    const handlePause = () => setIsPaused(true)
    const handleResume = () => setIsPaused(false)

    useEffect(() => {
        const slider = sliderRef.current
        if (slider) {
            let animationFrameId
            let scrollPosition = 0
            const scrollSpeed = 1.2

            const scrollSlider = () => {
                scrollPosition += scrollSpeed
                slider.style.transform = `translateX(-${scrollPosition}px)`

                if (scrollPosition > slider.scrollWidth / 2) {
                    scrollPosition = 0
                }

                animationFrameId = requestAnimationFrame(scrollSlider)
            }

            scrollSlider()

            return () => cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <div className={css.container}>
            <div
                className={css.slider}
                onMouseDown={handlePause}
                onMouseUp={handleResume}
            >
                <div
                    className={`${css.slider__images} ${isPaused ? css.paused : ''}`}
                    ref={sliderRef}
                >
                    {[...images, ...images].map((image, index) => (
                        <div
                            key={index}
                            className={css.image}
                            style={{ backgroundImage: `url(${image.url})` }}
                        />
                    ))}
                </div>
                {isPaused && <div className={css.pauseIcon}>⏸</div>}
            </div>
        </div>
    )
}