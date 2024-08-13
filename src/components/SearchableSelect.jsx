import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

const SearchableSelect = ({
  options,
  labelKey,
  valueKey,
  placeholder,
  label,
  onSelect,
  name,
  borderColor,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    setFilteredOptions(
      options?.filter((option) => option[labelKey].toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, options, labelKey]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedOption(value);
    setIsOpen(true);
    if (value === '') {
      onSelect({ target: { name, value: '' } });
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option[labelKey]);
    setSearchTerm(option[labelKey]);
    onSelect({ target: { name, value: option[valueKey] } });
    setIsOpen(false);
  };

  return (
    <div className="mb-4" ref={wrapperRef}>
      {label && (
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          id={name}
          name={name}
          value={selectedOption}
          onChange={handleInputChange}
          onClick={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border ${borderColor} rounded-md focus:outline-none`}
        />
        <FaCaretDown className="absolute top-3 right-3" />
        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <li
                key={option[valueKey]}
                onClick={() => handleSelect(option)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {option[labelKey]}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="px-3 py-2 text-gray-500">Nama tidak ditemukan</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

SearchableSelect.propTypes = {
  options: PropTypes.array,
  labelKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
};

export default SearchableSelect;
