export default class VoteCounter {
    static count(votes: string[]): string {
        const candidateToVoteCounter: Map<string, number> = new Map<string, number>();
        let currentMaximumVotes: number = -1;
        let candidateWithCurrentMaximumVotes: string[] = [];
        for (const vote of votes) {
            if (vote !== null && vote.trim() !== '') {
                const currentVoteCount = candidateToVoteCounter.get(vote) ?? 0;
                candidateToVoteCounter.set(vote, currentVoteCount+1);

                if (currentVoteCount+1 > currentMaximumVotes) {
                    currentMaximumVotes = currentVoteCount+1;
                    candidateWithCurrentMaximumVotes = [vote];
                } else if (currentVoteCount+1 === currentMaximumVotes) {
                    candidateWithCurrentMaximumVotes.push(vote);
                }
            }
        }
        if (candidateWithCurrentMaximumVotes.length === 1) {
            return candidateWithCurrentMaximumVotes[0];
        } else {
            const keys = Array.from(candidateToVoteCounter.keys());
            candidateWithCurrentMaximumVotes = candidateWithCurrentMaximumVotes.sort((a, b) => {
                return keys.indexOf(a) - keys.indexOf(b);
            });
            return candidateWithCurrentMaximumVotes[0];
        }
    }
}