import styles from './WrapList.module.scss';
import cn from 'classnames';

interface Props {
    children: React.ReactNode;
    wrap: boolean;
}

const WrapList: React.FC<Props> = ({ children, wrap }) => {
  return (
    <div className={cn(styles.list, wrap && styles.wrap)}>
      {children}
    </div>
  )
}

export default WrapList
