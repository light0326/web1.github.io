const prd = [
    { pkind: "家電類", pno: "A001", pna: "液晶電視", price: 8000, pic: "images/LCDTV.jpg" },
    { pkind: "家電類", pno: "A002", pna: "變頻冰箱", price: 30000, pic: "images/refrigerator.jpg" },
    { pkind: "電腦類", pno: "B001", pna: "超薄筆電", price: 40000, pic: "images/notebook.jpg" },
    { pkind: "電腦類", pno: "B002", pna: "AI電腦", price: 70000, pic: "images/computer.jpg" },
    { pkind: "家居類", pno: "C001", pna: "易潔洗衣精", price: 100, pic: "images/laundry.jpg" },
    { pkind: "家居類", pno: "C002", pna: "好神拖", price: 1500, pic: "images/mop.jpg" },
    { pkind: "食品類", pno: "D001", pna: "辛辣泡麵", price: 50, pic: "images/noodle.jpg" },
    { pkind: "食品類", pno: "D002", pna: "蔓越莓汁", price: 100, pic: "images/Cranberry.jpg" },
    { pkind: "食品類", pno: "D003", pna: "經典巧克力組", price: 300, pic: "images/chocolate.jpg" }
];

let shoppingCar = [];

document.getElementById('categoryList').addEventListener('click', function (event) {
    if (event.target.classList.contains('cprd')) {
        const kind = event.target.getAttribute('data-kind');
        document.getElementById('prdkind').innerText = kind;
        showProducts(kind);
    }
});

function showProducts(kind) {
    const cardList = document.getElementById('productList');
    cardList.innerHTML = '';
    const filteredProducts = prd.filter(product => product.pkind === kind);
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';
        card.innerHTML = `
            <div class="card">
                <img src="${product.pic}" class="card-img-top" alt="${product.pna}">
                <div class="card-body">
                    <h5 class="card-title">${product.pna}</h5>
                    <p class="card-text">價格: ${product.price.toLocaleString()} 元</p>
                    <button class="btn btn-dark" onclick="addToCart('${product.pno}')">加入購物車</button>
                </div>
            </div>
        `;
        cardList.appendChild(card);
    });
}

function addToCart(pno) {
    const product = prd.find(p => p.pno === pno);
    const itemIndex = shoppingCar.findIndex(item => item.pno === pno);
    if (itemIndex > -1) {
        shoppingCar[itemIndex].quantity += 1;
    } else {
        shoppingCar.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function renderCart() {
    const cartTable = document.getElementById('cartTable');
    cartTable.innerHTML = '';
    let totalPrice = 0;
    shoppingCar.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.pno}</td>
            <td>${item.pna}</td>
            <td>${item.price.toLocaleString()}</td>
            <td>${item.quantity}</td>
            <td>${(item.price * item.quantity).toLocaleString()}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">取消</button></td>
        `;
        cartTable.appendChild(row);
    });
    document.getElementById('totalPrice').innerText = totalPrice.toLocaleString();
}

function removeFromCart(index) {
    shoppingCar.splice(index, 1);
    renderCart();
}

document.getElementById('confirmOrderBtn').addEventListener('click', function () {
    document.getElementById('orderForm').style.display = 'block';
});

document.getElementById('submitOrderBtn').addEventListener('click', function () {
    if (validateOrderForm()) {
        alert('訂單已送出');
        document.getElementById('orderForm').reset();
        document.getElementById('orderForm').style.display = 'none';
        shoppingCar = [];
        renderCart();

        document.getElementById('prdkind').innerText = '無分類';
        showProducts('');
    }
});

document.getElementById('cancelOrderBtn').addEventListener('click', function () {
    document.getElementById('orderForm').reset();
    document.getElementById('orderForm').style.display = 'none';
});

function validateOrderForm() {
    const senderName = document.getElementById('senderName').value.trim();
    const senderPhone = document.getElementById('senderPhone').value.trim();
    const receiverName = document.getElementById('receiverName').value.trim();
    const receiverPhone = document.getElementById('receiverPhone').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!senderName || !senderPhone || !receiverName || !receiverPhone || !address) {
        alert('請填寫所有必填項目');
        return false;
    }

    return true;
}
