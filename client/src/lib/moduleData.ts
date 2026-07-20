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
  videoUrl?: string;
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
    videoUrl: "/manus-storage/module1-explainer_b4ff62e4.mp4",
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
    videoUrl: "/manus-storage/module2-explainer_d7ae9e1d.mp4",
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
    videoUrl: "/manus-storage/module3-explainer_2316a02a.mp4",
    keyConceptSummary: "Robert Riefstahl catalogued 28 'Demo Crimes' — common mistakes that sabotage software demonstrations. These range from the 'PowerPoint Crutch' to 'Data Dumping' to 'Zippy Mouse Syndrome.' In the world of AI demos, these crimes are even more dangerous because AI features are inherently complex and easy to misrepresent.",
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
    videoUrl: "/manus-storage/module4-explainer_ec7dfdf6.mp4",
    keyConceptSummary: "Discovery is the process of gathering the information you need to deliver a relevant, personalized demo. Riefstahl's framework asks three core questions: How is the process handled currently? How would you like to do it? What would be the impact? Great discovery means you never have to guess what to show — you know exactly which features matter to which people.",
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
                { id: "b", text: "\"Can you walk me through how your team currently handles [the core process your AI addresses]? What's working, what's not?\"", quality: "excellent", feedback: "This is Riefstahl's first discovery question: 'How is the process handled currently?' It opens a conversation about their world, not your product. The answer tells you exactly what to show." },
                { id: "c", text: "\"How many users would be using the platform?\"", quality: "poor", feedback: "This is a qualification question, not a discovery question. It tells you about deal size but nothing about what to show in the demo." },
                { id: "d", text: "\"What's your timeline for making a decision?\"", quality: "poor", feedback: "Timeline is important for the sales process but irrelevant for demo preparation. Ask this at the end, not the beginning." },
              ]
            },
            {
              id: "s2",
              setup: "During discovery, the Director says: 'Our biggest pain is that we have 5 monitoring tools that don't talk to each other, so we're always reacting to incidents instead of preventing them.' What's your best follow-up?",
              options: [
                { id: "a", text: "\"Great — we can definitely solve that. Let me show you our integration hub.\"", quality: "poor", feedback: "Jumping to the demo too fast. You have one pain point but haven't quantified the impact or understood the ideal future state. This leads to a generic demo." },
                { id: "b", text: "\"How would you ideally like that to work? And what would it mean for your team if you could prevent incidents instead of reacting to them?\"", quality: "excellent", feedback: "This is Riefstahl's second and third discovery questions: 'How would you like to do it?' and 'What would be the impact?' Now you have a complete bridge: current pain → desired future → business impact. Your demo writes itself." },
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
              question: "Riefstahl's three core discovery questions are:",
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
    videoUrl: "/manus-storage/module5-explainer_7d249921.mp4",
    keyConceptSummary: "A demo room is never a monolith. You'll have champions, skeptics, economic buyers, technical evaluators, and end users — all with different agendas. Riefstahl's framework helps you identify personality types, manage difficult audience members, and ensure every stakeholder leaves feeling heard.",
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
              question: "The 'Demonstration Attendee Checklist' that Riefstahl recommends filling out before every demo asks you to identify:",
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
              explanation: "Riefstahl calls this the 'Status Quo Audience' crime — but it applies to the audience's reaction too. A good demo provokes reactions: questions, nods, leaning forward, side conversations. Silence usually means you've lost them. Pause and ask: 'Does this resonate with what you're experiencing?'"
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
    videoUrl: "/manus-storage/module6-explainer_e873ae40.mp4",
    keyConceptSummary: "Riefstahl dedicates significant attention to the mechanics of preparation: the environment setup, the data in your demo, the technical checklist, and the mental preparation. A demo that crashes, has bad data, or runs into technical issues loses credibility instantly. In AI demos, where live model inference can be slow or unpredictable, preparation is even more critical.",
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
              explanation: "Riefstahl emphasizes that demo data should make the prospect feel like they're seeing their own world. Generic data creates distance. Using the prospect's industry, terminology, and realistic scenarios makes the demo feel immediately relevant and reduces the 'imagination gap.'"
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
              explanation: "Riefstahl recommends completing setup the day before. This gives you time to discover and fix issues without the pressure of a waiting prospect. On demo day, a quick 15-minute check is all you need."
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
    videoUrl: "/manus-storage/module7-explainer_3be81999.mp4",
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
              question: "Riefstahl's three core discovery questions are (in order):",
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
// ─── BONUS MODULES ────────────────────────────────────────────────────────────
// These modules draw from complementary methodologies: The Six Habits of Highly
// Effective Sales Engineers (Chris White), The Challenger Sale (Dixon & Adamson),
// MEDDPICC qualification framework, and SPIN Selling (Neil Rackham).

export const BONUS_MODULES: Module[] = [
  {
    id: 8,
    slug: "six-habits",
    title: "The Six Habits",
    subtitle: "Partner · Probe · Prepare · Practice · Perform · Perfect",
    tagline: "From Chris White's Six Habits of Highly Effective Sales Engineers",
    icon: "⚡",
    accentColor: "teal",
    estimatedMinutes: 30,
    xpReward: 300,
    videoUrl: "/manus-storage/module8-explainer_a54a2df5.mp4",
    keyConceptSummary: "Chris White's Six Habits framework defines the disciplines that separate good SEs from great ones. The habits are: Partner (own the technical win), Probe (deep discovery), Prepare (obsessive readiness), Practice (deliberate rehearsal), Perform (presence and execution), and Perfect (continuous improvement). Together they form a complete operating system for the SE role.",
    aiContext: "In AI sales, the 'Partner' habit is especially critical — AI deals require deep technical credibility and tight AE alignment. The 'Probe' habit must go deeper than traditional software: you need to understand not just the business problem, but the data landscape, model governance concerns, and change management readiness.",
    activities: [
      {
        id: "habits-match",
        type: "matching",
        title: "Match the Habit to the Scenario",
        description: "Each scenario below represents an SE failing at one of the Six Habits. Match each scenario to the habit being neglected.",
        xp: 75,
        data: {
          pairs: [
            { id: "h1", current: "Your AE booked a demo without telling you the prospect's industry or use case. You walk in cold and the demo misses the mark.", future: "PARTNER — Own the technical win. You should have required a pre-call with the AE to align on discovery findings before any demo." },
            { id: "h2", current: "You show a stunning AI demo, but the prospect says 'impressive, but I'm not sure this solves our actual problem.' You never asked about their current workflow.", future: "PROBE — Deep discovery is non-negotiable. You must understand the current state, desired state, and business impact before building a demo narrative." },
            { id: "h3", current: "Your demo environment crashes 10 minutes in. You didn't test it the day before. The prospect loses confidence.", future: "PREPARE — Obsessive readiness means testing every click path, every data set, and every integration the day before — never the morning of." },
            { id: "h4", current: "You've given this demo 50 times but you still stumble on the same transition between modules 2 and 3. You've never rehearsed that specific handoff.", future: "PRACTICE — Deliberate practice means identifying your weak spots and drilling them specifically, not just running through the full demo repeatedly." },
            { id: "h5", current: "During the demo, a key stakeholder asks a tough question and you visibly panic, lose your place, and rush through the rest.", future: "PERFORM — Presence and composure under pressure is a skill. Use the 'Stop, Don't Answer That' technique: pause, clarify the question, then answer calmly." },
          ]
        }
      },
      {
        id: "habits-quiz",
        type: "quiz",
        title: "Six Habits Knowledge Check",
        description: "Test your understanding of Chris White's Six Habits framework applied to AI sales engineering.",
        xp: 75,
        data: {
          questions: [
            {
              id: "q1",
              question: "According to the Six Habits, who is responsible for the 'technical win' in a deal?",
              options: [
                "The Account Executive — they own the full deal",
                "The Sales Engineer — they own the technical win",
                "The Sales Manager — they coordinate both",
                "It's a shared responsibility with no clear owner"
              ],
              correct: 1,
              explanation: "Chris White is explicit: the SE owns the technical win. This means the SE is accountable for ensuring the prospect is technically convinced. The AE owns the commercial relationship; the SE owns technical credibility and proof."
            },
            {
              id: "q2",
              question: "The 'Probe' habit is about more than asking questions. What is its deeper purpose in AI sales?",
              options: [
                "To fill time before the demo starts",
                "To qualify whether the prospect can afford the solution",
                "To understand the current state, desired state, and business impact so deeply that the demo writes itself",
                "To identify the economic buyer as quickly as possible"
              ],
              correct: 2,
              explanation: "Probing in AI sales must uncover: the current data landscape, the specific workflow being automated, the governance and compliance requirements, the change management readiness, and the quantifiable business impact. When you probe deeply enough, the demo narrative becomes obvious."
            },
            {
              id: "q3",
              question: "What does 'Perfect' mean as the sixth habit?",
              options: [
                "Delivering a flawless demo with zero mistakes",
                "Continuously improving by reviewing every demo, identifying what worked and what didn't, and adjusting",
                "Achieving 100% technical win rate",
                "Memorizing every feature of the product"
              ],
              correct: 1,
              explanation: "Perfect is about continuous improvement, not perfection. After every demo, top SEs do a brief post-mortem: What landed? What confused? What question caught me off guard? This deliberate reflection compounds into mastery over time."
            },
            {
              id: "q4",
              question: "An AE tells you 'just run your standard demo, I'll handle the business side.' What should you do?",
              options: [
                "Trust the AE — they know the customer best",
                "Run the standard demo but add extra features to impress",
                "Insist on a 15-minute pre-call to review discovery findings, stakeholder map, and demo objectives before agreeing to present",
                "Ask the prospect directly at the start of the demo what they want to see"
              ],
              correct: 2,
              explanation: "The Partner habit means you don't walk into a demo blind. A 15-minute pre-call with the AE is non-negotiable. Without it, you're guessing at what matters to the prospect — and in AI demos, a generic demo is almost always a losing demo."
            }
          ]
        }
      },
      {
        id: "habits-scenario",
        type: "scenario",
        title: "The Habit Under Fire",
        description: "Real SE situations that test multiple habits at once. Choose the response that best demonstrates the Six Habits principles.",
        xp: 100,
        data: {
          scenarios: [
            {
              id: "s1",
              setup: "You're 5 minutes into an AI demo when the VP of Engineering says: 'Before we go further — can you tell me how your model handles data that doesn't match the training distribution? We have a lot of edge cases.' You weren't expecting this question and don't have a perfect answer.",
              options: [
                { id: "a", text: "Bluff through an answer using general ML knowledge and hope they don't push back.", quality: "poor", feedback: "Bluffing with a technical audience destroys credibility instantly. Engineers can detect uncertainty. This violates the Perform and Partner habits." },
                { id: "b", text: "\"That's a great question and it's exactly the kind of thing we should go deep on. I want to give you a precise answer rather than a general one — can I follow up with our ML team and get you a detailed technical brief by end of week?\"", quality: "excellent", feedback: "This is the Perform habit in action: composure, honesty, and a clear commitment. Saying 'I'll get you a precise answer' is more credible than a vague answer. It also opens a follow-up touchpoint." },
                { id: "c", text: "Skip the question and continue the demo, planning to address it in the Q&A.", quality: "poor", feedback: "Ignoring a direct question from a VP of Engineering signals you don't have an answer. They will mentally check out for the rest of the demo." },
                { id: "d", text: "\"Good question. Let me show you the model monitoring dashboard — it surfaces distribution drift and flags anomalous inputs in real time.\" Then navigate to that section of the demo.", quality: "good", feedback: "Pivoting to a relevant demo section is smart if you have it. It shows rather than tells. The only improvement would be explicitly acknowledging the edge case concern before pivoting." },
              ]
            },
            {
              id: "s2",
              setup: "After a strong demo, you do a post-mortem and realize you lost the technical win. The prospect chose a competitor. Your AE says 'their product was just cheaper.' But you suspect the real issue was that you never addressed their data governance concerns.",
              options: [
                { id: "a", text: "Accept the AE's explanation and move on to the next deal.", quality: "poor", feedback: "This violates the Perfect habit. Accepting a surface-level explanation means you'll repeat the same mistake. You need to dig deeper." },
                { id: "b", text: "Request a 15-minute debrief with the prospect's technical champion to understand the real decision criteria, then document the findings for the team.", quality: "excellent", feedback: "This is the Perfect habit at its best. A win/loss debrief with the technical champion gives you ground truth. Documenting it for the team turns your loss into a team learning." },
                { id: "c", text: "Update your demo to include a data governance section going forward.", quality: "good", feedback: "Good instinct, but without confirming the real reason for the loss, you might be solving the wrong problem. Validate first, then update." },
                { id: "d", text: "Escalate to your manager and ask for better demo tools.", quality: "poor", feedback: "Blaming tools is a deflection. The Perfect habit requires honest self-assessment before looking for external explanations." },
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 9,
    slug: "challenger-se",
    title: "The Challenger SE",
    subtitle: "Teach · Tailor · Take Control",
    tagline: "From The Challenger Sale by Dixon & Adamson",
    icon: "⚔️",
    accentColor: "amber",
    estimatedMinutes: 30,
    xpReward: 300,
    videoUrl: "/manus-storage/module9-explainer_1a6ab1af.mp4",
    keyConceptSummary: "The Challenger Sale research found that the highest-performing salespeople don't just build relationships — they teach prospects something new about their business, tailor their message to each stakeholder, and take control of the sales conversation. For SEs, this means bringing insight-led demos that reframe how the prospect thinks about their problem, not just showing features.",
    aiContext: "AI is the perfect domain for Challenger selling. Most buyers don't know what's possible with AI — they're anchored to their current manual processes. A Challenger SE uses the demo to teach: 'Did you know that 73% of the time your team spends on X is now automatable? Let me show you what that looks like.' This reframe creates urgency that relationship-building alone never could.",
    activities: [
      {
        id: "challenger-quiz",
        type: "quiz",
        title: "Challenger Methodology Quiz",
        description: "Test your understanding of the Teach-Tailor-Take Control framework applied to AI SE demos.",
        xp: 75,
        data: {
          questions: [
            {
              id: "q1",
              question: "What does 'Teach' mean in the Challenger Sale context for an SE?",
              options: [
                "Educating the prospect on how to use your product",
                "Providing a product tutorial during the demo",
                "Bringing a commercial insight that reframes how the prospect thinks about their business problem — ideally something they didn't know before",
                "Explaining the technical architecture of your AI solution"
              ],
              correct: 2,
              explanation: "Challenger 'Teaching' is about commercial insight, not product education. The best SE opening isn't 'let me show you our platform' — it's 'did you know that companies in your industry are losing X% of revenue to Y problem, and AI is now solving it in Z way?' This reframe creates urgency and positions you as a strategic advisor."
            },
            {
              id: "q2",
              question: "You're demoing an AI fraud detection platform to a bank. The CFO cares about cost reduction; the CISO cares about compliance; the VP of Operations cares about analyst productivity. What does 'Tailor' require you to do?",
              options: [
                "Create three separate demos for each stakeholder",
                "Focus only on the CFO since they control the budget",
                "Deliver the same demo but use different language for each stakeholder — connecting the same features to each person's specific priorities",
                "Ask the group which topic they want to focus on"
              ],
              correct: 2,
              explanation: "Tailoring doesn't mean three different demos — it means one demo with three lenses. When you show the fraud detection dashboard, you say: 'For your compliance team, this audit trail satisfies SOX requirements. For your analysts, this cuts investigation time from 4 hours to 20 minutes. For your CFO, that's $2M in annual labor savings.' Same feature, three stakeholder-specific value statements."
            },
            {
              id: "q3",
              question: "A prospect says 'we're not really looking to buy anything right now, we're just evaluating options.' A Challenger SE should:",
              options: [
                "Respect their timeline and present a low-pressure overview",
                "Immediately ask about their budget and decision timeline",
                "Use a commercial insight to create urgency: show them the cost of their current approach and what competitors are doing differently",
                "End the meeting early since they're not ready to buy"
              ],
              correct: 2,
              explanation: "The Challenger 'Takes Control' by creating constructive tension. 'Just evaluating' often means they haven't quantified the cost of inaction. A Challenger SE responds: 'I understand — let me share what we're seeing in your industry. Companies still using manual X are losing Y per quarter to Z. The ones who moved to AI 18 months ago are now Y% ahead. I want to show you what that gap looks like for your team.'"
            },
            {
              id: "q4",
              question: "What is 'constructive tension' in the Challenger Sale?",
              options: [
                "Creating conflict with the prospect to test their commitment",
                "Challenging the prospect's assumptions in a way that makes them uncomfortable enough to reconsider their current approach",
                "Pushing back on price objections aggressively",
                "Disagreeing with the prospect's technical requirements"
              ],
              correct: 1,
              explanation: "Constructive tension is the deliberate act of challenging a prospect's status quo in a respectful, insight-driven way. It's not confrontational — it's educational. 'Most teams think they need X, but our data shows the real bottleneck is Y. Let me show you why.' This is how Challenger SEs create urgency without pressure."
            }
          ]
        }
      },
      {
        id: "challenger-scenario",
        type: "scenario",
        title: "Teach, Tailor, Take Control in Action",
        description: "Apply the Challenger framework to real AI demo situations. Choose the response that best demonstrates Challenger principles.",
        xp: 100,
        data: {
          scenarios: [
            {
              id: "s1",
              setup: "You're opening a demo for a VP of Supply Chain at a manufacturing company. They've asked to see your AI demand forecasting platform. Before you share your screen, what's the strongest Challenger opening?",
              options: [
                { id: "a", text: "\"Thanks for having us. Let me start by walking you through our platform overview, then we'll get into the demand forecasting capabilities.\"", quality: "poor", feedback: "This is a relationship-builder opening, not a Challenger opening. It starts with your product, not their world. No insight, no reframe, no urgency." },
                { id: "b", text: "\"Before I show you anything, I want to share something we're seeing across our manufacturing customers. Companies using traditional statistical forecasting are missing demand signals by an average of 23% — and that gap is getting wider as supply chains get more complex. The ones using AI are cutting that error rate to under 8%. I want to show you what that difference looks like in your world.\"", quality: "excellent", feedback: "This is a textbook Challenger opening. You led with a commercial insight (23% miss rate), created urgency (gap is widening), positioned AI as the solution, and promised a relevant demo. The prospect is now leaning forward." },
                { id: "c", text: "\"What's your current forecasting process? I want to make sure I show you the most relevant features.\"", quality: "good", feedback: "Discovery-first is solid, but at this stage (demo meeting) you should already know their process from earlier discovery. A Challenger uses that knowledge to open with insight, not more questions." },
                { id: "d", text: "\"Our AI forecasting platform is used by 200+ manufacturers. Let me show you why they chose us.\"", quality: "poor", feedback: "Social proof is weak as an opener. It's about you, not them. A Challenger opens with the prospect's world, not your customer list." },
              ]
            },
            {
              id: "s2",
              setup: "Halfway through your AI analytics demo, the Head of Data says: 'We already have a BI tool that does most of this.' You know their BI tool is 5 years old and can't handle real-time data. How do you respond?",
              options: [
                { id: "a", text: "\"You're right, there is some overlap. Let me show you the features that are unique to our platform.\"", quality: "poor", feedback: "Conceding the comparison without challenging it is a Relationship Builder response. You're letting the prospect anchor to their existing tool without showing them what they're missing." },
                { id: "b", text: "\"I appreciate that — and I want to be direct with you. The BI tools built 5 years ago were designed for batch data and historical reporting. What I'm about to show you operates on streaming data and generates predictions in milliseconds. They're solving different problems. Let me show you the gap.\"", quality: "excellent", feedback: "This is Challenger 'Taking Control.' You respectfully challenged their comparison, reframed the category, and pivoted to a demo that proves the difference. You didn't back down — you leaned in with evidence." },
                { id: "c", text: "\"What does your current BI tool struggle with? I want to make sure I'm showing you the right things.\"", quality: "good", feedback: "Good pivot to discovery, but at this point in the demo you should be showing, not asking. A Challenger would make the distinction visible through the demo itself." },
                { id: "d", text: "\"Our platform is actually very different from traditional BI. We're an AI-native solution.\"", quality: "poor", feedback: "Saying 'we're different' without proving it is a missed opportunity. Show the difference — don't just claim it." },
              ]
            }
          ]
        }
      },
      {
        id: "challenger-build",
        type: "build-demo",
        title: "Build Your Challenger Opening",
        description: "Construct a Challenger-style opening for an AI demo. Lead with insight, not product.",
        xp: 75,
        data: {
          scenario: "You're opening a demo for a Director of Customer Success at a SaaS company. They want to see your AI-powered churn prediction platform. In discovery, you learned they have 18% annual churn and their CS team manually reviews accounts monthly.",
          template: [
            { id: "insight", label: "The Commercial Insight", placeholder: "Share something they probably don't know about their industry or problem...", hint: "Lead with a data point, trend, or benchmark that reframes their situation. Make it specific to their industry.", example: "\"We analyzed 200 SaaS companies with similar ARR. The ones still using manual monthly reviews are catching churn signals an average of 47 days too late — after the customer has already mentally checked out.\"" },
            { id: "reframe", label: "The Reframe", placeholder: "Challenge their current assumption or approach...", hint: "Show them why their current approach is the problem, not just insufficient.", example: "\"Monthly reviews made sense when your customer base was 500 accounts. At 5,000 accounts, the signal-to-noise ratio makes manual review statistically unreliable. You're essentially sampling, not monitoring.\"" },
            { id: "bridge_to_demo", label: "The Bridge to Demo", placeholder: "Connect the insight to what you're about to show...", hint: "Promise a specific outcome they'll see in the demo — make it feel inevitable.", example: "\"Today I want to show you how your CS team can move from monthly reviews to real-time risk scoring — so you're having the retention conversation 6 weeks earlier, when it still matters.\"" },
          ]
        }
      }
    ]
  },
  {
    id: 10,
    slug: "meddpicc-mastery",
    title: "MEDDPICC Mastery",
    subtitle: "Qualify Every Deal Like a Pro",
    tagline: "Metrics · Economic Buyer · Decision Criteria · Decision Process · Paper Process · Implicate Pain · Champion · Competition",
    icon: "🎖️",
    accentColor: "purple",
    estimatedMinutes: 35,
    xpReward: 350,
    videoUrl: "/manus-storage/module10-explainer_9106a27a.mp4",
    keyConceptSummary: "MEDDPICC is a qualification framework for complex B2B sales with eight elements. Each letter represents critical deal intelligence: Metrics (quantified business impact), Economic Buyer (who controls the budget), Decision Criteria (how they'll choose), Decision Process (how they'll decide), Paper Process (the legal/procurement/security steps required to execute a contract), Implicate Pain (the cost of inaction), Champion (your internal advocate), and Competition (who else is in the deal). Note: a seven-element variant called MEDDICC omits Paper Process — MEDDPICC includes it.",
    aiContext: "AI deals are particularly prone to 'demo theater' — impressive demonstrations that never convert because the deal was never properly qualified. AI budgets are often unallocated, decision processes involve data governance committees, and champions need to be technically credible enough to defend the solution internally. MEDDPICC discipline is what separates AI SEs who win from those who just demo.",
    activities: [
      {
        id: "meddpicc-drag",
        type: "drag-drop",
        title: "Build the MEDDPICC Map",
        description: "A deal is in progress. Organize these discovery findings into the correct MEDDPICC categories to build a complete qualification picture.",
        xp: 80,
        data: {
          items: [
            { id: "a", text: "\"Reducing manual data processing time by 60% would save us approximately $1.2M annually in labor costs.\"", phase: "metrics" },
            { id: "b", text: "The CFO has final sign-off on any purchase over $500K. She hasn't been in any of our meetings yet.", phase: "economic-buyer" },
            { id: "c", text: "\"We need native integration with Salesforce and SOC 2 Type II compliance. Those are non-negotiables.\"", phase: "decision-criteria" },
            { id: "d", text: "\"We'll do a 30-day POC, then a technical review with our data team, then a business case review with the CFO. We want to be live by Q3.\"", phase: "decision-process" },
            { id: "e", text: "\"Every quarter we miss our SLA targets, we pay $200K in penalties. Last year we paid $800K in penalties.\"", phase: "implicate-pain" },
            { id: "f", text: "The VP of Operations has been our main contact. She's been sharing our materials internally and pushed to get the CFO meeting scheduled.", phase: "champion" },
            { id: "g", text: "\"We're also looking at Vendor X and doing an internal build evaluation with our engineering team.\"", phase: "competition" },
            { id: "h", text: "\"Before we can sign anything, it goes through Legal (2 weeks), InfoSec review (3 weeks), and Procurement (1 week). We also need a DPA signed before the POC can start.\"", phase: "paper-process" },
          ],
          correctOrder: ["a", "b", "c", "d", "h", "e", "f", "g"],
          phases: [
            { id: "metrics", label: "Metrics", color: "teal", description: "Quantified business impact" },
            { id: "economic-buyer", label: "Economic Buyer", color: "amber", description: "Budget decision-maker" },
            { id: "decision-criteria", label: "Decision Criteria", color: "emerald", description: "How they'll choose" },
            { id: "decision-process", label: "Decision Process", color: "purple", description: "How they'll decide" },
            { id: "implicate-pain", label: "Implicate Pain", color: "red", description: "Cost of inaction" },
            { id: "champion", label: "Champion", color: "teal", description: "Internal advocate" },
            { id: "competition", label: "Competition", color: "amber", description: "Who else is in the deal" },
            { id: "paper-process", label: "Paper Process", color: "purple", description: "Legal, procurement & security steps" },
          ]
        }
      },
      {
        id: "meddpicc-quiz",
        type: "quiz",
        title: "MEDDPICC Qualification Quiz",
        description: "Test your ability to apply MEDDPICC to real AI deal scenarios.",
        xp: 90,
        data: {
          questions: [
            {
              id: "q1",
              question: "You've had 4 great demos with a prospect. They love the product. But you've never met the Economic Buyer. What should you do?",
              options: [
                "Keep building momentum with the champion — they'll bring in the EB when ready",
                "Send a compelling proposal and hope the champion can sell it internally",
                "Explicitly ask your champion: 'Who has final budget authority for this decision? I want to make sure we're addressing their specific concerns.' Then work with the champion to get that meeting.",
                "Assume the champion has budget authority since they've been so engaged"
              ],
              correct: 2,
              explanation: "Never assume budget authority. In AI deals, the Economic Buyer is often a CFO, CTO, or board member who hasn't been in any meetings. Without their buy-in, even the most enthusiastic champion can't close the deal. Work with your champion to get the EB meeting — it's a qualification requirement, not a nice-to-have."
            },
            {
              id: "q2",
              question: "A prospect says 'we need to see ROI within 6 months.' This is most relevant to which MEDDPICC element?",
              options: [
                "Decision Criteria — it's a requirement they're evaluating vendors on",
                "Metrics — it defines the quantified business outcome they need",
                "Decision Process — it's part of their evaluation timeline",
                "Both Metrics and Decision Criteria"
              ],
              correct: 3,
              explanation: "This statement maps to both Metrics (they need a quantifiable ROI) and Decision Criteria (6-month ROI is a requirement for selection). In your demo, you should show how your AI solution delivers measurable ROI within that timeframe — and document it as a formal evaluation criterion."
            },
            {
              id: "q3",
              question: "What is the difference between a 'Coach' and a 'Champion' in MEDDPICC?",
              options: [
                "A Coach is senior; a Champion is junior",
                "A Coach gives you information; a Champion actively sells on your behalf internally and has credibility with the Economic Buyer",
                "They are the same thing — the terms are interchangeable",
                "A Champion is the technical evaluator; a Coach is the business sponsor"
              ],
              correct: 1,
              explanation: "This is a critical distinction. A Coach is helpful — they share org charts, tell you who to call, and give you intel. But a Champion goes further: they advocate for you in rooms you're not in, they have credibility with the Economic Buyer, and they have a personal stake in the outcome. In AI deals, your Champion should be able to defend your solution's technical approach to the data team."
            },
            {
              id: "q4",
              question: "You discover your prospect is also evaluating an internal build option. How does this affect your demo strategy?",
              options: [
                "It doesn't — just show the best demo you can",
                "Focus entirely on features and technical depth to outshine the internal option",
                "Reframe the demo around build vs. buy economics: total cost of ownership, time-to-value, and ongoing maintenance — not just features",
                "Reduce your price to make the build option less attractive"
              ],
              correct: 2,
              explanation: "Internal builds are a unique competitor. Feature comparisons don't win against 'we could build this.' What wins is the build vs. buy economic argument: 'Building this takes 18 months and $2M in engineering time. We're live in 90 days. Your engineers can spend those 18 months on your core product instead.' This is MEDDPICC Competition intelligence driving your demo strategy."
            },
            {
              id: "q5",
              question: "A prospect's champion says 'We love the product, but I'm not sure how long it takes to get a contract signed here.' Which MEDDPICC element is missing?",
              options: [
                "Decision Process — you don't know the approval steps",
                "Paper Process — you don't know the legal, procurement, and security steps required to execute a contract",
                "Economic Buyer — you haven't identified who signs",
                "Champion — your champion doesn't have enough authority"
              ],
              correct: 1,
              explanation: "Paper Process is the often-overlooked 8th element of MEDDPICC (making it distinct from MEDDICC). It covers everything that happens after a verbal 'yes': legal review, InfoSec/SOC 2 audits, procurement workflows, DPA/BAA agreements, and executive sign-off. In AI deals, Paper Process can take 6–12 weeks. Discovering it early prevents end-of-quarter surprises."
            }
          ]
        }
      },
      {
        id: "meddpicc-scenario",
        type: "scenario",
        title: "The Qualification Crisis",
        description: "A deal is at risk. Use MEDDPICC to diagnose the problem and choose the right response.",
        xp: 100,
        data: {
          scenarios: [
            {
              id: "s1",
              setup: "Your champion emails you: 'I have bad news. The CFO just put a freeze on all new software purchases over $100K. Our deal is $400K. I'm not sure what to do.' You've been working this deal for 3 months.",
              options: [
                { id: "a", text: "Accept the news and put the deal on hold until the freeze lifts.", quality: "poor", feedback: "Passive acceptance means the deal dies. Budget freezes are often not absolute — they have exceptions. You need to find the path around the freeze." },
                { id: "b", text: "Ask your champion: 'Is there a process for exceptions to the freeze? And can we reframe this as a cost-reduction investment — where the AI savings offset the cost within 90 days?' Then request a meeting with the CFO to present the ROI case directly.", quality: "excellent", feedback: "This is MEDDPICC in action. You're using Metrics (ROI within 90 days) to reframe the deal as cost-neutral, working with your Champion to navigate the Decision Process, and going directly to the Economic Buyer. Freezes have exceptions — your job is to be the exception." },
                { id: "c", text: "Offer a significant discount to get under the $100K threshold.", quality: "poor", feedback: "Discounting to $100K on a $400K deal destroys your margin and signals desperation. It also doesn't solve the underlying qualification gap — you never had the Economic Buyer engaged." },
                { id: "d", text: "Ask your champion to escalate internally and see if the freeze can be waived for your deal.", quality: "good", feedback: "Reasonable, but passive. You're putting all the work on your champion without giving them ammunition. Arm your champion with a compelling ROI case and offer to present it directly to the CFO." },
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 11,
    slug: "spin-selling",
    title: "SPIN Selling for SEs",
    subtitle: "Ask Better Questions, Win More Deals",
    tagline: "From SPIN Selling by Neil Rackham",
    icon: "🔄",
    accentColor: "emerald",
    estimatedMinutes: 30,
    xpReward: 300,
    videoUrl: "/manus-storage/module11-explainer_1bf7e733.mp4",
    keyConceptSummary: "Neil Rackham's SPIN Selling research, based on 35,000 sales calls, found that the best salespeople don't pitch — they ask four types of questions that lead the prospect to articulate their own need for your solution. SPIN stands for: Situation (understand the current state), Problem (surface the pain), Implication (expand the pain), and Need-Payoff (let the prospect articulate the value of solving it).",
    aiContext: "SPIN Selling is transformative for AI SE discovery because AI buyers often don't know what they need. They know they have a problem, but they haven't connected it to an AI solution. SPIN questions guide them from 'we have a data problem' to 'we need an AI solution that does X' — in their own words. When a prospect articulates the need themselves, they own the solution.",
    activities: [
      {
        id: "spin-match",
        type: "matching",
        title: "Identify the SPIN Question Type",
        description: "Match each discovery question to its SPIN category. Understanding which type of question to ask — and when — is the foundation of effective SE discovery.",
        xp: 70,
        data: {
          pairs: [
            { id: "s1", current: "\"How many data analysts do you currently have on your team, and what tools are they using today?\"", future: "SITUATION — Establishes the current state. Use early in discovery to understand the landscape before probing for problems." },
            { id: "s2", current: "\"Where does your current reporting process break down? What do your analysts spend the most time on that they wish they didn't have to?\"", future: "PROBLEM — Surfaces the pain. Ask after you understand the situation. Look for inefficiencies, frustrations, and manual work." },
            { id: "s3", current: "\"When your analysts are spending 3 days building that report manually, what decisions are being delayed? What's the downstream impact on the business?\"", future: "IMPLICATION — Expands the pain. Shows the prospect how their problem is bigger than they thought. This is the most powerful SPIN question type." },
            { id: "s4", current: "\"If your team could get that report in 30 minutes instead of 3 days, how would that change your ability to respond to market changes?\"", future: "NEED-PAYOFF — Lets the prospect articulate the value. They describe the benefit in their own words, which is far more powerful than you describing it for them." },
            { id: "s5", current: "\"You mentioned the manual process costs 3 days per report. How many reports does your team run per month, and what's the fully-loaded cost of that analyst time?\"", future: "IMPLICATION — Quantifies the pain. Turning a qualitative problem into a dollar figure makes the cost of inaction concrete and urgent." },
          ]
        }
      },
      {
        id: "spin-quiz",
        type: "quiz",
        title: "SPIN Selling Mastery Quiz",
        description: "Test your understanding of the SPIN framework applied to AI solution discovery.",
        xp: 80,
        data: {
          questions: [
            {
              id: "q1",
              question: "Why are Implication questions the most powerful in the SPIN framework?",
              options: [
                "They are the most difficult to answer, which shows the prospect you're thorough",
                "They expand the prospect's perception of their problem, making the cost of inaction feel larger than the cost of change",
                "They help you qualify the prospect's budget",
                "They are the questions that lead directly to a demo request"
              ],
              correct: 1,
              explanation: "Rackham's research found that Implication questions are the single biggest differentiator between top performers and average performers in complex sales. They work by making the prospect feel the full weight of their problem — not just the surface symptom, but the cascading business impact. When the pain feels large enough, change becomes inevitable."
            },
            {
              id: "q2",
              question: "A prospect says 'our data quality is inconsistent.' What's the best SPIN follow-up?",
              options: [
                "\"Let me show you how our AI handles data quality issues.\" (Move to demo)",
                "\"How long has this been a problem?\" (Situation)",
                "\"When your AI models are trained on inconsistent data, what happens to the predictions? How does that affect the decisions your team makes downstream?\" (Implication)",
                "\"What data quality tools are you currently using?\" (Situation)"
              ],
              correct: 2,
              explanation: "The prospect has identified a Problem. The SPIN sequence says: don't jump to the demo yet — ask Implication questions to expand the pain. 'Inconsistent data quality' sounds manageable. 'AI models trained on bad data producing wrong predictions that cause bad business decisions' sounds urgent. That's the Implication question's job."
            },
            {
              id: "q3",
              question: "What is the purpose of Need-Payoff questions?",
              options: [
                "To ask the prospect if they're ready to buy",
                "To get the prospect to articulate the value of solving their problem in their own words",
                "To present your product's ROI calculator",
                "To qualify the prospect's budget and timeline"
              ],
              correct: 1,
              explanation: "Need-Payoff questions are the SPIN framework's closing move. Instead of you saying 'our AI will save you $1M,' you ask 'if you could eliminate that manual process, what would that mean for your team?' When the prospect says 'we'd save $1M and my team could focus on strategic work' — they've sold themselves. Their words are infinitely more credible than yours."
            },
            {
              id: "q4",
              question: "You're in a discovery call and the prospect says 'we're happy with our current process.' What SPIN approach do you take?",
              options: [
                "Accept their answer and move on — they're not a good fit",
                "Immediately show them your product to change their mind",
                "Ask Situation questions to understand their current process in detail, then ask Problem questions to surface the inefficiencies they may not have articulated",
                "Ask them directly: 'Are you sure? Most companies have problems with this.'"
              ],
              correct: 2,
              explanation: "Prospects who say they're 'happy' often haven't quantified their pain. SPIN starts with Situation questions to understand the current state in detail. As you probe deeper, Problem questions surface the inefficiencies they've normalized. 'How long does that report take?' 'What happens when the data is wrong?' — these questions reveal pain the prospect didn't know they had."
            }
          ]
        }
      },
      {
        id: "spin-fill",
        type: "fill-blank",
        title: "Complete the SPIN Discovery Sequence",
        description: "Fill in the missing SPIN questions in this AI discovery conversation to complete the sequence.",
        xp: 100,
        data: {
          context: "You're in a discovery call with a VP of Finance at a mid-market company. They've mentioned they struggle with financial forecasting accuracy.",
          blanks: [
            {
              id: "b1",
              before: "SE: 'How does your team currently build your quarterly financial forecasts?'\nVP: 'We use Excel and pull data from 4 different systems manually. It takes about 2 weeks each quarter.'\nSE: [SITUATION FOLLOW-UP]",
              after: "\nVP: 'About 6 people, roughly 40% of their time during forecast cycles.'\nSE: 'And how accurate are those forecasts typically?'\nVP: 'Maybe 65-70% accurate. We're often surprised by actuals.'",
              answer: "How many people are involved in that process, and what percentage of their time does it consume?",
              hint: "Ask a Situation question that quantifies the current state — people, time, or resources involved.",
              explanation: "This Situation question quantifies the resource cost of the current process. '6 people at 40% of their time' becomes the baseline for your ROI calculation later."
            },
            {
              id: "b2",
              before: "SE: 'When your forecast is off by 30-35%, what happens?'\nVP: 'We have to replan mid-quarter. It's disruptive.'\nSE: [IMPLICATION QUESTION]",
              after: "\nVP: 'Honestly, yes. We've had to delay two product launches this year because we misread demand. And the board gets nervous when we miss guidance.'\nSE: 'So missed forecasts are affecting your product roadmap and your relationship with the board?'",
              answer: "Does that replanning ever cascade into bigger decisions — like delaying investments, headcount changes, or product launches?",
              hint: "Ask an Implication question that expands the pain beyond 'it's disruptive' to show the downstream business impact.",
              explanation: "This Implication question takes 'disruptive replanning' and expands it to 'delayed product launches and board credibility issues.' The pain just got much bigger."
            },
            {
              id: "b3",
              before: "SE: 'If your forecasting accuracy improved from 65% to 90%, and your team got those 2 weeks back each quarter — [NEED-PAYOFF QUESTION]'\nVP: 'We'd be able to make faster strategic decisions, our board would have more confidence in us, and honestly my team would stop dreading forecast season.'",
              after: "\nSE: 'That's exactly what I want to show you today.'",
              answer: "what would that change about how you run the business?",
              hint: "Complete the Need-Payoff question so the prospect articulates the value in their own words.",
              explanation: "The VP just described the value of your solution — in their words. 'Faster strategic decisions, board confidence, team morale.' These are the exact phrases you'll use in your Value Close."
            }
          ]
        }
      }
    ]
  }
];

// Combined export for convenience
export const ALL_MODULES = [...MODULES, ...BONUS_MODULES];
