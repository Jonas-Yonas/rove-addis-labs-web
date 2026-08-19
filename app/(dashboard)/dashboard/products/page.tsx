import { Package } from "lucide-react";
import { ResourcePage } from "@/components/dashboard/resource-page";

export default function ProductsPage() {
  return <ResourcePage eyebrow="Workspace" title="Products" description="Manage the products currently moving through development." emptyMessage="Products you add will appear here." icon={Package} />;
}
