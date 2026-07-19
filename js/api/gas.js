import { CONFIG } from '../config.js';

export async function saveToSheet(topic, summary) {
    try {
        await fetch(CONFIG.GAS_API_URL, {
            method: 'POST',
            mode: 'no-cors', // ป้องกันปัญหา CORS จากการเรียกใช้งานบน Client-Side
            headers: {
                'Content-Type': 'text/plain', 
            },
            body: JSON.stringify({ topic, summary })
        });
        return true;
    } catch (error) {
        console.error("GAS API Error:", error);
        return false;
    }
}
