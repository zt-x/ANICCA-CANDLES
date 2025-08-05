const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  // 检查请求方法
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // 从环境变量中获取Supabase配置
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  // 验证环境变量是否存在
  if (!supabaseUrl || !supabaseKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing Supabase configuration (URL or Key)' }),
    };
  }

  // 初始化Supabase客户端
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 从请求体中获取productId
    const body = event.body ? JSON.parse(event.body) : {};
    const { productId } = body;

    if (!productId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Product ID is required' }),
      };
    }

    // 查询Supabase数据库
    const { data, error } = await supabase
      .from('purchases')
      .select('buyer_id, purchase_time, product_type')
      .eq('product_id', productId)
      .single();

    if (error) {
      console.error('Supabase query error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Database query failed', details: error.message }),
      };
    }

    if (!data) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No purchase record found for this product' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', details: error.message }),
    };
  }
};
