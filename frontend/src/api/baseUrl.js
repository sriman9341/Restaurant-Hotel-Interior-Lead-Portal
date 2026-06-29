export function resolveApiBaseUrl(configuredUrl = '', currentOrigin = '') {
  const rawUrl = String(configuredUrl || '').trim();

  if (rawUrl) {
    return rawUrl.replace(/\/+$/, '').replace(/\/api$/, '');
  }

  return String(currentOrigin || '').replace(/\/+$/, '');
}
