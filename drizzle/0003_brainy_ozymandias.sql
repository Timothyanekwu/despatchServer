CREATE TYPE "public"."deliveryStatus" AS ENUM('Pending', 'Accepted', 'In_transit', 'Delivered', 'Cancelled');
--> statement-breakpoint
CREATE TYPE "public"."productCategory" AS ENUM('GROCERIES', 'FOOD', 'BEVERAGES', 'ELECTRONICS', 'CLOTHING', 'PHARMACEUTICALS', 'DOCUMENT', 'OTHER');
--> statement-breakpoint
CREATE TYPE "public"."paymentType" AS ENUM('ONLINE', 'COD');
--> statement-breakpoint
CREATE TABLE "delivery" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"riderId" uuid,
	"vehicleId" uuid,
	"productName" varchar(255) NOT NULL,
	"productDescription" text,
	"productImage" text NOT NULL,
	"productCategory" "productCategory" NOT NULL,
	"pickupAddress" text NOT NULL,
	"deliveryAddress" text NOT NULL,
	"deliveryStatus" "deliveryStatus" DEFAULT 'Pending',
	"price" integer NOT NULL,
	"paymentType" "paymentType" NOT NULL,
	"quantity" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_customerId_customer_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_riderId_rider_id_fk" FOREIGN KEY ("riderId") REFERENCES "public"."rider"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_vehicleId_vehicle_id_fk" FOREIGN KEY ("vehicleId") REFERENCES "public"."vehicle"("id") ON DELETE no action ON UPDATE no action;