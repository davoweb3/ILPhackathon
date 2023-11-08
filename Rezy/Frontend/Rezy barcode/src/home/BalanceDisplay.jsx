import React from 'react';


function BalanceDisplay({ balance }) {
  return (
    <div>
      <h2>My Balance is:</h2>
      <p>{balance}"USD"</p>
    </div>
  );
}

export default BalanceDisplay;
