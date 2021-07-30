import VoteCounter from "./VoteCounter";

describe('VoteCounter', () => {
    it('should return a clear winner name', () => {
        const input: string[] = [
            'a', 'b', 'c', 'a', 'b', 'a'
        ];
        expect(VoteCounter.count(input)).toBe('a');
    });
    it('should return the first candidate in case of a tie - 1', () => {
        const input: string[] = [
            'a', 'b', 'c', 'a', 'b', 'a', 'b'
        ];
        expect(VoteCounter.count(input)).toBe('a');
    });
    it('should return the first candidate in case of a tie - 2', () => {
        const input: string[] = [
            'b', 'a', 'c', 'a', 'b', 'a', 'b'
        ];
        expect(VoteCounter.count(input)).toBe('b');
    });
    it('should return the first candidate in case of a tie - 3', () => {
        const input: string[] = [
            'a', 'b'
        ];
        expect(VoteCounter.count(input)).toBe('a');
    });
});