function calculateCircleArea(radius) {
    return Math.PI * Math.pow(radius, 2);
}

function getCircleArea() {
    const radius = prompt("Введите радиус круга:");
    if (radius !== null && !isNaN(radius) && radius > 0) {
        const area = calculateCircleArea(parseFloat(radius));
        alert(`Площадь круга с радиусом ${radius} равна ${area.toFixed(2)}`);
    } else {
        alert("Пожалуйста, введите корректный радиус.");
    }
}