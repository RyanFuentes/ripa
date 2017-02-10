import { render } from 'react-dom';
import React from 'react';

import Ripa from '../src';

const onChange = () => { console.warn("Tab changed; external callback triggered."); }

const labels = [
  { k: 'foo', v: "The Foo" },
  { k: 'bar', v: "A Bar" },
  { k: 'baz', v: "Some Baz" },
];

render(
  <Ripa {...{onChange, labels}} />,
  document.getElementById('root')
);
