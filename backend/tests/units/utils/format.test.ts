import CustomError from "../../../src/errorHandler/customError"
import { toPascalCase } from "../../../src/utils/format"
import { describe, expect, it } from "@jest/globals"

describe("To Pascal Function", () => {
    it("handles multiple words to pascal case", () => {
        expect(toPascalCase("hello")).toBe("Hello")
    })

    it("handles multiple words with space", () => {
        expect(toPascalCase("hello world")).toBe("Hello World")
    })

    it("handles multiple words with dash", () => {
        expect(toPascalCase("hello-world")).toBe("Hello-world")
    })

    it("handles mixed case correctly and digits", () => {
        expect(toPascalCase("HeLLo WoR7Ld")).toBe("Hello Wor7ld")
    })

    it("returns custom error when input is not string", () => {
        expect(() => toPascalCase(null)).toThrow(CustomError)
    })
})
