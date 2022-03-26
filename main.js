let retryCount = 0;
let interval = setInterval(() => {
  const nameWrapper = document.querySelector('.CharacterHeader-nameTitle');

  if (retryCount > 10 || nameWrapper !== null) {
    clearInterval(interval);
  }

  if (nameWrapper !== null) {
    requestIdleCallback(() => addRaiderIOLink(nameWrapper));
  }

  retryCount++
}, 500);

async function addRaiderIOLink(wrapper) {
  console.log(wrapper);
}
