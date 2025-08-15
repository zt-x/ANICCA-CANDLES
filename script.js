document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('productQueryForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const productId = document.getElementById('productId').value;

  try {
    const response = await fetch('/.netlify/functions/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });

    const data = await response.json();
    
    if (data.error) {
      alert(`查询错误: ${data.error}`);
      return;
    }

    // 构造带参数的跳转URL
    const queryParams = new URLSearchParams({
      buyer_id: data.buyer_id,
      product_id: productId,
      purchase_time: data.purchase_time
    });
    
    window.location.href = `PRODUCTS/candles_${data.product_type}.html?${queryParams}`;

  } catch (error) {
    console.error('请求失败:', error);
    alert('查询服务不可用，请稍后再试');
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
