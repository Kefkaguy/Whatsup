import Script from "next/script"
import { useEffect, useRef, useState } from "react"

export default function IdeaBotCheck({ onToken, resetKey }) {
  const container = useRef(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState("")
  useEffect(() => {
    if (!ready || !window.turnstile || !container.current) return
    setError("")
    const widget = window.turnstile.render(container.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      action: "submit-idea", size: "compact", theme: "light",
      callback: token => { setError(""); onToken(token) },
      "expired-callback": () => onToken(""),
      "error-callback": () => { onToken(""); setError("The bot check couldn’t load. Please refresh and try again.") },
    })
    return () => { window.turnstile?.remove(widget) }
  }, [ready, onToken, resetKey])
  return <div className="bot-check"><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setReady(true)} onError={() => setError("The bot check couldn’t load. Please refresh and try again.")} /><div ref={container} />{error && <p role="alert" className="form-message">{error}</p>}</div>
}
