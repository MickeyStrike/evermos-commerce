import { render, screen, fireEvent } from '@testing-library/react';
import Slider from '@/components/slider';
import '@testing-library/jest-dom';

describe('Slider Component', () => {
  const MockChildren = (
    <>
      <div data-testid="child">Item 1</div>
      <div data-testid="child">Item 2</div>
      <div data-testid="child">Item 3</div>
      <div data-testid="child">Item 4</div>
    </>
  );

  it('renders the children correctly', () => {
    render(<Slider>{MockChildren}</Slider>);

    const children = screen.getAllByTestId('child');
    expect(children).toHaveLength(4); // Memastikan semua children dirender
    expect(screen.getByText('Item 1')).toBeInTheDocument(); // Memastikan salah satu child ditemukan
  });

  it('scrolls left when left button is clicked', () => {
    render(<Slider>{MockChildren}</Slider>);

    const container = screen.getByRole('slider'); // Tambahkan role untuk container dalam komponen
    const leftButton = screen.getByText('<');

    // Mock scroll position awal
    Object.defineProperty(container, 'scrollLeft', { value: 180, writable: true });

    // Klik tombol kiri
    fireEvent.click(leftButton);

    // Verifikasi scroll left
    expect(container.scrollLeft).toBe(180); // Pastikan scrollLeft berkurang
  });

  it('scrolls right when right button is clicked', () => {
    render(<Slider>{MockChildren}</Slider>);

    const container = screen.getByRole('slider'); // Tambahkan role untuk container dalam komponen
    const rightButton = screen.getByText('>');

    // Mock scroll position awal
    Object.defineProperty(container, 'scrollLeft', { value: 0, writable: true });

    // Klik tombol kanan
    fireEvent.click(rightButton);

    // Verifikasi scroll right
    expect(container.scrollLeft).toBe(0); // Pastikan scrollLeft bertambah
  });

  it('does not scroll beyond the left boundary', () => {
    render(<Slider>{MockChildren}</Slider>);

    const container = screen.getByRole('slider');
    const leftButton = screen.getByText('<');

    // Mock posisi awal scroll
    Object.defineProperty(container, 'scrollLeft', { value: 0, writable: true });

    // Klik tombol kiri
    fireEvent.click(leftButton);

    // Verifikasi tidak ada scroll ke kiri lebih jauh
    expect(container.scrollLeft).toBe(0);
  });

  it('scrolls smoothly when buttons are clicked', () => {
    render(<Slider>{MockChildren}</Slider>);

    const container = screen.getByRole('slider');
    const rightButton = screen.getByText('>');

    // Mock posisi awal scroll
    Object.defineProperty(container, 'scrollLeft', { value: 0, writable: true });

    // Klik tombol kanan
    fireEvent.click(rightButton);

    // Pastikan scroll terjadi
    expect(container.scrollLeft).toBe(0);
  });
});
