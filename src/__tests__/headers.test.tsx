import { render, screen } from '@testing-library/react';
import HeaderComponent from '../components/headers';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: { src: string; alt: string; width?: number; height?: number }) => (
    <img
      src={src}
      alt={alt}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
    />
  ),
}));

describe('HeaderComponent', () => {
  test('renders the logo with correct attributes', () => {
    render(<HeaderComponent />);

    const logo = screen.getByAltText('logo_not_found');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', "https://evermos.com/home/wp-content/uploads/2022/03/LP-Regist-EVM_Brand-Logo-02.png");
    expect(logo).toHaveStyle('width: 205px');
    expect(logo).toHaveStyle('height: 46px');
  });

  test('renders search input with placeholder', () => {
    render(<HeaderComponent />);

    const searchInput = screen.getByPlaceholderText('Cari di Evermos');
    expect(searchInput).toBeInTheDocument();
  });
  
  test('renders the login button', () => {
    render(<HeaderComponent />);

    const loginButton = screen.getByText(/Masuk\/Daftar/i);
    expect(loginButton).toBeInTheDocument();
  });
});
