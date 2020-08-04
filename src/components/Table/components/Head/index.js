import React from 'react';

export default function Head({ keys, head }) {
  const tableHead = head || {};

  let columnWithHead =[]
  
  keys.forEach(key => {
    if (tableHead[key]) columnWithHead.push(tableHead[key])
  });

  return (
    <thead>
      <tr>
        {columnWithHead.map((column) => <th key={column}>{column}</th> )}
      </tr>
    </thead>
  );
}
