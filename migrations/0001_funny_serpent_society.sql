CREATE TABLE IF NOT EXISTS "categories_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories_to_posts_table" (
	"categorie_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	CONSTRAINT "categories_to_posts_table_categorie_id_post_id_pk" PRIMARY KEY("categorie_id","post_id")
);
--> statement-breakpoint
ALTER TABLE "posts_table" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories_to_posts_table" ADD CONSTRAINT "categories_to_posts_table_categorie_id_categories_table_id_fk" FOREIGN KEY ("categorie_id") REFERENCES "categories_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories_to_posts_table" ADD CONSTRAINT "categories_to_posts_table_post_id_posts_table_id_fk" FOREIGN KEY ("post_id") REFERENCES "posts_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
