import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const monthlyApplications = [
  { month: 'Jan', apps: 20 },
  { month: 'Feb', apps: 35 },
  { month: 'Mar', apps: 28 },
  { month: 'Apr', apps: 45 },
  { month: 'May', apps: 38 },
  { month: 'Jun', apps: 50 },
];

const satisfaction = [
  { name: 'Satisfied', value: 70 },
  { name: 'Neutral', value: 20 },
  { name: 'Dissatisfied', value: 10 },
];

const COLORS = ['#10b981', '#60a5fa', '#ef4444'];

export default function CustomerAnalysis() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="bg-white border rounded p-4">
        <h3 className="font-semibold mb-3">Job Applications per Month</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyApplications}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="apps" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white border rounded p-4">
        <h3 className="font-semibold mb-3">Customer Satisfaction</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={satisfaction} dataKey="value" nameKey="name" outerRadius={90} label>
                {satisfaction.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


