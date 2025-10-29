import Job from '../models/Job.js';

// ✅ Create Job
export async function createJob(req, res) {
  try {
    const { title, description, lastDate, company } = req.body;
    if (!title || !description || !lastDate || !company) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const job = await Job.create({
      title,
      description,
      lastDate: new Date(lastDate),
      company,
      postedBy: req.user?.id || null, // optional if user is logged in
    });

    res.status(201).json(job);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ message: 'Failed to create job' });
  }
}

// ✅ Get all jobs (visible to everyone)
export async function getJobs(req, res) {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); // ✅ removed user filter
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
}

// ✅ Update job
export async function updateJob(req, res) {
  try {
    const { id } = req.params;
    const update = { ...req.body };
    if (update.lastDate) update.lastDate = new Date(update.lastDate);

    const job = await Job.findOneAndUpdate(
      { _id: id, postedBy: req.user.id },
      update,
      { new: true }
    );
    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.json(job);
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ message: 'Failed to update job' });
  }
}

// ✅ Delete job
export async function deleteJob(req, res) {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findOneAndDelete({ _id: id, postedBy: req.user.id });
    if (!deletedJob)
      return res.status(404).json({ message: 'Job not found or not authorized' });

    res.json({ message: 'Job deleted successfully', deletedJob });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ message: 'Failed to delete job' });
  }
}
