import Crypto from "../lib/crypto";
import { RadioInputOption } from "../types";

const genderOptions: RadioInputOption[] = [
  { label: "Homme", value: "MALE", imgSrc: require("../assets/illustrations/male.png") },
  { label: "Femme", value: "FEMALE", imgSrc: require("../assets/illustrations/female.png") },
]

const wrapperHorizontalPadding = 40;

const defaultIdGenerator = {
  generateId: Crypto.generateRandomUUID,
};

export const config = {
  genderOptions,
  wrapperHorizontalPadding,
  defaultIdGenerator,
};
