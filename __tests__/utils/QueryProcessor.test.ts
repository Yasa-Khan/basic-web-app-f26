import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "YasaKhan"
          ));
    })

    test('should return andrew id', () => {
        const query = "What is your Andrew ID?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("muhamma4");
    });

    test('should return the largest number', () => {
        const query = "Which of the following numbers is the largest: 46, 26, 89?";
        expect(QueryProcessor(query)).toBe("89");
    });

    test('should add two numbers', () => {
        expect(QueryProcessor("What is 5 plus 33?")).toBe("38");
        expect(QueryProcessor("What is 57 plus 45?")).toBe("102");
    });

    test('should add several numbers', () => {
        expect(QueryProcessor("What is 39 plus 89 plus 34?")).toBe("162");
    });

    test('should find numbers that are both a square and a cube', () => {
        const query = "Which of the following numbers is both a square and a cube: 4215, 441, 1166, 4096, 650, 3579, 2197?";
        expect(QueryProcessor(query)).toBe("4096");
    });

    test('should handle subtraction, multiplication and division', () => {
        expect(QueryProcessor("What is 58 minus 98?")).toBe("-40");
        expect(QueryProcessor("What is 3 multiplied by 4?")).toBe("12");
        expect(QueryProcessor("What is 2 plus 3 multiplied by 4?")).toBe("14");
        expect(QueryProcessor("What is 9 divided by 3?")).toBe("3");
    });

    test('should find primes', () => {
        const query = "Which of the following numbers are primes: 76, 29, 46, 2, 43?";
        expect(QueryProcessor(query)).toBe("29, 2, 43");
    });
});
