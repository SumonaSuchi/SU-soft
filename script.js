// Theme toggle and contact form mailto behavior
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;
  const saved = localStorage.getItem('theme');

  // initialize theme
  if (saved === 'light') body.classList.add('light-theme');

  toggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    toggle.textContent = isLight ? '🌞' : '🌙';
  });

  // set initial button icon
  toggle.textContent = body.classList.contains('light-theme') ? '🌞' : '🌙';

  // year in footer
  const year = new Date().getFullYear();
  document.getElementById('year').textContent = year;

  // contact form -> open default mail client with filled content
  const form = document.getElementById('contactForm');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = encodeURIComponent(document.getElementById('name').value.trim());
    const email = encodeURIComponent(document.getElementById('email').value.trim());
    const message = encodeURIComponent(document.getElementById('message').value.trim());

    if (!name || !email || !message) {
      status.textContent = 'Please fill all fields.';
      return;
    }

    // configure mailto - replace recipient if you want a different address
    const recipient = 'sumonnakhanam86@gmail.com';
    const subject = encodeURIComponent('Message from portfolio site: ' + name);
    const bodyText = encodeURIComponent('Name: ' + decodeURIComponent(name) + '\nEmail: ' + decodeURIComponent(email) + '\n\nMessage:\n' + decodeURIComponent(message));

    const mailto = `mailto:${recipient}?subject=${subject}&body=${bodyText}`;

    // open default mail client
    window.location.href = mailto;

    // show status briefly (user will be in mail client)
    status.textContent = 'Opening your mail client...';
    setTimeout(() => { status.textContent = ''; }, 4000);
  });
});
