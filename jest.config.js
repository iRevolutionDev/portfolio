const nextJest = require("next/jest")

const createJestConfig = nextJest({
    dir: "./src",
})

const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testEnvironment: "jest-environment-jsdom",
    modulePathIgnorePatterns: ["<rootDir>/dist/"],
    testPathIgnorePatterns: ["<rootDir>/e2e"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    }
}

module.exports = createJestConfig(customJestConfig)