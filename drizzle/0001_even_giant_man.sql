CREATE TYPE "public"."vehicleType" AS ENUM('BICYCLE', 'BIKE', 'CAR', 'VAN', 'TRUCK', 'TRAILER', 'BUS');
--> statement-breakpoint
CREATE TYPE "public"."goodsType" AS ENUM('GROCERIES', 'FOOD', 'BEVERAGES', 'ELECTRONICS', 'CLOTHING', 'PHARMACEUTICALS', 'DOCUMENT', 'OTHER');
--> statement-breakpoint
CREATE TABLE "vehicle" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"riderId" uuid,
	"vehicleType" "vehicleType" NOT NULL,
	"goodsType" "goodsType" NOT NULL,
	"selfie" text NOT NULL,
	"vehicleImage" text NOT NULL,
	"licenseImage" text NOT NULL,
	"plateNumber" varchar(255) NOT NULL,
	"vehicleModel" varchar(255) NOT NULL,
	"isApproved" boolean DEFAULT false NOT NULL,
	"rejectionReason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_riderId_rider_id_fk" FOREIGN KEY ("riderId") REFERENCES "public"."rider"("id") ON DELETE no action ON UPDATE no action;