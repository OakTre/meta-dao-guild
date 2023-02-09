import SlimSelect from 'slim-select';

export default function SelectInit(hostElem) {
  const select = hostElem.querySelector('#slim-select');

  new SlimSelect({
    select: select
  })
}
