export type ProjectStatus =
  | "PLANNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ARCHIVED";

export interface Project {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  description: string;  
  content: string | null;
  cover_image_url: string | null;
  website_url: string | null;
  status: ProjectStatus;
  featured: boolean;
  created_at: string;
  updated_at: string;
}
