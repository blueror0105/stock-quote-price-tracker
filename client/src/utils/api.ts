export const URL: string = 'http://127.0.0.1:8000';


export const getStockPrice = async <T>(
    symbol: string
): Promise<T> => {
    const res = await fetch(`${URL}/stock/getQuote?symbol=${symbol}`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json'
		},
    });

    return await res.json();
}