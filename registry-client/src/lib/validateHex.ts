export default (val: string, length: number = null): [boolean, string?] => {
    // Please visit https://regex101.com/r/0tUzmY/1 to validate this regex
    var regex = /^(0[xX])([A-Fa-f0-9]+)/;
    let regex_groups = val.match(regex)

    // This validates that the hex string starts with 0x or 0X
    // This is already validated by the regex, but we want to throw the correct error
    // if it doesn't match
    if (!(regex_groups[0] === '0x' || regex_groups[0] === '0X')) {
        return [false, 'Hex string must start with 0x or 0X']
    }
    if (regex_groups[2].length != length) {
        return [false, 'Hex string must be ' + length + ' characters long not ' + regex_groups[2].length]
    }
    return [true]
};