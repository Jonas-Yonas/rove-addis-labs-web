export const MESSAGE_STATUSES = [
  "NEW",
  "READ",
  "REPLIED",
  "ARCHIVED",
] as const;

export type MessageStatus = (typeof MESSAGE_STATUSES)[number];

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string;
  message: string;
  status: MessageStatus;
  created_at: string;
  updated_at: string;
}
