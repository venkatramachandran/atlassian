import RateLimit from "./rateLimite";

class RequestInfo {
    constructor(private _timestamp: number, private _requestCount: number) {}
    get timestamp(): number {
        return this._timestamp;
    }

    get requestCount(): number {
        return this._requestCount;
    }

    public increment() {
        this._requestCount++;
    }
}

export default class RateLimiter {
    private limits: Map<string, RateLimit>;
    private requests: Map<string, RequestInfo>;
    constructor() {
        this.limits = new Map<string, RateLimit>();
        this.requests = new Map<string, RequestInfo>();
    }
    public add(customerId: string, limit: RateLimit) {
        this.limits.set(customerId, limit);
    }

    public isRequestWithinLimit(customerId: string): boolean {
        const tokensLeft = this.addRequest(customerId);
        return tokensLeft >= 0;
    }

    public addRequest(customerId: string): number {
        // do something to track
        const limit = this.limits.get(customerId);
        const requestinfo = this.requests.get(customerId);
        // update limits
        if (requestinfo) {
            console.log(`found request info`);
            // existing requests
            if ((requestinfo.timestamp + limit!.timeInSeconds) < (Date.now()/1000)) {
                // time in seconds has passed
                // so no need to validate number of requests
                console.log(`time: ${requestinfo.timestamp}, date: ${Date.now()/ 1000}`);
                this.requests.set(customerId, new RequestInfo(Date.now() / 1000, 1));
                return limit!.numberOfRequests - 1;
            } else {
                console.log(`limit!.numberOfRequests: ${limit!.numberOfRequests}, requestinfo.requestCount: ${requestinfo.requestCount}`);
                if (limit!.numberOfRequests > requestinfo.requestCount) {
                    // add 1 to the numbr of requests
                    // allow request to continue
                    console.log(`adding 1 token into the bucket`);
                    requestinfo.increment();
                    return limit!.numberOfRequests - requestinfo.requestCount;
                } else {
                    // reached limit
                    // throw error
                    console.log(`reached limits`);
                    return -1;
                }
            }
        } else {
            // no existing requests
            // create new 
            console.log(`no previous requests`);
            this.requests.set(customerId, new RequestInfo(Date.now() / 1000, 1));
            return limit!.numberOfRequests - 1;
        }
    }
}