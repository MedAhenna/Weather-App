import { capitalizeString } from "../string";

test("capitalize", () => {
  expect(capitalizeString("hello")).toBe("Hello");
});
