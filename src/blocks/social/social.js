class Social {
  contentElems;

  constructor() {
    const hostElem = document.querySelector('#social-host');
    if (!hostElem) return;

    const tabElems = hostElem.querySelectorAll('.js-tab');
    this.contentElems = hostElem.querySelectorAll('.js-content');

    this.onChangeContent(tabElems[0].value);

    tabElems.forEach(tab => {
      tab.onclick = () => {
        this.onChangeContent(tab.value);
      }
    })
  }

  onChangeContent(tabValue) {
    this.contentElems.forEach(content => {
      if (content.getAttribute('data-value') === tabValue) {
        content.classList.add('mod-show');
      } else {
        content.classList.remove('mod-show');
      }
    });
  }
}

new Social();
