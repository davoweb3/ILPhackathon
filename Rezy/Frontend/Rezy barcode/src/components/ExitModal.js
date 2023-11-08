import React, { useState } from 'react';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null);

  const openModal = () => {
    setIsOpen(true);
    // Fetch data from the endpoint
    fetch('http://localhost:3500/scanned-data-count-multiplied')
      .then((response) => response.json())
      .then((data) => {
        setResult(data.result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div>Result: {result}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
