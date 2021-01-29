function getHoursMinutesAndSecondsLeftFromDurationInSeconds(durationInSeconds) {
    const hours = Math.floor(durationInSeconds/3600);
    const minutes = Math.floor(durationInSeconds/60);
    const seconds = Math.floor(durationInSeconds%60);
    return [hours, minutes, seconds];
}

export {
    getHoursMinutesAndSecondsLeftFromDurationInSeconds
}