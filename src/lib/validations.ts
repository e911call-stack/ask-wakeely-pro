import { z } from "zod";

// ---------------------------------------------------------------------------
// Reusable primitives
// ---------------------------------------------------------------------------

export const LocaleEnum = z.enum(["ar", "en"]);
export type LocaleEnum = z.infer<typeof LocaleEnum>;

export const PracticeAreaEnum = z.enum([
  "labor",
  "rent",
  "family",
  "debt",
  "traffic",
  "cybercrime",
  "small_business",
  "court_procedures",
]);
export type PracticeAreaEnum = z.infer<typeof PracticeAreaEnum>;

export const UrgencyEnum = z.enum(["low", "medium", "high", "critical"]);
export type UrgencyEnum = z.infer<typeof UrgencyEnum>;

export const AudienceEnum = z.enum([
  "employee",
  "employer",
  "tenant",
  "landlord",
  "citizen",
  "business_owner",
  "general",
]);
export type AudienceEnum = z.infer<typeof AudienceEnum>;

export const VerificationStatusEnum = z.enum([
  "verified",
  "pending",
  "unverified",
]);
export type VerificationStatusEnum = z.infer<typeof VerificationStatusEnum>;

export const ReviewStatusEnum = z.enum([
  "draft",
  "pending_review",
  "approved",
  "rejected",
]);
export type ReviewStatusEnum = z.infer<typeof ReviewStatusEnum>;

export const ConfidenceLevelEnum = z.enum(["high", "medium", "low"]);
export type ConfidenceLevelEnum = z.infer<typeof ConfidenceLevelEnum>;

export const SourceTypeEnum = z.enum([
  "law",
  "regulation",
  "circular",
  "court_ruling",
  "ministerial_decree",
]);
export type SourceTypeEnum = z.infer<typeof SourceTypeEnum>;

export const UserRoleEnum = z.enum([
  "user",
  "lawyer",
  "editor",
  "admin",
  "superadmin",
]);
export type UserRoleEnum = z.infer<typeof UserRoleEnum>;

export const ConsentTypeEnum = z.enum([
  "terms_of_service",
  "privacy_policy",
  "marketing",
  "analytics",
  "data_processing",
]);
export type ConsentTypeEnum = z.infer<typeof ConsentTypeEnum>;

export const PrivacyRequestTypeEnum = z.enum([
  "access",
  "rectification",
  "erasure",
  "portability",
  "restrict_processing",
  "object_processing",
]);
export type PrivacyRequestTypeEnum = z.infer<typeof PrivacyRequestTypeEnum>;

export const VisualizationTypeEnum = z.enum([
  "infographic",
  "timeline",
  "flowchart",
  "comparison_table",
  "checklist",
]);
export type VisualizationTypeEnum = z.infer<typeof VisualizationTypeEnum>;

export const ChartLayoutEnum = z.enum([
  "vertical_list",
  "horizontal_grid",
  "timeline",
  "steps",
  "comparison",
]);
export type ChartLayoutEnum = z.infer<typeof ChartLayoutEnum>;

// ---------------------------------------------------------------------------
// 1. User schemas
// ---------------------------------------------------------------------------

export const userRegistrationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters")
    .optional(),
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(200, "Full name must not exceed 200 characters"),
  language_pref: LocaleEnum.default("ar"),
});
export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password must not exceed 128 characters")
    .optional(),
});
export type UserLoginInput = z.infer<typeof userLoginSchema>;

export const userRoleUpdateSchema = z.object({
  user_id: z.string().uuid("Invalid user ID"),
  role: UserRoleEnum,
});
export type UserRoleUpdateInput = z.infer<typeof userRoleUpdateSchema>;

export const userProfileUpdateSchema = z.object({
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(200, "Full name must not exceed 200 characters")
    .optional(),
  language_pref: LocaleEnum.optional(),
  avatar_url: z.string().url("Invalid URL").optional().nullable(),
});
export type UserProfileUpdateInput = z.infer<typeof userProfileUpdateSchema>;

// ---------------------------------------------------------------------------
// 2. OAuth schemas
// ---------------------------------------------------------------------------

export const oauthCallbackSchema = z.object({
  provider: z.enum(["google", "microsoft", "github"]),
  code: z.string().min(1, "Authorization code is required"),
  state: z.string().min(1, "State parameter is required"),
});
export type OAuthCallbackInput = z.infer<typeof oauthCallbackSchema>;

// ---------------------------------------------------------------------------
// 3. Topic schemas
// ---------------------------------------------------------------------------

export const legalSourceSchema = z.object({
  law_name_ar: z.string().min(1).max(500),
  law_name_en: z.string().min(1).max(500),
  article: z.string().min(1).max(200),
  effective_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  source_url: z.string().url("Invalid URL").optional(),
  last_verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  confidence: ConfidenceLevelEnum,
});
export type LegalSourceInput = z.infer<typeof legalSourceSchema>;

export const topicVersionSchema = z.object({
  version: z.number().int().nonnegative(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  editor: z.string().min(1).max(200),
  changes: z.string().min(1).max(1000),
});
export type TopicVersionInput = z.infer<typeof topicVersionSchema>;

export const faqItemSchema = z.object({
  q: z.string().min(1, "Question is required").max(500),
  a: z.string().min(1, "Answer is required").max(2000),
});

export const topicContentSchema = z.object({
  title_ar: z.string().min(1, "Arabic title is required").max(300),
  title_en: z.string().min(1, "English title is required").max(300),
  summary_ar: z.string().min(1).max(2000),
  summary_en: z.string().min(1).max(2000),
  explanation_ar: z.string().min(1).max(10000),
  explanation_en: z.string().min(1).max(10000),
  when_to_act_ar: z.string().min(1).max(2000),
  when_to_act_en: z.string().min(1).max(2000),
  steps_ar: z.array(z.string().min(1).max(500)).min(1, "At least one step required"),
  steps_en: z.array(z.string().min(1).max(500)).min(1, "At least one step required"),
  documents_ar: z.array(z.string().min(1).max(300)).min(1, "At least one document required"),
  documents_en: z.array(z.string().min(1).max(300)).min(1, "At least one document required"),
  deadlines_ar: z.array(z.string().min(1).max(300)).min(1, "At least one deadline required"),
  deadlines_en: z.array(z.string().min(1).max(300)).min(1, "At least one deadline required"),
  user_questions_ar: z.array(z.string().min(1).max(300)).min(1),
  user_questions_en: z.array(z.string().min(1).max(300)).min(1),
  key_facts_ar: z.array(z.string().min(1).max(300)).min(1),
  key_facts_en: z.array(z.string().min(1).max(300)).min(1),
  legal_sources: z.array(legalSourceSchema).min(1, "At least one legal source required"),
  lawyer_required_when_ar: z.array(z.string().min(1).max(500)),
  lawyer_required_when_en: z.array(z.string().min(1).max(500)),
  faqs_ar: z.array(faqItemSchema).min(1, "At least one FAQ required"),
  faqs_en: z.array(faqItemSchema).min(1, "At least one FAQ required"),
  disclaimer_ar: z.string().min(1).max(2000),
  disclaimer_en: z.string().min(1).max(2000),
});
export type TopicContentInput = z.infer<typeof topicContentSchema>;

export const topicCreateSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
  practice_area: PracticeAreaEnum,
  audience: z.array(AudienceEnum).min(1, "At least one audience required"),
  jurisdiction: z.string().min(1, "Jurisdiction is required").max(300),
  content_type: z.string().min(1).max(100),
  urgency: UrgencyEnum,
  needs_review: z.boolean().default(true),
  content: topicContentSchema,
});
export type TopicCreateInput = z.infer<typeof topicCreateSchema>;

export const topicUpdateSchema = z.object({
  practice_area: PracticeAreaEnum.optional(),
  audience: z.array(AudienceEnum).min(1).optional(),
  jurisdiction: z.string().min(1).max(300).optional(),
  content_type: z.string().min(1).max(100).optional(),
  urgency: UrgencyEnum.optional(),
  needs_review: z.boolean().optional(),
  content: topicContentSchema.partial().optional(),
});
export type TopicUpdateInput = z.infer<typeof topicUpdateSchema>;

export const topicVersionCreateSchema = z.object({
  topic_slug: z.string().min(1).max(200),
  version: z.number().int().nonnegative(),
  editor: z.string().min(1).max(200),
  changes: z.string().min(1).max(1000),
  content_json: topicContentSchema,
  review_status: ReviewStatusEnum.default("draft"),
  confidence_level: ConfidenceLevelEnum.default("medium"),
});
export type TopicVersionCreateInput = z.infer<typeof topicVersionCreateSchema>;

// ---------------------------------------------------------------------------
// 4. Legal source schemas
// ---------------------------------------------------------------------------

export const legalSourceCreateSchema = z.object({
  source_type: SourceTypeEnum,
  title_ar: z.string().min(1, "Arabic title is required").max(500),
  title_en: z.string().min(1, "English title is required").max(500),
  reference_number: z.string().min(1, "Reference number is required").max(200),
  article_number: z.string().min(1, "Article number is required").max(200),
  effective_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  source_url: z.string().url("Invalid URL").optional(),
});
export type LegalSourceCreateInput = z.infer<typeof legalSourceCreateSchema>;

export const sourceDocumentCreateSchema = z.object({
  legal_source_id: z.string().uuid("Invalid legal source ID"),
  file_name: z.string().min(1).max(255),
  file_url: z.string().url("Invalid file URL"),
  file_type: z.enum(["pdf", "docx", "txt", "html"]),
  file_size_bytes: z.number().int().positive().max(50 * 1024 * 1024), // 50 MB max
  language: LocaleEnum,
});
export type SourceDocumentCreateInput = z.infer<typeof sourceDocumentCreateSchema>;

export const ingestionJobCreateSchema = z.object({
  legal_source_id: z.string().uuid("Invalid legal source ID"),
  source_document_id: z.string().uuid("Invalid source document ID"),
  job_type: z.enum(["text_extraction", "chunking", "embedding", "full_pipeline"]),
  priority: z.enum(["low", "normal", "high"]).default("normal"),
});
export type IngestionJobCreateInput = z.infer<typeof ingestionJobCreateSchema>;

// ---------------------------------------------------------------------------
// 5. RAG schemas
// ---------------------------------------------------------------------------

export const ragChunkSchema = z.object({
  chunk_id: z.string().uuid(),
  legal_source_id: z.string().uuid().optional(),
  topic_slug: z.string().max(200).optional(),
  content: z.string().min(1).max(8000),
  embedding_model: z.string().max(100).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
export type RagChunkInput = z.infer<typeof ragChunkSchema>;

export const ragAskRequestSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message must not exceed 5000 characters"),
  locale: LocaleEnum.default("ar"),
  conversation_id: z.string().uuid().optional(),
  practice_area: PracticeAreaEnum.optional(),
});
export type RagAskRequestInput = z.infer<typeof ragAskRequestSchema>;

export const ragSourceSchema = z.object({
  law_name_ar: z.string(),
  law_name_en: z.string(),
  article: z.string(),
  source_url: z.string().url().optional(),
  confidence: ConfidenceLevelEnum,
});

export const relatedTopicSchema = z.object({
  slug: z.string(),
  title_ar: z.string(),
  title_en: z.string(),
  practice_area: PracticeAreaEnum,
});

export const ragAskResponseSchema = z.object({
  answer_text: z.string().min(1),
  language: LocaleEnum,
  practice_area: PracticeAreaEnum.optional(),
  related_topics: z.array(relatedTopicSchema).max(10),
  sources: z.array(ragSourceSchema).max(20),
  disclaimer: z.string(),
  confidence: ConfidenceLevelEnum,
  needs_lawyer: z.boolean(),
  follow_up_suggestions: z.array(z.string().max(300)).max(5),
  conversation_id: z.string().uuid(),
  tokens_used: z.number().int().nonnegative().optional(),
});
export type RagAskResponse = z.infer<typeof ragAskResponseSchema>;

// ---------------------------------------------------------------------------
// 6. Lawyer schemas
// ---------------------------------------------------------------------------

export const lawyerProfileCreateSchema = z.object({
  name_ar: z.string().min(1, "Arabic name is required").max(200),
  name_en: z.string().min(1, "English name is required").max(200),
  membership_id: z.string().min(1, "Bar membership ID is required").max(100),
  practice_areas: z
    .array(PracticeAreaEnum)
    .min(1, "At least one practice area required"),
  governorates: z.array(z.string().min(1).max(100)).min(1, "At least one governorate"),
  languages: z.array(z.string().min(1).max(50)).min(1, "At least one language"),
  service_types: z.array(z.string().min(1).max(100)).min(1, "At least one service type"),
  pricing: z.string().max(500).optional(),
  bio_ar: z.string().min(1, "Arabic bio is required").max(3000),
  bio_en: z.string().min(1, "English bio is required").max(3000),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number")
    .optional(),
  email: z.string().email("Invalid email").optional(),
  profile_image: z.string().url("Invalid URL").optional(),
  years_experience: z.number().int().nonnegative().max(60),
});
export type LawyerProfileCreateInput = z.infer<typeof lawyerProfileCreateSchema>;

export const lawyerVerificationApplicationSchema = z.object({
  lawyer_id: z.string().uuid("Invalid lawyer ID"),
  membership_id: z.string().min(1).max(100),
  document_url: z.string().url("Invalid document URL"),
  document_type: z.enum(["bar_certificate", "national_id", "other"]),
  notes: z.string().max(2000).optional(),
});
export type LawyerVerificationApplicationInput = z.infer<typeof lawyerVerificationApplicationSchema>;

export const lawyerContactRequestSchema = z.object({
  lawyer_id: z.string().uuid("Invalid lawyer ID"),
  user_name: z.string().min(2, "Name is required").max(200),
  user_email: z.string().email("Invalid email address"),
  user_phone: z
    .string()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number")
    .min(1, "Phone number is required"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message must not exceed 3000 characters"),
  topic_summary: z.string().max(500).optional(),
  preferred_language: LocaleEnum.default("ar"),
  privacy_consent_id: z.string().uuid("Privacy consent is required"),
});
export type LawyerContactRequestInput = z.infer<typeof lawyerContactRequestSchema>;

export const lawyerVerificationReviewSchema = z.object({
  application_id: z.string().uuid("Invalid application ID"),
  reviewer_id: z.string().uuid("Invalid reviewer ID"),
  decision: z.enum(["approved", "rejected"]),
  rejection_reason: z
    .string()
    .min(1, "Rejection reason is required when rejecting")
    .max(2000)
    .optional(),
}).refine(
  (data) => data.decision === "approved" || (data.decision === "rejected" && data.rejection_reason),
  { message: "Rejection reason is required when rejecting an application", path: ["rejection_reason"] },
);
export type LawyerVerificationReviewInput = z.infer<typeof lawyerVerificationReviewSchema>;

// ---------------------------------------------------------------------------
// 7. Privacy schemas
// ---------------------------------------------------------------------------

export const privacyConsentCreateSchema = z.object({
  user_id: z.string().uuid("Invalid user ID"),
  consent_type: ConsentTypeEnum,
  consent_text_ar: z.string().min(1, "Arabic consent text is required").max(5000),
  consent_text_en: z.string().min(1, "English consent text is required").max(5000),
  is_given: z.boolean(),
  ip_address: z
    .string()
    .regex(
      /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$|^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/,
      "Invalid IP address",
    )
    .optional(),
});
export type PrivacyConsentCreateInput = z.infer<typeof privacyConsentCreateSchema>;

export const privacyRequestCreateSchema = z.object({
  user_id: z.string().uuid("Invalid user ID"),
  request_type: PrivacyRequestTypeEnum,
  details: z.string().max(3000).optional(),
  identity_verification_token: z.string().min(1, "Identity verification token is required"),
});
export type PrivacyRequestCreateInput = z.infer<typeof privacyRequestCreateSchema>;

// ---------------------------------------------------------------------------
// 8. Visualization schemas
// ---------------------------------------------------------------------------

export const infographicItemSchema = z.object({
  label_ar: z.string().min(1).max(300),
  label_en: z.string().min(1).max(300),
  value: z.string().max(500).optional(),
  icon: z.string().max(50).optional(),
  highlight: z.boolean().optional(),
});

export const infographicSectionSchema = z.object({
  number: z.number().int().positive(),
  title_ar: z.string().min(1).max(200),
  title_en: z.string().min(1).max(200),
  icon: z.string().max(50).optional(),
  layout: ChartLayoutEnum.default("vertical_list"),
  items: z.array(infographicItemSchema).min(1, "At least one item required"),
  columns: z.number().int().min(1).max(6).optional(),
});

export const infographicSourceSchema = z.object({
  label: z.string().min(1).max(300),
  reference: z.string().min(1).max(500),
  url: z.string().url("Invalid URL").optional(),
});

export const infographicSpecSchema = z.object({
  language: LocaleEnum,
  direction: z.enum(["ltr", "rtl"]),
  jurisdiction: z.string().min(1).max(300),
  template: z.enum(["standard", "urgent", "comparison", "checklist"]).default("standard"),
  title_ar: z.string().min(1).max(300),
  title_en: z.string().min(1).max(300),
  subtitle_ar: z.string().max(500).optional(),
  subtitle_en: z.string().max(500).optional(),
  urgency: UrgencyEnum.optional(),
  sections: z.array(infographicSectionSchema).min(1, "At least one section required"),
  sources: z.array(infographicSourceSchema).max(20).optional(),
  disclaimer_ar: z.string().max(2000).optional(),
  disclaimer_en: z.string().max(2000).optional(),
  last_reviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  branding: z
    .object({
      primary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color").optional(),
      logo_url: z.string().url("Invalid URL").optional(),
    })
    .optional(),
});
export type InfographicSpecInput = z.infer<typeof infographicSpecSchema>;

export const visualizationCreateSchema = z.object({
  topic_slug: z.string().min(1).max(200),
  visualization_type: VisualizationTypeEnum,
  spec: infographicSpecSchema,
  requested_by: z.string().uuid().optional(),
});
export type VisualizationCreateInput = z.infer<typeof visualizationCreateSchema>;

export const visualizationRenderSchema = z.object({
  visualization_id: z.string().uuid("Invalid visualization ID"),
  output_format: z.enum(["png", "svg", "pdf", "html"]).default("png"),
  width: z.number().int().min(320).max(4096).default(1080),
  height: z.number().int().min(320).max(8192).optional(),
  scale: z.number().min(1).max(4).default(2),
  quality: z.number().int().min(1).max(100).default(90),
});
export type VisualizationRenderInput = z.infer<typeof visualizationRenderSchema>;

// ---------------------------------------------------------------------------
// 9. Search schemas
// ---------------------------------------------------------------------------

export const searchRequestSchema = z.object({
  query: z
    .string()
    .min(1, "Search query is required")
    .max(500, "Search query must not exceed 500 characters"),
  locale: LocaleEnum.default("ar"),
  filters: z
    .object({
      practice_area: PracticeAreaEnum.optional(),
      audience: AudienceEnum.optional(),
      urgency: UrgencyEnum.optional(),
      date_from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      date_to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      language: LocaleEnum.optional(),
    })
    .optional(),
  page: z.number().int().positive().default(1),
  page_size: z.number().int().min(1).max(50).default(10),
});
export type SearchRequestInput = z.infer<typeof searchRequestSchema>;

// ---------------------------------------------------------------------------
// 10. Admin schemas
// ---------------------------------------------------------------------------

export const featureFlagCreateSchema = z.object({
  key: z
    .string()
    .min(1, "Flag key is required")
    .max(100)
    .regex(/^[a-z][a-z0-9_]*$/, "Key must be snake_case"),
  description: z.string().min(1).max(500),
  enabled: z.boolean().default(false),
  allowed_roles: z.array(UserRoleEnum).optional(),
  percentage_rollout: z.number().min(0).max(100).optional(),
  expires_at: z.string().datetime().optional(),
});
export type FeatureFlagCreateInput = z.infer<typeof featureFlagCreateSchema>;

export const userSuspensionSchema = z.object({
  user_id: z.string().uuid("Invalid user ID"),
  reason: z
    .string()
    .min(10, "Reason must be at least 10 characters")
    .max(2000, "Reason must not exceed 2000 characters"),
  duration_days: z
    .number()
    .int()
    .positive()
    .max(365)
    .optional()
    .describe("Optional; omit for indefinite suspension"),
  suspended_by: z.string().uuid("Invalid admin user ID"),
});
export type UserSuspensionInput = z.infer<typeof userSuspensionSchema>;

// ---------------------------------------------------------------------------
// 11. Analytics schemas
// ---------------------------------------------------------------------------

export const topicAnalyticsEventSchema = z.object({
  event_type: z.enum([
    "page_view",
    "topic_read",
    "faq_expanded",
    "search_performed",
    "chat_started",
    "lawyer_contacted",
    "share_clicked",
    "feedback_submitted",
    "visualization_viewed",
  ]),
  topic_slug: z.string().min(1).max(200),
  user_id: z.string().uuid().optional(),
  session_id: z.string().uuid().optional(),
  locale: LocaleEnum.optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  timestamp: z.string().datetime().optional(),
});
export type TopicAnalyticsEventInput = z.infer<typeof topicAnalyticsEventSchema>;
