"use client"
import useCategoriesLogic from "@/app/hooks/useCategoriesLogic";
import usePostFilter from "@/app/hooks/usePostFilter";




const CategoryFilter = () => {
    const {categories} = useCategoriesLogic()
    const {selectedCategory,handleCategoryChange,resetFilters} = usePostFilter()
    return (
        <main className="p-4 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-white text-xl font-semibold mb-3">Categories Filter</h2>

            {/* Responsive Scrollable List */}
            <ul
                className="
      text-white
      overflow-y-scroll
      max-h-64
      space-y-2
      rounded-md
      px-1
      md:max-h-80
      lg:max-h-96
      sm:text-base
      text-sm
    "
            >
                {categories?.map((category) => (
                    <li key={category._id}>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="category"
                                value={category.name}
                                checked={selectedCategory === category.name}
                                onChange={() => {
                                    handleCategoryChange(category.name);
                                    // updateQueryParams({ category: category.name });
                                }}
                                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            />
                            <span className="ml-2">{category.name}</span>
                        </label>
                    </li>
                ))}
            </ul>
            <button onClick={resetFilters} className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md" disabled={!selectedCategory}>
                Reset
            </button>
        </main>
    )
}
export default CategoryFilter;

