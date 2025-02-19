import { defineEventHandler, readBody } from 'h3';
import { Telegram } from 'telegraf';

const BOT_TOKEN = '7652883212:AAF-_VlBpONBxLcOtL2CAl3VBPHc_q2pFNU';
const telegram = new Telegram(BOT_TOKEN);

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<{ initData?: string }>(event);
        const initData = body?.initData;
        if (!initData) {
            return { valid: false, error: 'Missing initData' };
        }


        const params = new URLSearchParams(initData);
        const user = JSON.parse(params.get('user') || '{}');

        return { valid: true, user: user };
    } catch (error) {
        return { valid: false, user: null };
    }
});
