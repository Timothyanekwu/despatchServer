import {z} from "zod"

export const vehicleValidator = z.object({
    vehicleType: z.enum(["BICYCLE", "BIKE", "CAR", "VAN", "TRUCK", "TRAILER", "BUS"]),
    goodsType: z.enum(["GROCERIES", "FOOD", "BEVERAGES", "ELECTRONICS", "CLOTHING", "PHARMACEUTICALS", "DOCUMENT", "OTHER"]),
    selfie: z.string().min(1),
    vehicleImage: z.string().min(1),
    licenseImage: z.string().min(1),
    plateNumber: z.string().min(1),
    vehicleModel: z.string().min(1),
    
})
