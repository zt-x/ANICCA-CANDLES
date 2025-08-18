document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const productIdInput = document.getElementById('product-id');
    const loadingContainer = document.getElementById('loading-container');
    const resultContainer = document.getElementById('result-container');
    
    // 添加输入框焦点效果
    productIdInput.addEventListener('focus', () => {
        productIdInput.parentElement.classList.add('focused');
    });
    
    productIdInput.addEventListener('blur', () => {
        productIdInput.parentElement.classList.remove('focused');
    });
    
    // 输入验证和实时反馈
    productIdInput.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        
        // 移除非字母数字字符
        e.target.value = value.replace(/[^a-zA-Z0-9]/g, '');
        
        // 更新按钮状态
        if (e.target.value.length > 0) {
            searchBtn.classList.add('ready');
        } else {
            searchBtn.classList.remove('ready');
        }
    });
    
    // 回车键触发搜索
    productIdInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && productIdInput.value.trim()) {
            performSearch();
        }
    });
    
    // 搜索按钮点击事件
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch();
    });
    
    // 执行搜索的主函数
    async function performSearch() {
        const productId = productIdInput.value.trim();
        
        // 输入验证
        if (!productId) {
            showMysticalAlert('请输入产品编号以开启神秘之旅', 'warning');
            return;
        }
        
        if (productId.length < 3) {
            showMysticalAlert('产品编号至少需要3个字符', 'warning');
            return;
        }
        
        // 显示加载状态
        showLoadingState();
        
        try {
            // 添加随机延迟以增强神秘感
            const baseDelay = 1500;
            const randomDelay = Math.random() * 1000;
            
            // 开始API调用
            const response = await fetch('/.netlify/functions/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId })
            });
            
            // 等待最小加载时间以展示动画
            await new Promise(resolve => setTimeout(resolve, baseDelay + randomDelay));
            
            const data = await response.json();
            
            // 隐藏加载状态
            hideLoadingState();
            
            if (data.error) {
                showMysticalAlert(`查询遇到神秘阻碍: ${data.error}`, 'error');
                return;
            }
            
            // 显示成功消息并跳转
            showMysticalAlert('神秘维度连接成功，正在传送...', 'success');
            
            // 延迟跳转以显示成功消息
            setTimeout(() => {
                const queryParams = new URLSearchParams({
                    buyer_id: data.buyer_id,
                    product_id: productId,
                    purchase_time: data.purchase_time
                });
                
                window.location.href = `PRODUCTS/candles_${data.product_type}.html?${queryParams}`;
            }, 1500);
            
        } catch (error) {
            console.error('请求失败:', error);
            hideLoadingState();
            showMysticalAlert('神秘力量暂时不稳定，请稍后再试', 'error');
        }
    }
    
    // 显示加载状态
    function showLoadingState() {
        searchBtn.disabled = true;
        searchBtn.classList.add('loading');
        productIdInput.disabled = true;
        loadingContainer.classList.remove('hidden');
        resultContainer.classList.remove('show');
        
        // 添加随机加载文本变化
        const loadingTexts = [
            '正在连接神秘维度...',
            '解读古老符文中...',
            '穿越时空隧道...',
            '唤醒沉睡的记忆...',
            '感知灵性能量...'
        ];
        
        let textIndex = 0;
        const loadingTextElement = document.querySelector('.loading-text');
        
        const textInterval = setInterval(() => {
            if (loadingContainer.classList.contains('hidden')) {
                clearInterval(textInterval);
                return;
            }
            
            textIndex = (textIndex + 1) % loadingTexts.length;
            loadingTextElement.textContent = loadingTexts[textIndex];
        }, 800);
    }
    
    // 隐藏加载状态
    function hideLoadingState() {
        searchBtn.disabled = false;
        searchBtn.classList.remove('loading');
        productIdInput.disabled = false;
        loadingContainer.classList.add('hidden');
    }
    
    // 显示神秘学风格的提示消息
    function showMysticalAlert(message, type = 'info') {
        // 移除现有的提示
        const existingAlert = document.querySelector('.mystical-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // 创建新的提示元素
        const alertDiv = document.createElement('div');
        alertDiv.className = `mystical-alert ${type}`;
        
        const icon = getAlertIcon(type);
        
        alertDiv.innerHTML = `
            <div class="alert-content">
                <div class="alert-icon">${icon}</div>
                <div class="alert-message">${message}</div>
            </div>
        `;
        
        // 添加样式
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            background: rgba(26, 26, 46, 0.95);
            border: 2px solid ${getAlertColor(type)};
            border-radius: 8px;
            padding: 1rem 1.5rem;
            color: #d4af37;
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.1rem;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            animation: mysticalSlideIn 0.5s ease-out;
            max-width: 90vw;
            text-align: center;
        `;
        
        // 添加到页面
        document.body.appendChild(alertDiv);
        
        // 自动移除
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.style.animation = 'mysticalSlideOut 0.5s ease-in forwards';
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.remove();
                    }
                }, 500);
            }
        }, 4000);
    }
    
    // 获取提示图标
    function getAlertIcon(type) {
        const icons = {
            success: '✦',
            warning: '⚠',
            error: '✕',
            info: '◊'
        };
        return icons[type] || icons.info;
    }
    
    // 获取提示颜色
    function getAlertColor(type) {
        const colors = {
            success: '#4ade80',
            warning: '#fbbf24',
            error: '#ef4444',
            info: '#d4af37'
        };
        return colors[type] || colors.info;
    }
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes mysticalSlideIn {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        @keyframes mysticalSlideOut {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
        }
        
        .mystical-alert .alert-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .mystical-alert .alert-icon {
            font-size: 1.5rem;
            animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .search-button.ready {
            background: linear-gradient(135deg, #d4af37 0%, #ffd700 100%);
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }
        
        .search-button.loading {
            background: linear-gradient(135deg, #8b7355 0%, #a0845c 100%);
            cursor: not-allowed;
        }
        
        .search-button.loading .button-text::after {
            content: '';
            display: inline-block;
            width: 12px;
            height: 12px;
            border: 2px solid #1a1a2e;
            border-top: 2px solid transparent;
            border-radius: 50%;
            margin-left: 8px;
            animation: spin 1s linear infinite;
        }
        
        #product-id:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
    
    // 页面加载完成后的初始化动画
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // 添加键盘快捷键支持
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K 快速聚焦搜索框
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            productIdInput.focus();
            productIdInput.select();
        }
        
        // ESC 键清空搜索框
        if (e.key === 'Escape') {
            productIdInput.value = '';
            productIdInput.blur();
            searchBtn.classList.remove('ready');
        }
    });
    
    // 添加鼠标悬停效果
    const mysticalElements = document.querySelectorAll('.mystical-symbol, .mystical-divider span, .mystical-pattern');
    mysticalElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.textShadow = '0 0 25px rgba(212, 175, 55, 0.8)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.textShadow = '';
        });
    });
});

// 页面可见性变化时的效果
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '✦ ANICCA - 等待您的归来';
    } else {
        document.title = 'ANICCA - 产品查询门户';
    }
});
