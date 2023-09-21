// Variables
const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const printButton = document.getElementById('print-button');

// Array para almacenar productos
let products = [];

// Evento para agregar producto
productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    // VALIDACIÓN: NO VALIDA LA ENTRADA DE DATOS
    if (name && !isNaN(price) && !isNaN(quantity) && price > 0 && quantity > 0) {
        const product = { name, price, quantity };
        products.push(product);

        updateProductList();
        productForm.reset();
    } else {
        alert('Por favor, completa los campos correctamente.');
    }
});

// ... (código anterior) ...

// Obtener elementos del modal
const deleteModal = document.getElementById('delete-modal');
const deleteConfirmButton = document.getElementById('delete-confirm-button');
const deleteCancelButton = document.getElementById('delete-cancel-button');
const quantityToDeleteInput = document.getElementById('quantity-to-delete');

// Variable para almacenar el índice del producto a eliminar
let productIndexToDelete;

// Evento para mostrar el modal de eliminación
productList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const index = e.target.dataset.index;
        if (index !== undefined) {
            productIndexToDelete = index;
            deleteModal.style.display = 'block'; // Mostrar el modal
        }
    }
});

// Evento para cancelar la eliminación
deleteCancelButton.addEventListener('click', () => {
    deleteModal.style.display = 'none'; // Ocultar el modal
    quantityToDeleteInput.value = ''; // Limpiar el campo de cantidad
});

// Evento para confirmar la eliminación
deleteConfirmButton.addEventListener('click', () => {
    const quantityToDelete = parseInt(quantityToDeleteInput.value);
    if (!isNaN(quantityToDelete) && quantityToDelete > 0) {
        // Eliminar la cantidad especificada del producto
        if (products[productIndexToDelete].quantity >= quantityToDelete) {
            products[productIndexToDelete].quantity -= quantityToDelete;
        } else {
            products.splice(productIndexToDelete, 1); // Eliminar el producto si la cantidad es mayor que la disponible
        }
        
        // Actualizar la lista de productos
        updateProductList();

        // Ocultar el modal
        deleteModal.style.display = 'none';
        quantityToDeleteInput.value = ''; // Limpiar el campo de cantidad
    } else {
        alert('Ingresa una cantidad válida para eliminar.');
    }
});

// Actualizar la lista de productos en la página
function updateProductList() {
    productList.innerHTML = '';
    // Filtrar productos con cantidad mayor que cero
    products = products.filter((product) => product.quantity > 0);
    products.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${product.name}</strong> - Precio: $${product.price} - Cantidad: ${product.quantity}
            <button data-index="${index}">Eliminar</button>
        `;
        productList.appendChild(listItem);
    });
}


// Evento para imprimir la lista de productos
printButton.addEventListener('click', () => {
    printInventory();
});

// Función para imprimir la lista de productos
function printInventory() {
    let printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Lista de Productos</title>');

    // Estilos CSS para centrar el encabezado
    printWindow.document.write('<style>');
    printWindow.document.write(`
        body {
            border: 2px solid black;
            padding: 10px;
            height: 95vh; /* Altura completa de la ventana */
        }
        
        h1 {
            text-align: center; /* Centrar el texto horizontalmente */
            font-family: 'Oswald', sans-serif;
        }
    `);
    printWindow.document.write('</style>');

    printWindow.document.write('</head><body>');
    // VALIDACIÓN: MARCAR EL ERROR EN LA PÁGINA IMPRESA
    printWindow.document.write('<h1>Lista de Productos</h1>');
    products.forEach((product) => {
        printWindow.document.write(`<p><strong>${product.name}</strong> - Precio: $${product.price} - Cantidad: ${product.quantity}</p>`);
    });
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
}

// Evento para manejar el envío del formulario
productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = productName.value.trim();
    const price = parseFloat(productPrice.value.trim()); // Convertir a número decimal
    const quantity = parseInt(productQuantity.value.trim()); // Convertir a número entero

    // VALIDACIÓN: VERIFICAR SI EL NOMBRE ESTÁ VACÍO
    if (name === "") {
        prompt("Por favor, ingrese un nombre válido para el producto.");
        return; // Salir de la función si no se proporciona un nombre válido
    }

    // VALIDACIÓN: VERIFICAR SI EL PRECIO NO ES UN NÚMERO O ES NEGATIVO
    if (isNaN(price) || price <= 0) {
        alert("El precio debe ser un número positivo.");
        return; // Salir de la función si el precio no es válido
    }

    // VALIDACIÓN: VERIFICAR SI LA CANTIDAD NO ES UN NÚMERO O ES NEGATIVA
    if (isNaN(quantity) || quantity <= 0) {
        alert("La cantidad debe ser un número positivo.");
        return; // Salir de la función si la cantidad no es válida
    }

    // Si todas las validaciones son exitosas, agregar el producto
    addProduct(name, price, quantity);
});

// Obtener el elemento de entrada de búsqueda y el botón de búsqueda
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Evento para buscar productos
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase(); // Obtener el término de búsqueda en minúsculas

    // Filtrar productos que contienen el término de búsqueda en su nombre
    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm));

    // Actualizar la lista de productos con los resultados de la búsqueda
    updateProductList(filteredProducts);
});

// Evento para restablecer la lista de productos original
productForm.addEventListener('reset', () => {
    updateProductList();
});

// ...

// Actualizar la lista de productos en la página
function updateProductList(filteredProducts = products) {
    productList.innerHTML = '';
    filteredProducts.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${product.name}</strong> - Precio: $${product.price} - Cantidad: ${product.quantity}
            <button data-index="${index}">Eliminar</button>
        `;
        productList.appendChild(listItem);
    });
}
