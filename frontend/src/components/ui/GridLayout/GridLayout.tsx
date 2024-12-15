import React from 'react';
import styles from './GridLayout.module.scss';
import cn from 'classnames';

interface Props {
    children: React.ReactNode,
    className?: string,
    noPadding?: boolean,
    cols: number,
    center?: boolean,
}

const GridLayout: React.FC<Props> = ({ children, className, noPadding, cols, center }) => {
  return (
    <div className={cn(styles.GridLayout, className, center && styles.center, noPadding && styles.no_padding, styles[`col`+cols])}>
      {children}
    </div>
  )
}

export default GridLayout
