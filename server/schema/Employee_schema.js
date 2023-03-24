import Joi from 'joi';


export const employeeSchema = Joi.object({
  employee_id: Joi.string().required(),
  name: Joi.string().required(),
  department_id: Joi.string().required(),
  work_type_id: Joi.string().required(),
  isAdmin: Joi.boolean().required(),
  email: Joi.string().email()
});

export const postEmployeeSchema = Joi.object({
  name: Joi.string().required(),
  department_id: Joi.string().required(),
  work_type_id: Joi.string().required(),
  isAdmin: Joi.boolean().required(),
  email: Joi.string().email()
});

