// ============================================
// STATE MANAGEMENT
// ============================================

let currentStep = 1;
const totalSteps = 15;

const formState = {
    blogUrl: '',
    productUrls: '',
    auditDepth: 'comprehensive',
    seoStrategy: [],
    otherSeoObjective: '',
    primaryKeyword: '',
    keywordStrategy: 'exact',
    articleLanguage: '',
    conventions: 'native',
    otherLanguage: '',
    audience: [],
    customAudience: '',
    voice: [],
    customVoice: '',
    searchIntent: 'auto',
    articleType: 'auto',
    articleLength: 'auto',
    internalLinking: 'analyze',
    competitorAnalysis: 'if-available',
    visualStyle: 'analyze',
};

let modalCallback = null;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    updateProgress();
    setupLanguageToggle();
    
    // Set default values
    document.querySelector('input[name="auditDepth"][value="comprehensive"]').checked = true;
    document.querySelector('input[name="searchIntent"][value="auto"]').checked = true;
    document.querySelector('input[name="articleType"][value="auto"]').checked = true;
    document.querySelector('input[name="articleLength"][value="auto"]').checked = true;
    document.querySelector('input[name="internalLinking"][value="analyze"]').checked = true;
    document.querySelector('input[name="competitorAnalysis"][value="if-available"]').checked = true;
    document.querySelector('input[name="visualStyle"][value="analyze"]').checked = true;
    document.querySelector('input[name="conventions"][value="native"]').checked = true;
    document.querySelector('input[name="keywordStrategy"][value="exact"]').checked = true;
});

// ============================================
// EVENT LISTENERS
// ============================================

function initializeEventListeners() {
    // Blog URL
    const blogUrlInput = document.getElementById('blogUrl');
    if (blogUrlInput) {
        blogUrlInput.addEventListener('blur', validateBlogUrl);
        blogUrlInput.addEventListener('input', (e) => {
            formState.blogUrl = e.target.value;
            clearValidation('blogUrlValidation');
        });
    }

    // Product URLs
    const productUrlsInput = document.getElementById('productUrls');
    if (productUrlsInput) {
        productUrlsInput.addEventListener('input', (e) => {
            formState.productUrls = e.target.value;
        });
    }

    // Audit Depth
    document.querySelectorAll('input[name="auditDepth"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            formState.auditDepth = e.target.value;
        });
    });

    // SEO Strategy
    document.querySelectorAll('.seo-strategy').forEach(checkbox => {
        checkbox.addEventListener('change', updateSeoStrategy);
    });

    const otherSeoInput = document.getElementById('otherSeoObjective');
    if (otherSeoInput) {
        otherSeoInput.addEventListener('input', (e) => {
            formState.otherSeoObjective = e.target.value;
        });
    }

    // Primary Keyword
    const keywordInput = document.getElementById('primaryKeyword');
    if (keywordInput) {
        keywordInput.addEventListener('input', (e) => {
            formState.primaryKeyword = e.target.value;
        });
    }

    // Keyword Strategy
    document.querySelectorAll('input[name="keywordStrategy"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            formState.keywordStrategy = e.target.value;
        });
    });

    // Language
    const languageSelect = document.getElementById('articleLanguage');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            formState.articleLanguage = e.target.value;
            const otherGroup = document.getElementById('otherLanguageGroup');
            if (e.target.value === 'other') {
                otherGroup.style.display = 'block';
            } else {
                otherGroup.style.display = 'none';
            }
        });
    }

    const otherLanguageInput = document.getElementById('otherLanguage');
    if (otherLanguageInput) {
        otherLanguageInput.addEventListener('input', (e) => {
            formState.otherLanguage = e.target.value;
        });
    }

    // Conventions
    document.querySelectorAll('input[name="conventions"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            formState.conventions = e.target.value;
        });
    });

    // Audience
    document.querySelectorAll('.audience').forEach(checkbox => {
        checkbox.addEventListener('change', updateAudience);
    });

    const customAudienceInput = document.getElementById('customAudience');
    if (customAudienceInput) {
        customAudienceInput.addEventListener('input', (e) => {
            formState.customAudience = e.target.value;
        });
    }

    // Voice
    document.querySelectorAll('.voice').forEach(checkbox => {
        checkbox.addEventListener('change', updateVoice);
    });

    const customVoiceInput = document.getElementById('customVoice');
    if (customVoiceInput) {
        customVoiceInput.addEventListener('input', (e) => {
            formState.customVoice = e.target.value;
        });
    }

    // Search Intent
    document.querySelectorAll('input[name="searchIntent"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            formState.searchIntent = e.target.value;
        });
    });

    // Article Type
    document.querySelectorAll('input[name="articleType"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            formState.articleType = e.target.value;
        });
    });

    // Article Length
    document.querySelectorAll('input[name="articleLength"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            formState.articleLength = e.target.value;
        });
    });

    // Internal Linking
    document.querySelectorAll('input[name="internalLinking"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            formState.internalLinking = e.target.value;
        });
    });

    // Competitor Analysis
    document.querySelectorAll('input[name="competitorAnalysis"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            formState.competitorAnalysis = e.target.value;
        });
    });

    // Visual Style
    document.querySelectorAll('input[name="visualStyle"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            formState.visualStyle = e.target.value;
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

function setupLanguageToggle() {
    const languageSelect = document.getElementById('articleLanguage');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            if (e.target.value === 'other') {
                document.getElementById('otherLanguageGroup').style.display = 'block';
                document.getElementById('otherLanguage').focus();
            } else {
                document.getElementById('otherLanguageGroup').style.display = 'none';
            }
        });
    }
}

function updateSeoStrategy() {
    const checkboxes = document.querySelectorAll('.seo-strategy:checked');
    formState.seoStrategy = Array.from(checkboxes).map(cb => cb.value);
}

function updateAudience() {
    const checkboxes = document.querySelectorAll('.audience:checked');
    formState.audience = Array.from(checkboxes).map(cb => cb.value);
}

function updateVoice() {
    const checkboxes = document.querySelectorAll('.voice:checked');
    formState.voice = Array.from(checkboxes).map(cb => cb.value);
}

// ============================================
// VALIDATION
// ============================================

function validateBlogUrl() {
    const input = document.getElementById('blogUrl');
    const message = document.getElementById('blogUrlValidation');
    const value = input.value.trim();

    if (!value) {
        showValidationError(message, 'Blog URL is required.');
        return false;
    }

    try {
        const url = new URL(value);
        if (!url.protocol.startsWith('http')) {
            throw new Error('Invalid protocol');
        }
        showValidationSuccess(message, 'Valid URL');
        return true;
    } catch (error) {
        showValidationError(message, 'Please enter a valid URL (e.g., https://example.com/blog)');
        return false;
    }
}

function showValidationError(element, message) {
    element.textContent = message;
    element.classList.remove('success');
    element.style.color = 'var(--accent-tertiary)';
}

function showValidationSuccess(element, message) {
    element.textContent = message;
    element.classList.add('success');
    element.style.color = 'var(--accent-primary)';
}

function clearValidation(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
        element.classList.remove('success');
    }
}

function validateStep(step) {
    if (step === 1) {
        const url = document.getElementById('blogUrl').value.trim();
        if (!url) {
            showToast('Please enter your blog URL before continuing.', 'error');
            return false;
        }
        return validateBlogUrl();
    }

    if (step === 5) {
        const keyword = document.getElementById('primaryKeyword').value.trim();
        if (!keyword) {
            showToast('Please enter a primary keyword before continuing.', 'error');
            return false;
        }
    }

    if (step === 6) {
        const language = document.getElementById('articleLanguage').value;
        if (!language) {
            showToast('Please select an article language before continuing.', 'error');
            return false;
        }
        if (language === 'other' && !document.getElementById('otherLanguage').value.trim()) {
            showToast('Please specify your language.', 'error');
            return false;
        }
    }

    return true;
}

// ============================================
// STEP NAVIGATION
// ============================================

function nextStep() {
    if (!validateStep(currentStep)) {
        return;
    }

    if (currentStep < totalSteps) {
        currentStep++;
        updateStepDisplay();
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

function updateStepDisplay() {
    const container1 = document.getElementById('formContainer');
    const container2 = document.getElementById('formContainer2');

    // Hide all cards
    document.querySelectorAll('.step-card').forEach(card => {
        card.classList.remove('active');
    });

    // Show current step
    const currentCard = document.querySelector(`.step-card[data-step="${currentStep}"]`);
    if (currentCard) {
        currentCard.classList.add('active');
        currentCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Toggle container visibility
    if (currentStep <= 10) {
        container1.style.display = 'flex';
        container2.style.display = 'none';
    } else {
        container1.style.display = 'none';
        container2.style.display = 'flex';
        if (currentStep === 15) {
            generateReviewSummary();
        }
    }

    updateProgress();
}

function updateProgress() {
    // Update step dots
    document.querySelectorAll('.step-dot').forEach(dot => {
        const step = parseInt(dot.dataset.step);
        dot.classList.remove('active', 'completed');
        
        if (step === currentStep) {
            dot.classList.add('active');
        } else if (step < currentStep) {
            dot.classList.add('completed');
        }
    });

    // Update progress bar
    const progress = (currentStep / totalSteps) * 100;
    document.querySelector('.progress-fill').style.width = progress + '%';
}

function handleKeyboard(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (document.activeElement.tagName !== 'TEXTAREA') {
            nextStep();
        }
    }
}

// ============================================
// REVIEW SUMMARY
// ============================================

function generateReviewSummary() {
    const summary = document.getElementById('reviewSummary');
    
    const getLanguageName = (lang) => {
        const names = {
            'english': 'English',
            'persian': 'Persian (فارسی)',
            'arabic': 'Arabic (العربية)',
            'french': 'French (Français)',
            'german': 'German (Deutsch)',
            'spanish': 'Spanish (Español)',
            'italian': 'Italian (Italiano)',
            'turkish': 'Turkish (Türkçe)',
            'portuguese': 'Portuguese (Português)',
            'dutch': 'Dutch (Nederlands)',
            'russian': 'Russian (Русский)',
            'chinese': 'Chinese (中文)',
            'japanese': 'Japanese (日本語)',
            'korean': 'Korean (한국어)',
            'other': formState.otherLanguage
        };
        return names[lang] || lang;
    };

    const formatList = (arr) => arr.length > 0 ? arr.join(', ') : 'Not specified';
    
    summary.innerHTML = `
        <div class="review-item">
            <div class="review-label">Website URL</div>
            <div class="review-value">${truncateUrl(formState.blogUrl)}</div>
        </div>
        <div class="review-item">
            <div class="review-label">Primary Keyword</div>
            <div class="review-value">${formState.primaryKeyword || 'Not specified'}</div>
        </div>
        <div class="review-item">
            <div class="review-label">Article Language</div>
            <div class="review-value">${getLanguageName(formState.articleLanguage)}</div>
        </div>
        <div class="review-item">
            <div class="review-label">Target Audience</div>
            <div class="review-value">${formatList(formState.audience)}</div>
        </div>
        <div class="review-item">
            <div class="review-label">Brand Voice</div>
            <div class="review-value">${formatList(formState.voice)}</div>
        </div>
        <div class="review-item">
            <div class="review-label">Search Intent</div>
            <div class="review-value">${formState.searchIntent === 'auto' ? 'Auto-detect' : formState.searchIntent}</div>
        </div>
        <div class="review-item">
            <div class="review-label">Article Type</div>
            <div class="review-value">${formState.articleType === 'auto' ? 'AI will choose' : formState.articleType}</div>
        </div>
        <div class="review-item">
            <div class="review-label">Content Depth</div>
            <div class="review-value">${formState.articleLength === 'auto' ? 'AI will determine' : formState.articleLength}</div>
        </div>
        <div class="review-item">
            <div class="review-label">Audit Depth</div>
            <div class="review-value">${formState.auditDepth}</div>
        </div>
        <div class="review-item">
            <div class="review-label">Image Style</div>
            <div class="review-value">${formState.visualStyle === 'analyze' ? 'Analyze website' : formState.visualStyle}</div>
        </div>
    `;
}

function truncateUrl(url, maxLength = 40) {
    if (url.length > maxLength) {
        return url.substring(0, maxLength) + '...';
    }
    return url;
}

// ============================================
// MASTER PROMPT GENERATION
// ============================================

function generateMasterPrompt() {
    showToast('Generating your Master Prompt...', 'info');

    setTimeout(() => {
        const prompt = buildMasterPrompt();
        displayResult(prompt);
    }, 800);
}

function buildMasterPrompt() {
    const language = formState.articleLanguage === 'other' 
        ? formState.otherLanguage 
        : formState.articleLanguage;

    const languageLabel = getLanguageName(formState.articleLanguage);
    const seoStrategies = formatList(formState.seoStrategy) + 
        (formState.otherSeoObjective ? `; ${formState.otherSeoObjective}` : '');
    const audiences = formatList(formState.audience);
    const voices = formatList(formState.voice);

    let prompt = `==================================================
ADVANCED SEO CONTENT GENERATION MASTER PROMPT
==================================================

You are an advanced SEO strategist, semantic content architect, search-intent analyst, content auditor, editorial strategist, conversion copywriter, and visual content strategist.

YOUR MISSION
==================================================

Generate a comprehensive, SEO-optimized article that is deeply tailored to the website, audience, products/services, and strategic objectives provided below. This article must be original, differentiated from existing content, and positioned to rank competitively while serving user intent authentically.

WEBSITE CONTEXT
==================================================

Blog/Content URL: ${formState.blogUrl}
Website Products/Services: ${formState.productUrls || 'Not provided'}

ARTICLE CONFIGURATION
==================================================

PRIMARY KEYWORD: ${formState.primaryKeyword}
Keyword Strategy: ${formState.keywordStrategy === 'exact' ? 'Use exactly as specified' : formState.keywordStrategy === 'evaluate' ? 'Evaluate and refine if needed' : 'Use as primary but suggest improvements'}

ARTICLE LANGUAGE: ${languageLabel}
Language Code: ${language}
Writing Conventions: ${formState.conventions === 'native' ? 'Fully native/localized to target market' : formState.conventions === 'standard' ? 'Standard language' : 'AI-determined'}

TARGET AUDIENCE: ${audiences || 'General'}
Custom Audience Notes: ${formState.customAudience || 'None'}

BRAND VOICE: ${voices || 'Professional and educational'}
Custom Voice Notes: ${formState.customVoice || 'None'}

SEARCH INTENT: ${formState.searchIntent === 'auto' ? 'Auto-detect from SERP research' : formState.searchIntent}

ARTICLE TYPE: ${formState.articleType === 'auto' ? 'AI will determine optimal format' : formState.articleType}

CONTENT DEPTH: ${formState.articleLength === 'auto' ? 'AI will determine based on search intent' : formState.articleLength}

SEO STRATEGY: ${seoStrategies}

CONTENT AUDIT REQUIREMENTS
==================================================

Audit Depth: ${formState.auditDepth}

PHASE 1: Website Content Inspection
- If web access is available, visit the blog URL provided
- If web access is unavailable, state clearly: "Unable to access ${formState.blogUrl} due to network restrictions. Please provide existing article content, titles, and topics in your next message."
- Extract all article titles, topics, URLs, keywords, metadata
- Analyze content structure, depth, tone, and quality
- Identify existing content gaps and opportunities

PHASE 2: Search Intent Analysis
- Analyze existing articles for search intent patterns
- Identify which articles target informational, commercial, navigational queries
- Note the primary keyword strategies used across the site

PHASE 3: Product/Service Analysis
${formState.productUrls ? `- Inspect these product/service pages: ${formState.productUrls}
- Extract product names, features, benefits, specifications, pricing (if available)
- Identify key differentiators and brand positioning
- Note commercial intent and CTAs used` : '- No product/service pages provided. Focus on content strategy only.'}

PHASE 4: Brand Analysis
- Analyze existing articles for:
  * Writing style and tone consistency
  * Sentence and paragraph length patterns
  * Vocabulary complexity and terminology
  * Heading hierarchy and naming conventions
  * Formatting patterns (lists, tables, FAQs)
  * CTA strategy and alignment

PHASE 5: Content Cannibalization Analysis
==================================================

CRITICAL - Do NOT proceed with article creation until this is complete.

- Compare the proposed topic against ALL existing article titles
- Identify any articles with overlapping search intent or primary keywords
- Flag any substantial topical overlap
- IF OVERLAP IS DETECTED:
  * Reject the topic immediately
  * Propose 5 alternative, differentiated topics with unique angles
  * Score each alternative on originality, keyword opportunity, and strategic value
  * Select the strongest differentiated alternative
- IF NO OVERLAP:
  * Proceed with article creation

Examples of what CANNOT be approved:
- "How to Choose an Industrial Air Compressor" (if "Guide to Choosing an Industrial Air Compressor" exists)
- "Best CRM Tools" (if "Top CRM Systems" or "CRM Tools Comparison" exists)

Different intents and angles CAN coexist:
- "How to Choose..." (commercial) + "What is..." (informational) ✓
- "DIY Guide" (educational) + "Buying Guide" (commercial) ✓

PHASE 6: Keyword Strategy Development
==================================================

- Primary Keyword: ${formState.primaryKeyword}
- Generate 5-8 semantically related secondary keywords
- Identify long-tail variations
- Research related entities and concepts
- Extract search terms from existing articles
- Identify keyword clustering opportunities
- Avoid keyword cannibalization

PHASE 7: SERP & Competitor Research
==================================================

Competitor Analysis: ${formState.competitorAnalysis === 'mandatory' ? 'MANDATORY' : formState.competitorAnalysis === 'no' ? 'SKIP' : 'IF WEB ACCESS AVAILABLE'}

If conducting SERP research:
- Search for the primary keyword in Google
- Analyze top 10 results for:
  * Content type and format
  * Article titles and their structure
  * Featured snippet opportunities
  * People Also Ask questions
  * Related searches
  * Content length and depth
  * Heading hierarchy patterns
  * Visual content strategy
  * Unique angles and gaps
- Identify content gaps where your article can provide unique value
- Identify featured snippet opportunities
- Extract "People Also Ask" questions for FAQ section
- Note any dominant voice/tone in existing content

PHASE 8: Topic Validation
==================================================

Generate 5-7 topic candidates:
1. [Topic 1] - Angle: [Unique angle], Potential Traffic: [High/Medium/Low]
2. [Topic 2]
3. [Topic 3]
4. [Topic 4]
5. [Topic 5]

For each candidate, evaluate:
- Alignment with primary keyword
- Search volume and demand
- Competitive difficulty
- Unique angle/differentiation
- Audience relevance
- Conversion potential
- Brand alignment

Select the strongest candidate and confirm:
- "SELECTED TOPIC: [Topic]"
- "DIFFERENTIATION: [Why this is unique vs existing content]"
- "SEARCH INTENT: [Intent analysis]"

PHASE 9: Title Generation & CTR Optimization
==================================================

Generate 10 title candidates:
1. [Title 1]
2. [Title 2]
...
10. [Title 10]

Evaluate each on:
- Primary keyword inclusion (natural, not forced)
- CTR potential and emotional appeal
- Clarity and specificity
- Search intent alignment
- Audience relevance
- Differentiation from existing titles
- Word length (optimal: 50-60 characters)
- SERP competitiveness

SELECT THE STRONGEST TITLE:
- FINAL TITLE: [Selected title]
- CTR REASONING: [Why this title has high click potential]

ARTICLE SPECIFICATIONS
==================================================

SEO TITLE (Meta Title):
- 50-60 characters
- Include primary keyword
- Compelling and click-worthy
- Brand-aligned

META DESCRIPTION:
- 150-160 characters
- Include primary keyword naturally
- Summarize key value
- Encourage clicks
- Match article language

URL SLUG:
- Lowercase, hyphen-separated
- Include primary keyword
- Readable and descriptive
- 2-5 words

H1 TAG:
- Single H1 per page
- Reflect search intent
- Include primary keyword naturally
- Compelling and clear

H2 STRUCTURE:
- 4-8 main sections
- Meaningful, semantic headings
- Support article flow
- Incorporate secondary keywords naturally
- Avoid generic headings

H3 TAGS:
- Use only to organize complex H2 sections
- Do NOT use for list items
- Support readability and scannability

CONTENT REQUIREMENTS
==================================================

WORD COUNT TARGET: ${formState.articleLength === 'auto' ? 'AI-determined based on search intent' : formState.articleLength}
Note: Quality over quantity. No filler content.

CONTENT STRUCTURE:
- Introduction: Hook, relevance statement, article overview (150-250 words)
- Main body: Logically organized H2 sections (deep content, examples, explanations)
- FAQ section: 5-10 relevant questions and answers
- Conclusion: Summary, key takeaways, CTA (100-150 words)

WRITING REQUIREMENTS:
- Write for the target audience: ${audiences || 'General readers'}
- Tone: ${voices || 'Professional and authoritative'}
- Use natural language, not keyword-stuffed
- Incorporate semantic keywords and related terms naturally
- Include practical examples and real-world applications
- Support claims with credible reasoning (not fabricated sources)
- Use active voice where appropriate
- Break content into scannable sections
- Use lists and tables strategically (not excessively)

QUALITY & AUTHENTICITY RULES
==================================================

MANDATORY:
✓ No keyword stuffing
✓ No artificial keyword repetition
✓ No filler paragraphs
✓ No unsupported claims
✓ Do NOT invent statistics or data
✓ Do NOT invent certifications or credentials
✓ Do NOT invent product specifications
✓ Do NOT invent company history
✓ Do NOT invent prices or customer reviews
✓ Do NOT fabricate sources or links

IF INFORMATION CANNOT BE VERIFIED:
- Mark as [VERIFY: claim description]
- Ask user to provide or verify information
- Do not proceed with unverified claims

E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
==================================================

Strengthen article credibility through:
- Practical, real-world examples
- Clear explanations of complex concepts
- Transparent limitations and caveats
- Proper sourcing where applicable
- First-hand considerations where relevant
- Industry-specific terminology used correctly
- Professional tone and structure
- Honest assessments (pros and cons)

INTERNAL LINKING STRATEGY
==================================================

Internal Linking Preference: ${formState.internalLinking}

If analyzing internal links:
- Inspect existing article URLs and categorize by topic
- Identify 3-5 highly relevant internal linking opportunities
- Use natural, descriptive anchor text
- Link to commercially important pages when contextually relevant
- Avoid link to irrelevant pages
- Mark any URLs you cannot verify as [VERIFY URL]
- Recommend link placement naturally within sentences

DO NOT invent URLs. If uncertain, mark as [VERIFY URL].

FEATURED SNIPPET OPTIMIZATION
==================================================

Identify 2-3 featured snippet opportunities:
- Concise definitions
- Numbered steps (max 5-6)
- Bullet lists (max 5-7 items)
- Comparison tables
- Short direct answers

Format these sections for snippet visibility without compromising article flow.

FAQ STRATEGY
==================================================

Generate 5-10 relevant FAQ questions based on:
- Related searches from SERP research
- People Also Ask questions
- Semantic coverage gaps
- User intent patterns
- Practical reader questions

Format as clear Q&A pairs with concise, valuable answers.

CTA (Call-To-Action) STRATEGY
==================================================

CTA Type: Aligned with article intent and audience
- If Informational: Suggest next logical learning step or resource
- If Commercial: Link to relevant product/service pages
- If Educational: Offer deeper resources or guides

${formState.productUrls ? `Available for linking: ${formState.productUrls}` : 'Note: No product/service URLs provided. Create contextually relevant CTAs.'}

CTA Requirements:
- Match search intent (not aggressive for informational)
- Feel natural, not forced
- Address reader's next logical action
- Align with brand voice

IMAGE GENERATION STRATEGY
==================================================

Image Analysis Approach: ${formState.visualStyle === 'analyze' ? 'Analyze website visual identity' : 'Use specified style: ' + formState.visualStyle}

${formState.visualStyle === 'analyze' ? `If web access available:
- Inspect existing article images on ${formState.blogUrl}
- Analyze:
  * Photography vs illustration style
  * Realism level and composition
  * Lighting and color palette
  * Aspect ratios used
  * Background and subject placement
  * Typography overlays (if any)
  * Technical vs lifestyle imagery
  * Visual consistency patterns
  * Density of images per article` : ''}

Create TWO detailed image generation prompts:

IMAGE PROMPT 01 (Hero/Featured Image):
- Primary visual for article hero section
- Must be visually compelling and attention-grabbing
- Should represent main article topic
- Ideal for social sharing

IMAGE PROMPT 02 (Supporting Section Image):
- Supports an important mid-article section
- Different from IMAGE PROMPT 01 (not a duplicate)
- Complements article narrative
- Specific enough for quality generation

Both prompts must specify:
- Subject matter
- Environment/setting
- Composition and framing
- Camera perspective (if photographic)
- Lighting and mood
- Color palette
- Brand visual language
- Realism level
- Key objects and elements
- Aspect ratio recommendation (16:9, 1:1, 4:3, etc.)
- Negative constraints (what NOT to include)

Example format:
"[Subject], [Environment], [Composition], [Lighting], [Color palette], [Mood], [Art style], [Aspect ratio], [Negative: avoid X, Y, Z]"

FINAL CONTENT CHECKLIST (Before Delivery)
==================================================

CANNIBALIZATION VERIFICATION:
☐ Topic is verified as different from existing articles
☐ Search intent is clearly differentiated
☐ Keyword strategy avoids overlapping primary keywords

SEO QUALITY:
☐ Primary keyword used naturally (not stuffed)
☐ Semantic terms incorporated naturally
☐ Content satisfies search intent
☐ Title is compelling and click-worthy
☐ Meta description is compelling and accurate
☐ URL slug is clean and keyword-relevant

CONTENT QUALITY:
☐ Article is well-organized with clear H2 sections
☐ Tone matches brand voice
☐ Examples are relevant and helpful
☐ No obvious keyword stuffing
☐ No filler paragraphs
☐ Content is genuinely useful to target audience

AUDIENCE ALIGNMENT:
☐ Vocabulary and complexity match audience level
☐ Examples resonate with target persona
☐ Pain points are addressed
☐ CTA matches user intent

TECHNICAL SEO:
☐ One H1, properly structured H2s/H3s
☐ Internal links use natural anchor text
☐ All URLs are verified or marked [VERIFY URL]
☐ Meta title < 60 characters
☐ Meta description 150-160 characters

FACT-CHECKING:
☐ No invented statistics
☐ No invented certifications
☐ No invented customer testimonials
☐ No fabricated sources
☐ Claims are defensible or marked [VERIFY]

BRAND ALIGNMENT:
☐ Tone matches website voice
☐ Product mentions are natural, not forced
☐ CTA aligns with business goals

FINAL INSTRUCTIONS
==================================================

DO NOT BEGIN WRITING until:
1. All phases 1-9 are complete
2. Topic is verified as differentiated
3. Cannibalization check is passed
4. Keyword strategy is mapped
5. Internal linking opportunities are identified
6. Image style analysis is complete
7. CTA strategy is defined

Then write the complete article including:
- All metadata (title, description, slug, H1)
- Complete article body with H2/H3 structure
- FAQ section
- Internal linking recommendations
- CTA section
- Both image prompts

Output format:
---
META TITLE: [title]
META DESCRIPTION: [description]
URL SLUG: [slug]
---
[ARTICLE BODY]
---
FAQ SECTION
---
[FAQs]
---
IMAGE PROMPTS
---
IMAGE PROMPT 01:
[prompt]

IMAGE PROMPT 02:
[prompt]
---

Begin analysis now. State all findings clearly before writing.`;

    return prompt;
}

function getLanguageName(lang) {
    const names = {
        'english': 'English',
        'persian': 'Persian (فارسی)',
        'arabic': 'Arabic (العربية)',
        'french': 'French (Français)',
        'german': 'German (Deutsch)',
        'spanish': 'Spanish (Español)',
        'italian': 'Italian (Italiano)',
        'turkish': 'Turkish (Türkçe)',
        'portuguese': 'Portuguese (Português)',
        'dutch': 'Dutch (Nederlands)',
        'russian': 'Russian (Русский)',
        'chinese': 'Chinese (中文)',
        'japanese': 'Japanese (日本語)',
        'korean': 'Korean (한국어)',
    };
    return names[lang] || lang;
}

function formatList(arr) {
    if (!arr || arr.length === 0) return 'Not specified';
    return arr.map(item => item.replace(/-/g, ' ').charAt(0).toUpperCase() + item.slice(1)).join(', ');
}

// ============================================
// RESULT DISPLAY
// ============================================

function displayResult(prompt) {
    const resultPanel = document.getElementById('resultPanel');
    const promptDisplay = document.getElementById('generatedPrompt');
    
    promptDisplay.textContent = prompt;
    resultPanel.style.display = 'flex';
    
    setTimeout(() => {
        showToast('Master Prompt ready to copy!', 'success');
    }, 500);
}

function closeResult() {
    document.getElementById('resultPanel').style.display = 'none';
}

// ============================================
// CLIPBOARD & DOWNLOAD
// ============================================

function copyPrompt() {
    const promptText = document.getElementById('generatedPrompt').textContent;
    const copyButton = document.getElementById('copyButtonText');
    const originalText = copyButton.textContent;

    navigator.clipboard.writeText(promptText).then(() => {
        copyButton.textContent = '✓ COPIED';
        
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
        
        showToast('Master Prompt copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = promptText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Master Prompt copied to clipboard!', 'success');
    });
}

function downloadPrompt() {
    const promptText = document.getElementById('generatedPrompt').textContent;
    const element = document.createElement('a');
    const file = new Blob([promptText], { type: 'text/plain' });
    
    element.href = URL.createObjectURL(file);
    element.download = 'SEO-Master-Prompt.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    showToast('Master Prompt downloaded!', 'success');
}

// ============================================
// NAVIGATION
// ============================================

function editAnswers() {
    document.getElementById('resultPanel').style.display = 'none';
    currentStep = 1;
    updateStepDisplay();
}

function startOver() {
    showModal(
        'Start Over',
        'Are you sure you want to start over? All your answers will be cleared.',
        () => {
            // Reset form state
            Object.keys(formState).forEach(key => {
                if (Array.isArray(formState[key])) {
                    formState[key] = [];
                } else {
                    formState[key] = '';
                }
            });

            // Reset form UI
            document.querySelectorAll('input[type="text"], input[type="url"], textarea, select').forEach(input => {
                input.value = '';
            });

            document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
                input.checked = false;
            });

            // Set defaults
            document.querySelector('input[name="auditDepth"][value="comprehensive"]').checked = true;
            document.querySelector('input[name="searchIntent"][value="auto"]').checked = true;
            document.querySelector('input[name="articleType"][value="auto"]').checked = true;
            document.querySelector('input[name="articleLength"][value="auto"]').checked = true;
            document.querySelector('input[name="internalLinking"][value="analyze"]').checked = true;
            document.querySelector('input[name="competitorAnalysis"][value="if-available"]').checked = true;
            document.querySelector('input[name="visualStyle"][value="analyze"]').checked = true;
            document.querySelector('input[name="conventions"][value="native"]').checked = true;
            document.querySelector('input[name="keywordStrategy"][value="exact"]').checked = true;

            currentStep = 1;
            updateStepDisplay();
            document.getElementById('resultPanel').style.display = 'none';
            showToast('Form reset. Starting fresh!', 'success');
        }
    );
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    if (type === 'success') {
        toast.style.background = 'rgba(0, 217, 255, 0.9)';
        toast.style.color = '#05070D';
    } else if (type === 'error') {
        toast.style.background = 'rgba(255, 20, 147, 0.9)';
        toast.style.color = '#FFFFFF';
    } else {
        toast.style.background = 'rgba(123, 97, 255, 0.9)';
        toast.style.color = '#FFFFFF';
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// MODAL
// ============================================

function showModal(title, message, callback) {
    const modal = document.getElementById('confirmModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    modalCallback = callback;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('confirmModal').style.display = 'none';
    modalCallback = null;
}

function confirmModal() {
    if (modalCallback) {
        modalCallback();
    }
    closeModal();
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('confirmModal');
    if (e.target === modal) {
        closeModal();
    }
});
