import React from 'react';

export default function Head({ keys, head }) {
  const tableHead = head || {};
  return (
    <thead>
      <tr>
        {keys.map((key) => (
          <th key={key}>{tableHead[key] || key}</th>
        ))}
      </tr>
    </thead>
  );
}
