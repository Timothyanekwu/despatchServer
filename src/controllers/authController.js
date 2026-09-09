import {signupValidator, loginValidator} from '../validators/authValidator.js';
import {signup, login} from '../services/authService.js';

export const signupController = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body;

        const validate = signupValidator.safeParse(req.body);

        if (!validate.success) {
            return res.status(400).json({
                success: false,
                message: "Validation Failed",
                error: validate.error.issues[0].message
            })
        }

        const result = await signup({ name, email, password, phoneNumber, address });

        return res.status(201).json({
            success: true,
            message: "Rider signed up successfully",
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
    
export const loginController = async (req, res) => {
        try {
            const { email, password } = req.body;

            const validate = loginValidator.safeParse(req.body);

        if (!validate.success) {
            return res.status(400).json({
                success: false,
                message: "Validation Failed",
                error: validate.error.issues[0].message
            })
        }

        const result = await login({ email, password });

        return res.status(200).json({
            success: true,
            message: "Rider logged in successfully",
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

