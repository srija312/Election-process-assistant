import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { expect, test, vi } from 'vitest';

// Mock the AI service
vi.mock('./services/aiService', () => ({
  generateAIResponse: vi.fn(),
}));

test('renders initial language selection', () => {
  render(<App />);
  expect(screen.getByText(/Namaste! Please choose your preferred language/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Select English/i })).toBeInTheDocument();
});

test('handles language and state selection flow', async () => {
  render(<App />);
  
  // Select language
  fireEvent.click(screen.getByRole('button', { name: /Select English/i }));
  expect(screen.getByText(/Which state\/UT are you from/i)).toBeInTheDocument();

  // Select state
  fireEvent.click(screen.getByRole('button', { name: /Select state Tamil Nadu/i }));
  expect(screen.getByText(/What would you like to learn today/i)).toBeInTheDocument();

  // Open Chat
  fireEvent.click(screen.getByRole('button', { name: /Ask AI/i }));
  expect(screen.getByPlaceholderText(/Type your question here/i)).toBeInTheDocument();
});

test('validates API key length', async () => {
  window.alert = vi.fn(); // mock alert
  render(<App />);
  
  // Open Settings
  fireEvent.click(screen.getByRole('button', { name: /Settings/i }));
  expect(screen.getByRole('dialog', { name: /AI Configuration/i })).toBeInTheDocument();

  // Try saving short key
  const input = screen.getByPlaceholderText(/Paste your API Key here/i);
  fireEvent.change(input, { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /Save API Key/i }));

  expect(window.alert).toHaveBeenCalledWith("Please enter a valid API key.");
});

test('toggles voice state', () => {
  render(<App />);
  const voiceBtn = screen.getByRole('button', { name: /Toggle Voice/i });
  expect(voiceBtn).toHaveTextContent('🔇 Voice Off');
  
  fireEvent.click(voiceBtn);
  expect(voiceBtn).toHaveTextContent('🔊 Voice On');
});

test('does not send empty chat messages', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Select English/i }));
  fireEvent.click(screen.getByRole('button', { name: /Select state Tamil Nadu/i }));
  fireEvent.click(screen.getByRole('button', { name: /Ask AI/i }));
  
  const sendBtn = screen.getByRole('button', { name: /Send Message/i });
  expect(sendBtn).toBeDisabled();
});
