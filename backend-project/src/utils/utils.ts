/**
 * Utility script with commonly used functions
 */
export const Util = {
  /**
   * Returns true if the given value is null or undefined
   * @param value
   * @returns True if the value is null or undefined
   */
  isNull(value: any): boolean {
    return (typeof (value) == 'undefined' || value == null);
  },
  /**
   * Returns true if the value is null, undefined or empty. Works on strings and arrays
   * @param value
   * @returns
   */
  isNullOrEmpty(value: any): boolean {
    if (Util.isNull(value)) {
      return true;
    }
    
    // Check for empty string
    if (typeof (value) === 'string' || value instanceof String) {
      return value.trim() === '';
    }
    
    // Check for empty array
    if (Array.isArray(value)) {
      return value.length == 0;
    }
    
    return false;
  },
  /**
   * Returns the integer parsed from the input value. If the value cannot be parsed,
   * the default value or 0 is returned.
   * @param input The value to parse into an integer
   * @param defaultValue (optional) Default value to return if input cannot be parsed (Default = 0).
   * @returns
   */
  tryParseInt(input: any, defaultValue?: number): number {
    if (Util.isNull(defaultValue)) {
      defaultValue = 0;
    }
    if (Util.isNullOrEmpty(input)) {
      return defaultValue;
    }
    if (!Number.isInteger(input)) {
      const parsed = Number.parseInt(input);
      if (Number.isNaN(parsed)) {
        return defaultValue;
      } else {
        return parsed;
      }
    } else {
      return input;
    }
  },
};