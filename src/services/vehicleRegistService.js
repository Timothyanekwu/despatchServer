
import { db } from "../db.js";
import { vehicle } from "../models/vehicleSchema.js"
import { and, eq } from "drizzle-orm";

export const vehicleRegistrationService = async ({ vehicleType, goodsType, selfie, vehicleImage, licenseImage, plateNumber, vehicleModel, riderId}) => {

  // DATABASE OPERATION
  const existingVehicle = await db
    .select()
    .from( vehicle )
    .where(eq(vehicle.plateNumber, plateNumber));

  // BUSINESS LOGIC
  if (existingVehicle.length > 0) {
    throw new Error("This vehicle already exists");
  }

  // DATABASE OPERATION
  const [createdVehicle] = await db
    .insert(vehicle)
    .values({
      vehicleType,
      goodsType,
      selfie,
      vehicleImage,
      licenseImage,
      plateNumber,
      vehicleModel,
      isApproved: true,
      riderId,
    })
    .returning();

  return {
    data: {
      vehicleType: createdVehicle.vehicleType,
      goodsType: createdVehicle.goodsType,
      selfie: createdVehicle.selfie,
      vehicleImage: createdVehicle.vehicleImage,
      licenseImage: createdVehicle.licenseImage,
      plateNumber: createdVehicle.plateNumber,
      vehicleModel: createdVehicle.vehicleModel,
      isApproved: createdVehicle.isApproved,
    },
  };
};