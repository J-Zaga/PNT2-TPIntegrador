export const formatCurrency = precio => 
    Number(precio).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    }
    )