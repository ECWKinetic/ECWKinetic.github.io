export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${displayHours}:${displayMinutes} ${ampm}`;
};

export const sanitizeMessage = (text: string): string => {
  return text.trim().replace(/\s+/g, ' ');
};

export const detectDoneSignal = (message: string): boolean => {
  const donePatterns = [
    /^\/done$/i,
    /^done$/i,
    /^i'?m done$/i,
    /^that'?s all$/i,
    /^finished$/i,
    /^no more questions$/i,
  ];

  const normalizedMessage = message.toLowerCase().trim();
  return donePatterns.some(pattern => pattern.test(normalizedMessage));
};

export const generateMessageId = (prefix: string = 'msg'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const parseAssistantResponse = (response: string): string => {
  // Handle markdown-style formatting if needed
  return response
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />');
};

export const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export const isValidSessionId = (sessionId: string): boolean => {
  return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(sessionId);
};

export const SUPPORTED_FILE_TYPES = {
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/msword': '.doc',
  'text/plain': '.txt',
  'text/markdown': '.md',
  'application/json': '.json',
  'text/csv': '.csv',
};

export const MAX_FILE_SIZE_MB = 20;

export const validateFileType = (file: File): boolean => {
  return Object.keys(SUPPORTED_FILE_TYPES).includes(file.type);
};

export const validateFileSize = (file: File, maxSizeMB: number = MAX_FILE_SIZE_MB): boolean => {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
