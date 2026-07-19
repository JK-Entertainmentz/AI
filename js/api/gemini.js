import { CONFIG } from '../config.js';

export async function generateAIResponse(systemPrompt, userPrompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
    
    const payload = {
        systemInstruction: { 
            role: "system",
            parts: [{ text: systemPrompt + " สำคัญมาก: ห้ามใช้อิโมจิ (Emojis) ใดๆ ทั้งสิ้นในข้อความตอบกลับ ให้ใช้ภาษาที่เป็นทางการ เป็นมืออาชีพ และอ่านง่าย" }] 
        },
        contents: [
            { 
                role: "user",
                parts: [{ text: userPrompt }] 
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();

        // ตรวจสอบว่า API ส่ง Error กลับมาหรือไม่ (เช่น คีย์ผิด, โควต้าเต็ม)
        if (!response.ok) {
            console.error("Gemini API Error Detail:", data);
            // แสดงข้อความ Error จาก Google ให้ AI ตอบกลับมาในแชทเลย
            return `[ข้อผิดพลาดจาก API]: ${data.error?.message || 'ไม่ทราบสาเหตุ กรุณาตรวจสอบ Console Log'}`;
        }

        // ตรวจสอบว่ามีข้อมูลตอบกลับมาครบถ้วนหรือไม่
        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            console.error("Unexpected API Response:", data);
            return "[ข้อผิดพลาด]: API ทำงานสำเร็จ แต่ไม่มีข้อความตอบกลับจาก AI";
        }

    } catch (error) {
        // กรณีเชื่อมต่อไม่ได้เลย หรือเน็ตหลุด
        console.error("Fetch Network Error:", error);
        return "ระบบประมวลผลของ AI ขัดข้องในระดับเครือข่าย กรุณาลองใหม่อีกครั้ง";
    }
}
