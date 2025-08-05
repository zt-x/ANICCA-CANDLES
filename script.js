document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-btn').addEventListener('click', async () => {
        const productId = document.getElementById('product-id').value;
        const resultContainer = document.getElementById('result-container');
        resultContainer.innerHTML = '';

        if (!productId) {
            resultContainer.innerHTML = '<p>Please enter a Product ID.</p>';
            return;
        }

        try {
            const response = await fetch('/.netlify/functions/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || `Request failed with status ${response.status}`);
            }

            renderResult(result);
        } catch (error) {
            console.error('查询出错:', error);
            resultContainer.innerHTML = `<p>Error during query: ${error.message}</p>`;
        }
    });

    function renderResult(data) {
        const resultContainer = document.getElementById('result-container');
        const { buyer_id, purchase_time, product_type } = data;

        // Render different interfaces based on product type
        if (product_type === 'type_A') {
            resultContainer.innerHTML = `
                <div class="result-type-a">
                    <h3>Product Type A</h3>
                    <p><strong>Buyer ID:</strong> ${buyer_id}</p>
                    <p><strong>Purchase Time:</strong> ${new Date(purchase_time).toLocaleString()}</p>
                </div>
            `;
        } else if (product_type === 'type_B') {
            resultContainer.innerHTML = `
                <div class="result-type-b" style="background-color: #e0f7fa; padding: 1rem; border-radius: 4px;">
                    <h3>Product Type B</h3>
                    <p><strong>Buyer:</strong> ${buyer_id}</p>
                    <p><strong>Time:</strong> ${new Date(purchase_time).toLocaleString()}</p>
                </div>
            `;
        } else {
            resultContainer.innerHTML = `
                <div>
                    <h3>Other Product Types</h3>
                    <p>Buyer ID: ${buyer_id}</p>
                    <p>Purchase Time: ${new Date(purchase_time).toLocaleString()}</p>
                </div>
            `;
        }
    }
});
