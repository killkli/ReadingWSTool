import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { DicWordSpan } from './DicWordSpan';
import { queryDictionary } from '../libs/DictWrapper';

vi.mock('../libs/DictWrapper', () => ({
  queryDictionary: vi.fn(),
}));

describe('DicWordSpan Component', () => {
  it('renders the word correctly', () => {
    render(<DicWordSpan word="example" category="noun" />);
    expect(screen.getByText(/example/)).toBeInTheDocument();
  });

  it('calls queryDictionary with the correct word', async () => {
    queryDictionary.mockResolvedValue([{ def: 'definition of example' }]);
    render(<DicWordSpan word="example" category="noun" />);
    await waitFor(() => {
      expect(queryDictionary).toHaveBeenCalledWith('example');
    });
  });

  it('displays definitions correctly', async () => {
    queryDictionary.mockResolvedValue([{ def: 'definition of example' }]);
    render(<DicWordSpan word="example" category="noun" />);
    await waitFor(() => {
      expect(screen.getByText('definition of example')).toBeInTheDocument();
    });
  });
});

