import {vehicleValidator} from '../validators/vehicleValidator.js';
import {vehicleRegistrationService} from '../services/vehicleRegistService.js';


export const vehicleRegistrationController = async (req, res) => {
    try {
        const { vehicleType, goodsType, selfie, vehicleImage, licenseImage, plateNumber, vehicleModel } = req.body;

        const validate = vehicleValidator.safeParse(req.body);

        if (!validate.success) {
            return res.status(400).json({
                success: false,
                message: "Validation Failed",
                error: validate.error.issues[0].message
            })
        }

        const result = await vehicleRegistrationService({ vehicleType, goodsType, selfie, vehicleImage, licenseImage, plateNumber, vehicleModel, riderId: req.rider.id });

        return res.status(201).json({
            success: true,
            message: "Vehicle registered successfully",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
            error: error.message
        })
    }
}