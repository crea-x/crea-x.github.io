// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                    
                    // Load content for resume and skills tabs if not already loaded
                    if (tabId === 'resume' && content.innerHTML === '') {
                        loadResumeContent();
                    } else if (tabId === 'skills' && content.innerHTML === '') {
                        loadSkillsContent();
                    }
                }
            });
        });
    });
    
    // Chat functionality
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const exampleBtns = document.querySelectorAll('.example-btn');
    
    // Example question buttons
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userInput.value = btn.textContent;
            sendMessage();
        });
    });
    
    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Initialize resume and skills content if those tabs are active initially
    if (document.getElementById('resume').classList.contains('active')) {
        loadResumeContent();
    }
    if (document.getElementById('skills').classList.contains('active')) {
        loadSkillsContent();
    }
});

// Send message to the chatbot
async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    
    const message = userInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    userInput.value = '';
    sendBtn.disabled = true;
    
    // Add loading indicator
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'message bot-message';
    loadingMessage.innerHTML = `
        <div class="message-content">
            <div class="loading"></div>
        </div>
    `;
    chatMessages.appendChild(loadingMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    try {
        // Call the API through a proxy to keep the API key secure
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Remove loading indicator
        chatMessages.removeChild(loadingMessage);
        
        // Add bot response to chat
        addMessageToChat(data.response, 'bot');
    } catch (error) {
        console.error('Error:', error);
        
        // Remove loading indicator
        chatMessages.removeChild(loadingMessage);
        
        // Show error message
        addMessageToChat('Sorry, I encountered an error while processing your request. Please try again later.', 'bot');
    } finally {
        sendBtn.disabled = false;
        userInput.focus();
    }
}

// Add message to chat
function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    messageElement.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Load resume content
function loadResumeContent() {
    const resumeContent = document.getElementById('resume');
    
    resumeContent.innerHTML = `
        <div class="resume-section">
            <h2 class="section-title">Curriculum Vitae</h2>
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-date">10/2023–</div>
                    <div class="timeline-content">
                        <h3>Master of Science, Cognitive Systems</h3>
                        <h4>Universität Ulm, Ulm, Deutschland</h4>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-date">08/2019–07/2023</div>
                    <div class="timeline-content">
                        <h3>Bachelor of Science, Biomedical Engineering</h3>
                        <h4>Southeast University, Nanjing, VR China</h4>
                        <p>Focus: Bioinformatics</p>
                    </div>
                </div>
            </div>
            
            <h2 class="section-title" style="margin-top: 40px;">Internship Experience</h2>
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-date">05/2025–07/2025</div>
                    <div class="timeline-content">
                        <h3>HiWi für Analyse von Atomabsorptionssignaldaten</h3>
                        <h4>Universität Ulm, Ulm, Deutschland</h4>
                        <ul>
                            <li>Developed automated Python toolchains for AAS signal analysis (data cleaning, curve fitting, parameter extraction)</li>
                            <li>Used parallelization & batch processes to improve efficiency for large datasets</li>
                            <li>Documented processes and delivered CI-ready scripts for reusability</li>
                        </ul>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-date">07/2024–09/2024</div>
                    <div class="timeline-content">
                        <h3>Belt and Road Informationsanalyse- und Monitoringsystem</h3>
                        <h4>Southeast University, Nanjing, VR China</h4>
                        <ul>
                            <li>Developed international monitoring system based on Dify for collection, analysis and visualization of news in "Belt and Road" regions</li>
                            <li>Implemented modules for multi-source data collection (RSS, JSON, API), text processing and visualization</li>
                            <li>Implemented LLM-based pipeline for automatic classification, content analysis and summary creation</li>
                            <li>Automatic reporting with daily/weekly reports, hotspot analysis and export (PDF/Word)</li>
                            <li>Created frontend for managing analysis tasks, report plans and alert rules</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <h2 class="section-title" style="margin-top: 40px;">Project Experience</h2>
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-date">04/2024–06/2024</div>
                    <div class="timeline-content">
                        <h3>Automated Invoice Processing with n8n & LLM</h3>
                        <ul>
                            <li>Automatic n8n workflow for monitoring and processing invoice emails with Microsoft 365, AI APIs and SQL database</li>
                            <li>Implementation of AI-based pipeline with Google Gemini via HTTP Request Node for document classification and structured data extraction from PDF invoices</li>
                            <li>Built end-to-end process from email filtering and OCR processing to automatic Excel export</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load skills content
function loadSkillsContent() {
    const skillsContent = document.getElementById('skills');
    
    skillsContent.innerHTML = `
        <div class="skills-section">
            <h2 class="section-title">Technical Skills</h2>
            <div class="skills-grid">
                <div class="skill-category">
                    <h3><i class="fas fa-code"></i> Programming & Scripting</h3>
                    <div class="skill-list">
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">JavaScript</span>
                        <span class="skill-tag">SQL</span>
                        <span class="skill-tag">C++</span>
                        <span class="skill-tag">MATLAB</span>
                        <span class="skill-tag">PHP</span>
                    </div>
                </div>
                <div class="skill-category">
                    <h3><i class="fas fa-tools"></i> Frameworks & Tools</h3>
                    <div class="skill-list">
                        <span class="skill-tag">React</span>
                        <span class="skill-tag">Node.js</span>
                        <span class="skill-tag">Git (CI/CD)</span>
                        <span class="skill-tag">n8n</span>
                        <span class="skill-tag">Dify</span>
                    </div>
                </div>
                <div class="skill-category">
                    <h3><i class="fas fa-chart-line"></i> Data Analysis & Machine Learning</h3>
                    <div class="skill-list">
                        <span class="skill-tag">TensorFlow</span>
                        <span class="skill-tag">PyTorch</span>
                        <span class="skill-tag">Pandas</span>
                        <span class="skill-tag">Power BI</span>
                    </div>
                </div>
                <div class="skill-category">
                    <h3><i class="fas fa-language"></i> Languages</h3>
                    <div class="skill-list">
                        <span class="skill-tag">German (fluent)</span>
                        <span class="skill-tag">English (fluent)</span>
                        <span class="skill-tag">Chinese (native)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}