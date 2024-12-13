import { render, screen, fireEvent, act } from '@testing-library/react';
import Carousel from '../components/carousel';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe('Carousel Component', () => {
  const mockImages = [
    'https://via.placeholder.com/300x200?text=Slide+1',
    'https://via.placeholder.com/300x200?text=Slide+2',
    'https://via.placeholder.com/300x200?text=Slide+3',
  ];

  test('renders images and navigation buttons', () => {
    render(<Carousel images={mockImages} />);

    // Check all images are rendered
    mockImages.forEach((image, index) => {
      const img = screen.getByAltText(`Slide ${index}`);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', image);
    });

    // Check navigation buttons
    expect(screen.getByText('❮')).toBeInTheDocument();
    expect(screen.getByText('❯')).toBeInTheDocument();
  });

  test('navigates to the next slide when the next button is clicked', () => {
    render(<Carousel images={mockImages} />);

    const nextButton = screen.getByText('❯');
    act(() => {
      fireEvent.click(nextButton);
    });

    // Check the carousel moves to the second slide
    const slideContainer = screen.getByRole('button', { name: /❯/ }).parentElement!;
    expect(slideContainer.querySelector('.carousel-slide')).toHaveStyle('transform: translateX(-100%)');
  });

  test('navigates to the previous slide when the prev button is clicked', () => {
    render(<Carousel images={mockImages} />);

    const prevButton = screen.getByText('❮');
    act(() => {
      fireEvent.click(prevButton);
    });

    // Check the carousel moves to the last slide
    const slideContainer = screen.getByRole('button', { name: /❮/ }).parentElement!;
    expect(slideContainer.querySelector('.carousel-slide')).toHaveStyle('transform: translateX(-200%)');
  });

  test('auto-rotates slides every 3 seconds', () => {
    jest.useFakeTimers();
    render(<Carousel images={mockImages} />);

    // Initial slide should be the first one
    const slideContainer = screen.getByRole('button', { name: /❯/ }).parentElement!;
    expect(slideContainer.querySelector('.carousel-slide')).toHaveStyle('transform: translateX(-0%)');

    // Fast-forward 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Check if it moved to the next slide
    expect(slideContainer.querySelector('.carousel-slide')).toHaveStyle('transform: translateX(-100%)');

    jest.useRealTimers();
  });

  test('stops auto-rotation when unmounted', () => {
    jest.useFakeTimers();
    const { unmount } = render(<Carousel images={mockImages} />);

    // Fast-forward 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    unmount();

    // Fast-forward again and ensure no additional rotations occur
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    jest.useRealTimers();
  });
});
