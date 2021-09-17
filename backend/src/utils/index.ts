export function isTesting() {
  return process.env.NODE_ENV === 'test';
}

export function getEntityFilepath(isTesting: boolean) {
  return isTesting ? 'db/entities/*.ts' : 'dist/db/entities/*.js';
}

export function toBoolean(text: string) {
  return text.toLowerCase() === 'true' ? true : false;
}
