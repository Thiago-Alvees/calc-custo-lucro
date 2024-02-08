let ingredients = [];

function addIngredient() {
  const ingredientName = $('#ingredientName').val();
  const quantity = parseFloat($('#quantity').val());
  const amount = parseFloat($('#amount').val());
  const price = parseFloat($('#price').val());

  if (ingredientName && !isNaN(quantity) && !isNaN(amount) && !isNaN(price)) {
    const subtotal = quantity / amount * price;
    const ingredient = { ingredientName, quantity, amount, price, subtotal };
    ingredients.push(ingredient);
    updateIngredientList();
    updateTotalCost();
    clearForm();
  } else {
    alert('Preencha todos os campos corretamente.');
  }
}

function updateIngredientList() {
  const tableBody = $('#ingredientList');
  tableBody.empty();

  ingredients.forEach(ingredient => {
    const row = `<tr>
      <td>${ingredient.ingredientName}</td>
      <td>${ingredient.quantity}</td>
      <td>${ingredient.amount}</td>
      <td>${ingredient.price}</td>
      <td>${ingredient.subtotal.toFixed(2)}</td>
    </tr>`;
    tableBody.append(row);
  });
}

function updateTotalCost() {
  const totalAmount = ingredients.reduce((total, ingredient) => total + ingredient.subtotal, 0);
  const suggestedPrice = totalAmount * 1.8; // Exemplo de markup de 50%
  const profitMargin = ((suggestedPrice - totalAmount) / totalAmount) * 100;

  $('#totalAmount').text(`R$ ${totalAmount.toFixed(2)}`);
  $('#suggestedPrice').text(`R$ ${suggestedPrice.toFixed(2)}`);
  $('#profitMargin').text(`${profitMargin.toFixed(2)}%`);
}

function clearCalculations() {
  $('#totalAmount').text('R$ 0.00');
  $('#suggestedPrice').text('R$ 0.00');
  $('#profitMargin').text('0%');
  ingredients = [];
  updateIngredientList();
}

function clearForm() {
  $('#ingredientName').val('');
  $('#quantity').val('');
  $('#amount').val('');
  $('#price').val('');
}