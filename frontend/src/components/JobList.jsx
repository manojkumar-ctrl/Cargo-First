import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const { data } = await axios.get('/jobs');
      setJobs(data);
    } catch (_err) {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    await axios.delete(`/jobs/${id}`);
    setJobs((prev) => prev.filter((j) => j._id !== id));
  }

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500 text-lg animate-pulse">
        Loading jobs...
      </div>
    );

  if (!jobs.length)
    return (
      <div className="p-4 text-center text-gray-600 italic">
        No jobs posted yet.
      </div>
    );

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
      <AnimatePresence>
        {jobs.map((job) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800 tracking-tight mb-1">
                {job.title}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                {job.company} •{' '}
                <span className="font-medium text-gray-700">
                  Last date: {dayjs(job.lastDate).format('DD MMM YYYY')}
                </span>
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {job.description.length > 120
                  ? job.description.slice(0, 120) + '...'
                  : job.description}
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleDelete(job._id)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-red-600 border border-red-300 rounded-lg hover:bg-red-50 hover:scale-105 transition-transform"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
