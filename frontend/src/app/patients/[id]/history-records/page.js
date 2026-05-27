'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Clock, Activity, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PatientHistoryRecords({ params }) {
  const { id } = params;
  const { user, token, API_BASE_URL } = useAuth();
  const router = useRouter();
  
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchPatientData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/patients/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setPatient(data);
      } catch (err) {
        console.error('Failed to fetch patient history', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id, token, API_BASE_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="pulse-loader">
          <div></div><div></div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen p-8 text-center">
        <h2 className="text-xl font-bold text-slate-700">Patient not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 sm:p-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-bold text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        <div className="glass p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 mb-8 relative overflow-hidden">
          {/* Background Accent */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">
              {patient.name}
            </h1>
            <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">
              Patient ID: {patient.id.split('-')[0]} • Age: {patient.age} • {patient.gender}
            </p>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-8">
            <Activity className="h-6 w-6 text-teal-600" />
            Clinical Timeline & Diagnostic Reports
          </h2>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            
            {patient.appointments?.length > 0 ? (
              patient.appointments.map((app, index) => (
                <div key={app.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Timeline Dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-teal-500 text-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                    <Clock className="w-4 h-4" />
                  </div>
                  
                  {/* Content Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm group-hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-teal-600 text-sm">
                        {new Date(app.appointmentDate).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded ${
                        app.status === 'COMPLETED' ? 'bg-teal-500/10 text-teal-600' : 'bg-slate-500/10 text-slate-500'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <h3 className="text-slate-800 dark:text-slate-100 font-extrabold text-base mb-1">
                      {app.reason || 'General Consultation'}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 relative z-10 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                <p className="text-slate-400 font-semibold text-sm">No historical appointments found on record.</p>
              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
