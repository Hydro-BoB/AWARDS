import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const AnimatedTitle = ({ Title, containerClass }) => {
  const containerRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '100 bottom',
          end: 'center bottom',
          toggleActions: 'play none none reverse'
        }
      })

      titleAnimation.to('.animated-word', {
        opacity: 1,
        transform: 'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)',
        ease: 'power2.inOut',
        stagger: 0.02
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Split by <br/> for lines, then split each line by spaces for words
  const lines = (Title || '').split('<br/>')

  return (
    <div ref={containerRef} className={containerClass}>
      <div className={`animated-title ${containerClass}`}>
        {lines.map((line, index) => (
          <div
            key={index}
            className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
          >
            {line.split(' ').map((word, i) => (
              <span
                key={i}
                className="animated-word"
                dangerouslySetInnerHTML={{ __html: word }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

AnimatedTitle.defaultProps = {
  Title: ''
}

export default AnimatedTitle
