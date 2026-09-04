import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Activity, Dna, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

export function PredictionForm() {
    const [formData, setFormData] = useState({
        Diagnosis_Age: '',
        Mutation_Count: '',
        Number_of_Samples_Per_Patient: '',
        TMB_nonsynonymous: '',
        Sex: 'Male'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const data = {
                Diagnosis_Age: Number(formData.Diagnosis_Age),
                Mutation_Count: Number(formData.Mutation_Count),
                Number_of_Samples_Per_Patient: Number(formData.Number_of_Samples_Per_Patient),
                TMB_nonsynonymous: Number(formData.TMB_nonsynonymous),
                Sex: formData.Sex
            };
            const res = await api.predict(data);
            setResult(res);
        } catch (err: any) {
            setError(err.message || 'Prediction failed. Missing validation or server error.');
        } finally {
            setLoading(false);
        }
    };

    const getRiskColor = (risk: string) => {
        const l = risk ? String(risk).toLowerCase() : '';
        if (l.includes('high')) return '#DC2626';
        if (l.includes('moderate') || l.includes('medium')) return '#F59E0B';
        return '#10B981'; // default low
    };

    const displayResult = result?.prediction || result?.risk || result?.result || (typeof result === 'string' ? result : JSON.stringify(result));
    const riskColor = result ? getRiskColor(String(displayResult)) : '#10B981';

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-lg"
            >
                <div className="flex items-center gap-3 mb-6">
                    <Brain className="w-8 h-8 text-secondary" />
                    <h2 className="text-xl font-bold text-foreground">AI Cancer Risk Prediction Model</h2>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-foreground mb-2">Diagnosis Age</label>
                            <input type="number" required value={formData.Diagnosis_Age} onChange={e => setFormData({ ...formData, Diagnosis_Age: e.target.value })} className="w-full px-4 py-2 border border-border rounded-xl bg-background" />
                        </div>
                        <div>
                            <label className="block text-sm text-foreground mb-2">Mutation Count</label>
                            <input type="number" required value={formData.Mutation_Count} onChange={e => setFormData({ ...formData, Mutation_Count: e.target.value })} className="w-full px-4 py-2 border border-border rounded-xl bg-background" />
                        </div>
                        <div>
                            <label className="block text-sm text-foreground mb-2">Samples Per Patient</label>
                            <input type="number" required value={formData.Number_of_Samples_Per_Patient} onChange={e => setFormData({ ...formData, Number_of_Samples_Per_Patient: e.target.value })} className="w-full px-4 py-2 border border-border rounded-xl bg-background" />
                        </div>
                        <div>
                            <label className="block text-sm text-foreground mb-2">TMB Nonsynonymous</label>
                            <input type="number" step="any" required value={formData.TMB_nonsynonymous} onChange={e => setFormData({ ...formData, TMB_nonsynonymous: e.target.value })} className="w-full px-4 py-2 border border-border rounded-xl bg-background" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm text-foreground mb-2">Sex</label>
                            <select value={formData.Sex} onChange={e => setFormData({ ...formData, Sex: e.target.value })} className="w-full px-4 py-2 border border-border rounded-xl bg-background">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-3 mt-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
                        {loading ? 'Analyzing Patient Data...' : 'Predict Risk'}
                    </button>
                </form>
            </motion.div>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-card rounded-2xl p-8 border shadow-xl"
                        style={{ borderColor: `${riskColor}50` }}
                    >
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ backgroundColor: `${riskColor}20` }}>
                                <Dna className="w-10 h-10" style={{ color: riskColor }} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Risk Prediction Result</h3>
                            <div className="inline-block px-6 py-2 rounded-full text-lg font-bold" style={{ backgroundColor: `${riskColor}20`, color: riskColor }}>
                                {String(displayResult)}
                            </div>
                            <p className="mt-4 text-muted-foreground text-sm">
                                Prediction successful. Verify clinical consistency before treatment decisions.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
