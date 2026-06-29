import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveApiBaseUrl } from './baseUrl.js';

test('uses the configured backend URL when provided', () => {
  assert.equal(resolveApiBaseUrl('https://api.example.com'), 'https://api.example.com');
});

test('falls back to the current origin when no backend URL is configured', () => {
  assert.equal(resolveApiBaseUrl('', 'https://frontend.example.com'), 'https://frontend.example.com');
});

test('trims trailing slashes from the backend URL', () => {
  assert.equal(resolveApiBaseUrl('https://api.example.com/'), 'https://api.example.com');
});

test('removes trailing /api and whitespace from configured backend URL', () => {
  assert.equal(resolveApiBaseUrl(' https://api.example.com/api/ '), 'https://api.example.com');
});
