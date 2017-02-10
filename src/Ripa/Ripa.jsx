import React, { PropTypes } from 'react';
import styles from './styles/default.scss';

class Ripa extends React.Component {

  componentWillMount() {
    if (
      this.props.hasOwnProperty('initialSelectedIndex') &&
      this.props.hasOwnProperty('initialSelectedKey')
    ) { console.warn('Both initialSelectedIndex and initialSelectedKey were supplied. Using initialSelectedIndex.'); }

    const { initialSelectedKey, initialSelectedIndex, labels } = this.props;
    const selectedIndex = initialSelectedIndex || labels.findIndex(l => l.k === initialSelectedKey);
    this.state = { selectedIndex };
  }

  setSelected({k, v, index}) {
    const { selectedIndex } = this.state;
    if (selectedIndex !== index) {
      this.setState({selectedIndex: index});
      this.props.onChange(k, v, index);
    }
  }

  _onClickButton = ({k, v, index}) => () => {
    this.setSelected({k, v, index});
  };

  render() {
    const {
      labels,
      title,
    } = this.props;

    const { selectedIndex } = this.state;

    const tabs = labels.map(({k, v}, index) => (
      <button
        className={`${styles.tab} ${selectedIndex === index ? styles.active : null}`}
        key={`${k}-tab`}
        onClick={this._onClickButton({k, v, index})}
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
  }
}

Ripa.propTypes = {
  labels: PropTypes.arrayOf(
    React.PropTypes.shape({
      k: React.PropTypes.string,
      v: React.PropTypes.string
    })
  ),
  title: PropTypes.string,
  onChange: PropTypes.func,
  initialSelectedIndex: PropTypes.number,
  initialSelectedKey: PropTypes.string
};

Ripa.defaultProps = {
  labels: [],
  onChange: ()=>{}
};


export default Ripa;
