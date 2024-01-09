// ./validation/userValidation.ts

import Joi from "joi";

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    favorites: Joi.array().items(Joi.string()).optional(),
    phone: Joi.string().optional(),
  });

  return schema.validate(user);
};

const validateUpdateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    favorites: Joi.array().items(Joi.string()),
    phone: Joi.string().optional(),
  });

  return schema.validate(user);
};

export { validateUser, validateUpdateUser };
