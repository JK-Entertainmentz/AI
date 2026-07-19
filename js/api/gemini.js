import { CONFIG } from '../config.js';

export async function generateAIResponse(systemPrompt, userPrompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
    
    const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { 
            parts: [{ text: systemPrompt + " สำคัญมาก: ห้ามใช้อิโมจิ (Emojis) ใดๆ ทั้งสิ้นในข้อความตอบกลับ ให้ใช้ภาษาที่เป็นทางการ เป็นมืออาชีพ และอ่านง่าย" }] 
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "ระบบประมวลผลของ AI ขัดข้อง กรุณาลองใหม่อีกครั้ง";
    }
}
