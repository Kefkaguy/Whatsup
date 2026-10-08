import { useEffect, useRef } from "react"

// Content stays visible during SSR and when JavaScript or motion is unavailable.
export default function Reveal({ children, className = "", delay = 0, as: Tag = "div", ...props }) {
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!element || preference.matches || navigator.hardwareConcurrency <= 4 || !window.IntersectionObserver) return
    const styles = getComputedStyle(element)
    const duration = parseFloat(styles.getPropertyValue("--motion-slow"))
    const easing = styles.getPropertyValue("--motion-ease").trim()
    let animation
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      if (!preference.matches) animation = element.animate(
        [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration, delay, easing, fill: "backwards" }
      )
      observer.unobserve(element)
    }, { threshold: 0.08 })
    const stopMotion = () => { if (preference.matches) animation?.cancel() }
    preference.addEventListener("change", stopMotion)
    observer.observe(element)
    return () => { observer.disconnect(); preference.removeEventListener("change", stopMotion); animation?.cancel() }
  }, [delay])
  return <Tag ref={ref} className={className} {...props}>{children}</Tag>
}
