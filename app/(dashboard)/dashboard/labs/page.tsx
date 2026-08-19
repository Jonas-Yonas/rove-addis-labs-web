import { FlaskConical } from "lucide-react";
import { ResourcePage } from "@/components/dashboard/resource-page";

export default function LabsPage() {
  return <ResourcePage eyebrow="Workspace" title="Labs" description="Explore and document your team’s experiments." emptyMessage="Lab experiments will appear here." icon={FlaskConical} />;
}
