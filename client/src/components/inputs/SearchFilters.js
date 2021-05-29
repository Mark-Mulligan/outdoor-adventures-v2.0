import { Multiselect } from 'multiselect-react-dropdown';

const SearchFilters = ({ id, options, isObject, handleChange }) => {
  const handleSelect = (selectedList, selectedItem) => {
    if (selectedItem.id) {
      let resultArr = [];
      selectedList.forEach((item) => {
        resultArr.push(item.id);
      });
      handleChange(resultArr);
      return;
    }

    handleChange(selectedList);
  };

  const handleDelete = (selectedList) => {
    if (selectedList.length > 0 && selectedList[0].id) {
      let resultArr = [];
      selectedList.forEach((item) => {
        resultArr.push(item.id);
      });
      handleChange(resultArr);
      return;
    }

    handleChange(selectedList);
  };

  return (
    <Multiselect
      id={id}
      options={options} // Options to display in the dropdown
      isObject={isObject} // Property name to display in the dropdown options
      onSelect={handleSelect}
      onRemove={handleDelete}
      displayValue="name"
    />
  );
};

export default SearchFilters;
