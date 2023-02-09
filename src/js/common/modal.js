import { checkExistParent } from './checkExistParent';

/**
 Обязательные классы внутри ModalElem:
 .js-modal-container
 .js-modal-content
 */

export class Modal {
  bodyElem;

  modalElem;
  modalContainerElem;
  modalContentElem;
  isOpenModal = false;

  constructor(modalElem) {
    this.checkClickByModal = this.checkClickByModal.bind(this);
    // this.setHeightModalContainer = this.setHeightModalContainer.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);

    this.modalElem = modalElem;
    this.modalContainerElem = this.modalElem.querySelector('.js-modal-container');
    this.modalContentElem = this.modalElem.querySelector('.js-modal-content');

    document.body.appendChild(modalElem);

    document.addEventListener('click', this.checkClickByModal);

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        this.onCloseModal();
      }
    });
  }

  disableModal() {
    this.disabled = true;
  }
  enableModal() {
    this.disabled = false;
  }

  disabled = false;

  checkClickByModal(event) {
    if (this.disabled) return;
    if (this.isOpenModal && !checkExistParent(event.target, this.modalContainerElem)) {
      this.onCloseModal();
    } else {
      this.isOpenModal = true;
    }
  }

  onOpenModal() {
    this.modalElem.classList.add('mod-show');
    // this.setHeightModalContainer();
    document.body.classList.add('mod-no-scroll');

    // window.addEventListener('resize', this.setHeightModalContainer);
  }

  onCloseModal() {
    if (this.disabled) return;
    this.modalElem.classList.remove('mod-show');
    this.isOpenModal = false;
    document.removeEventListener('click', this.checkClickByModal);
    // window.removeEventListener('resize', this.setHeightModalContainer);
    document.body.classList.remove('mod-no-scroll');
  }

  // setHeightModalContainer() {
  //   if (this.modalContentElem) {
  //     this.modalContainerElem.style.height = `${ this.modalContentElem.scrollHeight }px`;
  //   }
  // }
}

window.classModal = Modal;
