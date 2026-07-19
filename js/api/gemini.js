import { CONFIG } from '../config.js';

export async function generateAIResponse(systemPrompt, userPrompt) {
    // ใช้เวอร์ชัน v1beta และโมเดล gemini-1.5-flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
    
    const payload = {
        systemInstruction: { 
            parts: [{ text: systemPrompt + " สำคัญมาก: ห้ามใช้อิโมจิ (Emojis) ใดๆ ทั้งสิ้นในข้อความตอบกลับ ให้ใช้ภาษาที่เป็นทางการ เป็นมืออาชีพ และอ่านง่าย" }] 
        },
        contents: [
            { 
                role: "user",
                parts: [{ text: userPrompt }] 
            }
        ],
        generationConfig: {
            temperature: 0.7 // ปรับความสร้างสรรค์ให้อยู่ในระดับพอดี
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();

        // ดัก Error จากฝั่ง Google 
        if (!response.ok) {
            console.error("Gemini API Error Detail:", data);
            return `[API Error]: ${data.error?.message || 'โปรดเช็ค Console (F12)'}`;
        }

        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return "[Error]: ไม่พบข้อความตอบกลับจากโมเดล";
        }

    } catch (error) {
        console.error("Fetch Network Error:", error);
        return "[Network Error]: การเชื่อมต่อล้มเหลว หรือถูกบล็อกโดย CORS";
    }
}
