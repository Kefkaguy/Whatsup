import AppProductPage from "@/components/AppProductPage"
import { getAppBySlug } from "@/lib/apps"

export default function PetCarePage() {
  return <AppProductPage app={getAppBySlug("petcare")} />
}
