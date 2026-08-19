import { Settings } from "lucide-react";
import { ResourcePage } from "@/components/dashboard/resource-page";

export default function SettingsPage() {
  return <ResourcePage eyebrow="Workspace" title="Settings" description="Workspace settings and preferences will be managed here." emptyMessage="Settings controls are coming soon." icon={Settings} />;
}
