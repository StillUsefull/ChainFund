

export const truncateText = (text, wordLimit = 30, charLimit = 100) => {
    if (!text) return ' ';
    let truncated = text.split(' ').slice(0, wordLimit).join(' ');
    if (truncated.length > charLimit) {
      truncated = truncated.slice(0, charLimit);
      if (truncated.charAt(truncated.length - 1) !== ' ') {
        truncated = truncated.slice(0, truncated.lastIndexOf(' '));
      }
    }
  
    return truncated + '...';
  };