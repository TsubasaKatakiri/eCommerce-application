export function checkPostalCode(country: string, code: string, setError: (error: string|undefined) => void): void{
    if(code.length === 0) setError('Must contain at least one character');
    else if ((country === 'BY' || country === 'RU') && code.length !== 6) {
        setError('Must follow the format for the country (XXXXXX)');
    }
    else if ((country === 'FR' || country === 'DE' || country === 'ES' || country === 'US') && code.length !== 5) {
        setError('Must follow the format for the country (XXXXX)');
    }
    else setError(undefined);
}