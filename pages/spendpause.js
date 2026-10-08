import AppProductPage from "@/components/AppProductPage"
import { getAppBySlug } from "@/lib/apps"

export default function SpendPausePage() {
  return <AppProductPage app={getAppBySlug("spendpause")} />
}
