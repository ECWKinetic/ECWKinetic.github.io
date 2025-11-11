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
