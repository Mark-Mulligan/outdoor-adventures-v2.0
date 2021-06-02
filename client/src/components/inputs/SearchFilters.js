import { Multiselect } from 'multiselect-react-dropdown';
import './SearchFilters.css';

const SearchFilters = ({ id, options, isObject, handleChange, placeholder }) => {
  const handleSelect = (selectedList, selectedItem) => {
    let resultArr = [];
    selectedList.forEach((item) => {
      resultArr.push(item.id ? item.id : item);
    });
    handleChange(resultArr);
  };

  const handleDelete = (selectedList) => {
    const resultArr = [];
    if (selectedList.length > 0) {
      selectedList.forEach((item) => {
        resultArr.push(item.id ? item.id : item);
      });
      handleChange(resultArr);
      return;
    }
    handleChange(resultArr);
  };

  return (
    <Multiselect
      id={id}
      options={options} // Options to display in the dropdown
      isObject={isObject} // Property name to display in the dropdown options
      onSelect={handleSelect}
      onRemove={handleDelete}
      displayValue="name"
      placeholder={placeholder}
    />
  );
};

export default SearchFilters;
