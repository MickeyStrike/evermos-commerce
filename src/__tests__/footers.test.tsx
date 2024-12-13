import { render, screen } from '@testing-library/react';
import FootersComponent from '../components/footers';
import '@testing-library/jest-dom';

describe('FootersComponent', () => {
  test('render text created by', () => {
    render(<FootersComponent />);

    const text = screen.queryByDisplayValue('Created By Irfan Maulana');
    expect(text);
  });
});
