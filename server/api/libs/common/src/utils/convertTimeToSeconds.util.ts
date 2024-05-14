export function convertTimeToSeconds(stringTime: any){
    if (!isNaN(stringTime)){
        return parseInt(stringTime);
    }
    let modifier;
    if (stringTime && typeof stringTime === 'string') {
        switch (stringTime[stringTime.length - 1]){
            case 's':
                modifier = 1;
                break;
            case 'm':
                modifier = 60;
                break;
            case 'h':
                modifier = 60 * 60;
                break;
            case 'd':
                modifier = 24 * 60 * 60;
                break;
            case 'M':
                modifier = 30 * 24 * 60 * 60;
                break;
            case 'y':
                modifier = 365 * 24 * 60 * 60;
                break;
            default:
                throw new Error('Invalid time string'); 
        }

        const time = parseInt(stringTime.slice(0, -1));
        return time * modifier
    }
}