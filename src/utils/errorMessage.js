export function extractErrorMessage(error) {
    if (error instanceof Error) {
      return error.message;
    }
  
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return error.message;
    }
  
    if (typeof error === 'string') {
      return error;
    }
  
    return 'Unknown error occurred';
  }