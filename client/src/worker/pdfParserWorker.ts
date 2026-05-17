// Web Worker for parsing email addresses from uploaded files
interface EmailParseMessage {
  type: 'parse_emails';
  file: File;
}

interface EmailParseResult {
  emails: string[];
  error?: string;
}

function parseCSV(content: string): string[] {
  const emails = new Set<string>();
  const lines = content.split('\n');

  lines.forEach((line) => {
    const strictEmailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = line.match(strictEmailRegex) || [];

    matches.forEach((email) => {
      const sanitized = email.trim().toLowerCase();
      if (isValidEmail(sanitized)) {
        emails.add(sanitized);
      }
    });
  });

  return Array.from(emails);
}

function parseXLSX(buffer: ArrayBuffer): string[] {
  const emails = new Set<string>();
  const view = new Uint8Array(buffer);
  const text = new TextDecoder().decode(view);

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(emailRegex) || [];

  matches.forEach((email) => {
    const sanitized = email.trim().toLowerCase();
    if (isValidEmail(sanitized)) {
      emails.add(sanitized);
    }
  });

  return Array.from(emails);
}


function parsePDF(buffer: ArrayBuffer): string[] {
  const emails = new Set<string>();
  const view = new Uint8Array(buffer);
  const text = new TextDecoder().decode(view);

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(emailRegex) || [];

  matches.forEach((email) => {
    const sanitized = email.trim().toLowerCase();
    if (isValidEmail(sanitized)) {
      emails.add(sanitized);
    }
  });

  return Array.from(emails);
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

self.onmessage = async (event: MessageEvent<EmailParseMessage>) => {
  const { type, file } = event.data;

  if (type === 'parse_emails') {
    try {
      const buffer = await file.arrayBuffer();
      let emails: string[] = [];

      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        const text = new TextDecoder().decode(buffer);
        emails = parseCSV(text);
      } else if (
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.name.endsWith('.xlsx')
      ) {
        emails = parseXLSX(buffer);
      } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        emails = parsePDF(buffer);
      } else {
        throw new Error('Unsupported file type');
      }

      const result: EmailParseResult = { emails };
      self.postMessage(result);
    } catch (error) {
      const result: EmailParseResult = {
        emails: [],
        error: error instanceof Error ? error.message : 'Failed to parse file',
      };
      self.postMessage(result);
    }
  }
};

export { };
