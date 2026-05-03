import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import TopicContent from './TopicContent';
import { translations } from '../translations';

const mockT = translations['en'];
const mockShare = vi.fn();

test('renders process topic correctly', () => {
  render(<TopicContent topic="process" t={mockT} mode="normal" userState="Tamil Nadu" shareToWhatsApp={mockShare} />);
  expect(screen.getByText(/The Election Process in India/i)).toBeInTheDocument();
  expect(screen.getByText(/Voter List Update/i)).toBeInTheDocument();
});

test('renders timeline correctly for valid state', () => {
  render(<TopicContent topic="timeline" t={mockT} mode="normal" userState="Tamil Nadu" shareToWhatsApp={mockShare} />);
  expect(screen.getByText(/Tamil Nadu Elections/i)).toBeInTheDocument();
  expect(screen.getByText(/Upcoming/i)).toBeInTheDocument();
});

test('renders updating message for invalid state in timeline', () => {
  render(<TopicContent topic="timeline" t={mockT} mode="normal" userState="InvalidState" shareToWhatsApp={mockShare} />);
  expect(screen.getByText(/InvalidState Election Data/i)).toBeInTheDocument();
  expect(screen.getByText(/Data Updating/i)).toBeInTheDocument();
});

test('renders eli10 mode correctly for steps', () => {
  render(<TopicContent topic="steps" t={mockT} mode="eli10" userState="Delhi" shareToWhatsApp={mockShare} />);
  expect(screen.getAllByText(/At this step:/i).length).toBeGreaterThan(0);
});

test('renders fallback for unknown topic', () => {
  render(<TopicContent topic="unknown" t={mockT} mode="normal" userState="Delhi" shareToWhatsApp={mockShare} />);
  expect(screen.getByText(/Content coming soon for unknown/i)).toBeInTheDocument();
});
