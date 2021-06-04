module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  testRegex: [
    "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$"
  ],
};
