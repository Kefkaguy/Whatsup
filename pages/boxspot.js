import AppProductPage from "@/components/AppProductPage"
import { getAppBySlug } from "@/lib/apps"

export default function BoxSpotPage() {
  return <AppProductPage app={getAppBySlug("boxspot")} />
}
