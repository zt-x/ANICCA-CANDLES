document.addEventListener('DOMContentLoaded', () => {
    // Check if Netlify environment variables are loaded. This will fail in local development
    // unless you are using the Netlify CLI (`netlify dev`).
    if (!window.netlify || !window.netlify.env) {
        const resultContainer = document.getElementById('result-container');
        const searchBtn = document.getElementById('search-btn');
        const productIdInput = document.getElementById('product-id');

        if (resultContainer) {
            resultContainer.innerHTML = `
                <div style="padding: 1rem; background-color: #fffbe6; border: 1px solid #ffe58f; border-radius: 4px;">
                    <h3 style="color: #faad14;">Configuration Error</h3>
                    <p>Netlify environment variables could not be loaded. This is expected when opening this file directly in a browser.</p>
                    <p>To run this project locally with your Supabase credentials, please use the Netlify CLI:</p>
                    <ol style="padding-left: 20px;">
                        <li>Install the CLI: <code>npm install netlify-cli -g</code></li>
                        <li>Run the development server: <code>netlify dev</code></li>
                    </ol>
                </div>
            `;
        }
        // Disable the form to prevent usage without proper configuration
        if (searchBtn) searchBtn.disabled = true;
        if (productIdInput) productIdInput.disabled = true;

        console.error("Netlify environment variables not found. For local development, please use 'netlify dev'.");
        return;
    }

    // These variables will be injected by Netlify Snippets.
    // Make sure to configure this in your Netlify site settings.
    const { SUPABASE_URL, SUPABASE_ANON_KEY } = window.netlify.env;

    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    document.getElementById('search-btn').addEventListener('click', async () => {
        const productId = document.getElementById('product-id').value;
        const resultContainer = document.getElementById('result-container');
        resultContainer.innerHTML = '';

        if (!productId) {
            resultContainer.innerHTML = '<p>Please enter a Product ID.</p>';
            return;
        }

        try {
            let { data, error } = await supabase
                .from('purchases')
                .select('buyer_id, purchase_time, product_type')
                .eq('product_id', productId)
                .single();

            if (error) {
                throw error;
            }

            if (data) {
                renderResult(data);
            } else {
                resultContainer.innerHTML = '<p>No purchase record found for this product.</p>';
            }
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
                <div class=\"result-type-a\">
                    <h3>Product Type A</h3>
                    <p><strong>Buyer ID:</strong> ${buyer_id}</p>
                    <p><strong>Purchase Time:</strong> ${new Date(purchase_time).toLocaleString()}</p>
                </div>
            `;
        } else if (product_type === 'type_B') {
            resultContainer.innerHTML = `
                <div class=\"result-type-b\" style=\"background-color: #e0f7fa; padding: 1rem; border-radius: 4px;\">
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