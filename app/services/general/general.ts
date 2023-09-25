
/* Общие методы используются для вставки текста в header   footer*/

/*  -
    - Указать в методах возвращающие типы, типы для параметров, в теле функции также указать типы
*/
import {ITours} from "../../models/tours";
import {getTourTemplate} from "../../templates/tours";
import {openModal} from "@services/modal/modalService";

export function initHeaderTitle(ticketName: string, selector: string): void {
    const headerElement= document.querySelector('header');
    const targetItem = <HTMLElement>headerElement.querySelector(selector);
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}

export function initFooterTitle(ticketName: string, selector: string) {
    const headerElement = document.querySelector('footer');
    const targetItem = <HTMLElement>headerElement.querySelector(selector);
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}

export function initToursDivElements(data: ITours[]): void {

    if (Array.isArray(data)) {
        const rootElement: Element = document.querySelector('.main-app');
        const tourWrap: HTMLDivElement = document.createElement('div');

        tourWrap.classList.add('tour-wrap');

        // init click for modal
        initTourElemListener(tourWrap);

        let rootElementData = '';
        data.forEach((el, i) => {
            rootElementData += getTourTemplate(el, i);
        });

        tourWrap.innerHTML = rootElementData;
        rootElement.appendChild(tourWrap) ;
    }
}

 function initTourElemListener(tourWrap: HTMLElement) {
    tourWrap.addEventListener('click', (ev: MouseEvent): void => {
        const targetItem = ev.target as HTMLElement;
        const parentItem = <HTMLElement>targetItem?.parentNode;
        let realTarget;

        if (targetItem.hasAttribute('data-tour-item-index')) {
            realTarget = targetItem;
        } else if (parentItem && parentItem.hasAttribute('data-tour-item-index')) {
            realTarget = parentItem;
        }

        if (realTarget) {
            const dataIndex = realTarget.getAttribute('data-tour-item-index');
            openModal('order', Number(dataIndex));
        }
    });
}