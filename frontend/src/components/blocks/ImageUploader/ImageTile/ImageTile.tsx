import React from "react";
import styles from "./ImageTile.module.scss";
import { Media } from "@/services/models/Media";

interface Props {
    src: Media | null;
    alt?: string;
}

const MEDIA_SERVER_URL = import.meta.env.VITE_MEDIA_BACKEND_URL;

const ImageTile: React.FC<Props> = ({ src, alt }) => {
    const isVideo = src?.filename?.endsWith(".mp4");
  // poster - preview
    return (
        <div className={styles.image}>
            {src?.filename ? (
                <>
                    {isVideo ? (
                        <video key={src.filename} autoPlay loop muted> 
                            <source src={`${MEDIA_SERVER_URL}media/${src.filename}?v=${Date.now()}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img src={`${MEDIA_SERVER_URL}media/${src.filename}`} alt={alt || "Фото пользователя"} />
                    )}
                </>
            ) : (
                <div className={styles.placeholder}>
                    <svg width="105" height="106" viewBox="0 0 105 106" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M92.8438 0.290039H12.2188C9.01129 0.290039 5.93518 1.5642 3.66716 3.83222C1.39916 6.10024 0.125 9.17643 0.125 12.3839V93.0089C0.125 96.2162 1.39916 99.2924 3.66716 101.56C5.93518 103.828 9.01129 105.103 12.2188 105.103H17.9028V92.2631C17.9079 85.8321 19.7965 79.5435 23.3357 74.1739C26.8748 68.8043 31.9092 64.5892 37.8172 62.0487C35.2632 59.9097 33.2103 57.2358 31.8032 54.2162C30.3961 51.1966 29.6692 47.9046 29.6741 44.5734C29.6832 38.514 32.0942 32.7054 36.3789 28.4208C40.6635 24.1362 46.4719 21.7253 52.5313 21.7162C58.5937 21.7209 64.4069 24.1299 68.6956 28.415C72.9842 32.6998 75.3985 38.5108 75.4086 44.5734C75.4135 47.9046 74.6866 51.1966 73.2795 54.2162C71.8724 57.2358 69.8195 59.9097 67.2655 62.0487C73.1687 64.5934 78.198 68.8103 81.7332 74.1793C85.2685 79.5484 87.1549 85.8347 87.1597 92.2631V105.103H92.8438C96.0512 105.103 99.1273 103.828 101.395 101.56C103.663 99.2924 104.938 96.2162 104.938 93.0089V12.3839C104.938 9.17643 103.663 6.10024 101.395 3.83222C99.1273 1.5642 96.0512 0.290039 92.8438 0.290039Z"
                            fill="var(--background)"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default ImageTile;
