import AppProductPage from "@/components/AppProductPage"
import { getAppBySlug } from "@/lib/apps"

export default function KefCullPage() {
  return <AppProductPage app={getAppBySlug("kefcull")} />
}
