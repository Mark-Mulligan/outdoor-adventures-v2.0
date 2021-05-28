import { Multiselect } from 'multiselect-react-dropdown';

const SearchFilters = ({ id, options, handleChange }) => {
  const handleSelect = (selectedList) => {
    handleChange(selectedList);
  };

  const handleDelete = (selectedList) => {
    handleChange(selectedList);
  };

  return (
    <Multiselect
      id={id}
      options={options} // Options to display in the dropdown
      isObject={false} // Property name to display in the dropdown options
      onSelect={handleSelect}
      onRemove={handleDelete}
    />
  );
};

export default SearchFilters;
