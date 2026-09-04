import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, FileText, Download, Eye, AlertCircle, CheckCircle, Brain } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  date: string;
  type: string;
  status: 'analyzed' | 'processing' | 'uploaded';
  aiSummary?: string;
  abnormalMarkers?: string[];
}

export function TestReports() {
  const [dragActive, setDragActive] = useState(false);

  const reports: Report[] = [
    {
      id: '1',
      name: 'Blood Test Report - January 2026',
      date: '2026-01-15',
      type: 'Blood Work',
      status: 'analyzed',
      aiSummary: 'All major markers within normal range. Slight elevation in inflammatory markers.',
      abnormalMarkers: ['CRP: 8.2 mg/L (Normal: <5)', 'WBC: 11,200 (Normal: 4,000-10,000)']
    },
    {
      id: '2',
      name: 'Genomic Sequencing Results',
      date: '2026-02-01',
      type: 'Genetic Test',
      status: 'analyzed',
      aiSummary: 'BRCA2 variant detected. Recommended genetic counseling and increased screening.',
      abnormalMarkers: ['BRCA2 c.5946delT variant', 'Increased breast cancer risk']
    },
    {
      id: '3',
      name: 'Chest X-Ray',
      date: '2026-02-20',
      type: 'Imaging',
      status: 'processing',
      aiSummary: 'Analysis in progress...'
    }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-secondary bg-secondary/5 scale-105' 
            : 'border-border hover:border-secondary/50 hover:bg-secondary/5'
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-4">
            <Upload className="w-12 h-12 text-secondary" />
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2">Upload Medical Reports</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Drag and drop your medical reports here, or click to browse. Supports PDF, JPG, PNG.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all duration-300">
            Browse Files
          </button>
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <Brain className="w-4 h-4 text-secondary" />
            <span>AI will automatically analyze your reports</span>
          </div>
        </div>
      </motion.div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${
                report.status === 'analyzed' ? 'bg-green-100' : 
                report.status === 'processing' ? 'bg-yellow-100' : 'bg-blue-100'
              }`}>
                <FileText className={`w-6 h-6 ${
                  report.status === 'analyzed' ? 'text-green-600' : 
                  report.status === 'processing' ? 'text-yellow-600' : 'text-blue-600'
                }`} />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-primary text-lg">{report.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{report.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === 'analyzed' && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Analyzed
                      </span>
                    )}
                    {report.status === 'processing' && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                        <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
                        Processing
                      </span>
                    )}
                  </div>
                </div>

                {report.status === 'analyzed' && (
                  <>
                    {/* AI Summary */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">AI Summary</span>
                      </div>
                      <p className="text-sm text-blue-800">{report.aiSummary}</p>
                    </div>

                    {/* Abnormal Markers */}
                    {report.abnormalMarkers && report.abnormalMarkers.length > 0 && (
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                          <span className="font-medium text-orange-900">Abnormal Markers Detected</span>
                        </div>
                        <ul className="space-y-1">
                          {report.abnormalMarkers.map((marker, idx) => (
                            <li key={idx} className="text-sm text-orange-800 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                              {marker}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                    <Eye className="w-4 h-4" />
                    View Report
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
