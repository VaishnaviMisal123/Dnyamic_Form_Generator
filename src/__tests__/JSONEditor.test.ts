import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JsonEditor from '../components/JsonEditor';


test('displays error for invalid JSON', () => {
  render(<JsonEditor />);
  
  const jsonInput = screen.getByRole('textbox'); 
  
  userEvent.type(jsonInput, '{ invalid JSON');
  
  const errorMessage = screen.getByText(/invalid JSON syntax/i);
  expect(errorMessage).toBeInTheDocument();
});

test('accepts valid JSON', () => {
  render(<JsonEditor />);
  
  const jsonInput = screen.getByRole('textbox');
  
  userEvent.type(jsonInput, `{"formTitle": "Test Form", "fields": []}`);
  
  const errorMessage = screen.queryByText(/invalid JSON syntax/i);
  expect(errorMessage).not.toBeInTheDocument();
});
