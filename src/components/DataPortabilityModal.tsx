import React, { useState, useRef } from 'react';
import { 
  Download, 
  Upload, 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  FileJson, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { StudentProfile, CampusOpportunity, CampusResource } from '../types';

interface DataPortabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  opportunities: CampusOpportunity[];
  resources: CampusResource[];
  onImportState: (importedStudent: StudentProfile, importedOpportunities?: CampusOpportunity[], importedResources?: CampusResource[]) => void;
}

export const DataPortabilityModal: React.FC<DataPortabilityModalProps> = ({
  isOpen,
  onClose,
  student,
  opportunities,
  resources,
  onImportState,
}) => {
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle Export
  const handleExport = () => {
    try {
      const exportPayload = {
        app: 'EduTwin AI — Personalized Campus Domain',
        version: '3.0.0',
        exportedAt: new Date().toISOString(),
        student,
        skillsCount: student.skills.length,
        questsCompleted: student.campusQuests.filter(q => q.status === 'completed').length,
        opportunities,
        resources,
        systemSettings: {
          theme: localStorage.getItem('edutwin_theme') || 'dark',
          domainCalibration: 'Optimal',
        },
      };

      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(exportPayload, null, 2)
      )}`;

      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute('download', 'edutwin-state-export.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setImportStatus({
        success: true,
        message: 'Successfully exported "edutwin-state-export.json" with all digital twin calibration data.',
      });
    } catch (e) {
      console.error('Export error:', e);
      setImportStatus({
        success: false,
        message: 'Failed to generate export file. Please try again.',
      });
    }
  };

  // Handle Import
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        // Validate basic structure
        const importedStudent = parsed.student || parsed;
        if (!importedStudent.fullName || !importedStudent.branch || !Array.isArray(importedStudent.skills)) {
          throw new Error('Invalid EduTwin state JSON format. Missing required student profile fields.');
        }

        const importedOpps = Array.isArray(parsed.opportunities) ? parsed.opportunities : undefined;
        const importedRes = Array.isArray(parsed.resources) ? parsed.resources : undefined;

        onImportState(importedStudent, importedOpps, importedRes);

        setImportStatus({
          success: true,
          message: `Successfully imported Digital Twin state for "${importedStudent.fullName}" (${importedStudent.branch}, ${importedStudent.year})!`,
        });
      } catch (err: any) {
        console.error('Import parse error:', err);
        setImportStatus({
          success: false,
          message: err.message || 'Failed to parse JSON file. Ensure it is a valid edutwin-state-export.json file.',
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#090916] border border-purple-500/60 shadow-[0_0_50px_rgba(168,85,247,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top neon energy strip */}
        <div className="h-1.5 bg-gradient-to-r from-purple-600 via-cyan-400 to-rose-500 shadow-[0_0_12px_#22d3ee]" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-purple-900/40 bg-[#070712] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-600/50 flex items-center justify-center text-cyan-300">
              <FileJson className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-white font-space">
                Data Portability Engine
              </h3>
              <p className="text-[11px] text-purple-300 font-mono-tech">
                Export & Import Digital Twin State
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-[#121224] hover:bg-purple-950/50 border border-purple-900/40 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Transfer your customized EduTwin digital twin across devices or backup your sorcerer profile, quests, attended experiences, and campus recommendations.
          </p>

          {/* Current State Summary Card */}
          <div className="p-3.5 rounded-xl bg-[#06060f] border border-purple-900/40 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400 font-mono-tech text-[10px] uppercase">
              <span>Active State Payload</span>
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3 h-3" />
                VERIFIED READY
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono-tech text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px]">Student Name:</span>
                <span className="font-bold text-white truncate block">{student.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Level & XP:</span>
                <span className="font-bold text-cyan-300">Level {student.level} ({student.xp} XP)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Skills Calibrated:</span>
                <span className="font-bold text-purple-300">{student.skills.length} Technical Skills</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Attended Experiences:</span>
                <span className="font-bold text-rose-300">{student.attendedExperiences.length} Logged Proofs</span>
              </div>
            </div>
          </div>

          {/* Export and Import Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Export Card */}
            <button
              type="button"
              onClick={handleExport}
              className="p-3.5 rounded-xl bg-gradient-to-br from-purple-950/60 to-indigo-950/50 hover:from-purple-900/70 hover:to-indigo-900/60 border border-purple-700/50 hover:border-cyan-400/50 transition cursor-pointer text-left group shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <Download className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-mono-tech font-bold text-cyan-300 bg-cyan-950/70 px-1.5 py-0.2 rounded border border-cyan-800/40">
                  .JSON
                </span>
              </div>
              <h4 className="text-xs font-bold text-white font-space">
                EXPORT EDUTWIN STATE
              </h4>
              <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                Downloads <span className="font-mono text-slate-300">edutwin-state-export.json</span> to your machine.
              </p>
            </button>

            {/* Import Card */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-full p-3.5 rounded-xl bg-gradient-to-br from-[#0c0c1e] to-purple-950/40 hover:from-purple-950/50 hover:to-purple-900/50 border border-purple-800/50 hover:border-purple-500/70 transition cursor-pointer text-left group shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <Upload className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono-tech font-bold text-purple-300 bg-purple-950/70 px-1.5 py-0.2 rounded border border-purple-700/40">
                    RESTORE
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white font-space">
                  IMPORT EDUTWIN STATE
                </h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                  Upload an existing JSON state file to instantly restore your twin.
                </p>
              </button>
            </div>
          </div>

          {/* Status Alert Banner */}
          {importStatus && (
            <div className={`p-3 rounded-xl border flex items-start gap-2 text-xs animate-in fade-in duration-150 ${
              importStatus.success
                ? 'bg-emerald-950/50 border-emerald-600/50 text-emerald-200'
                : 'bg-rose-950/50 border-rose-600/50 text-rose-200'
            }`}>
              {importStatus.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="min-w-0">
                <span className="font-bold block font-mono-tech text-[10px] uppercase">
                  {importStatus.success ? 'STATE OPERATION SUCCESS' : 'OPERATION FAILED'}
                </span>
                <span className="text-[11px] leading-relaxed">{importStatus.message}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-purple-900/40 bg-[#070712] flex items-center justify-between">
          <span className="text-[10px] font-mono-tech text-slate-400">
            Local Storage Synced Automatically
          </span>
          <button
            type="button"
            onClick={onClose}
            className="py-1.5 px-4 rounded-xl text-xs font-bold text-slate-200 bg-[#141426] hover:bg-[#1a1a32] border border-slate-700 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
