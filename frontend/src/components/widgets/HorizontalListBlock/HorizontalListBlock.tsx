import Typography from '@/components/ui/Typography/Typography';
import styles from './HorizontalListBlock.module.scss';
import React from 'react';

interface HorizontalListBlockProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onAllClick: () => void;
}

export function HorizontalListBlock<T>({ title, items, renderItem, onAllClick }: HorizontalListBlockProps<T>) {
  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <Typography variant="h3" text={title} className={styles.allText} />
        <button className={styles.allBtn} onClick={onAllClick}>Все</button>
      </div>
      <div className={styles.list}>
        {items.map(renderItem)}
      </div>
    </div>
  );
} 