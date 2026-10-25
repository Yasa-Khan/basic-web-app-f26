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
            "Yasa"
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
});
