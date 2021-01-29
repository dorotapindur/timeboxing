import { getHoursMinutesAndSecondsLeftFromDurationInSeconds } from "../../lib/time";

describe("getHoursMinutesAndSecondsLeftFromDurationInSeconds", () => {
    describe('for duration shorter than 1 minute', () => {
        it("works for 30 seconds", () => {
            expect(
                getHoursMinutesAndSecondsLeftFromDurationInSeconds(30)
            ).toEqual([0, 0, 30]);
        });

        it("returns 30 seconds for 30-seconds-duration", () => {
            expect(
                getHoursMinutesAndSecondsLeftFromDurationInSeconds(30)[2]
            ).toBe(30);
        });

        it("returns 0 minutes for 30-seconds-duration", () => {
            expect(
                getHoursMinutesAndSecondsLeftFromDurationInSeconds(30)[1]
            ).toBe(0);
        });

        it("returns 0 hours for 30-seconds-duration", () => {
            expect(
                getHoursMinutesAndSecondsLeftFromDurationInSeconds(30)[0]
            ).toBe(0);
        });
    });
    describe('for durations equal or longer than minute', () => {
        it("returns 2 minutes and 20 seconds for 140 seconds", () => {
            expect(
                getHoursMinutesAndSecondsLeftFromDurationInSeconds(140)
            ).toEqual([0, 2, 20]);
        });
        it('returns 0 hours, 1 minute and 0 seconds for 60 seconds', () => {
            expect(
                getHoursMinutesAndSecondsLeftFromDurationInSeconds(60)
            ).toEqual([0, 1, 0]);
        });
    });
});