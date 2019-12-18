document.addEventListener("DOMContentLoaded", () => {
    'use strict';

    const customer = document.getElementById('customer'),
     freelancer = document.getElementById('freelancer'),
     blockCustomer = document.getElementById('block-customer'),
     blockFreelance = document.getElementById('block-freelancer'),
     blockChoice = document.getElementById('block-choice'),
     btnExit = document.getElementById('btn-exit'),
     formCustomer = document.getElementById('form-customer'),
     ordersTable = document.getElementById('orders'),
     modalOrder = document.getElementById('order_read'),
     modalOrderActive = document.getElementById('order_active'),
                 //home  \/
     modalClose = document.querySelector('.close'),
     getOrder = document.querySelector('.get-order');
                //home /\

    const orders = [];

    const renderOrders = () => {

        ordersTable.textContent = ''; 

        orders.forEach((order, i) => {
            ordersTable.innerHTML += `
                <tr class="order" data-number-order="${i}">
                    <td>${i+1}</td>
                    <td>${order.title}</td>
                    <td class="${order.currency}"></td>
                    <td>${order.deadline}</td>
                </tr>`;
        });
    };

    const openModal = (numberOrder) => {
        const order = orders[numberOrder];
        const modal = order.active ? modalOrderActive : modalOrder;
        
                        //home  \/
        const firstNameBlock = document.querySelector('.firstName'),
            titleBlock = document.querySelector('.modal-title'),
            emailBlock = document.querySelector('.email'),
            descriptionBlock = document.querySelector('.description'),
            deadLineBlock = document.querySelector('.deadline'),
            currencyBlock = document.querySelector('.currency_img'),
            countBlock = document.querySelector('.count'),
            phoneBlock = document.querySelector('.phone');

        titleBlock.textContent = order.title;
        firstNameBlock.textContent = order.firstName;
        emailBlock.textContent = order.email;
         emailBlock.href = 'mailto:' + order.eamil;
        phoneBlock.href = order.phone;           //phone
        deadLineBlock.textContent = order.deadline;
        descriptionBlock.textContent = order.description;
        currencyBlock.classList.add(order.currency);
        countBlock.textContent = order.amount;
        

        //console.log(order);
        modal.style.display = 'block';
        modalClose.addEventListener('click', () => modal.style.display = 'none');

        getOrder.addEventListener('click', () => {
            modal.style.display = 'none';
        });
                         //home  /\

    };

    ordersTable.addEventListener('click', event => {
        const target = event.target;
        console.log('target: ', target);

        const targetOrder = target.closest('.order')

        if (targetOrder) {
            openModal(targetOrder.dataset.numberOrder);
        }
                //home  \/
        getOrder.addEventListener('click', () => targetOrder.classList.add('taken'))
                //home  /\
    });

    


    customer.addEventListener('click', () => {
        blockCustomer.style.display = 'block'; 
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        renderOrders();
        blockFreelance.style.display = 'block';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', () => {
        btnExit.style.display = 'none';
        blockFreelance.style.display = 'none';
        blockCustomer.style.display = 'none'; 
        blockChoice.style.display = 'block';
    });

    formCustomer.addEventListener('submit', (event) => {
        event.preventDefault();
        const obj = {};
        const elements = [...formCustomer.elements]
        .filter((elem) => (elem.tagName === 'INPUT' && elem.type !== 'radio') ||
                (elem.type === 'radio' && elem.checked) ||
                elem.tagName === 'TEXTAREA');
        
        elements.forEach((elem) => {
                    obj[elem.name] = elem.value;

        });

        formCustomer.reset();

        orders.push(obj);
        //console.log(orders)
        
    });

    

});