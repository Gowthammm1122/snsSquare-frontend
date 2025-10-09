// Simple encryption/decryption utility for localStorage data
// Using a combination of base64 encoding and simple character shifting for basic obfuscation

const ENCRYPTION_KEY = 'sns-square-2024'; // You can make this more complex or use environment variables

/**
 * Simple encryption function
 * @param {string} text - Text to encrypt
 * @returns {string} - Encrypted text
 */
export const encrypt = (text) => {
  if (!text) return '';
  
  try {
    // Convert text to base64
    const base64 = btoa(unescape(encodeURIComponent(text)));
    
    // Apply simple character shifting
    let encrypted = '';
    for (let i = 0; i < base64.length; i++) {
      const char = base64.charCodeAt(i);
      const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      encrypted += String.fromCharCode(char + keyChar);
    }
    
    // Convert to base64 again for safe storage
    return btoa(encrypted);
  } catch (error) {
    console.error('Encryption error:', error);
    return text; // Return original text if encryption fails
  }
};

/**
 * Simple decryption function
 * @param {string} encryptedText - Encrypted text to decrypt
 * @returns {string} - Decrypted text
 */
export const decrypt = (encryptedText) => {
  if (!encryptedText) return '';
  
  try {
    // Decode from base64
    const decoded = atob(encryptedText);
    
    // Reverse character shifting
    let decrypted = '';
    for (let i = 0; i < decoded.length; i++) {
      const char = decoded.charCodeAt(i);
      const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      decrypted += String.fromCharCode(char - keyChar);
    }
    
    // Decode from base64 to get original text
    return decodeURIComponent(escape(atob(decrypted)));
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedText; // Return original text if decryption fails
  }
};

/**
 * Encrypt and store data in localStorage
 * @param {string} key - localStorage key
 * @param {string} value - Value to encrypt and store
 */
export const setEncryptedItem = (key, value) => {
  if (typeof window !== 'undefined') {
    const encryptedValue = encrypt(value);
    localStorage.setItem(key, encryptedValue);
  }
};

/**
 * Retrieve and decrypt data from localStorage
 * @param {string} key - localStorage key
 * @returns {string} - Decrypted value
 */
export const getEncryptedItem = (key) => {
  if (typeof window !== 'undefined') {
    const encryptedValue = localStorage.getItem(key);
    return encryptedValue ? decrypt(encryptedValue) : null;
  }
  return null;
};

/**
 * Remove encrypted item from localStorage
 * @param {string} key - localStorage key
 */
export const removeEncryptedItem = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};
