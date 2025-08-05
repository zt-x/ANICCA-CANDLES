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