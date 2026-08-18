export type Locale = "ar" | "en";

export type PracticeArea =
  | "labor"
  | "rent"
  | "family"
  | "debt"
  | "traffic"
  | "cybercrime"
  | "small_business"
  | "court_procedures";

export type Urgency = "low" | "medium" | "high" | "critical";

export type Audience = "employee" | "employer" | "tenant" | "landlord" | "citizen" | "business_owner" | "general";

export interface LegalSource {
  law_name_ar: string;
  law_name_en: string;
  article: string;
  effective_date: string;
  source_url?: string;
  last_verified: string;
  confidence: "high" | "medium" | "low";
}

export interface TopicVersion {
  version: number;
  date: string;
  editor: string;
  changes: string;
}

export interface Topic {
  slug: string;
  title_ar: string;
  title_en: string;
  practice_area: PracticeArea;
  audience: Audience[];
  jurisdiction: string;
  content_type: string;
  last_reviewed: string;
  urgency: Urgency;
  user_questions_ar: string[];
  user_questions_en: string[];
  key_facts_ar: string[];
  key_facts_en: string[];
  summary_ar: string;
  summary_en: string;
  explanation_ar: string;
  explanation_en: string;
  when_to_act_ar: string;
  when_to_act_en: string;
  steps_ar: string[];
  steps_en: string[];
  documents_ar: string[];
  documents_en: string[];
  deadlines_ar: string[];
  deadlines_en: string[];
  legal_sources: LegalSource[];
  lawyer_required_when_ar: string[];
  lawyer_required_when_en: string[];
  faqs_ar: { q: string; a: string }[];
  faqs_en: { q: string; a: string }[];
  disclaimer_ar: string;
  disclaimer_en: string;
  versions: TopicVersion[];
  needs_review: boolean;
}

export interface Lawyer {
  id: string;
  name_ar: string;
  name_en: string;
  membership_id: string;
  practice_areas: PracticeArea[];
  governorates: string[];
  languages: string[];
  service_types: string[];
  pricing?: string;
  verification_status: "verified" | "pending" | "unverified";
  verification_date: string;
  bio_ar: string;
  bio_en: string;
  phone?: string;
  email?: string;
  profile_image?: string;
  years_experience: number;
  rating?: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: LegalSource[];
  topic_slug?: string;
  timestamp: Date;
}

export interface CaseContext {
  practice_area?: PracticeArea;
  urgency?: Urgency;
  audience?: Audience;
  key_facts: Record<string, string>;
  topics_matched: string[];
}

export interface ContactRequest {
  lawyer_id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  message: string;
  topic_slug?: string;
  timestamp: Date;
}

export interface PrivacyConsent {
  user_id: string;
  consent_type: string;
  granted: boolean;
  timestamp: Date;
  ip_address?: string;
}
