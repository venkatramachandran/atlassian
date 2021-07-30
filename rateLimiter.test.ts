import RateLimit from "./rateLimite";
import RateLimiter from "./rateLimiter";

describe('RateLimiter', () => {
    it('should allow requests when the limt is not crossed', () => {
        const testData = new RateLimiter();
        testData.add('1', new RateLimit(1, 1));
        expect(testData.isRequestWithinLimit('1')).toBe(true);
    });

    it('should allow requests when the limit is not crossed', () => {
        const testData = new RateLimiter();
        testData.add('1', new RateLimit(5, 1));
        testData.addRequest('1');
        testData.addRequest('1');
        expect(testData.isRequestWithinLimit('1')).toBe(true);
    });

    it('should not allow requests when the limit is crossed', () => {
        const testData = new RateLimiter();
        testData.add('1', new RateLimit(2, 1));
        testData.addRequest('1');
        testData.addRequest('1');
        expect(testData.isRequestWithinLimit('1')).toBe(false);
    });

    it('should not allow any requests when the limit 0', () => {
        const testData = new RateLimiter();
        testData.add('1', new RateLimit(0, 1));
        expect(testData.isRequestWithinLimit('1')).toBe(false);
    });
});