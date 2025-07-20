import { useContactStore } from "@/services/store/contact.store";
import { useNavigate } from "react-router-dom";
import styles from "./MyContacts.module.scss";

export function MyContacts() {
  const { contacts } = useContactStore();
  const navigate = useNavigate();

  return (
    <div className={styles.contactsBlock}>
      <h3>Мои контакты</h3>
      <ul className={styles.list}>
        {contacts.map(contact => (
          <li key={contact.id} className={styles.item} onClick={() => navigate(`/profile/${contact.id}`)}>
            {contact.avatar && <img src={contact.avatar} alt={contact.name} className={styles.avatar} />}
            <span>{contact.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 