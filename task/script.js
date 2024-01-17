function calculateDiscount(cart, rules) {
    let maxDiscount = 0;
    let appliedRule = null;
    for (const rule of rules) {
        const discount = rule(cart);
        if (discount > maxDiscount) {
            maxDiscount = discount;
            appliedRule = rule.name;
        }
    }
return { appliedRule, discountAmount: maxDiscount };
}
const flat10Discount = cart => (cart.total > 200 ? 10 : 0);
const bulk5Discount = product => (product.quantity > 10 ? 0.05 * product.total : 0);
const bulk10Discount = cart => (cart.totalQuantity > 20 ? 0.1 * cart.total : 0);
const tiered50Discount = cart => {
    if (cart.totalQuantity > 30) {
        const exceedingQuantity = cart.totalQuantity - 15;
        const exceedingProductTotal = cart.products
            .filter(product => product.quantity > 15)
            .reduce((total, product) => total + product.total, 0);
        return 0.5 * exceedingProductTotal;
    }
    return 0;
};
function runProgram() {
    const products = [
        { name: "Product A", price: 20 },
        { name: "Product B", price: 40 },
        { name: "Product C", price: 50 }
    ];
    const rules = [flat10Discount, bulk5Discount, bulk10Discount, tiered50Discount];
     const cart = {
        products: [],
        total: 0,
        totalQuantity: 0
    };
for (const product of products) {
    const quantity = parseInt(prompt(`Enter quantity for ${product.name}:`), 10) || 0;
    const isGiftWrapped = confirm(`Is ${product.name} wrapped as a gift?`);
    const total = quantity * product.price;
    const giftWrapFee = isGiftWrapped ? quantity * 1 : 0;
    cart.products.push({ name: product.name, quantity, total, giftWrapFee });
    cart.total += total;
    cart.totalQuantity += quantity;
}
const { appliedRule, discountAmount } = calculateDiscount(cart, rules);
const shippingFee = Math.ceil(cart.totalQuantity / 10) * 5;
console.log("Receipt:");
cart.products.forEach(product => console.log(`${product.name}: ${product.quantity} x $${product.total.toFixed(2)}`));
console.log(`Subtotal: $${cart.total.toFixed(2)}`);
console.log(`Discount Applied: ${appliedRule || "None"} - $${discountAmount.toFixed(2)}`);
console.log(`Shipping Fee: $${shippingFee.toFixed(2)}`);
console.log(`Gift Wrap Fee: $${cart.products.reduce((total, product) => total + product.giftWrapFee, 0).toFixed(2)}`);
console.log(`Total: $${(cart.total - discountAmount + shippingFee).toFixed(2)}`);
runProgram();
}