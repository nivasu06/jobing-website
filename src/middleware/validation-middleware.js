import {body,validationResult} from 'express-validator';
const validateRequest=async(req,res,next)=>{
    const rules=[
        body('name').notEmpty().withMessage('Name is required'),
        
    ]
}