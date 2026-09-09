import {z} from "zod"

export const onboardingValidator = z.object({
    vehicleType: z.string().min(1),
    goodsType: z.string().min(1),
    selfie: z.string().min(1),
    vehicleImage: z.string().min(1),
    idImage: z.string().min(1),
    licenseImage: z.string().min(1),
    plateNumber: z.string().min(1),
    vehicleModel: z.string().min(1),
})
