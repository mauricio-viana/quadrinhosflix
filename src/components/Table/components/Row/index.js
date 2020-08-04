import React from 'react';

export default function Row({ record, head }) {
  const tableHead = head || {};
  const keys = Object.keys(record);
  
  let columnWithHead =[]
  
  keys.forEach(key => {
    if (tableHead[key]) columnWithHead.push({key,column:record[key]})
  });
  
  return (
    <tr>
      {columnWithHead.map(({key, column}) => {
        return <td key={key}>{column}</td>;
      })}
    </tr>
  );
}
