import styles from "./styles/footer.module.css";
export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__cols}>
        <a href="#!">Política de Privacidade</a>
        <a href="#!">Termos de Usuário</a>
      </div>

      <div className={styles.footer__cols}>
        <a href="#!">Institucional</a>
        <a href="#!">Fale Conosco</a>
      </div>
    </div>
  );
};
