export interface Activity {
  id: string;
  type: "drag-drop" | "scenario" | "quiz" | "fill-blank" | "crime-detective" | "matching" | "build-demo";
  title: string;
  description: string;
  xp: number;
  data: Record<string, unknown>;
}

export interface Module {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  icon: string;
  accentColor: "teal" | "amber" | "emerald" | "red" | "purple";
  estimatedMinutes: number;
  xpReward: number;
  keyConceptSummary: string;
  aiContext: string;
  activities: Activity[];
}

export const MODULES: Module[] = [
  {
    id: 1,
    slug: "tell-show-tell",
    title: "Tell-Show-Tell",
    subtitle: "The Foundational Demo Technique",
    tagline: "Context → Capability → Impact",
    icon: "🎯",
    accentColor: "teal",
    estimatedMinutes: 20,
    xpReward: 200,
    keyConceptSummary: "Tell-Show-Tell is the single most powerful demo technique. Before showing any feature, TELL the audience what they're about to see and why it matters. SHOW them the feature in under 5 minutes. Then TELL them the business benefits — connecting the feature to their specific pain points. Without this structure, complex AI demos overwhelm and confuse buyers.",
    aiContext: "AI solutions are inherently complex. A buyer watching an AI agent autonomously process data for the first time without context will think 'this looks complicated' — not 'this solves my problem.' The Opening Tell sets the stage so the AI's power lands as a solution, not a science project.",
    activities: [
      {
        id: "tst-order",
        type: "drag-drop",
        title: "Sequence the Demo",
        description: "A Sales Engineer is about to demo an AI-powered anomaly detection feature to a VP of Operations. Drag the steps into the correct Tell-Show-Tell order.",
        xp: 50,
        data: {
          items: [
            { id: "a", text: "Share screen and navigate to the anomaly detection dashboard, showing 3 real alerts from last week", phase: "show" },
            { id: "b", text: "\"Sarah, based on what you told me about your team spending 4 hours a day manually reviewing logs — I want to show you how our AI flags anomalies automatically, so your team can focus on resolution, not detection.\"", phase: "tell-open" },
            { id: "c", text: "Click through the alert detail, show the AI's confidence score and recommended action — keep it under 4 minutes", phase: "show" },
            { id: "d", text: "\"So what you just saw means your team gets back those 4 hours per day. At scale, that's 80 hours a month — time your engineers can spend on strategic work instead of log reviews. For you as VP of Ops, that's a measurable reduction in operational overhead.\"", phase: "tell-close" },
            { id: "e", text: "Step away from the screen. Ask: 'Does anomaly detection feel like a priority for your team this quarter?'", phase: "tell-open" },
          ],
          correctOrder: ["b", "e", "a", "c", "d"],
          phases: [
            { id: "tell-open", label: "Opening Tell", color: "teal", description: "Set context & validate relevance" },
            { id: "show", label: "The Show", color: "amber", description: "Demonstrate the feature (< 5 min)" },
            { id: "tell-close", label: "Closing Tell", color: "emerald", description: "Deliver business benefits" },
          ]
        }
      },
      {
        id: "tst-quiz",
        type: "quiz",
        title: "TST Knowledge Check",
        description: "Test your understanding of the Tell-Show-Tell technique with these scenario-based questions.",
        xp: 75,
        data: {
          questions: [
            {
              id: "q1",
              question: "You're 3 minutes into showing an AI workflow automation feature. Your prospect says 'this seems really complicated.' What went wrong?",
              options: [
                "The feature is genuinely too complex for this prospect",
                "You skipped or rushed the Opening Tell — they had no context before seeing the screens",
                "You should have shown a simpler feature first",
                "The demo environment had too much data"
              ],
              correct: 1,
              explanation: "Without an Opening Tell, the audience's brain is trying to process unfamiliar screens AND understand what you're saying simultaneously. They fall behind and perceive complexity. The Opening Tell gives them a mental model before the screens appear."
            },
            {
              id: "q2",
              question: "How long should the 'Show' portion of a single Tell-Show-Tell topic last?",
              options: [
                "As long as needed to cover all the feature's capabilities",
                "10-15 minutes for complex AI features",
                "Under 5 minutes — if it takes longer, break it into multiple TST sequences",
                "30 seconds to 1 minute maximum"
              ],
              correct: 2,
              explanation: "People associate brevity with simplicity. A 5+ minute Show makes the feature feel complicated. If the functionality deserves more time, break it into separate Tell-Show-Tell sequences, each with its own context and benefit delivery."
            },
            {
              id: "q3",
              question: "Your Closing Tell should primarily focus on:",
              options: [
                "Summarizing all the technical capabilities you just demonstrated",
                "Asking the prospect if they have any questions",
                "Connecting the feature to business outcomes for every stakeholder type in the room",
                "Transitioning to the next feature as quickly as possible"
              ],
              correct: 2,
              explanation: "The Closing Tell must deliver benefits that resonate with all stakeholder types — individual contributors, managers, AND executives. Use 'So you can...' language to walk up the value pyramid from operational benefit to strategic impact."
            },
            {
              id: "q4",
              question: "An executive joins your AI demo 10 minutes late. You're mid-Show on a complex data pipeline feature. What should you do?",
              options: [
                "Ignore the interruption and finish the Show",
                "Start the entire demo over from the beginning",
                "Pause, deliver a quick Opening Tell for the executive's benefit, then continue the Show",
                "Skip to the next feature immediately"
              ],
              correct: 2,
              explanation: "The Opening Tell isn't just for the start of a demo — it's a tool you can deploy any time someone needs context. A quick 30-second bridge ('We're showing how our AI automates X, which addresses the Y problem your team mentioned') gets the executive oriented without losing the room."
            },
          ]
        }
      },
      {
        id: "tst-build",
        type: "build-demo",
        title: "Build Your Opening Tell",
        description: "Construct a perfect Opening Tell for a complex AI scenario. Fill in each component to complete the structure.",
        xp: 75,
        data: {
          scenario: "You're about to demo an AI-powered contract analysis feature to a Legal Operations Manager at a Fortune 500 company. She mentioned in discovery that her team reviews 200+ contracts per week and it takes 3 days to flag risk clauses.",
          template: [
            { id: "pain", label: "Acknowledge Their Pain", placeholder: "Reference the specific pain point they shared...", hint: "Use their exact words from discovery. 'Based on what you told me about...'", example: "Based on what you told me about your team spending 3 days reviewing 200 contracts a week just to flag risk clauses..." },
            { id: "bridge", label: "State What You'll Show", placeholder: "Tell them exactly what feature you're about to demonstrate...", hint: "Be specific — name the feature and its core action.", example: "...I want to show you how our AI Contract Analyzer automatically identifies and categorizes risk clauses in seconds..." },
            { id: "benefit_preview", label: "Preview the Benefit", placeholder: "Give them a reason to pay attention...", hint: "One sentence on the outcome they'll see. Don't reveal everything — create curiosity.", example: "...so you can see what 3-day reviews could look like in 3 minutes." },
          ]
        }
      }
    ]
  },
  {
    id: 2,
    slug: "bridge-building",
    title: "Bridge Building",
    subtitle: "From Current Pain to Future Gain",
    tagline: "Lead them across the valley of change",
    icon: "🌉",
    accentColor: "emerald",
    estimatedMinutes: 25,
    xpReward: 250,
    keyConceptSummary: "Bridge Building is the art of connecting your prospect's painful current state to a compelling future state powered by your solution. The bridge metaphor is central: some prospects will walk across willingly, others need handrails, and some will run back to the safety of the status quo. Your job is to make the bridge feel solid, safe, and worth crossing.",
    aiContext: "AI adoption is uniquely challenging because the 'valley' between current and future state is filled with fears: 'Will it replace my team?', 'What if the AI is wrong?', 'How long will implementation take?' Your bridge must address these fears explicitly, not just show the shiny future.",
    activities: [
      {
        id: "bridge-match",
        type: "matching",
        title: "Match the Bridge",
        description: "Connect each 'Current State' pain point with its corresponding 'Future State' AI-powered benefit. Drag the right-side cards to match the left-side pains.",
        xp: 60,
        data: {
          pairs: [
            { id: "p1", current: "Our sales team manually researches each prospect for 2 hours before every call, pulling data from 6 different systems.", future: "AI automatically aggregates prospect data from all sources into a single brief — delivered 30 minutes before the call." },
            { id: "p2", current: "We can't predict which deals will close this quarter. Our forecast accuracy is about 55%.", future: "AI analyzes 150+ deal signals to generate forecasts with 85%+ accuracy, flagging at-risk deals 3 weeks earlier." },
            { id: "p3", current: "Customer support tickets take 4 hours to resolve on average because agents have to search 12 knowledge bases.", future: "AI surfaces the right answer from all knowledge bases in seconds, reducing average handle time to under 45 minutes." },
            { id: "p4", current: "Our compliance team manually reviews every contract for regulatory clauses — it takes 3 days per contract.", future: "AI scans contracts in minutes, flags all regulatory clauses with confidence scores, and drafts a risk summary." },
            { id: "p5", current: "We lose 30% of new customers in the first 90 days because onboarding is inconsistent and manual.", future: "AI-driven onboarding automatically personalizes the journey for each customer segment, reducing 90-day churn by 40%." },
          ]
        }
      },
      {
        id: "bridge-fears",
        type: "scenario",
        title: "Handle the Fear of Crossing",
        description: "A prospect raises an objection mid-demo. Choose the best response to keep them moving across the bridge.",
        xp: 80,
        data: {
          scenarios: [
            {
              id: "s1",
              setup: "You've just shown an AI agent autonomously processing customer data. The VP of IT says: 'This looks powerful, but what happens when the AI makes a mistake? Who's accountable?'",
              options: [
                { id: "a", text: "\"Our AI has a 99.2% accuracy rate, so mistakes are extremely rare.\" (Continue the demo)", quality: "poor", feedback: "Quoting accuracy stats doesn't address the accountability concern — it sounds defensive. The VP is asking about process and responsibility, not statistics." },
                { id: "b", text: "\"Great question. Every AI action in our system creates an audit trail with a confidence score. When confidence drops below your defined threshold, it routes to a human for review. You define the guardrails — the AI works within them. Want me to show you that workflow?\"", quality: "excellent", feedback: "This is a bridge-building response. You acknowledged the fear, explained the safety mechanism (human-in-the-loop), gave them control, and offered to demonstrate — turning the objection into a demo opportunity." },
                { id: "c", text: "\"That's a great point. We can discuss governance in a separate technical deep-dive after this demo.\"", quality: "poor", feedback: "Deferring the concern signals you don't have a good answer. The VP will mentally 'run back across the bridge' and disengage from the rest of the demo." },
                { id: "d", text: "\"Accountability stays with your team — the AI is a tool, not a decision-maker. Let me show you the override controls.\"", quality: "good", feedback: "Solid response that addresses accountability. It could be stronger by also mentioning the audit trail and confidence thresholds, but it keeps the prospect moving forward." },
              ]
            },
            {
              id: "s2",
              setup: "The Head of Sales says: 'Our reps are going to push back on this. They'll think the AI is replacing them.'",
              options: [
                { id: "a", text: "\"Change management is always hard. We have an adoption playbook that helps.\"", quality: "poor", feedback: "This is dismissive and generic. It doesn't address the specific fear or show empathy for the real organizational challenge." },
                { id: "b", text: "\"You're right to think about this. The reps who adopt AI tools are closing 34% more deals than those who don't — because they spend time selling instead of researching. The story we'd recommend telling your team: the AI is their research assistant, not their replacement. Want to see how reps actually interact with it day-to-day?\"", quality: "excellent", feedback: "You validated the concern, provided a compelling data point, gave them a change management narrative to use with their team, and pivoted to a relevant demo moment. This is bridge building at its best." },
                { id: "c", text: "\"The AI doesn't replace reps — it makes them better. Your top performers will love it.\"", quality: "good", feedback: "Decent reframe, but it only addresses top performers. The Head of Sales is worried about the whole team. Adding a data point and a change narrative would make this excellent." },
                { id: "d", text: "\"Most of our customers had the same concern. After 90 days, rep adoption is typically 85%+.\"", quality: "good", feedback: "Social proof is useful, but it doesn't give the Head of Sales a narrative to use internally. Combine this with the 'research assistant' reframe for a stronger bridge." },
              ]
            }
          ]
        }
      },
      {
        id: "bridge-quiz",
        type: "quiz",
        title: "Bridge Building Quiz",
        description: "Test your understanding of the Bridge Building methodology.",
        xp: 60,
        data: {
          questions: [
            {
              id: "q1",
              question: "What is the 'valley' in the bridge metaphor?",
              options: [
                "The gap between your product's price and the competitor's price",
                "The fear, uncertainty, and implementation challenges between the current state and the future state",
                "The time it takes to complete a product demo",
                "The difference between what a prospect says they need and what they actually need"
              ],
              correct: 1,
              explanation: "The valley represents everything that makes change feel risky: implementation complexity, team adoption challenges, budget approval, fear of the unknown, and the comfort of the status quo. Your demo must make the bridge across this valley feel solid and safe."
            },
            {
              id: "q2",
              question: "Which of these is the best 'bridge-building' statement when showing an AI feature?",
              options: [
                "\"This is our most advanced AI capability — it uses transformer-based models with 99.2% accuracy.\"",
                "\"Let me show you how this works technically so you can evaluate it properly.\"",
                "\"Remember you told me your team spends 3 days on contract review? Watch what happens when I upload this contract.\"",
                "\"Our AI is the most powerful in the market for this use case.\""
              ],
              correct: 2,
              explanation: "The best bridge-building statements connect the demo directly to a pain the prospect shared in their own words. This makes the feature feel like a solution to THEIR problem, not a product feature."
            },
          ]
        }
      }
    ]
  },
  {
    id: 3,
    slug: "demo-crime-files",
    title: "The Demo Crime Files",
    subtitle: "28 Mistakes That Kill Deals",
    tagline: "Know the crimes. Avoid the sentence.",
    icon: "🔍",
    accentColor: "amber",
    estimatedMinutes: 30,
    xpReward: 300,
    keyConceptSummary: "Robert Reifstahl catalogued 28 'Demo Crimes' — common mistakes that sabotage software demonstrations. These range from the 'PowerPoint Crutch' to 'Data Dumping' to 'Zippy Mouse Syndrome.' In the world of AI demos, these crimes are even more dangerous because AI features are inherently complex and easy to misrepresent.",
    aiContext: "AI demos are uniquely crime-prone. The 'So What?' crime is rampant — SEs show impressive AI capabilities without connecting them to business value. 'Technobabble' is common — using terms like 'transformer architecture' and 'vector embeddings' with non-technical buyers. And 'The Magical Mystery Tour' is deadly — showing AI features without a clear narrative thread.",
    activities: [
      {
        id: "crime-detective",
        type: "crime-detective",
        title: "Demo Detective",
        description: "Read the demo transcript below. Identify all the Demo Crimes being committed. Click on the highlighted text when you spot a crime.",
        xp: 100,
        data: {
          transcript: [
            { id: "s1", text: "\"Okay so let me just share my screen here... can everyone see it? Great. So, um, let me just navigate to our platform...\"", crime: null },
            { id: "s2", text: "\"So this is our main dashboard. As you can see we have a LOT of features here. Let me walk you through everything...\"", crime: { id: "c1", name: "The Magical Mystery Tour", description: "No roadmap was provided. The prospect has no idea where this demo is going, how long it will take, or what the destination is. This creates anxiety and disengagement." } },
            { id: "s3", text: "\"First, here's our AI analytics module. It uses a transformer-based architecture with a 96-layer neural network and processes data through our proprietary vector embedding pipeline...\"", crime: { id: "c2", name: "Technobabble", description: "Using technical jargon with a business audience. The prospect doesn't care about the architecture — they care about what it does for their business." } },
            { id: "s4", text: "\"...and over here we have our NLP engine, and this connects to our RAG pipeline, and then we have our LLM orchestration layer...\"", crime: { id: "c3", name: "Data Dump / Feature Dump", description: "Showing feature after feature without connecting any of them to the prospect's specific pain points. This is the 'So What?' crime in action." } },
            { id: "s5", text: "\"Now let me show you our reporting module. And also our integration hub. Oh, and that reminds me of our workflow automation — let me show you that too...\"", crime: { id: "c4", name: "\"I Love This Part!\"", description: "Going off-script to show features the SE loves, regardless of whether they're relevant to the prospect's stated needs. This derails the narrative and wastes time." } },
            { id: "s6", text: "\"So as you can see, our platform does all of this. Any questions?\" [Silence] \"Okay great, so let me continue...\"", crime: { id: "c5", name: "The Status Quo Audience", description: "Receiving no reaction and treating it as success. Silence means the audience is disengaged, not satisfied. A good demo should provoke reactions, questions, and discussion." } },
            { id: "s7", text: "\"And this feature was released in version 4.2.1, and in version 4.3 we added the sub-feature, and in 4.4 we enhanced the algorithm...\"", crime: { id: "c6", name: "Brand Craziness / Version Mania", description: "Prospects don't care about version numbers or release history. They care about what the software does for them today and in the future." } },
            { id: "s8", text: "\"Okay so that was a quick overview of everything. I know we went a bit long but there's so much to show you!\"", crime: { id: "c7", name: "Running Out The Clock", description: "Going over time is a crime that disrespects the prospect's schedule and signals poor preparation. Always have a mental clock and end on time or early." } },
          ]
        }
      },
      {
        id: "crime-quiz",
        type: "quiz",
        title: "Crime Identification Quiz",
        description: "Can you identify the crime from the description?",
        xp: 80,
        data: {
          questions: [
            {
              id: "q1",
              question: "An SE is demoing an AI platform and spends 25 minutes showing every feature in the product, even ones the prospect never mentioned needing. This is called:",
              options: ["The PowerPoint Crutch", "Data Dumping / Feature Dumping", "The Magical Mystery Tour", "Zippy Mouse Syndrome"],
              correct: 1,
              explanation: "Data Dumping is one of the most common demo crimes. It stems from the SE's assumption that showing more features = more value. The opposite is true. Showing only the features relevant to the prospect's stated needs is far more persuasive."
            },
            {
              id: "q2",
              question: "An SE moves the mouse constantly around the screen while talking, circling menus and clicking rapidly. The prospect says 'I'm having trouble following.' This is:",
              options: ["Screen Kung-Fu", "Zippy Mouse Syndrome", "The Magical Mystery Tour", "Going Solo"],
              correct: 1,
              explanation: "Zippy Mouse Syndrome is when the mouse moves erratically, making it impossible for the audience to track what's happening on screen. The fix: move the mouse deliberately to the element you're discussing, then stop. Use a large, high-contrast cursor."
            },
            {
              id: "q3",
              question: "An SE shows an AI feature and says: 'And this uses our advanced NLP with BERT-based classification and a custom fine-tuned model on your industry data.' The CFO in the room looks confused. This is:",
              options: ["Technobabble", "Data Dumping", "The PowerPoint Crutch", "Brand Craziness"],
              correct: 0,
              explanation: "Technobabble is using technical jargon with a non-technical audience. The CFO doesn't care about BERT or NLP — they care about what the AI does for their business outcomes. Always translate technical capabilities into business language."
            },
            {
              id: "q4",
              question: "An SE shows a feature and says 'This is our AI recommendation engine' and immediately moves to the next feature without explaining why it matters. The prospect thinks 'So what?' This crime is called:",
              options: ["The Status Quo Audience", "The So What Crime", "Burying the Lead", "The PowerPoint Crutch"],
              correct: 1,
              explanation: "The 'So What?' crime is failing to connect a feature to a business benefit. Every feature must pass the 'So What?' test before you show it. If you can't answer 'So what does this mean for the prospect?', don't show it."
            },
          ]
        }
      },
      {
        id: "crime-correction",
        type: "fill-blank",
        title: "Crime Correction Workshop",
        description: "Rewrite these 'criminal' demo statements into winning ones. Transform each crime into a bridge-building, value-focused statement.",
        xp: 80,
        data: {
          corrections: [
            {
              id: "cr1",
              crime: "The So What Crime",
              criminal_statement: "\"Our AI processes 10,000 transactions per second.\"",
              prompt: "Rewrite this to connect the capability to a business outcome for a VP of Finance:",
              hint: "Start with the capability, then use 'which means...' or 'so you can...' to bridge to the business impact.",
              example_correction: "\"Our AI processes 10,000 transactions per second — which means your month-end close that currently takes 5 days can run in under 4 hours, giving your team 4 extra days every month for strategic analysis.\""
            },
            {
              id: "cr2",
              crime: "Technobabble",
              criminal_statement: "\"Our RAG-based LLM with vector embeddings enables semantic search across your unstructured data corpus.\"",
              prompt: "Rewrite this for a Head of Customer Service who wants to reduce ticket resolution time:",
              hint: "Drop all the acronyms. Describe what it DOES, not how it works.",
              example_correction: "\"Your support agents can type a question in plain English and instantly get the right answer pulled from all your documentation, past tickets, and knowledge bases — no more searching through 12 different systems.\""
            },
          ]
        }
      }
    ]
  },
  {
    id: 4,
    slug: "discovery-process",
    title: "The Discovery Process",
    subtitle: "Ask Before You Show",
    tagline: "The best demos start before the demo",
    icon: "🧭",
    accentColor: "purple",
    estimatedMinutes: 25,
    xpReward: 250,
    keyConceptSummary: "Discovery is the process of gathering the information you need to deliver a relevant, personalized demo. Reifstahl's framework asks three core questions: How is the process handled currently? How would you like to do it? What would be the impact? Great discovery means you never have to guess what to show — you know exactly which features matter to which people.",
    aiContext: "AI use cases are incredibly diverse. The same AI platform might be used for fraud detection, customer service automation, supply chain optimization, or HR analytics. Without discovery, you'll show the wrong use case to the wrong audience. Discovery on the Fly — gathering information even during the demo — is a critical skill for AI SEs.",
    activities: [
      {
        id: "discovery-scenario",
        type: "scenario",
        title: "Choose Your Discovery Questions",
        description: "You have 15 minutes before a demo with a new prospect. Choose the best discovery questions to ask.",
        xp: 80,
        data: {
          scenarios: [
            {
              id: "s1",
              setup: "You're about to demo an AI operations platform to a Director of IT Operations. You have 10 minutes for pre-demo discovery. Which question do you ask FIRST?",
              options: [
                { id: "a", text: "\"What features are most important to you in an AI platform?\"", quality: "poor", feedback: "This is a feature-focused question that puts the burden on the prospect to know what they need. It also signals you're going to show features, not solve problems." },
                { id: "b", text: "\"Can you walk me through how your team currently handles [the core process your AI addresses]? What's working, what's not?\"", quality: "excellent", feedback: "This is Reifstahl's first discovery question: 'How is the process handled currently?' It opens a conversation about their world, not your product. The answer tells you exactly what to show." },
                { id: "c", text: "\"How many users would be using the platform?\"", quality: "poor", feedback: "This is a qualification question, not a discovery question. It tells you about deal size but nothing about what to show in the demo." },
                { id: "d", text: "\"What's your timeline for making a decision?\"", quality: "poor", feedback: "Timeline is important for the sales process but irrelevant for demo preparation. Ask this at the end, not the beginning." },
              ]
            },
            {
              id: "s2",
              setup: "During discovery, the Director says: 'Our biggest pain is that we have 5 monitoring tools that don't talk to each other, so we're always reacting to incidents instead of preventing them.' What's your best follow-up?",
              options: [
                { id: "a", text: "\"Great — we can definitely solve that. Let me show you our integration hub.\"", quality: "poor", feedback: "Jumping to the demo too fast. You have one pain point but haven't quantified the impact or understood the ideal future state. This leads to a generic demo." },
                { id: "b", text: "\"How would you ideally like that to work? And what would it mean for your team if you could prevent incidents instead of reacting to them?\"", quality: "excellent", feedback: "This is Reifstahl's second and third discovery questions: 'How would you like to do it?' and 'What would be the impact?' Now you have a complete bridge: current pain → desired future → business impact. Your demo writes itself." },
                { id: "c", text: "\"How many incidents do you typically handle per month?\"", quality: "good", feedback: "Quantifying the problem is valuable, but you're missing the future state and impact questions. Add those to complete the discovery triangle." },
                { id: "d", text: "\"Which of the 5 tools is the most problematic?\"", quality: "good", feedback: "Useful for understanding the technical landscape, but doesn't help you understand what the ideal future looks like or the business impact of solving it." },
              ]
            }
          ]
        }
      },
      {
        id: "discovery-attendees",
        type: "matching",
        title: "Know Your Audience",
        description: "Different stakeholders care about different things. Match each attendee type with what they most want to see in an AI demo.",
        xp: 70,
        data: {
          pairs: [
            { id: "p1", current: "CEO / C-Suite Executive", future: "Strategic impact, competitive differentiation, and ROI at the company level. Keep it to 2-3 slides and one powerful demo moment." },
            { id: "p2", current: "VP / Director (Business Owner)", future: "Departmental efficiency gains, team productivity, and how it solves their specific operational problem. Connect every feature to their KPIs." },
            { id: "p3", current: "IT Director / CISO", future: "Security architecture, data governance, integration complexity, and compliance. They want to know what can go wrong and how it's prevented." },
            { id: "p4", current: "End User / Individual Contributor", future: "Day-to-day usability, time savings, and whether it will make their job easier or harder. Show the actual workflow they'll use every day." },
            { id: "p5", current: "CFO / Finance", future: "Total cost of ownership, payback period, and measurable ROI. Translate every feature into dollars saved or revenue generated." },
          ]
        }
      },
      {
        id: "discovery-quiz",
        type: "quiz",
        title: "Discovery Mastery Quiz",
        description: "Test your discovery skills.",
        xp: 60,
        data: {
          questions: [
            {
              id: "q1",
              question: "Reifstahl's three core discovery questions are:",
              options: [
                "Who is the buyer? What is the budget? When is the decision?",
                "How is the process handled currently? How would you like to do it? What would be the impact?",
                "What features do you need? What's your timeline? Who are the decision-makers?",
                "What problem are you solving? What's your current solution? Why are you looking to change?"
              ],
              correct: 1,
              explanation: "These three questions form the complete discovery triangle: Current State (pain) → Future State (desire) → Impact (value). Together, they give you everything you need to build a bridge and deliver a relevant demo."
            },
            {
              id: "q2",
              question: "You're mid-demo and realize you're showing the wrong feature for this audience. What should you do?",
              options: [
                "Finish the current feature to avoid looking unprepared",
                "Apologize and restart the demo from the beginning",
                "Pause, ask a discovery question to validate what matters most, then pivot to the relevant feature",
                "Speed through the current feature and hope they don't notice"
              ],
              correct: 2,
              explanation: "This is 'Discovery on the Fly.' It's always better to pause and ask than to continue showing irrelevant content. A simple 'Before I continue, I want to make sure I'm showing you what's most relevant — is [X] the bigger priority for your team, or [Y]?' shows confidence and customer focus."
            },
          ]
        }
      }
    ]
  },
  {
    id: 5,
    slug: "audience-management",
    title: "Audience Management",
    subtitle: "Read the Room, Win the Room",
    tagline: "Every person in the room is a different demo",
    icon: "👥",
    accentColor: "teal",
    estimatedMinutes: 20,
    xpReward: 200,
    keyConceptSummary: "A demo room is never a monolith. You'll have champions, skeptics, economic buyers, technical evaluators, and end users — all with different agendas. Reifstahl's framework helps you identify personality types, manage difficult audience members, and ensure every stakeholder leaves feeling heard.",
    aiContext: "AI demos often attract mixed audiences: enthusiastic innovators who want to push AI to its limits, skeptical IT leaders worried about security and governance, and business leaders who just want to know if it works. Managing these competing agendas in real-time is a core SE skill.",
    activities: [
      {
        id: "audience-quiz",
        type: "quiz",
        title: "Audience Dynamics Quiz",
        description: "Test your ability to read and manage demo room dynamics.",
        xp: 80,
        data: {
          questions: [
            {
              id: "q1",
              question: "A technical evaluator keeps asking deep architecture questions during your business-level AI demo, derailing the conversation for the executive in the room. What do you do?",
              options: [
                "Answer every technical question in full detail — you don't want to seem like you're hiding something",
                "Ignore the technical questions and keep presenting",
                "Acknowledge the question, give a brief answer, offer a technical deep-dive separately, and redirect to the business audience: 'Great question — let me give you a quick answer and then I'd love to schedule a technical deep-dive where we can go as deep as you want. For the group, let me show you the business impact...'",
                "Ask the technical evaluator to hold their questions until the end"
              ],
              correct: 2,
              explanation: "This technique — acknowledge, brief answer, separate session, redirect — serves both audiences. The technical evaluator feels heard, the executive stays engaged, and you maintain control of the demo narrative."
            },
            {
              id: "q2",
              question: "The 'Demonstration Attendee Checklist' that Reifstahl recommends filling out before every demo asks you to identify:",
              options: [
                "The prospect's budget, timeline, and decision-making process",
                "Who is attending, their primary responsibilities, and 3 things each person wants to see",
                "The competitive landscape, pricing objections, and technical requirements",
                "The prospect's current vendor, contract expiration date, and pain points"
              ],
              correct: 1,
              explanation: "The Attendee Checklist forces you to think about each person in the room before you walk in. Knowing what each attendee cares about allows you to personalize your demo for the room, not just for the company."
            },
            {
              id: "q3",
              question: "During your AI demo, the room goes completely silent after you show a key feature. No questions, no reactions. This means:",
              options: [
                "The demo is going perfectly — they're absorbing the information",
                "The audience is likely disengaged or confused — silence is a warning sign, not a success signal",
                "They're impressed and don't know what to say",
                "You should move faster to show more features"
              ],
              correct: 1,
              explanation: "Reifstahl calls this the 'Status Quo Audience' crime — but it applies to the audience's reaction too. A good demo provokes reactions: questions, nods, leaning forward, side conversations. Silence usually means you've lost them. Pause and ask: 'Does this resonate with what you're experiencing?'"
            },
          ]
        }
      },
      {
        id: "audience-scenario",
        type: "scenario",
        title: "Manage the Room",
        description: "Real demo room situations. Choose the best response.",
        xp: 80,
        data: {
          scenarios: [
            {
              id: "s1",
              setup: "You're 20 minutes into a 45-minute AI demo. The CEO, who was supposed to leave after 15 minutes, is still in the room and seems engaged. But you're only halfway through your planned content.",
              options: [
                { id: "a", text: "Rush through the remaining content to cover everything in the time you have left", quality: "poor", feedback: "Rushing destroys the quality of every remaining demo topic. The CEO will leave with a poor impression of the last 25 minutes." },
                { id: "b", text: "Pause and ask: 'I see you're still with us — I want to make sure I'm covering what's most valuable for your time. Of the remaining topics, which is most important to you?'", quality: "excellent", feedback: "This is audience management at its best. You acknowledge the CEO's presence, show respect for their time, and let them direct the remaining demo to what matters most to them. This is far more valuable than covering everything." },
                { id: "c", text: "Ignore the CEO and continue with your planned agenda", quality: "poor", feedback: "Missing a CEO engagement opportunity is a significant mistake. When a C-suite executive stays longer than expected, it's a buying signal — engage them." },
                { id: "d", text: "Skip to the executive summary slide and end the demo early", quality: "good", feedback: "Better than rushing, but you're leaving demo time on the table. A better approach is to ask what they want to see most." },
              ]
            },
          ]
        }
      }
    ]
  },
  {
    id: 6,
    slug: "demo-preparation",
    title: "Demo Preparation",
    subtitle: "The Demo is Won Before You Walk In",
    tagline: "Preparation is the unfair advantage",
    icon: "⚙️",
    accentColor: "teal",
    estimatedMinutes: 20,
    xpReward: 200,
    keyConceptSummary: "Reifstahl dedicates significant attention to the mechanics of preparation: the environment setup, the data in your demo, the technical checklist, and the mental preparation. A demo that crashes, has bad data, or runs into technical issues loses credibility instantly. In AI demos, where live model inference can be slow or unpredictable, preparation is even more critical.",
    aiContext: "AI demos have unique preparation challenges: model latency can vary, live API calls can fail, and AI-generated outputs can be unpredictable. Best-in-class AI SEs prepare 'golden path' demos with pre-loaded data and expected outputs, while also being ready to handle live demonstrations when the prospect requests them.",
    activities: [
      {
        id: "prep-quiz",
        type: "quiz",
        title: "Preparation Mastery Quiz",
        description: "Test your demo preparation knowledge.",
        xp: 80,
        data: {
          questions: [
            {
              id: "q1",
              question: "What is the recommended approach for data in an AI demo environment?",
              options: [
                "Use generic placeholder data — it's cleaner and easier to explain",
                "Use the prospect's actual production data for maximum relevance",
                "Use realistic, industry-specific demo data that mirrors the prospect's world — ideally referencing their company name, industry, and use case",
                "Use your own company's data as an example"
              ],
              correct: 2,
              explanation: "Reifstahl emphasizes that demo data should make the prospect feel like they're seeing their own world. Generic data creates distance. Using the prospect's industry, terminology, and realistic scenarios makes the demo feel immediately relevant and reduces the 'imagination gap.'"
            },
            {
              id: "q2",
              question: "Your AI demo requires a live API call that sometimes takes 8-12 seconds to respond. What's the best preparation strategy?",
              options: [
                "Hope the API is fast on demo day",
                "Warn the prospect upfront that AI processing takes time",
                "Prepare a pre-loaded 'golden path' result for the demo, while also having the live call ready to show if the prospect requests it",
                "Avoid showing that feature in the demo"
              ],
              correct: 2,
              explanation: "The 'golden path' approach is standard practice for AI demos. Pre-loaded results ensure a smooth, predictable demo experience. Having the live call ready as an option shows confidence and transparency. Never let technical latency derail your demo narrative."
            },
            {
              id: "q3",
              question: "How long before a demo should you complete your technical setup and rehearsal?",
              options: [
                "30 minutes before — enough time to fix any last-minute issues",
                "The morning of the demo",
                "The day before — giving you time to fix issues without the pressure of the prospect waiting",
                "5 minutes before — you want everything fresh"
              ],
              correct: 2,
              explanation: "Reifstahl recommends completing setup the day before. This gives you time to discover and fix issues without the pressure of a waiting prospect. On demo day, a quick 15-minute check is all you need."
            },
          ]
        }
      },
      {
        id: "prep-checklist",
        type: "drag-drop",
        title: "Build the Pre-Demo Checklist",
        description: "Organize these pre-demo preparation tasks into the correct order of priority. Drag them from highest to lowest priority.",
        xp: 70,
        data: {
          items: [
            { id: "a", text: "Confirm all demo environment credentials are working and data is loaded", phase: "critical" },
            { id: "b", text: "Review the Demonstration Attendee Checklist — know who's in the room and what they care about", phase: "critical" },
            { id: "c", text: "Rehearse the full demo end-to-end at least once, timing each Tell-Show-Tell sequence", phase: "important" },
            { id: "d", text: "Prepare your Limbic Opening — the attention-grabbing business problem statement", phase: "important" },
            { id: "e", text: "Test your screen sharing, audio, and video setup", phase: "important" },
            { id: "f", text: "Prepare 3-5 backup slides in case of technical failure", phase: "contingency" },
            { id: "g", text: "Coordinate with your AE on who opens, who presents, and who handles Q&A", phase: "critical" },
          ],
          correctOrder: ["b", "a", "g", "d", "c", "e", "f"],
          phases: [
            { id: "critical", label: "Critical", color: "red", description: "Must be done — deal-breakers if missed" },
            { id: "important", label: "Important", color: "amber", description: "Significantly improves demo quality" },
            { id: "contingency", label: "Contingency", color: "teal", description: "Backup plans for when things go wrong" },
          ]
        }
      }
    ]
  },
  {
    id: 7,
    slug: "limbic-opening-value-close",
    title: "Limbic Opening & Value Close",
    subtitle: "Start Strong. End Stronger.",
    tagline: "The first 60 seconds and last 60 seconds win deals",
    icon: "💎",
    accentColor: "emerald",
    estimatedMinutes: 25,
    xpReward: 300,
    keyConceptSummary: "The Limbic Opening captures attention by connecting to the emotional, business-critical problem before any product is shown. The Value Close elevates the conversation from feature-level to departmental and strategic value, giving decision-makers the language they need to justify the purchase internally. Together, they form the bookends of a winning demo.",
    aiContext: "AI demos often start with 'Let me show you our platform' and end with 'Any questions?' Both are missed opportunities. A Limbic Opening for an AI solution should paint a vivid picture of the cost of NOT having AI. A Value Close should articulate the strategic advantage of AI adoption — not just the features you showed.",
    activities: [
      {
        id: "limbic-build",
        type: "build-demo",
        title: "Craft the Limbic Opening",
        description: "Build a compelling Limbic Opening for a complex AI scenario. The Limbic Opening must capture attention, establish the business problem, and create urgency before a single screen is shown.",
        xp: 100,
        data: {
          scenario: "You're presenting an AI-powered revenue intelligence platform to a VP of Sales at a $500M SaaS company. In discovery, you learned: their forecast accuracy is 52%, they lose 3 deals per quarter to competitors who 'told a better story', and their top SE is leaving next month.",
          template: [
            { id: "hook", label: "The Hook (Attention Grabber)", placeholder: "Start with a provocative question, a surprising statistic, or a vivid scenario...", hint: "Make them feel the pain before you offer the solution. Use their specific numbers from discovery.", example: "\"What if I told you that right now, three deals in your pipeline are going to close for a competitor — not because their product is better, but because their SE told a better story?\"" },
            { id: "problem", label: "The Business Problem", placeholder: "State the specific business problem in their language...", hint: "Use the exact words and numbers from discovery. Make it feel personal.", example: "\"With 52% forecast accuracy, your team is essentially guessing which deals to prioritize. And when your top SE leaves next month, that institutional knowledge walks out the door with them.\"" },
            { id: "stakes", label: "The Stakes", placeholder: "What happens if this problem isn't solved?", hint: "Quantify the cost of inaction. Make the status quo feel more dangerous than change.", example: "\"At your deal size, missing forecast by 48% means millions in missed revenue and a board conversation you don't want to have. And it doesn't have to be this way.\"" },
            { id: "transition", label: "The Transition to Demo", placeholder: "Bridge to what you're about to show...", hint: "End the Limbic Opening by promising a solution — without showing it yet.", example: "\"Today I want to show you how teams like yours are using AI to forecast with 85% accuracy, replicate their top SE's approach across the entire team, and win the deals that matter most.\"" },
          ]
        }
      },
      {
        id: "value-close-quiz",
        type: "quiz",
        title: "Value Close Mastery",
        description: "Test your understanding of how to close a demo with maximum impact.",
        xp: 80,
        data: {
          questions: [
            {
              id: "q1",
              question: "The Value Close should primarily focus on:",
              options: [
                "Summarizing all the features you demonstrated",
                "Asking for the next meeting",
                "Elevating from the features shown to the departmental and strategic business value, using proof points",
                "Addressing any objections that came up during the demo"
              ],
              correct: 2,
              explanation: "The Value Close uses the 'So You Can' technique to walk up the value pyramid: operational benefit → departmental impact → strategic value. It gives decision-makers the language they need to justify the purchase to their CFO and CEO."
            },
            {
              id: "q2",
              question: "Which of these is the strongest Value Close statement for an AI analytics demo?",
              options: [
                "\"So that's our AI analytics platform. We have over 500 customers using it successfully.\"",
                "\"Any questions about what you saw today?\"",
                "\"What you just saw means your team can close the books 3 days faster — so your CFO gets accurate financials before the board meeting, not after. That's the difference between reactive and proactive leadership.\"",
                "\"Our platform is the most advanced AI analytics solution on the market.\""
              ],
              correct: 2,
              explanation: "The best Value Close connects the specific feature to a specific outcome for a specific stakeholder. It uses concrete numbers, names a real business scenario, and elevates from operational to strategic impact."
            },
          ]
        }
      },
      {
        id: "final-challenge",
        type: "quiz",
        title: "Final Certification Challenge",
        description: "The comprehensive assessment covering all 7 modules. Score 80% or higher to earn your AI SE Demo Master certification.",
        xp: 150,
        data: {
          questions: [
            {
              id: "fq1",
              question: "What is the correct order of the Tell-Show-Tell technique?",
              options: ["Show → Tell → Tell", "Tell → Show → Tell", "Tell → Tell → Show", "Show → Tell → Show"],
              correct: 1,
              explanation: "Opening Tell (context) → Show (under 5 min) → Closing Tell (benefits). This structure ensures the audience has context before seeing the product and leaves with the business value, not just a memory of screens."
            },
            {
              id: "fq2",
              question: "What is the maximum recommended duration for the 'Show' portion of a single Tell-Show-Tell topic?",
              options: ["2 minutes", "5 minutes", "10 minutes", "15 minutes"],
              correct: 1,
              explanation: "5 minutes is the maximum. Beyond 5 minutes, the feature appears complex. If a feature needs more time, break it into multiple Tell-Show-Tell sequences."
            },
            {
              id: "fq3",
              question: "Reifstahl's three core discovery questions are (in order):",
              options: [
                "What do you need? When do you need it? What's your budget?",
                "How is it handled currently? How would you like to do it? What would be the impact?",
                "Who is the buyer? What is the pain? What is the ROI?",
                "What features matter? Who will use it? When will you decide?"
              ],
              correct: 1,
              explanation: "Current State → Desired Future State → Business Impact. These three questions give you everything you need to build a bridge and deliver a relevant, personalized demo."
            },
            {
              id: "fq4",
              question: "A prospect says 'your AI seems complicated' mid-demo. What is the most likely root cause?",
              options: [
                "The AI product is genuinely too complex for this prospect",
                "You skipped or rushed the Opening Tell, leaving the audience without context",
                "You showed too few features",
                "The prospect is not a good fit for the product"
              ],
              correct: 1,
              explanation: "Perceived complexity almost always traces back to a missing or weak Opening Tell. When the audience has no context, their brain works overtime to process unfamiliar screens, and they perceive complexity."
            },
            {
              id: "fq5",
              question: "What is the 'So What?' demo crime?",
              options: [
                "Asking the prospect too many questions during the demo",
                "Showing a feature without connecting it to a business benefit relevant to the audience",
                "Ending the demo without scheduling a next step",
                "Spending too much time on one feature"
              ],
              correct: 1,
              explanation: "The 'So What?' crime is showing a capability without answering the unspoken question in the prospect's mind: 'Why should I care?' Every feature must be connected to a business outcome."
            },
          ]
        }
      }
    ]
  }
];
