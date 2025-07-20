import { Bell } from "lucide-react";
import { useNotificationStore } from "@/services/store/notification.store";
import { useNavigate } from "react-router-dom";
import styles from "./NetworkingButton.module.scss";

export function NetworkingButton() {
  const { unreadCount } = useNotificationStore();
  const navigate = useNavigate();

  return (
    <button className={styles.networkingBtn} onClick={() => navigate("/networking")}
      type="button"
    >
      <Bell />
      {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      <span className={styles.text}>Нетворкинг</span>
    </button>
  );
} 