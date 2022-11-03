/**
 * Stock Controller
 * 
 * @since 1.0.0
 * @version 1.0.0
 */

import { Request, Response } from 'express';
import api from '../utils/api';

interface QuoteProps {
    c: number;
    d?: number;
    dp?: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: Date;
}

interface StockProps {
    symbol: string;
    curPrice: number;
    margin: number;
    percentChange: number;
    highPrice: number;
    lowPrice: number;
    openPrice: number;
    prevPrice: number;
    time: Date;
}

const FINNHUB_URL = process.env.FINNHUB_URL;

const StockCtrl  = {

    /**
     * Get stock's latest quote
     * 
     * @param req Request
     * @param res Response
     */
    getQuote: async(req: Request, res: Response) => {
        const { symbol } = req.query;

        const result = await api.get(`${FINNHUB_URL}/quote?symbol=${symbol}`);

        const data: StockProps = await StockCtrl.makeStockResp(result.data, symbol as string);

        return res.json(data);
    },


    /**
     * Shape the result from the API as StockProps
     * 
     * @param data QuoteProps
     * @param symbol string
     * @returns 
     */
    makeStockResp: async(data: QuoteProps, symbol: string): Promise<StockProps> => {
        let stock: StockProps;
        stock = {
            symbol,
            curPrice: data.c,
            lowPrice: data.l,
            highPrice: data.h,
            openPrice: data.o,
            margin: data.d ? data.d: 0,
            percentChange: data.dp ? data.dp : 0,
            prevPrice: data.pc,
            time: new Date()
        }
        return stock;
    }
}


export default StockCtrl;
