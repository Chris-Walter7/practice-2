window['openModal'] = function  (id = null): void {

    const findModal = Modal.modals.find(x => x.id === id);

    if (!findModal) {
        const template = "<div>MyModal</div>";
        const modal = new Modal(id);
        modal.open(template);
    }
}
window['removeModal'] = function (): void {
    Modal.removeById();
}

window['openModalSecond'] = function (id = null): void {
    const template = "<div>MyModal2</div>";
    const modal = new Modal(id);
    modal.open(template);
}

export class Modal {
    private readonly id: string;


    public static modals: any[] = []; // массив всех экземпляров класса modalService;

    constructor(id = null) {
        const findModal = Modal.modals.find(x=> x.id === id);
        if (findModal) {
            Modal.removeById(this.id);
        }

        Modal.modals.push(this);
        console.log("Modal.modals", Modal.modals);
        this.id = id || (Math.random() + Modal.modals.length);
    }
    public open(template: string): void {

        const divWrap = document.createElement("div");
        divWrap.innerHTML = template;
        divWrap.id = this.id;
        divWrap.setAttribute('modal-id', this.id)
        divWrap.classList.add("modal-element");
        document.body.appendChild(divWrap);
    };
    public remove(): void {
        const modalEl: HTMLElement = document.getElementById(this.id);
        modalEl.parentNode.removeChild(modalEl);
    }

    public removeModal(): void {
        Modal.removeById();
    }
    public static removeById(id: string = null): void {
        let modalId: string = id;

        const findEl = Modal.modals.find(x => x.id === modalId);
        if(findEl) {
            findEl.remove();
            Modal.modals = Modal.modals.filter((el) => el.id !== modalId);
        } else {
            if (Array.isArray(Modal.modals)) {
                const lastEl = Modal.modals.pop();
                if (lastEl) {
                    lastEl.remove();
                }
            }
        }
    }

    public static removeAll() {
        if (Array.isArray(Modal.modals)) {
            Modal.modals.forEach((el) => {
                Modal.removeById(el.id)
            });
        }
    }
}

const modal: Modal = new Modal();
