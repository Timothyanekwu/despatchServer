import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { rider } from "../models/schema.js";
import { eq } from "drizzle-orm";

export const signup = async ({ name, email, password, phoneNumber, address }) => {

  // DATABASE OPERATION
  const existingRider = await db
    .select()
    .from(rider)
    .where(eq(rider.email, email));

  // BUSINESS LOGIC
  if (existingRider.length > 0) {
    throw new Error("Email already exists");
  }

  // BUSINESS LOGIC
  const hashedPassword = await bcrypt.hash(password, 10);

  // DATABASE OPERATION
  const [createdRider] = await db
    .insert(rider)
    .values({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    })
    .returning();

    const token = jwt.sign({id: createdRider.id}, process.env.JWT_SECRET, {expiresIn: "1d"});

  return {
    data: {
      name: createdRider.name,
      email: createdRider.email,
      phoneNumber: createdRider.phoneNumber,
      address: createdRider.address,
    },
    token,
  };
};

export const login = async ({email, password}) => {
    const existingRider = await db
    .select()
    .from(rider)
    .where(eq(rider.email, email));

    if (existingRider.length < 1) {
        throw Error("Invalid email or password")
    }

    const passwordMatch = await bcrypt.compare(password, existingRider[0].password);

    if (!passwordMatch) {
        throw Error("Invalid email or password")
    }

    const token = jwt.sign({id: existingRider[0].id}, process.env.JWT_SECRET, {expiresIn: "1d"});

    return {
    data: {
      name: existingRider[0].name,
      email: existingRider[0].email,
      phoneNumber: existingRider[0].phoneNumber,
      address: existingRider[0].address,
    },
    token,
  };
}