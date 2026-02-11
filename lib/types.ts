// Types for System Design content data structure
// These types match the structure of sd_content.json

export interface Diagram {
    title: string;
    description: string;
    type: string;
}

export interface Example {
    language?: string;
    code?: string;
    concept?: string;
    explanation?: string;
    explanation_ar?: string;
}

export interface KeyPoint {
    title: string;
    title_ar?: string;
    description: string;
    description_ar?: string;
}

export interface InteractiveElement {
    type: string;
    description: string;
}

export interface Challenge {
    title: string;
    description: string;
}

export interface DemoSection {
    title: string;
    title_ar?: string;
    description: string;
    description_ar?: string;
    interactiveElements: InteractiveElement[];
    challenges?: Challenge[];
}

export interface Topic {
    title: string;
    title_ar?: string;
    description: string;
    description_ar?: string;
    analogy_ar?: string;
    keyPoints?: KeyPoint[];
    examples?: Example[];
    diagrams?: Diagram[];
    realWorldUsage?: string[];
    commonMistakes?: string[];
    commonMistakes_ar?: string[];
    performanceConsiderations?: string[];
}

export interface VisualExample {
    title: string;
    description: string;
    type: string;
}

export interface Module {
    id: string;
    title: string;
    title_ar?: string;
    slug: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    shortDescription: string;
    shortDescription_ar?: string;
    description: string;
    description_ar?: string;
    color: string;
    topics: Topic[];
    codeLanguages: string[];
    visualExamples: VisualExample[];
    keyFeatures: string[];
    demoSection: DemoSection;
}

export interface LearningResource {
    title: string;
    url: string;
    type: string;
}

export interface AuthorInfo {
    name: string;
    role: string;
    contact: string;
    whatsapp: string;
    bio: string;
}

export interface TechStack {
    framework: string;
    language: string;
    uiComponents: string;
    styling: string;
    visualization: string[];
}

export interface Meta {
    version: string;
    lastUpdated: string;
    mongoDBCompatible: boolean;
    schemaVersion: string;
}

export interface SDContent {
    siteTitle: string;
    siteTitle_ar: string;
    tagline: string;
    tagline_ar: string;
    guideTitle: string;
    projectGoal: string;
    modules: Module[];
    techStack: TechStack;
    keyFeatures: string[];
    learningResources: LearningResource[];
    authorInfo: AuthorInfo;
    meta: Meta;
}
