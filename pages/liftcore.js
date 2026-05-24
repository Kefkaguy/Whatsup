import AppProductPage from "@/components/AppProductPage"
import { getAppBySlug } from "@/lib/apps"

export default function LiftCorePage() {
  return <AppProductPage app={getAppBySlug("liftcore")} />
}
