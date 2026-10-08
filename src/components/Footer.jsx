/** Site footer with link columns. */
const columns = [
  { title: 'Services', links: ['Branding', 'Design', 'Marketing', 'Advertisement'] },
  { title: 'Company', links: ['About us', 'Contact', 'Jobs', 'Press kit'] },
  { title: 'Legal', links: ['Terms of use', 'Privacy policy', 'Cookie policy'] },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <p className="navbar__logo">
            Shop<span>Zone</span>
          </p>
          <p className="footer__text">
            Your one-stop shop for gaming desktops. Built with React &amp; the Context API.
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h4 className="footer__title">{col.title}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} ShopZone. All rights reserved.</p>
    </footer>
  );
}
