import React from 'react';
import Select from 'react-select';

function SimpleSelectComponent({ options, selectedOption, onSelectionChange , readOnly = false }) {
  const handleChange = (selected) => {
    onSelectionChange(selected);
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      maxHeight: 120, // Ajuste la hauteur maximale du menu
      overflowY: 'auto',
    }),
  };

  return (
    <div>
      <Select
        name="options"
        options={options}
        value={selectedOption}
        onChange={handleChange}
        className="basic-multi-select border-blue-500 required"
        classNamePrefix="select"
        styles={customStyles} // Applique les styles personnalisés
        isDisabled={readOnly} 
      />
    </div>
  );
}

export default SimpleSelectComponent;
