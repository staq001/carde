import { validate } from "uuid";

if (validate("3f6e1a5d-3b9e-4d77-9b72-71c5d3e7c6f0")) {
  console.log("Valid UUID");
} else {
  console.log("Invalid UUID");
}
