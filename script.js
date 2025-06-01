document.getElementById('calculate').addEventListener('click', function() {
    const products = document.querySelectorAll('.product');
    let totalAmount = 0;
    let totalQuantity = 0;

    products.forEach(product => {
        const price = parseFloat(product.querySelector('.price').textContent);
        const quantity = parseInt(product.querySelector('.quantity').value);
        const packingOption = product.querySelector(`input[name="pack${Array.from(products).indexOf(product) + 1}"]:checked`);
        const isPacked = packingOption ? packingOption.value : "yes"; // если ничего не выбрано, считать упаковка по умолчанию "да"

        totalQuantity += quantity;

        if (isPacked === "yes") {
            totalAmount += price * quantity;
        } else {
            totalAmount += price * quantity * 0.9; 
        }
    });

    let discount = 0;//инициальзация скидок 
    if (totalQuantity > 30) {//скидка 20 если количество больше 30
        discount = totalAmount * 0.2; 
    }

    const delivery = document.getElementById('delivery').checked ? totalAmount * 0.05 : 0;

    const total = totalAmount - discount + delivery;

    document.getElementById('result').innerHTML = `
        <p>Сумма за товары: ${totalAmount.toFixed(2)}₽</p>
        <p>Сумма скидки: ${discount.toFixed(2)}₽</p>
        <p>Стоимость доставки: ${delivery.toFixed(2)}₽</p>
        <p><strong>Итоговая сумма: ${total.toFixed(2)}₽</strong></p>
    `;
});