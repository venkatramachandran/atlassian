export default class RateLimit {
    constructor(private _numberOfRequests: number, private _timeInSeconds: number) {}
    get timeInSeconds(): number {
        return this._timeInSeconds;
    }
    get numberOfRequests(): number {
        return this._numberOfRequests;
    }
}