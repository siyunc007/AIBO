// 导航栏活动状态管理
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// AI心理医生聊天功能
function initAIDoctor() {
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    
    if (!chatMessages || !chatForm || !chatInput) return;
    
    // AI回复模板
    const aiResponses = {
        greetings: [
            '你好呀！我是爱宝，很高兴能和你聊天。最近过得怎么样呢？',
            '嗨~ 我是你的心理陪伴小助手爱宝，今天想和我聊聊什么呢？',
            '你好！我是爱宝，愿意倾听你的烦恼和快乐。'
        ],
        sad: [
            '听到你这么说，我真的很心疼。能告诉我更多一些吗？',
            '我能感受到你的难过，这种感觉一定很不好受。',
            '不要独自承受这些情绪，我会一直陪着你的。'
        ],
        anxiety: [
            '焦虑的感觉确实让人不安，让我们一起慢慢梳理一下，好吗？',
            '我能理解你的焦虑，试着深呼吸，慢慢来，我会陪着你。',
            '焦虑时不妨试着专注于当下的呼吸，让自己放松下来。'
        ],
        happy: [
            '看到你开心，我也感到很快乐！能和我分享更多细节吗？',
            '太棒了！快乐是需要分享的，谢谢你告诉我。',
            '你的笑容一定很灿烂，真希望能看到呢！'
        ],
        default: [
            '我在听呢，你可以继续说下去。',
            '谢谢你愿意和我分享这些。',
            '我能理解你的感受。',
            '听起来你有很多想法，我在这里陪着你。',
            '如果你愿意，可以告诉我更多关于这件事的情况。'
        ]
    };
    
    // 发送消息
    function sendMessage(text, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user' : 'ai');
        messageDiv.textContent = text;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // AI生成回复
    function generateAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('你好') || lowerMessage.includes('嗨') || lowerMessage.includes('hello')) {
            return aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)];
        }
        
        if (lowerMessage.includes('难过') || lowerMessage.includes('伤心') || lowerMessage.includes('不开心') || lowerMessage.includes('难过')) {
            return aiResponses.sad[Math.floor(Math.random() * aiResponses.sad.length)];
        }
        
        if (lowerMessage.includes('焦虑') || lowerMessage.includes('担心') || lowerMessage.includes('紧张') || lowerMessage.includes('害怕')) {
            return aiResponses.anxiety[Math.floor(Math.random() * aiResponses.anxiety.length)];
        }
        
        if (lowerMessage.includes('开心') || lowerMessage.includes('快乐') || lowerMessage.includes('高兴') || lowerMessage.includes('棒')) {
            return aiResponses.happy[Math.floor(Math.random() * aiResponses.happy.length)];
        }
        
        return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
    }
    
    // 处理表单提交
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;
        
        // 发送用户消息
        sendMessage(userMessage, true);
        chatInput.value = '';
        
        // AI回复
        setTimeout(() => {
            const aiResponse = generateAIResponse(userMessage);
            sendMessage(aiResponse, false);
        }, 1000);
    });
    
    // 初始欢迎消息
    setTimeout(() => {
        sendMessage('你好呀！我是爱宝，你的心理陪伴小助手。无论你有什么烦恼或开心的事，都可以和我分享哦~', false);
    }, 500);
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    initAIDoctor();
});