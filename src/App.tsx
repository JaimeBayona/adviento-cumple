import Home from "./pages/Home"
import { Analytics } from "@vercel/analytics/react"

import "./index.css"

export default function App() {
  return (
      <>
      <Home/>

      <Analytics />
      </>
  )
}