document.addEventListener('DOMContentLoaded', function() {
    var quantities = document.querySelectorAll('[id^="qty"]');
    var checkoutButton = document.querySelector('.checkoutBtn');
    var cashInput = document.getElementById("cash");

    quantities.forEach(function(input) {
        input.addEventListener('input', function() {
            addOrder();
        });
    });

    checkoutButton.addEventListener('click', function() {
        calculateChange();
    });

    function addOrder() {
        var carts = document.getElementById("carts");
        carts.value = ""; // Clear carts textarea

        for (let i = 1; i <= 8; i++) {
            var qtyInput = document.getElementById("qty" + i);
            if (!qtyInput) continue;
            var productTitle = qtyInput.closest(".card-body").querySelector(".card-title").innerText;
            var productPrice = parseFloat(document.getElementById("price" + i).innerText);

            if (qtyInput.value > 0) {
                var order = `${qtyInput.value} pcs x ${productTitle} - ₱${(qtyInput.value * productPrice).toFixed(2)}\n`;
                carts.value += order;
            }
        }

        updateTotal(); // Update total after adding order
    }

    function updateTotal() {
        var total = 0;

        for (let i = 1; i <= 8; i++) {
            var qtyInput = document.getElementById("qty" + i);
            if (!qtyInput) continue;
            var productPrice = parseFloat(document.getElementById("price" + i).innerText);

            total += qtyInput.value * productPrice;
        }

        document.getElementById("total").value = total.toFixed(2); // Update total input
        console.log("Total Updated: ", total.toFixed(2)); // Debugging
    }

    function calculateChange() {
        var total = parseFloat(document.getElementById("total").value);
        var cash = parseFloat(cashInput.value);
        var change = cash - total;

        if (isNaN(change)) {
            alert("Please enter a valid amount of cash.");
            return;
        }

        document.getElementById("change").value = change.toFixed(2); // Update change input
        console.log("Change Calculated: ", change.toFixed(2)); // Debugging
    }
});
