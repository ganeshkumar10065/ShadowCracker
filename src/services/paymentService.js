export const processPayment = async (userData) => {
    try {
        // Get username from localStorage
        const username = localStorage.getItem('temp_username');
        if (!username) {
            return {
                success: false,
                message: 'Username not found. Please try searching again.'
            };
        }

        const response = await fetch('https://shareware-ftp-questions-populations.trycloudflare.com/api/payment/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                username,
                userData 
            })
        });

        // Check if response is ok before trying to parse JSON
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if response has content
        const text = await response.text();
        if (!text) {
            throw new Error('Empty response from server');
        }

        // Try to parse the response as JSON
        let result;
        try {
            result = JSON.parse(text);
        } catch (parseError) {
            console.error('Failed to parse response:', text);
            throw new Error('Invalid response from server');
        }

        console.log('Payment response:', result);

        if (result.code === 0 && result.msg === '成功' && result.data && result.data.url) {
            // Store order ID in localStorage if it exists in the response
            if (result.data.mch_order_no) {
                localStorage.setItem('order_id', result.data.mch_order_no);
            }
            return {
                success: true,
                url: result.data.url,
                message: 'Opening payment page...'
            };
        } else {
            return {
                success: false,
                message: result.msg || 'Payment failed. Please try again.'
            };
        }
    } catch (error) {
        console.error('Payment error:', error);
        return {
            success: false,
            message: error.message || 'Payment failed. Please try again.'
        };
    }
}; 
