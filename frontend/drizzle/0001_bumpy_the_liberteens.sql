CREATE TABLE "lawyer_info" (
	"user_id" text NOT NULL,
	"specialization" text NOT NULL,
	"experience" real NOT NULL,
	"fees" integer NOT NULL,
	"rating" real,
	"review_count" integer,
	"bio" text,
	"tags" text
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone_number" text;--> statement-breakpoint
ALTER TABLE "lawyer_info" ADD CONSTRAINT "lawyer_info_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;