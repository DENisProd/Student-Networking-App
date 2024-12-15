import styles from './ImagePlaceholder.module.scss';
import { Image } from 'lucide-react';

const ImagePlaceholder = () => {
  return (
    <div className={styles.image}>
        <Image size={80}/>
    </div>
  )
}

export default ImagePlaceholder;
