import React from 'react';
import Head from './components/Head';
import Row from './components/Row';

export default function Table({ data, head }) {
  const keys = Object.keys(data[0]);

  return (
    <table>
      <Head keys={keys} head={head} />
      <tbody>
        {data.map((record) => (
          <Row record={record} />
        ))}
      </tbody>
    </table>
  );
}
