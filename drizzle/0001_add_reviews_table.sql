-- Reviews / Testimonials table — Google-style guest reviews
-- Run this on your existing Neon database.
-- Safe to run multiple times (uses IF NOT EXISTS).

CREATE TABLE IF NOT EXISTS "reviews" (
	"id" serial PRIMARY KEY NOT NULL,

	-- Reviewer info
	"author_name" varchar(255) NOT NULL,
	"author_email" varchar(255),
	"author_phone" varchar(50),
	"author_country" varchar(100),
	"author_country_code" varchar(2),
	"author_photo_url" varchar(500),

	-- Review content
	"rating" integer NOT NULL,
	"title" varchar(255),
	"body" text NOT NULL,
	"language" varchar(5) DEFAULT 'en',

	-- Tour reference
	"tour_slug" varchar(255),
	"tour_name" varchar(255),
	"service_type" varchar(50),

	-- Photos (JSON array)
	"photos" jsonb DEFAULT '[]'::jsonb,

	-- Moderation
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"moderated_at" timestamp,
	"moderated_by" varchar(100),
	"rejection_reason" text,

	-- Source tracking
	"source" varchar(50) DEFAULT 'website',
	"ip_address" inet,
	"user_agent" text,

	-- Google integration (for future sync)
	"google_review_id" varchar(255),
	"google_review_url" varchar(500),
	"synced_to_google" boolean DEFAULT false,

	-- Engagement
	"helpful_count" integer DEFAULT 0,
	"is_featured" boolean DEFAULT false,
	"is_verified" boolean DEFAULT false,

	-- Owner response
	"owner_response" text,
	"owner_responded_at" timestamp,

	-- Timestamps
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),

	-- Rating must be between 1 and 5
	CONSTRAINT "reviews_rating_check" CHECK (rating >= 1 AND rating <= 5),
	CONSTRAINT "reviews_status_check" CHECK (status IN ('pending', 'approved', 'rejected', 'spam'))
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS "idx_reviews_status" ON "reviews"("status");
CREATE INDEX IF NOT EXISTS "idx_reviews_language" ON "reviews"("language");
CREATE INDEX IF NOT EXISTS "idx_reviews_tour_slug" ON "reviews"("tour_slug");
CREATE INDEX IF NOT EXISTS "idx_reviews_created_at" ON "reviews"("created_at" DESC);
CREATE INDEX IF NOT EXISTS "idx_reviews_featured" ON "reviews"("is_featured") WHERE "is_featured" = true;

-- Comment for documentation
COMMENT ON TABLE "reviews" IS 'Customer reviews and testimonials. Style mirrors Google Business Profile reviews. The google_review_id column is reserved for future Google API sync.';
