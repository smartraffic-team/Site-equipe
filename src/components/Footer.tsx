import logo from '../assets/syncro-logo.svg';

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div><img src={logo} alt="Syncro" className="footer-logo" /><p>Desenvolvendo o futuro da mobilidade e infraestrutura inteligente através de dados e código.</p></div>
        <div><h3>Nosso endereço</h3><p>Faculdade de Tecnologia (Fatec)<br />Registro - SP, Brasil</p></div>
        <div><h3>Contato</h3><p>hello@syncroteam.com.br<br />+55 (13) 99999-9999</p></div>
      </div>
    </footer>
  );
}
