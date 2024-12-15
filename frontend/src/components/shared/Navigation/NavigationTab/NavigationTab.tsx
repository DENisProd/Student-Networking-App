import React from 'react';
import { INavigationTab } from '../data';
import styles from './NavigationTab.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';

interface Props {
    tab: INavigationTab;
    active?: boolean;
}

const NavigationTab: React.FC<Props> = ({ tab, active }) => {
  return (
    <Link to={tab.link} className={cn(styles.NavigationTab, active && styles.active)}>
        {tab.icon}
    </Link>
  )
}

export default NavigationTab
