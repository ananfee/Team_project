import React, { useState, useEffect, useRef } from 'react';

function AutocompleteInput({ value, onChange, suggestions, placeholder }) {
   const [showSuggestions, setShowSuggestions] = useState(false);
   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
   const inputRef = useRef(null);

   useEffect(() => {
      if ((value ?? '').length > 0) {
         setFilteredSuggestions(
            suggestions.filter(
               item => item?.toLowerCase().startsWith(value.toLowerCase())
            ).filter(Boolean)
         );
      } else {
         setFilteredSuggestions([]);
      }
   }, [value, suggestions]);

   function handleSelect(suggestion) {
      onChange(suggestion);
      setShowSuggestions(false);
   }

   function handleBlur() {
      setTimeout(() => setShowSuggestions(false), 100);
   }

   function handleChange(e) {
      onChange(e.target.value);
      setShowSuggestions(true);
   }

   function handleFocus() {
      // Показывать подсказки только если value не пусто и фильтруется хоть что-то
      setShowSuggestions((value ?? '').length > 0 && filteredSuggestions.length > 0);
   }

   return (
      <div style={{ position: "relative" }}>
         <input
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ marginBottom: 8, width: 300 }}
            autoComplete="off"
            
         />
         {showSuggestions && filteredSuggestions.length > 0 && (
            <div style={{
               position: "absolute",
               background: "#fff",
               border: "1px solid #5D3C64",
               borderRadius: 24,
               width: 298,
               zIndex: 100,
               maxHeight: 120,
               overflowY: "auto"
            }}>
               {filteredSuggestions.map((suggestion, idx) => (
                  <div key={idx}
                       style={{
                          padding: "10px 10px",
                          cursor: "pointer",
                          fontFamily: "Inter",
                          fontSize: 18,
                          fontWeight: 300
                       }}
                       onMouseDown={() => handleSelect(suggestion)}>
                     {suggestion}
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}

export default AutocompleteInput;