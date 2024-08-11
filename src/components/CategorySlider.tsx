import React from 'react';

interface CategorySliderProps {
  currentCategory: "To Do" | "On Progress" | "Done" | "Timeout";
  onCategoryChange: (category: "To Do" | "On Progress" | "Done" | "Timeout") => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ currentCategory, onCategoryChange }) => {
  return (
    <div className="flex space-x-4 mb-4">
      {["To Do", "On Progress", "Done", "Timeout"].map((category) => (
        <button
          key={category}
          className={`p-2 rounded ${currentCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onCategoryChange(category as "To Do" | "On Progress" | "Done" | "Timeout")}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySlider;
