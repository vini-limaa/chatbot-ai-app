import styles from "./ChatHeader.module.scss";

const ChatHeader = ({ userName }: ChatHeaderProps) => {
  return (
    <header
      className={styles.chatHeader}
      role="header"
      aria-label="Chat Header"
    >
      <span className={styles.userName} role="heading" aria-level={1}>
        {userName}
      </span>
    </header>
  );
};

export default ChatHeader;

interface ChatHeaderProps {
  userName: string;
}
