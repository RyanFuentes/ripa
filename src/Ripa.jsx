import React, { PropTypes } from 'react';
import qs from 'qs';
import styles from './Ripa.scss';

// This "restore the view" logic should not be in the tabs view component.
// A utils file is a non-ideal solution. Inline it in each list view isn't
// great either. Leaving it here until a definitive answer has been found.
// Ben 161207
const onLoad = (scope) => {
  const view = localStorage.getItem(`${scope}/VIEW`);

  if (view) {
    const url = window.location.href.split('?');
    const params = qs.parse(url[1]);

    const newParams = Object.assign(params, { view });
    history
      .pushState(
        history.state,
        '',
        `${url[0]}?${qs.stringify(newParams, { arrayFormat: 'brackets' })}`);
  }
};

const onClick = (k, scope, onChange) => () => {
  const url = window.location.href.split('?');
  const params = qs.parse(url[1]);

  if (params.view !== k) {
    localStorage.setItem(`${scope}/VIEW`, k);

    const newParams = Object.assign(params, { view: k });
    history
      .pushState(
        history.state,
        '',
        `${url[0]}?${qs.stringify(newParams, { arrayFormat: 'brackets' })}`);
    onChange(k);
  }
};

const Ripa = ({
  labels,
  onChange,
  scope,
  title,
}) => {
  onLoad(scope);

  const params = qs.parse(window.location.search.substr(1));
  const view = params.view || localStorage.getItem(`${scope}/VIEW`);


  const tabs = labels.map(({k, v}) => (
    <button
      className={`${styles.tab} ${view === k ? styles.active : null}`}
      key={`${k}-tab`}
      onClick={onClick(k, scope, onChange)}
    >
      {v}
    </button>
  ));

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      {tabs}
    </div>
  );
};

Ripa.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  scope: PropTypes.string,
  title: PropTypes.string,
};

export default Ripa;
