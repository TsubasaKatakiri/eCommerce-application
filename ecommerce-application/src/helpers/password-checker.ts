export function passwordChecker(value: string, setError: (error: string | undefined) => void): void {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=$$$${}|;:'",.<>?/]).+$/
    if(value.length === 0) setError('Field cannot be empty');
    else if (value.length < 8) setError('Password should be at least 8 characters long');
    else if (passwordPattern.test(value) === false) setError('Password should contain at least one capital letter, one small letter, and one special character');
    else setError(undefined);
}