import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, Scale, MapPin, Trash2, CheckCircle2 } from 'lucide-react';
import { CollectionPoint, WasteCategory, WasteReport } from '../types';

interface ReportWasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  stations: CollectionPoint[];
  initialStationId?: string;
  onSubmitReport: (report: Omit<WasteReport, 'id' | 'timestamp' | 'status' | 'ecoPointsAwarded'>) => void;
}

export const ReportWasteModal: React.FC<ReportWasteModalProps> = ({
  isOpen,
  onClose,
  stations,
  initialStationId,
  onSubmitReport,
}) => {
  const [studentName, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState('CSD (Computer Science & Design)');
  const [stationId, setStationId] = useState(initialStationId || stations[0]?.id || '');
  const [wasteType, setWasteType] = useState<WasteCategory>('PET Bottles');
  const [quantityKg, setQuantityKg] = useState('2.0');
  const [itemsCount, setItemsCount] = useState('35');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialStationId) {
      setStationId(initialStationId);
    } else if (stations.length > 0 && !stationId) {
      setStationId(stations[0].id);
    }
  }, [initialStationId, stations]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!studentName.trim() || !rollNo.trim()) {
      setError('Please fill in your Name and College Roll Number.');
      return;
    }

    const weight = parseFloat(quantityKg);
    const count = parseInt(itemsCount, 10);

    if (isNaN(weight) || weight <= 0) {
      setError('Please enter a valid weight in kg (greater than 0).');
      return;
    }

    const targetStation = stations.find((s) => s.id === stationId) || stations[0];

    onSubmitReport({
      studentName: studentName.trim(),
      rollNo: rollNo.trim().toUpperCase(),
      department,
      stationId: targetStation.id,
      stationName: targetStation.name,
      wasteType,
      quantityKg: Math.round(weight * 10) / 10,
      itemsCount: isNaN(count) || count < 1 ? 1 : count,
      notes: notes.trim() || undefined,
    });

    onClose();
  };

  const estimatedPoints = Math.max(10, Math.round((parseFloat(quantityKg) || 1) * 20));

  return (
    <div
      id="report-waste-modal"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-emerald-100 relative">
        {/* Close Button */}
        <button
          id="close-report-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl font-bold">
            ♻️
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Campus Drop Verification
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Report Segregated Plastic Waste
            </h2>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Student Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Student Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Aarav Sharma"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Roll Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 23AITS-CSD-042"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Department / Branch</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500"
            >
              <option value="CSD (Computer Science & Design)">CSD (Comp. Science & Design)</option>
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Electronics & Communication">Electronics & Communication</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Information Technology">Information Technology</option>
            </select>
          </div>

          {/* Station & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Collection Point</label>
              <select
                value={stationId}
                onChange={(e) => setStationId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              >
                {stations.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.locationCode})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Waste Category</label>
              <select
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value as WasteCategory)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              >
                <option value="PET Bottles">PET Bottles</option>
                <option value="Food Containers">Food Containers</option>
                <option value="Single-Use Cups">Single-Use Cups</option>
                <option value="Polybags & Wrappers">Polybags & Wrappers</option>
                <option value="Straws & Cutlery">Straws & Cutlery</option>
                <option value="Hard Plastics">Hard Plastics</option>
              </select>
            </div>
          </div>

          {/* Quantity & Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Approximate Weight (kg) *
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="50"
                required
                value={quantityKg}
                onChange={(e) => setQuantityKg(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Estimated Items Count
              </label>
              <input
                type="number"
                min="1"
                value={itemsCount}
                onChange={(e) => setItemsCount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Notes / Condition (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Pre-rinsed beverage bottles without bottle caps"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
            />
          </div>

          {/* Estimated points reward box */}
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-emerald-900">
                EcoPoints to be Earned:
              </span>
            </div>
            <span className="text-base font-black text-emerald-700">
              +{estimatedPoints} pts
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-waste-report-btn"
              className="px-6 py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Record & Award Points</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
