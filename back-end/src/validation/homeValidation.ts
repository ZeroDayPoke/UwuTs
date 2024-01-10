// ./validation/homeValidation.ts

import { HomeAttributes } from "../models/Home";

export const validateHome = (home: HomeAttributes): string[] => {
  const errors: string[] = [];

  if (!home.street.trim()) errors.push("Street is required.");
  if (!home.city.trim()) errors.push("City is required.");
  if (!home.state.trim()) errors.push("State is required.");
  if (!home.zipcode.match(/^[0-9]{5}(-[0-9]{4})?$/))
    errors.push("Invalid zipcode format.");
  if (home.squareFootage < 0 || home.squareFootage > 110000) // Fair Field, Sagaponack, New York
    errors.push("Square footage must be between 0 and 110,000.");
  if (
    home.yearBuilt &&
    (home.yearBuilt < 0 || home.yearBuilt > new Date().getFullYear())
  )
    errors.push("Invalid year built.");
  if (home.numberBathrooms < 1)
    errors.push("At least one bathroom is required.");
  if (home.numberBedrooms < 1) errors.push("At least one bedroom is required.");

  return errors;
};
