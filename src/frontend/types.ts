export interface TranscriptItem {
  id: string;
  time: string;
  speaker: 'Caller' | 'User';
  speakerLabel: string;
  text: string;
  technique?: string;
  techniqueIcon?: string;
  techniqueVi?: string;
  riskIncrement?: number;
}

export interface TimelineItem {
  time: string;
  event: string;
  technique?: string;
  risk?: number;
}

export interface DetectedTechnique {
  name: string;
  icon: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence?: number;
}

export interface ExtractedEvidence {
  type: string;
  detail: string;
  riskImpact: string;
  confidence?: number;
  reason?: string;
}

export interface ScamAnalysisResult {
  riskScore: number;
  riskLevel: 'SAFE' | 'SUSPICIOUS' | 'HIGH' | 'HIGH_RISK' | 'CRITICAL';
  scamType: string;
  summary: string;
  detectedTechniques: DetectedTechnique[];
  evidence: ExtractedEvidence[];
  timeline?: TimelineItem[];
  recommendations: string[];
  suggestedActions?: {
    action: string;
    urgent: boolean;
  }[];
}

export interface InvestigationReport {
  id: string;
  sessionId?: string;
  createdAt: string;
  title: string;
  victimName: string;
  reporterRole: string;
  callerNumber?: string;
  riskScore: number;
  riskLevel: 'SAFE' | 'SUSPICIOUS' | 'HIGH' | 'HIGH_RISK' | 'CRITICAL';
  scamType: string;
  summary: string;
  detectedTechniques: DetectedTechnique[];
  evidence: ExtractedEvidence[];
  timeline?: TimelineItem[];
  recommendations: string[];
  transcript?: TranscriptItem[];
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  age?: number;
  deviceType?: string;
  isGuardian: boolean;
  alertOnHighRisk: boolean;
  status: 'ONLINE' | 'PROTECTED' | 'IN_CALL' | 'ALERT';
  lastActivity: string;
}

export interface EmergencyAlert {
  id: string;
  timestamp: string;
  targetMember: string;
  guardianName: string;
  riskScore: number;
  scamType: string;
  status: 'DISPATCHED' | 'ACKNOWLEDGED' | 'RESOLVED';
}

export interface ScamKnowledgeItem {
  id: string;
  category: string;
  title: string;
  badge: string;
  description: string;
  attackerScripts: string[];
  redFlags: string[];
  defenseAdvice: string[];
  realCaseExample: string;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  callerQuote: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}
