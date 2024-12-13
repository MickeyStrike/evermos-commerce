import { render, screen } from '@testing-library/react';
import Category from '@/components/category';
import { IResponseCategory } from '@/types';

describe('Category Component', () => {
  const mockCategories: IResponseCategory[] = [
    { slug: 'category-1', name: 'Category 1', url: "https://dummyjson.com/products/category/beauty" },
    { slug: 'category-2', name: 'Category 2', url: "https://dummyjson.com/products/category/beauty" },
    { slug: 'category-3', name: 'Category 3', url: "https://dummyjson.com/products/category/beauty" },
  ];

  const mockSetSelectedCategory = jest.fn();

  it('renders the component correctly', () => {
    render(
      <Category
        listCategory={mockCategories}
        selectedCategory="category-1"
        setSelectedCategory={mockSetSelectedCategory}
      />
    );

    // Assert component structure
    expect(screen.queryAllByRole('presentation')).toHaveLength(3);
  });

  it('handles an empty list of categories', () => {
    render(
      <Category
        listCategory={[]}
        selectedCategory=""
        setSelectedCategory={mockSetSelectedCategory}
      />
    );

    // Assert that no categories are rendered
    expect(screen.queryAllByRole('presentation')).toHaveLength(0);
  });
});
