module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text-summary"],
  testRegex: [
    "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$"
  ],
};
