const fs = require("fs");
const assert = require("assert");

// Read the JSON file
const jsonData = JSON.parse(fs.readFileSync("data.json", "utf8"));

// Define the expected structure of the JSON data
const expectedStructure = {
  name: "string",
  age: "number",
  address: {
    street: "string",
    city: "string",
    zipCode: "string",
  },
};

// Describe the test suite
describe("JSON Data Validation", function () {
  // Test to validate the data structure and types
  it("should have the correct data structure and types", function () {
    // Check if all required fields are present
    // console.log(Object.keys(jsonData));
    assert.deepStrictEqual(
      Object.keys(jsonData),
      Object.keys(expectedStructure)
    );

    // Recursively validate the data types
    validateDataTypes(jsonData, expectedStructure);
  });
});

// Function to validate data types recursively
function validateDataTypes(data, structure) {
  for (const key in structure) {
    if (typeof structure[key] === "string") {
      // Check if the data type matches the expected type
      assert.strictEqual(
        typeof data[key],
        structure[key],
        `Field '${key}' has an incorrect data type.`
      );
    } else if (typeof structure[key] === "object") {
      // Recursively validate nested objects
      assert.ok(
        typeof data[key] === "object",
        `Field '${key}' should be an object.`
      );
      validateDataTypes(data[key], structure[key]);
    }
  }
}
