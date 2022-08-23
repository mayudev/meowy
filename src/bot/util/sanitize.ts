const escaped = ['*', '#', '>', '|', '-', '+', '_', '!!', '~', '`', '^', '$'];

/**
 * Sanitize a string of markdown and mentions
 */
export default function sanitize(content: string) {
  // TODO ping sanitization
  // Markdown sanitization
  for (const char of escaped) {
    content = content.replace(new RegExp(`(\\\\*)\\${char}`, 'g'), `\\${char}`);
  }

  return content;
}
