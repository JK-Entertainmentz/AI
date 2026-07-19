import { generateAIResponse } from '../api/gemini.js';
import { saveToSheet } from '../api/gas.js';
import { appendChatMessage } from '../components/chat.js';
import { renderSummary } from '../components/summary.js';
import { preventDoubleClick } from '../utils/helpers.js';
import { agents } from '../agents/systemPrompts.js';

export async function runMeeting(topic) {
    preventDoubleClick('start-btn', true);
    
    const chatContainerId = 'chat-container';
    const summaryContainerId = 'summary-container';
    
    document.getElementById(chatContainerId).innerHTML = ''; 
    document.getElementById(summaryContainerId).innerHTML = '<div class="text-center text-gray-500 mt-10">กำลังประมวลผลการประชุม...</div>';
    
    let meetingContext = `หัวข้อการประชุม: ${topic}\n\n`;

    try {
        // 1. CEO เปิดการประชุม
        appendChatMessage(chatContainerId, 'System', 'CEO กำลังวิเคราะห์และเปิดการประชุม...');
        const ceoStart = await generateAIResponse(agents.ceo, `เริ่มต้นการประชุมในหัวข้อ: ${topic} กรุณาระบุเป้าหมายเบื้องต้น`);
        appendChatMessage(chatContainerId, 'AI CEO', ceoStart);
        meetingContext += `CEO: ${ceoStart}\n\n`;

        // 2. Strategist วางแผน
        appendChatMessage(chatContainerId, 'System', 'Business Strategist กำลังวิเคราะห์ตลาด...');
        const strategistRes = await generateAIResponse(agents.strategist, `จากข้อมูลการประชุมนี้ กรุณาวิเคราะห์ตลาด คู่แข่ง และเสนอโมเดลธุรกิจ\n\n${meetingContext}`);
        appendChatMessage(chatContainerId, 'Business Strategist AI', strategistRes);
        meetingContext += `Strategist: ${strategistRes}\n\n`;

        // 3. Marketing วางแผนการตลาด
        appendChatMessage(chatContainerId, 'System', 'Marketing กำลังวางแผนการทำตลาด...');
        const marketingRes = await generateAIResponse(agents.marketing, `จากกลยุทธ์ธุรกิจที่ผ่านมา กรุณาวางแผนการตลาด การยิง Ads, SEO และ Funnel\n\n${meetingContext}`);
        appendChatMessage(chatContainerId, 'Marketing AI', marketingRes);
        meetingContext += `Marketing: ${marketingRes}\n\n`;

        // 4. Content Creator สร้างคอนเทนต์
        appendChatMessage(chatContainerId, 'System', 'Content Creator กำลังคิดคอนเทนต์...');
        const contentRes = await generateAIResponse(agents.content, `จากแผนการตลาด กรุณาคิดไอเดียคอนเทนต์ เขียนแคปชั่น และวาง Content Calendar\n\n${meetingContext}`);
        appendChatMessage(chatContainerId, 'Content Creator AI', contentRes);
        meetingContext += `Content Creator: ${contentRes}\n\n`;

        // 5. Designer สร้าง Prompt งานภาพ
        appendChatMessage(chatContainerId, 'System', 'Designer กำลังเขียน Prompt สำหรับงานภาพ...');
        const designerRes = await generateAIResponse(agents.designer, `จากแผนคอนเทนต์ กรุณาเขียน Prompt ภาษาอังกฤษ เพื่อนำไปเจนรูปภาพจำนวน 3 Prompts\n\n${meetingContext}`);
        appendChatMessage(chatContainerId, 'Designer AI', designerRes);
        meetingContext += `Designer: ${designerRes}\n\n`;

        // 6. CEO สรุปและตัดสินใจ
        appendChatMessage(chatContainerId, 'System', 'CEO กำลังสรุปการประชุมและบันทึกข้อมูล...');
        const finalPrompt = `อ่านรายงานการประชุมทั้งหมดนี้ ตัดสินใจขั้นสุดท้าย จัดลำดับความสำคัญของงาน และสรุปรายงานการประชุมให้ออกมาอ่านง่าย ทันสมัย แบ่งเป็นหัวข้อย่อยและใช้ Bullet points. ห้ามใช้อิโมจิเด็ดขาด\n\nบันทึกการประชุม:\n${meetingContext}`;
        const finalSummary = await generateAIResponse(agents.ceo, finalPrompt);
        
        appendChatMessage(chatContainerId, 'AI CEO', "ปิดการประชุม ผมได้ทำการสรุปผลและบันทึกข้อมูลเรียบร้อยแล้วครับ");
        renderSummary(summaryContainerId, finalSummary);
        
        // 7. ส่งไปที่ Google Apps Script เพื่อบันทึกลง Sheet
        await saveToSheet(topic, finalSummary);
        
    } catch (error) {
        console.error("Meeting Error: ", error);
        appendChatMessage(chatContainerId, 'System Error', 'เกิดข้อผิดพลาดในการรัน Workflow กรุณาลองใหม่อีกครั้ง');
    } finally {
        preventDoubleClick('start-btn', false);
    }
}
