-- =============================================================================
-- Ask Wakeely Pro — PostgreSQL Database Schema
-- Jordanian Legal Knowledge Platform
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Uncomment when the pgvector extension is installed on the database server.
-- CREATE EXTENSION IF NOT EXISTS vector;

-- ---------------------------------------------------------------------------
-- Helper: auto-update updated_at on row modification
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- 1. users
-- =============================================================================

CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           TEXT UNIQUE,
    phone           TEXT UNIQUE,
    display_name    TEXT NOT NULL,
    avatar_url      TEXT,
    role            TEXT NOT NULL DEFAULT 'user'
                        CHECK (role IN (
                            'user',
                            'lawyer',
                            'support_agent',
                            'legal_editor',
                            'legal_reviewer',
                            'privacy_officer',
                            'admin',
                            'super_admin'
                        )),
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_users_email    ON users (email);
CREATE INDEX idx_users_phone    ON users (phone);
CREATE INDEX idx_users_role     ON users (role);

-- =============================================================================
-- 2. user_identities  (OAuth / magic-link)
-- =============================================================================

CREATE TABLE user_identities (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider        TEXT NOT NULL CHECK (provider IN ('google', 'apple', 'email')),
    provider_uid    TEXT NOT NULL,
    provider_email  TEXT,
    access_token    TEXT,
    refresh_token   TEXT,
    expires_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (provider, provider_uid)
);

CREATE TRIGGER trg_user_identities_updated_at
    BEFORE UPDATE ON user_identities
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_user_identities_user_id   ON user_identities (user_id);
CREATE INDEX idx_user_identities_provider  ON user_identities (provider, provider_uid);

-- =============================================================================
-- 3. practice_areas  (seed data for the 6 areas)
-- =============================================================================

CREATE TABLE practice_areas (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug            TEXT UNIQUE NOT NULL,
    name_ar         TEXT NOT NULL,
    name_en         TEXT NOT NULL,
    description_ar  TEXT,
    description_en  TEXT,
    display_order   INTEGER NOT NULL DEFAULT 0,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_practice_areas_updated_at
    BEFORE UPDATE ON practice_areas
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

INSERT INTO practice_areas (slug, name_ar, name_en, description_ar, description_en, display_order)
VALUES
    ('labor',      'القانون العمالي',       'Labor Law',       'الشروط العمالية وحقوق الموظفين والعقود',       'Employment terms, worker rights, and contracts',       1),
    ('rent',       'قانون الإيجارات',        'Rent Law',        'إيجارات الشقق والمحلات التجارية وحقوق المستأجرين',  'Apartment and shop leases, tenant rights',            2),
    ('family',     'قانون الأحوال الشخصية', 'Family Law',      'الزواج والطلاق والنفقة والحضانة والميراث',       'Marriage, divorce, custody, alimony, and inheritance', 3),
    ('debt',       'قانون الديون',           'Debt Law',        'الديون والقروض والدفع الإجباري وإعلان الإفلاس',       'Debts, loans, enforced payments, and bankruptcies',   4),
    ('traffic',    'قانون المرور',           'Traffic Law',     'المخالفات المرورية و رخص القيادة والحوادث',       'Traffic violations, driving licenses, and accidents',  5),
    ('cybercrime', 'جرائم المعلومات',        'Cybercrime Law',  'الجرائم الإلكترونية وحماية البيانات والخصوصية',    'Cyber crimes, data protection, and privacy',          6);

-- =============================================================================
-- 4. topics
-- =============================================================================

CREATE TABLE topics (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practice_area_id UUID NOT NULL REFERENCES practice_areas(id) ON DELETE RESTRICT,
    slug            TEXT UNIQUE NOT NULL,
    title_ar        TEXT NOT NULL,
    title_en        TEXT NOT NULL,
    summary_ar      TEXT,
    summary_en      TEXT,
    urgency         TEXT NOT NULL DEFAULT 'normal'
                        CHECK (urgency IN ('low', 'normal', 'high', 'critical')),
    risk_level      TEXT NOT NULL DEFAULT 'low'
                        CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    view_count      INTEGER NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_topics_updated_at
    BEFORE UPDATE ON topics
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_topics_practice_area_id  ON topics (practice_area_id);
CREATE INDEX idx_topics_urgency           ON topics (urgency);
CREATE INDEX idx_topics_risk_level        ON topics (risk_level);
CREATE INDEX idx_topics_is_active         ON topics (is_active) WHERE is_active = TRUE;
CREATE INDEX idx_topics_slug              ON topics (slug);

-- =============================================================================
-- 5. topic_versions  (content JSONB, review workflow)
-- =============================================================================

CREATE TABLE topic_versions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id        UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    version_number  INTEGER NOT NULL DEFAULT 1,
    content_json    JSONB NOT NULL,
    review_status   TEXT NOT NULL DEFAULT 'draft'
                        CHECK (review_status IN (
                            'draft',
                            'pending_review',
                            'approved',
                            'published',
                            'archived'
                        )),
    confidence_level NUMERIC(3,2) CHECK (confidence_level >= 0 AND confidence_level <= 1),
    reviewed_by     UUID REFERENCES users(id) ON DELETE SET NULL,
    published_at    TIMESTAMPTZ,
    is_current      BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (topic_id, version_number)
);

CREATE TRIGGER trg_topic_versions_updated_at
    BEFORE UPDATE ON topic_versions
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_topic_versions_topic_id       ON topic_versions (topic_id);
CREATE INDEX idx_topic_versions_review_status  ON topic_versions (review_status);
CREATE INDEX idx_topic_versions_is_current     ON topic_versions (topic_id, is_current)
    WHERE is_current = TRUE;

-- =============================================================================
-- 6. legal_sources
-- =============================================================================

CREATE TABLE legal_sources (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_type         TEXT NOT NULL CHECK (source_type IN (
                            'law',
                            'regulation',
                            'cabinet_decision',
                            'court_ruling',
                            'legal_opinion',
                            'article',
                            'other'
                        )),
    title_ar            TEXT NOT NULL,
    title_en            TEXT,
    official_number     TEXT,
    issuing_authority   TEXT,
    issued_date         DATE,
    effective_date      DATE,
    language            TEXT NOT NULL DEFAULT 'ar' CHECK (language IN ('ar', 'en', 'both')),
    is_verified         BOOLEAN NOT NULL DEFAULT FALSE,
    verified_by         UUID REFERENCES users(id) ON DELETE SET NULL,
    verified_at         TIMESTAMPTZ,
    original_url        TEXT,
    notes               TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_legal_sources_updated_at
    BEFORE UPDATE ON legal_sources
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_legal_sources_source_type  ON legal_sources (source_type);
CREATE INDEX idx_legal_sources_is_verified  ON legal_sources (is_verified);

-- =============================================================================
-- 7. source_documents
-- =============================================================================

CREATE TABLE source_documents (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    legal_source_id         UUID NOT NULL REFERENCES legal_sources(id) ON DELETE CASCADE,
    file_name               TEXT NOT NULL,
    storage_path            TEXT NOT NULL,
    mime_type               TEXT,
    file_size_bytes         BIGINT,
    language                TEXT NOT NULL DEFAULT 'ar',
    extraction_status       TEXT NOT NULL DEFAULT 'pending'
                                CHECK (extraction_status IN (
                                    'pending',
                                    'processing',
                                    'completed',
                                    'failed'
                                )),
    ingestion_status        TEXT NOT NULL DEFAULT 'pending'
                                CHECK (ingestion_status IN (
                                    'pending',
                                    'processing',
                                    'completed',
                                    'failed'
                                )),
    eligible_for_production BOOLEAN NOT NULL DEFAULT FALSE,
    error_message           TEXT,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_source_documents_updated_at
    BEFORE UPDATE ON source_documents
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_source_documents_legal_source_id        ON source_documents (legal_source_id);
CREATE INDEX idx_source_documents_extraction_status      ON source_documents (extraction_status);
CREATE INDEX idx_source_documents_ingestion_status       ON source_documents (ingestion_status);
CREATE INDEX idx_source_documents_eligible_for_production ON source_documents (eligible_for_production)
    WHERE eligible_for_production = TRUE;

-- =============================================================================
-- 8. ingestion_jobs
-- =============================================================================

CREATE TABLE ingestion_jobs (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_document_id  UUID NOT NULL REFERENCES source_documents(id) ON DELETE CASCADE,
    job_type            TEXT NOT NULL CHECK (job_type IN (
                            'extract',
                            'ocr',
                            'chunk',
                            'embed',
                            'reindex',
                            'delete_index'
                        )),
    status              TEXT NOT NULL DEFAULT 'pending'
                            CHECK (status IN (
                                'pending',
                                'running',
                                'completed',
                                'failed'
                            )),
    started_at          TIMESTAMPTZ,
    completed_at        TIMESTAMPTZ,
    error_message       TEXT,
    retry_count         INTEGER NOT NULL DEFAULT 0,
    payload_json        JSONB,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_ingestion_jobs_updated_at
    BEFORE UPDATE ON ingestion_jobs
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_ingestion_jobs_source_document_id ON ingestion_jobs (source_document_id);
CREATE INDEX idx_ingestion_jobs_job_type           ON ingestion_jobs (job_type);
CREATE INDEX idx_ingestion_jobs_status             ON ingestion_jobs (status);

-- =============================================================================
-- 9. topic_legal_sources  (junction)
-- =============================================================================

CREATE TABLE topic_legal_sources (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id        UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    legal_source_id UUID NOT NULL REFERENCES legal_sources(id) ON DELETE CASCADE,
    relevance_note  TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (topic_id, legal_source_id)
);

CREATE INDEX idx_topic_legal_sources_topic_id        ON topic_legal_sources (topic_id);
CREATE INDEX idx_topic_legal_sources_legal_source_id ON topic_legal_sources (legal_source_id);

-- =============================================================================
-- 10. rag_chunks
-- =============================================================================

CREATE TABLE rag_chunks (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_document_id      UUID NOT NULL REFERENCES source_documents(id) ON DELETE CASCADE,
    legal_source_id         UUID NOT NULL REFERENCES legal_sources(id) ON DELETE CASCADE,
    chunk_index             INTEGER NOT NULL,
    content_text            TEXT NOT NULL,
    content_hash            TEXT,
    token_count             INTEGER,
    -- embedding vector(1024)   -- Uncomment after pgvector is enabled
    metadata_json           JSONB,
    eligible_for_production BOOLEAN NOT NULL DEFAULT FALSE,
    human_reviewed          BOOLEAN NOT NULL DEFAULT FALSE,
    reviewed_by             UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_rag_chunks_updated_at
    BEFORE UPDATE ON rag_chunks
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_rag_chunks_source_document_id      ON rag_chunks (source_document_id);
CREATE INDEX idx_rag_chunks_legal_source_id         ON rag_chunks (legal_source_id);
CREATE INDEX idx_rag_chunks_eligible_for_production ON rag_chunks (eligible_for_production)
    WHERE eligible_for_production = TRUE;
CREATE INDEX idx_rag_chunks_human_reviewed          ON rag_chunks (human_reviewed)
    WHERE human_reviewed = FALSE;
CREATE INDEX idx_rag_chunks_content_hash            ON rag_chunks (content_hash);

-- After pgvector is enabled, create the ANN index:
-- CREATE INDEX idx_rag_chunks_embedding ON rag_chunks
--     USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- =============================================================================
-- 11. legal_answers
-- =============================================================================

CREATE TABLE legal_answers (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID REFERENCES users(id) ON DELETE SET NULL,
    question_text       TEXT NOT NULL,
    answer_text         TEXT NOT NULL,
    classification_json JSONB,
    retrieved_chunk_ids UUID[],
    source_ids          UUID[],
    disclaimer          TEXT,
    risk_level          TEXT NOT NULL DEFAULT 'low'
                            CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
    requires_lawyer     BOOLEAN NOT NULL DEFAULT FALSE,
    feedback_rating     INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
    feedback_comment    TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_legal_answers_updated_at
    BEFORE UPDATE ON legal_answers
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_legal_answers_user_id         ON legal_answers (user_id);
CREATE INDEX idx_legal_answers_risk_level      ON legal_answers (risk_level);
CREATE INDEX idx_legal_answers_requires_lawyer ON legal_answers (requires_lawyer)
    WHERE requires_lawyer = TRUE;
CREATE INDEX idx_legal_answers_created_at      ON legal_answers (created_at DESC);

-- =============================================================================
-- 12. lawyers
-- =============================================================================

CREATE TABLE lawyers (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                 UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    bar_number              TEXT UNIQUE NOT NULL,
    full_name_ar            TEXT NOT NULL,
    full_name_en            TEXT,
    phone                   TEXT,
    practice_areas          TEXT[],
    years_of_experience     INTEGER CHECK (years_of_experience >= 0),
    bio_ar                  TEXT,
    bio_en                  TEXT,
    verification_status     TEXT NOT NULL DEFAULT 'pending'
                                CHECK (verification_status IN (
                                    'pending',
                                    'approved',
                                    'rejected',
                                    'suspended'
                                )),
    verified_at             TIMESTAMPTZ,
    verified_by             UUID REFERENCES users(id) ON DELETE SET NULL,
    is_displayed            BOOLEAN NOT NULL DEFAULT FALSE,
    complaints_count        INTEGER NOT NULL DEFAULT 0,
    complaint_policy_json   JSONB,
    conflict_policy_json    JSONB,
    rating_avg              NUMERIC(3,2) CHECK (rating_avg >= 0 AND rating_avg <= 5),
    total_ratings           INTEGER NOT NULL DEFAULT 0,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_lawyers_updated_at
    BEFORE UPDATE ON lawyers
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_lawyers_user_id             ON lawyers (user_id);
CREATE INDEX idx_lawyers_bar_number          ON lawyers (bar_number);
CREATE INDEX idx_lawyers_verification_status ON lawyers (verification_status);
CREATE INDEX idx_lawyers_is_displayed        ON lawyers (is_displayed)
    WHERE is_displayed = TRUE;

-- =============================================================================
-- 13. lawyer_verification_applications
-- =============================================================================

CREATE TABLE lawyer_verification_applications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lawyer_id       UUID NOT NULL REFERENCES lawyers(id) ON DELETE CASCADE,
    bar_number      TEXT NOT NULL,
    full_name_ar    TEXT NOT NULL,
    full_name_en    TEXT,
    phone           TEXT,
    documents_json  JSONB,
    status          TEXT NOT NULL DEFAULT 'pending'
                        CHECK (status IN (
                            'pending',
                            'under_review',
                            'approved',
                            'rejected'
                        )),
    reviewed_by     UUID REFERENCES users(id) ON DELETE SET NULL,
    reviewer_notes  TEXT,
    submitted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_lawyer_verification_applications_updated_at
    BEFORE UPDATE ON lawyer_verification_applications
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_lva_lawyer_id ON lawyer_verification_applications (lawyer_id);
CREATE INDEX idx_lva_status    ON lawyer_verification_applications (status);

-- =============================================================================
-- 14. privacy_consents
-- =============================================================================

CREATE TABLE privacy_consents (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consent_type    TEXT NOT NULL CHECK (consent_type IN (
                        'terms_of_service',
                        'privacy_policy',
                        'marketing',
                        'analytics',
                        'third_party_sharing'
                    )),
    consent_text_ar TEXT,
    consent_text_en TEXT,
    is_given        BOOLEAN NOT NULL DEFAULT FALSE,
    given_at        TIMESTAMPTZ,
    withdrawn_at    TIMESTAMPTZ,
    ip_address      INET,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, consent_type)
);

CREATE TRIGGER trg_privacy_consents_updated_at
    BEFORE UPDATE ON privacy_consents
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_privacy_consents_user_id      ON privacy_consents (user_id);
CREATE INDEX idx_privacy_consents_consent_type ON privacy_consents (consent_type);
CREATE INDEX idx_privacy_consents_is_given     ON privacy_consents (is_given);

-- =============================================================================
-- 15. lawyer_contact_requests
-- =============================================================================

CREATE TABLE lawyer_contact_requests (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lawyer_id           UUID NOT NULL REFERENCES lawyers(id) ON DELETE CASCADE,
    privacy_consent_id  UUID REFERENCES privacy_consents(id) ON DELETE SET NULL,
    message_text        TEXT,
    status              TEXT NOT NULL DEFAULT 'pending'
                            CHECK (status IN (
                                'pending',
                                'contacted',
                                'accepted',
                                'declined',
                                'expired'
                            )),
    responded_at        TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_lawyer_contact_requests_updated_at
    BEFORE UPDATE ON lawyer_contact_requests
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_lcr_user_id   ON lawyer_contact_requests (user_id);
CREATE INDEX idx_lcr_lawyer_id ON lawyer_contact_requests (lawyer_id);
CREATE INDEX idx_lcr_status    ON lawyer_contact_requests (status);

-- =============================================================================
-- 16. privacy_requests  (GDPR-style data-subject requests)
-- =============================================================================

CREATE TABLE privacy_requests (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    request_type    TEXT NOT NULL CHECK (request_type IN (
                        'access',
                        'correction',
                        'erasure',
                        'export',
                        'restriction',
                        'objection'
                    )),
    description     TEXT,
    status          TEXT NOT NULL DEFAULT 'pending'
                        CHECK (status IN (
                            'pending',
                            'in_progress',
                            'completed',
                            'rejected'
                        )),
    processed_by    UUID REFERENCES users(id) ON DELETE SET NULL,
    notes           TEXT,
    completed_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_privacy_requests_updated_at
    BEFORE UPDATE ON privacy_requests
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_privacy_requests_user_id      ON privacy_requests (user_id);
CREATE INDEX idx_privacy_requests_request_type ON privacy_requests (request_type);
CREATE INDEX idx_privacy_requests_status       ON privacy_requests (status);

-- =============================================================================
-- 17. visualizations  (infographics / charts)
-- =============================================================================

CREATE TABLE visualizations (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id            UUID REFERENCES topics(id) ON DELETE SET NULL,
    title_ar            TEXT NOT NULL,
    title_en            TEXT,
    infographic_spec    JSONB NOT NULL,
    rendered_image_path TEXT,
    rendered_pdf_path   TEXT,
    status              TEXT NOT NULL DEFAULT 'draft'
                            CHECK (status IN (
                                'draft',
                                'rendering',
                                'completed',
                                'failed'
                            )),
    error_message       TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_visualizations_updated_at
    BEFORE UPDATE ON visualizations
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_visualizations_topic_id ON visualizations (topic_id);
CREATE INDEX idx_visualizations_status   ON visualizations (status);

-- =============================================================================
-- 18. unanswered_questions  (content-gap tracking)
-- =============================================================================

CREATE TABLE unanswered_questions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id) ON DELETE SET NULL,
    question_text   TEXT NOT NULL,
    practice_area_id UUID REFERENCES practice_areas(id) ON DELETE SET NULL,
    frequency       INTEGER NOT NULL DEFAULT 1,
    is_addressed    BOOLEAN NOT NULL DEFAULT FALSE,
    addressed_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_unanswered_questions_updated_at
    BEFORE UPDATE ON unanswered_questions
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_unanswered_questions_practice_area_id ON unanswered_questions (practice_area_id);
CREATE INDEX idx_unanswered_questions_is_addressed     ON unanswered_questions (is_addressed)
    WHERE is_addressed = FALSE;
CREATE INDEX idx_unanswered_questions_frequency        ON unanswered_questions (frequency DESC);

-- =============================================================================
-- 19. topic_analytics  (event tracking)
-- =============================================================================

CREATE TABLE topic_analytics (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id        UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    user_id         UUID REFERENCES users(id) ON DELETE SET NULL,
    event_type      TEXT NOT NULL CHECK (event_type IN (
                        'view',
                        'share',
                        'bookmark',
                        'feedback_positive',
                        'feedback_negative',
                        'contact_lawyer'
                    )),
    metadata_json   JSONB,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_topic_analytics_topic_id    ON topic_analytics (topic_id);
CREATE INDEX idx_topic_analytics_user_id     ON topic_analytics (user_id);
CREATE INDEX idx_topic_analytics_event_type  ON topic_analytics (event_type);
CREATE INDEX idx_topic_analytics_created_at  ON topic_analytics (created_at DESC);

-- =============================================================================
-- 20. audit_logs
-- =============================================================================

CREATE TABLE audit_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id        UUID REFERENCES users(id) ON DELETE SET NULL,
    actor_email     TEXT,
    action          TEXT NOT NULL,
    entity_type     TEXT NOT NULL,
    entity_id       UUID,
    old_values      JSONB,
    new_values      JSONB,
    ip_address      INET,
    user_agent      TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_actor_id     ON audit_logs (actor_id);
CREATE INDEX idx_audit_logs_entity       ON audit_logs (entity_type, entity_id);
CREATE INDEX idx_audit_logs_action       ON audit_logs (action);
CREATE INDEX idx_audit_logs_created_at   ON audit_logs (created_at DESC);

-- =============================================================================
-- End of schema
-- =============================================================================
