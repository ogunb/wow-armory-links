const EXTENSION_URL = 'chrome-extension://mldagnjieibhfkdhfncjflkennfcheag';

let retryCount = 0;
let interval = setInterval(() => {
  const header = document.querySelector('.CharacterHeader-character');

  if (retryCount > 10 || header !== null) {
    clearInterval(interval);
  }

  if (header !== null) {
    requestIdleCallback(() => addRaiderIOLink(header));
  }

  retryCount++;
}, 500);

async function addRaiderIOLink(header) {
  header.insertAdjacentHTML(
    'beforeend',
    createNameArea(
      createLogoLink({
        href: getRaiderIOHref(),
        image: { url: `${EXTENSION_URL}/images/raider-io.svg`, alt: 'raider-io-logo' },
      }),
      createLogoLink({
        href: getWarcraftLogsHref(),
        image: { url: `${EXTENSION_URL}/images/warcraft-logs.png`, alt: 'warcraft-logs-logo' },
        isLast: true,
      }),
    ),
  );
}

function getCharacterPath () {
  const [, respectivePath] = window.location.pathname.split('character/');
  return respectivePath;
}

function getRaiderIOHref() {
  const respectivePath = getCharacterPath();
  return `https://raider.io/characters/${respectivePath}`;
}

function getWarcraftLogsHref() {
  const respectivePath = getCharacterPath();
  return `https://www.warcraftlogs.com/character/${respectivePath}`;
}

function createNameArea(...links) {
  return `
    <div class="CharacterHeader-nameArea">
      <div class="CharacterHeader-nameTitle flex flex-items-center" style="min-height: 53px;">
        ${links.join(' ')}
      </div>
    </div>
  `;
}

function createLogoLink({ image, href, isLast }) {
  const imageClasses = isLast ? '' : 'class="margin-right-double-xSmall"';

  return `
    <a href="${href}" target="_blank" rel="noreferrer">
      <img src="${image.url}" alt="${image.alt}" width="24" height="24" ${imageClasses} />
    </a>
  `;
}
