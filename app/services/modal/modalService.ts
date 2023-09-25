
import {Modal} from "../../classess/modal";
import {toursDataArray} from "../../index";
import {ITours} from "../../models/tours"; // ссылка на массив с данными


// Определить типы для метода (возвращающие и для переменных в теле функции)

export function openModal(type, i: number) {

    const data: ITours = toursDataArray[i];
    const tourId = data[i]?.id;

    let modalInfo: {} = {};
    switch (type) {
        case "order":
            const modalTemplate: string = `
      <div> 
      <p data-moda-id="tour-modal" class="close-modal">x</p>
      <p>${data.name}</p>
      <p>${data.description}</p>
       
       <div data-tour-id=${tourId} class="ticket-submit">
       <a href="/ticket.html">Купить билет</a>
</div>
     </div>
  `
            const modal: Modal = new Modal('tour-modal');
            modal.open(modalTemplate);
            document.querySelector('close-modal').addEventListener('click', function (): void {
            })
            modal.removeModal();
    break;
    }
}


