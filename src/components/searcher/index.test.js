import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Searcher from './index';

describe('searcher test', () => {
  it('should create the component', () => {
    const submitHandler = jest.fn();

    render(<Searcher updateSearch={submitHandler} />);
    expect(screen.getByPlaceholderText('Search...')).toBeVisible();
  });

  it('should have the right search', () => {
    const submitHandler = jest.fn();

    render(<Searcher updateSearch={submitHandler} />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'potter');
    expect(input).toHaveValue('potter');
  });

  it('should send the right search', () => {
    const submitHandler = jest.fn();

    render(<Searcher updateSearch={submitHandler} />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'potter{enter}');

    expect(submitHandler).toHaveBeenCalledWith('potter');
  });

  it('should clear the search', () => {
    const submitHandler = jest.fn();

    render(<Searcher updateSearch={submitHandler} />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'potter{enter}');
    userEvent.click(screen.getByTestId('clear-span'))

    expect(submitHandler).toHaveBeenCalledWith('');
  });
}) 
