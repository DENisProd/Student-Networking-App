import { MatchList } from "@/components/blocks/MatchList/MatchList";
import { NetworkingButton } from "@/components/widgets/NetworkingButton/NetworkingButton";
import { MyContacts } from "@/components/widgets/MyContacts/MyContacts";
import { MyProjects } from "@/components/widgets/MyProjects/MyProjects";
import styles from "./MatchPage.module.scss";

export default function MatchPage() {
  return (
    <div className={styles.page}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <NetworkingButton />
      </div>
      {/* <MatchList title="Симпатии" /> */}
      <MyContacts />
      <MyProjects />
    </div>
  );
}
