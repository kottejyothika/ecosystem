import React, { useState, useMemo } from 'react';
import {
  Recycle,
  PlusCircle,
  Search,
  Filter,
  ArrowLeft,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  FileSpreadsheet,
  Send,
} from 'lucide-react';
import { CollectionPoint, WasteReport, WasteCategory } from '../types';

interface SmartCollectionProps {
  stations: CollectionPoint[];
  reports: WasteReport[];
  onBackToHome: () => void;
  onOpenReportModal: (stationId?: string) => void;
  onSubmitInlineReport: (newReport: Omit<WasteReport, 'id' | 'timestamp' | 'status' | 'ecoPointsAwarded'>) => void;
  onRequestBinClear: (stationId: string) => void;
}

export const SmartCollection: React.FC<SmartCollectionProps> = ({
  stations,
  reports,
  onBackToHome,
  onOpenReportModal,
  onSubmitInlineReport,
  onRequestBinClear,
}) => {
  const [stationSearch, setStationSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Near Capacity' | 'Recently Emptied'>('All');
  
  // Quick inline form state
  const [quickStudentName, setQuickStudentName] = useState('');
  const [quickRollNo, setQuickRollNo] = useState('');
  const [quickDepartment, setQuickDepartment] = useState('CSD (Computer Science & Design)');
  const [quickStationId, setQuickStationId] = useState(stations[0]?.id || '');
  const [quickWasteType, setQuickWasteType] = useState<WasteCategory>('PET Bottles');
  const [quickWeightKg, setQuickWeightKg] = useState('1.5');
  const [quickItemsCount, setQuickItemsCount] = useState('25');
  const [quickNotes, setQuickNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Table search & filter
  const [reportSearch, setReportSearch] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState('All');

  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      const matchesSearch =
        station.name.toLowerCase().includes(stationSearch.toLowerCase()) ||
        station.building.toLowerCase().includes(stationSearch.toLowerCase()) ||
        station.locationCode.toLowerCase().includes(stationSearch.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || station.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [stations, stationSearch, statusFilter]);

  const filteredReports = useMemo(() => {
    return reports.filter((rep) => {
      const matchesSearch =
        rep.studentName.toLowerCase().includes(reportSearch.toLowerCase()) ||
        rep.rollNo.toLowerCase().includes(reportSearch.toLowerCase()) ||
        rep.stationName.toLowerCase().includes(reportSearch.toLowerCase());

      const matchesType =
        reportTypeFilter === 'All' || rep.wasteType === reportTypeFilter;

      return matchesSearch && matchesType;
    });
  }, [reports, reportSearch, reportTypeFilter]);

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!quickStudentName.trim() || !quickRollNo.trim()) {
      setFormError('Please enter your Name and Student Roll Number.');
      return;
    }

    const weightNum = parseFloat(quickWeightKg);
    const itemsNum = parseInt(quickItemsCount, 10);

    if (isNaN(weightNum) || weightNum <= 0) {
      setFormError('Please enter a valid weight in kg (greater than 0).');
      return;
    }

    const selectedStation = stations.find((s) => s.id === quickStationId) || stations[0];

    onSubmitInlineReport({
      studentName: quickStudentName.trim(),
      rollNo: quickRollNo.trim().toUpperCase(),
      department: quickDepartment,
      stationId: selectedStation.id,
      stationName: selectedStation.name,
      wasteType: quickWasteType,
      quantityKg: Math.round(weightNum * 10) / 10,
      itemsCount: isNaN(itemsNum) || itemsNum < 1 ? 1 : itemsNum,
      notes: quickNotes.trim() || undefined,
    });

    // Reset weights
    setQuickNotes('');
    setQuickWeightKg('1.5');
    setQuickItemsCount('25');
  };

  return (
    <div id="smart-collection-page" className="py-8 bg-slate-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              id="back-to-home-btn"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline mb-2 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home Overview</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">♻️</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Smart Plastic Collection Hubs
              </h1>
            </div>
            <p className="text-sm text-slate-600">
              Campus segregation points, real-time bin capacity telemetry, and student waste drop
              recording.
            </p>
          </div>

          <button
            id="open-report-waste-modal-btn"
            onClick={() => onOpenReportModal()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-600/20 transition-all active:scale-98 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Record Waste Drop</span>
          </button>
        </div>

        {/* Search & Station Status Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="station-search-input"
              type="text"
              value={stationSearch}
              onChange={(e) => setStationSearch(e.target.value)}
              placeholder="Search station name, building, or code..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Status:
            </span>
            {(['All', 'Active', 'Near Capacity', 'Recently Emptied'] as const).map((status) => (
              <button
                key={status}
                id={`filter-status-${status.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === status
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Collection Stations Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Campus Collection Points ({filteredStations.length})
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Real-time ultrasonic capacity sensing
            </span>
          </div>

          {filteredStations.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-300">
              <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No collection stations found</p>
              <p className="text-xs text-slate-500 mt-1">
                Try adjusting your search query or status filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredStations.map((station) => {
                const isNearCapacity = station.capacityPercent >= 80;
                const isModerate = station.capacityPercent >= 50 && station.capacityPercent < 80;

                return (
                  <div
                    key={station.id}
                    id={`station-card-${station.id}`}
                    className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Code & Status */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-mono font-bold">
                          {station.locationCode}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            isNearCapacity
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : isModerate
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {isNearCapacity ? (
                            <AlertTriangle className="w-3 h-3" />
                          ) : (
                            <CheckCircle2 className="w-3 h-3" />
                          )}
                          {station.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {station.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {station.building}
                      </p>
                      <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg mt-2 border border-slate-100">
                        📍 {station.spotDescription}
                      </p>

                      {/* Capacity Meter */}
                      <div className="mt-4 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-600">Bin Fill Level:</span>
                          <span
                            className={
                              isNearCapacity
                                ? 'text-rose-600 font-bold'
                                : isModerate
                                ? 'text-amber-600'
                                : 'text-emerald-700 font-bold'
                            }
                          >
                            {station.capacityPercent}%
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isNearCapacity
                                ? 'bg-rose-500'
                                : isModerate
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${station.capacityPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Stats & Last Emptied */}
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                            Total Collected
                          </span>
                          <span className="font-bold text-slate-800 text-sm">
                            {station.totalCollectedKg} kg
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                            Last Cleaned
                          </span>
                          <span className="font-medium text-slate-700 flex items-center gap-1 text-[11px] mt-0.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {station.lastEmptied}
                          </span>
                        </div>
                      </div>

                      {/* Accepted Types Chips */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {station.acceptedTypes.map((type) => (
                          <span
                            key={type}
                            className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-medium rounded-md border border-emerald-100"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        id={`btn-drop-at-${station.id}`}
                        onClick={() => onOpenReportModal(station.id)}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Log Waste Here</span>
                      </button>

                      {isNearCapacity && (
                        <button
                          id={`btn-alert-sweep-${station.id}`}
                          onClick={() => onRequestBinClear(station.id)}
                          className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                          title="Send alert to campus housekeeping team"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Request Empty</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Inline Waste Logging Card */}
        <div
          id="inline-waste-log-card"
          className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden"
        >
          <div className="max-w-3xl space-y-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Quick Waste Recording Form
            </span>
            <h2 className="text-2xl font-bold tracking-tight">
              Report Segregated Waste & Claim EcoPoints
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Earn 20 EcoPoints for every kg of segregated plastic deposited at authorized campus
              collection points.
            </p>
          </div>

          <form onSubmit={handleInlineSubmit} className="space-y-4">
            {formError && (
              <div className="p-3 bg-rose-500/20 border border-rose-400/50 rounded-xl text-xs text-rose-200 font-medium">
                ⚠️ {formError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={quickStudentName}
                  onChange={(e) => setQuickStudentName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white/10 rounded-xl border border-white/20 text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Roll Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 23AITS-CSD-042"
                  value={quickRollNo}
                  onChange={(e) => setQuickRollNo(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white/10 rounded-xl border border-white/20 text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Department
                </label>
                <select
                  value={quickDepartment}
                  onChange={(e) => setQuickDepartment(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-800 rounded-xl border border-white/20 text-white focus:outline-hidden focus:border-emerald-400"
                >
                  <option value="CSD (Computer Science & Design)">CSD (Comp. Science & Design)</option>
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Station
                </label>
                <select
                  value={quickStationId}
                  onChange={(e) => setQuickStationId(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-800 rounded-xl border border-white/20 text-white focus:outline-hidden focus:border-emerald-400"
                >
                  {stations.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.locationCode})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Plastic Waste Type
                </label>
                <select
                  value={quickWasteType}
                  onChange={(e) => setQuickWasteType(e.target.value as WasteCategory)}
                  className="w-full px-3 py-2 text-sm bg-slate-800 rounded-xl border border-white/20 text-white focus:outline-hidden focus:border-emerald-400"
                >
                  <option value="PET Bottles">PET Bottles</option>
                  <option value="Food Containers">Food Containers</option>
                  <option value="Single-Use Cups">Single-Use Cups</option>
                  <option value="Polybags & Wrappers">Polybags & Wrappers</option>
                  <option value="Straws & Cutlery">Straws & Cutlery</option>
                  <option value="Hard Plastics">Hard Plastics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Weight (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="50"
                  required
                  value={quickWeightKg}
                  onChange={(e) => setQuickWeightKg(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white/10 rounded-xl border border-white/20 text-white focus:outline-hidden focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Est. Items Count
                </label>
                <input
                  type="number"
                  min="1"
                  value={quickItemsCount}
                  onChange={(e) => setQuickItemsCount(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white/10 rounded-xl border border-white/20 text-white focus:outline-hidden focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Optional Notes (e.g., Clean bottles, crushed caps)
              </label>
              <input
                type="text"
                placeholder="Rinsed and segregated PET bottles..."
                value={quickNotes}
                onChange={(e) => setQuickNotes(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white/10 rounded-xl border border-white/20 text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-400"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>
                  Expected points reward:{' '}
                  <strong>
                    {Math.max(10, Math.round((parseFloat(quickWeightKg) || 1) * 20))} pts
                  </strong>
                </span>
              </div>

              <button
                type="submit"
                id="submit-inline-waste-btn"
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit & Earn Points</span>
              </button>
            </div>
          </form>
        </div>

        {/* Collection Status & History Feed */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/90 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                <span>Recent Waste Collection Logs</span>
              </h3>
              <p className="text-xs text-slate-500">
                Verified logs submitted by participating students & volunteers
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={reportSearch}
                  onChange={(e) => setReportSearch(e.target.value)}
                  placeholder="Filter student or station..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <select
                value={reportTypeFilter}
                onChange={(e) => setReportTypeFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 text-slate-700 focus:outline-hidden"
              >
                <option value="All">All Waste Types</option>
                <option value="PET Bottles">PET Bottles</option>
                <option value="Food Containers">Food Containers</option>
                <option value="Single-Use Cups">Single-Use Cups</option>
                <option value="Polybags & Wrappers">Polybags & Wrappers</option>
                <option value="Hard Plastics">Hard Plastics</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Date / Time</th>
                  <th className="py-2.5 px-3">Student Contributor</th>
                  <th className="py-2.5 px-3">Station</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-right">Weight</th>
                  <th className="py-2.5 px-3 text-right">Items</th>
                  <th className="py-2.5 px-3 text-right">Points</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                      {report.timestamp}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      <div>{report.studentName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{report.rollNo}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-700">{report.stationName}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-medium border border-emerald-100">
                        {report.wasteType}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">
                      {report.quantityKg} kg
                    </td>
                    <td className="py-3 px-3 text-right text-slate-600">~{report.itemsCount}</td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-600">
                      +{report.ecoPointsAwarded}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          report.status === 'Sent for Recycling'
                            ? 'bg-teal-50 text-teal-700 border border-teal-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
