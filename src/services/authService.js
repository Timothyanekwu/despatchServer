import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { rider } from "../models/riderSchema.js";
import { customer } from "../models/customerSchema.js";
import { eq } from "drizzle-orm";

import { AppError } from "../utils/customError.js";

export const riderSignup = async ({
  name,
  email,
  password,
  phoneNumber,
  address,
}) => {
  // DATABASE OPERATION
  const existingRider = await db
    .select()
    .from(rider)
    .where(eq(rider.email, email));

  // BUSINESS LOGIC
  if (existingRider.length > 0) {
    throw new AppError("Email already exists", 409);
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

  const token = jwt.sign(
    { id: createdRider.id },
    process.env.RIDER_JWT_SECRET,
    {
      expiresIn: process.env.RIDER_JWT_EXPIRES_IN,
    },
  );

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

export const riderLogin = async ({ email, password }) => {
  const existingRider = await db
    .select()
    .from(rider)
    .where(eq(rider.email, email));

  if (existingRider.length < 1) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatch = await bcrypt.compare(
    password,
    existingRider[0].password,
  );

  if (!passwordMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    { id: existingRider[0].id },
    process.env.RIDER_JWT_SECRET,
    {
      expiresIn: process.env.RIDER_JWT_EXPIRES_IN,
    },
  );

  return {
    data: {
      name: existingRider[0].name,
      email: existingRider[0].email,
      phoneNumber: existingRider[0].phoneNumber,
      address: existingRider[0].address,
    },
    token,
  };
};

export const customerSignup = async ({
  name,
  email,
  password,
  phoneNumber,
  address,
}) => {
  // DATABASE OPERATION
  const existingCustomer = await db
    .select()
    .from(customer)
    .where(eq(customer.email, email));

  // BUSINESS LOGIC
  if (existingCustomer.length > 0) {
    throw new AppError("Email already exists", 409);
  }

  // BUSINESS LOGIC
  const hashedPassword = await bcrypt.hash(password, 10);

  // DATABASE OPERATION
  const [createdCustomer] = await db
    .insert(customer)
    .values({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    })
    .returning();

  const token = jwt.sign(
    { id: createdCustomer.id },
    process.env.CUSTOMER_JWT_SECRET,
    { expiresIn: process.env.CUSTOMER_JWT_EXPIRES_IN },
  );

  return {
    data: {
      name: createdCustomer.name,
      email: createdCustomer.email,
      phoneNumber: createdCustomer.phoneNumber,
      address: createdCustomer.address,
    },
    token,
  };
};

export const customerLogin = async ({ email, password }) => {
  const existingCustomer = await db
    .select()
    .from(customer)
    .where(eq(customer.email, email));

  if (existingCustomer.length < 1) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatch = await bcrypt.compare(
    password,
    existingCustomer[0].password,
  );

  if (!passwordMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    { id: existingCustomer[0].id },
    process.env.CUSTOMER_JWT_SECRET,
    { expiresIn: process.env.CUSTOMER_JWT_EXPIRES_IN },
  );

  return {
    data: {
      name: existingCustomer[0].name,
      email: existingCustomer[0].email,
      phoneNumber: existingCustomer[0].phoneNumber,
      address: existingCustomer[0].address,
    },
    token,
  };
};
