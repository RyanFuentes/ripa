import { render } from 'react-dom';
import React from 'react';

import Ripa from '../src';

const labels = [
  { k: 'foo1', v: "The Foo1" },
  { k: 'bar', v: "A Bar" },
  { k: 'baz', v: "Some Baz" },
];

const onChange = (k, v, index) => {
  console.warn(`${k} - Tab changed; external callback triggered.`);
}

render(
  <Ripa
    labels={labels}
    onChange={onChange}
  />,
  document.getElementById('root')
);
