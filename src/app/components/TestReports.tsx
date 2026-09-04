import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { Upload, FileText, Download, Eye, Brain, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

export function TestReports() {
  const [reports, setReports] = useState([
    {
      id: 1,
      name: 'Complete Blood Count (CBC)',
      date: '2026-02-20',
      type: 'Blood Test',
      status: 'analyzed',
      aiSummary: 'All values within normal range. No concerning markers detected.',
      abnormalMarkers: []
    },
    {
      id: 2,
      name: 'Tumor Marker Test (CA-125)',
      date: '2026-02-15',
      type: 'Blood Test',
      status: 'analyzed',
      aiSummary: 'CA-125 levels slightly elevated. Recommend follow-up in 3 months.',
      abnormalMarkers: ['CA-125: 42 U/mL (Normal: <35)']
    },
    {
      id: 3,
      name: 'Chest X-Ray',
      date: '2026-02-10',
      type: 'Imaging',
      status: 'analyzed',
      aiSummary: 'No abnormalities detected. Lungs appear clear.',
      abnormalMarkers: []
    }
  ]);

  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setUploadError('File size exceeds 50MB limit.');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      const response = await api.uploadReport(file);
      const aiSummaryText = response.summary || response.message || response.result || 'Report analyzed successfully.';

      // Add the new report to the top of the list
      const newReport = {
        id: Date.now(),
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        type: file.type.includes('pdf') ? 'PDF Document' : 'Image',
        status: 'analyzed',
        aiSummary: aiSummaryText,
        abnormalMarkers: response.abnormalMarkers || []
      };
      // @ts-ignore
      setReports((prev) => [newReport, ...prev]);
      setUploadSuccess('Report uploaded and analyzed successfully!');
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload report.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Medical Reports</h2>
          <p className="text-muted-foreground">Upload and analyze your medical reports with AI</p>
        </div>
        <button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50">
          {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
          {isUploading ? 'Uploading...' : 'Upload Report'}
        </button>
      </div>

      {uploadError && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          {uploadError}
        </div>
      )}

      {uploadSuccess && (
        <div className="p-4 bg-[#10B981]/10 text-[#10B981] rounded-xl border border-[#10B981]/20 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          {uploadSuccess}
        </div>
      )}

      {/* Upload Zone */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="application/pdf,image/*"
        className="hidden"
      />
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`bg-card rounded-2xl border-2 border-dashed border-border p-12 text-center transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-secondary cursor-pointer'}`}
      >
        {isUploading ? (
          <Loader2 className="w-16 h-16 mx-auto mb-4 text-secondary animate-spin" />
        ) : (
          <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        )}
        <h3 className="font-semibold text-foreground mb-2">
          {isUploading ? 'Analyzing Report...' : 'Upload Medical Report'}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          PDF, JPG, PNG up to 50MB • AI analysis in under 30 seconds
        </p>
        <div className="flex gap-2 justify-center">
          <span className="px-3 py-1 bg-muted rounded-full text-xs text-foreground">Blood Tests</span>
          <span className="px-3 py-1 bg-muted rounded-full text-xs text-foreground">Imaging</span>
          <span className="px-3 py-1 bg-muted rounded-full text-xs text-foreground">Pathology</span>
        </div>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setSelectedReport(report.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{report.name}</h3>
                  <p className="text-sm text-muted-foreground">{report.date}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-muted rounded-full text-xs text-foreground">
                    {report.type}
                  </span>
                </div>
              </div>
              <div className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs flex items-center gap-1">
                <Brain className="w-3 h-3" />
                Analyzed
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl p-4 border border-secondary/20 mb-4">
              <div className="flex items-start gap-2">
                <Brain className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1">AI Summary</p>
                  <p className="text-xs text-muted-foreground">{report.aiSummary}</p>
                </div>
              </div>
            </div>

            {/* Abnormal Markers */}
            {report.abnormalMarkers.length > 0 && (
              <div className="bg-[#F59E0B]/10 rounded-xl p-3 border border-[#F59E0B]/20 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1">Abnormal Markers</p>
                    {report.abnormalMarkers.map((marker, idx) => (
                      <p key={idx} className="text-xs text-muted-foreground">{marker}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {report.abnormalMarkers.length === 0 && (
              <div className="bg-[#10B981]/10 rounded-xl p-3 border border-[#10B981]/20 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  <p className="text-xs text-[#10B981]">All markers normal</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-semibold text-foreground transition-all flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-sm font-semibold text-white transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <FileText className="w-8 h-8 text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">8</p>
          <p className="text-sm text-muted-foreground">Total Reports</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <Brain className="w-8 h-8 text-secondary mb-2" />
          <p className="text-2xl font-bold text-foreground">8</p>
          <p className="text-sm text-muted-foreground">AI Analyzed</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <CheckCircle className="w-8 h-8 text-[#10B981] mb-2" />
          <p className="text-2xl font-bold text-foreground">6</p>
          <p className="text-sm text-muted-foreground">Normal Results</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <AlertTriangle className="w-8 h-8 text-[#F59E0B] mb-2" />
          <p className="text-2xl font-bold text-foreground">2</p>
          <p className="text-sm text-muted-foreground">Need Follow-up</p>
        </div>
      </div>
    </div>
  );
}
