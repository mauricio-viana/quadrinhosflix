import React from 'react';
import Head from './components/Head';
import Row from './components/Row';
import './Table.css';

export default function Table({ data, head }) {
  const keys = Object.keys(data[0]);

  return (
    <table className="table-style">
      <Head keys={keys} head={head} />
      <tbody>
        {data.map((record) => (
          <Row key={record.id} record={record} head={head} />
        ))}
      </tbody>
    </table>
  );
}
