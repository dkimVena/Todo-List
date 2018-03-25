import React, {Component} from 'react';
import classNames from 'classnames/bind';
import styles from './Palette.scss';

const cx = classNames.bind(styles);

class Palette extends Component {
  render() {
    const {colors, selectedColor, onColor} = this.props;
    const colorList = colors.map(
        (item) => {
          return (
            <div
              className={cx('color', { 'active': item === selectedColor})}
              key={item}
              style={{background: item}}
              onClick={() => onColor(item)}
              ></div>
          );
        }
      );

    return (
      <div className={cx("palette")}>
        {colorList}
      </div>
    );
  }
}

export default Palette;
