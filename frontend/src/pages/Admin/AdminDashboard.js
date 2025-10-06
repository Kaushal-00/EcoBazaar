// src/pages/Admin/AdminDashboard.jsx
import React, { useState, useMemo } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer/Footer";
import { mockUsers, mockReports, mockPlatformAnalytics } from "../../data/adminData";
import {
  FaUsers,
  FaDollarSign,
  FaShoppingCart,
  FaLeaf,
  FaEye,
  FaCheck,
  FaTimes,
  FaClock,
  FaExclamationTriangle,
  FaBan,
  FaChartLine,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";

// Helper functions
const n = (v) => (Number.isFinite(+v) ? +v : 0);
const money = (v) => `$${n(v).toLocaleString()}`;

export default function AdminDashboard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [userFilter, setUserFilter] = useState("all");
  const [reportFilter, setReportFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    if (userFilter === "all") return mockUsers;
    return mockUsers.filter(user => user.status === userFilter || user.role === userFilter);
  }, [userFilter]);

  const filteredReports = useMemo(() => {
    if (reportFilter === "all") return mockReports;
    return mockReports.filter(report => report.status === reportFilter || report.priority === reportFilter);
  }, [reportFilter]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleUserAction = (userId, action) => {
    console.log(`${action} user ${userId}`);
    // Implement user actions
  };

  const handleReportAction = (reportId, action) => {
    console.log(`${action} report ${reportId}`);
    // Implement report actions
  };

  return (
    <>
      <AdminNavbar onScrollTo={handleScrollTo} />

      <main className="min-h-screen bg-slate-50 pt-20 pb-16 scroll-smooth">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-600 mt-1">
              Monitor platform performance, manage users, and handle reports.
            </p>
          </div>

          {/* Platform Overview */}
          <section id="admin-overview" className="scroll-mt-24 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
              <KPI 
                icon={<FaUsers />} 
                label="Total Users" 
                value={mockPlatformAnalytics.totalUsers.toLocaleString()} 
                change={`+${mockPlatformAnalytics.monthlyGrowth.users}%`}
                positive
              />
              <KPI 
                icon={<FaDollarSign />} 
                label="Platform Revenue" 
                value={money(mockPlatformAnalytics.totalRevenue)} 
                change={`+${mockPlatformAnalytics.monthlyGrowth.revenue}%`}
                positive
              />
              <KPI 
                icon={<FaShoppingCart />} 
                label="Total Orders" 
                value={mockPlatformAnalytics.totalOrders.toLocaleString()} 
                change={`+${mockPlatformAnalytics.monthlyGrowth.orders}%`}
                positive
              />
              <KPI 
                icon={<FaChartLine />} 
                label="Avg Order Value" 
                value={money(mockPlatformAnalytics.avgOrderValue)} 
              />
              <KPI 
                icon={<FaLeaf />} 
                label="Carbon Saved" 
                value={`${mockPlatformAnalytics.carbonSaved} kg`} 
              />
              <KPI 
                icon={<FaUsers />} 
                label="Active Sellers" 
                value={mockPlatformAnalytics.totalSellers.toLocaleString()} 
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* User Growth Chart */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">User Growth Trend</h3>
                <UserGrowthChart data={mockPlatformAnalytics.salesData} />
              </div>

              {/* User Distribution Pie Chart */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">User Distribution</h3>
                <PieChart data={mockPlatformAnalytics.userDistribution} />
              </div>

              {/* Category Performance */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Category Performance</h3>
                <CategoryChart data={mockPlatformAnalytics.categoryPerformance} />
              </div>

              {/* Revenue Breakdown */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue by Category</h3>
                <PieChart data={mockPlatformAnalytics.categoryPerformance.map(cat => ({
                  type: cat.category,
                  count: cat.revenue,
                  percentage: cat.percentage
                }))} />
              </div>
            </div>
          </section>

          {/* User Management */}
          <section id="admin-users" className="scroll-mt-24 mb-8">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">User Management</h2>
                <div className="flex items-center gap-3">
                  <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="px-3 py-1 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="all">All Users</option>
                    <option value="customer">Customers</option>
                    <option value="seller">Sellers</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  <span className="text-sm text-slate-500">
                    {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <Th>User</Th>
                      <Th>Role</Th>
                      <Th>Status</Th>
                      <Th>Join Date</Th>
                      <Th>Activity</Th>
                      <Th>Location</Th>
                      <Th className="text-right pr-6">Actions</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-slate-900">{user.name}</div>
                            <div className="text-xs text-slate-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                            user.role === 'seller' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                            user.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                            user.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-rose-100 text-rose-700'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-700">{user.joinDate}</td>
                        <td className="px-6 py-4 text-slate-700">
                          {user.role === 'customer' ? (
                            <div>
                              <div className="text-xs">Orders: {user.totalOrders}</div>
                              <div className="text-xs">Spent: {money(user.totalSpent)}</div>
                            </div>
                          ) : (
                            <div>
                              <div className="text-xs">Products: {user.totalProducts}</div>
                              <div className="text-xs">Revenue: {money(user.totalRevenue)}</div>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-700">{user.location}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="px-2.5 py-1.5 rounded-md border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            {user.status === 'pending' && (
                              <button
                                onClick={() => handleUserAction(user.id, 'approve')}
                                className="px-2.5 py-1.5 rounded-md border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                                title="Approve"
                              >
                                <FaCheck />
                              </button>
                            )}
                            {user.status !== 'suspended' && (
                              <button
                                onClick={() => handleUserAction(user.id, 'suspend')}
                                className="px-2.5 py-1.5 rounded-md border border-rose-300 text-rose-700 hover:bg-rose-50"
                                title="Suspend"
                              >
                                <FaBan />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Reports & Issues */}
          <section id="admin-reports" className="scroll-mt-24">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Reports & Issues</h2>
                <div className="flex items-center gap-3">
                  <select
                    value={reportFilter}
                    onChange={(e) => setReportFilter(e.target.value)}
                    className="px-3 py-1 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="all">All Reports</option>
                    <option value="open">Open</option>
                    <option value="investigating">Investigating</option>
                    <option value="resolved">Resolved</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                  </select>
                  <span className="text-sm text-slate-500">
                    {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <Th>Issue</Th>
                      <Th>Type</Th>
                      <Th>Priority</Th>
                      <Th>Status</Th>
                      <Th>Reporter</Th>
                      <Th>Date</Th>
                      <Th className="text-right pr-6">Actions</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-slate-900">{report.title}</div>
                            <div className="text-xs text-slate-500 mt-1">{report.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full text-xs font-semibold capitalize bg-slate-100 text-slate-700">
                            {report.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                            report.priority === 'high' ? 'bg-rose-100 text-rose-700' :
                            report.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {report.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                            report.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' :
                            report.status === 'investigating' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-700">{report.reporter}</td>
                        <td className="px-6 py-4 text-slate-700">{report.reportDate}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => setSelectedReport(report)}
                              className="px-2.5 py-1.5 rounded-md border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            {report.status !== 'resolved' && (
                              <button
                                onClick={() => handleReportAction(report.id, 'resolve')}
                                className="px-2.5 py-1.5 rounded-md border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                                title="Mark Resolved"
                              >
                                <FaCheck />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Modals */}
      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      {selectedReport && (
        <ReportDetailModal report={selectedReport} onClose={() => setSelectedReport(null)} />
      )}

      <Footer />
    </>
  );
}

/* UI Components */
function KPI({ icon, label, value, change, positive }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-sm">
          {icon}
        </div>
        {change && (
          <span className={`text-xs font-semibold flex items-center gap-1 ${
            positive ? 'text-emerald-600' : 'text-rose-600'
          }`}>
            {positive ? <FaArrowUp /> : <FaArrowDown />}
            {change}
          </span>
        )}
      </div>
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className="text-lg font-extrabold text-slate-900">{value}</div>
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${className}`}>
      {children}
    </th>
  );
}

// User Growth Chart
function UserGrowthChart({ data }) {
  const maxUsers = Math.max(...data.map(d => d.customers + d.sellers));
  
  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2 h-40">
        {data.map((item, idx) => {
          const totalHeight = ((item.customers + item.sellers) / maxUsers) * 100;
          const customerHeight = (item.customers / maxUsers) * 100;
          const sellerHeight = (item.sellers / maxUsers) * 100;
          
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col" style={{ height: `${totalHeight}%` }}>
                <div
                  className="w-full bg-emerald-500 rounded-t"
                  style={{ height: `${(customerHeight/totalHeight) * 100}%` }}
                  title={`Customers: ${item.customers}`}
                />
                <div
                  className="w-full bg-purple-500 rounded-b"
                  style={{ height: `${(sellerHeight/totalHeight) * 100}%` }}
                  title={`Sellers: ${item.sellers}`}
                />
              </div>
              <span className="text-xs text-slate-500">{item.month}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span>Customers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-purple-500" />
          <span>Sellers</span>
        </div>
      </div>
    </div>
  );
}

// Category Performance Chart
function CategoryChart({ data }) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  
  return (
    <div className="space-y-3">
      {data.map((category, idx) => {
        const percentage = (category.revenue / maxRevenue) * 100;
        const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-amber-500', 'bg-rose-500'];
        
        return (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-3 text-xs text-slate-600 font-mono">#{idx + 1}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-900">{category.category}</span>
                <span className="text-sm font-bold text-emerald-600">{money(category.revenue)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${colors[idx]} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Pie Chart Component
function PieChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-40 text-slate-500">No data available</div>;
  }

  const colors = ['#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];
  let currentAngle = 0;
  const radius = 60;
  const centerX = 80;
  const centerY = 80;
  
  return (
    <div className="flex items-center gap-6">
      <svg width="160" height="160" className="transform -rotate-90">
        {data.map((item, idx) => {
          const angle = (item.percentage / 100) * 360;
          const x1 = centerX + radius * Math.cos((currentAngle * Math.PI) / 180);
          const y1 = centerY + radius * Math.sin((currentAngle * Math.PI) / 180);
          const x2 = centerX + radius * Math.cos(((currentAngle + angle) * Math.PI) / 180);
          const y2 = centerY + radius * Math.sin(((currentAngle + angle) * Math.PI) / 180);
          
          const largeArc = angle > 180 ? 1 : 0;
          const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
          
          const color = colors[idx % colors.length];
          currentAngle += angle;
          
          return (
            <path
              key={idx}
              d={path}
              fill={color}
              className="hover:opacity-80 transition-opacity cursor-pointer"
              title={`${item.type || item.category}: ${item.percentage.toFixed(1)}%`}
            />
          );
        })}
      </svg>
      
      <div className="space-y-2">
        {data.map((item, idx) => {
          const color = colors[idx % colors.length];
          return (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
              <div className="text-sm">
                <div className="font-medium text-slate-900">{item.type || item.category}</div>
                <div className="text-xs text-slate-500">
                  {item.percentage.toFixed(1)}% • {typeof item.count === 'number' ? 
                    (item.count > 1000 ? money(item.count) : item.count.toLocaleString()) : 
                    money(item.count)
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// User Detail Modal
function UserDetailModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">User Details</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg transition">
            <FaTimes className="text-slate-500" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-xl text-slate-900 mb-2">{user.name}</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Email:</span> {user.email}</div>
                <div><span className="font-medium">Role:</span> <span className="capitalize">{user.role}</span></div>
                <div><span className="font-medium">Status:</span> <span className="capitalize">{user.status}</span></div>
                <div><span className="font-medium">Join Date:</span> {user.joinDate}</div>
                <div><span className="font-medium">Location:</span> {user.location}</div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-slate-900 mb-3">Activity Summary</h5>
              <div className="space-y-2 text-sm">
                {user.role === 'customer' ? (
                  <>
                    <div className="flex justify-between">
                      <span>Total Orders:</span>
                      <span className="font-medium">{user.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Spent:</span>
                      <span className="font-medium">{money(user.totalSpent)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Order Value:</span>
                      <span className="font-medium">{money(user.totalSpent / user.totalOrders)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span>Total Products:</span>
                      <span className="font-medium">{user.totalProducts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Revenue:</span>
                      <span className="font-medium">{money(user.totalRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Product Value:</span>
                      <span className="font-medium">{money(user.totalRevenue / user.totalProducts)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Report Detail Modal
function ReportDetailModal({ report, onClose }) {
  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Report Details</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg transition">
            <FaTimes className="text-slate-500" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-xl text-slate-900 mb-2">{report.title}</h4>
              <p className="text-slate-600">{report.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Type:</span>
                <span className="ml-2 capitalize">{report.type}</span>
              </div>
              <div>
                <span className="font-medium">Priority:</span>
                <span className={`ml-2 capitalize ${
                  report.priority === 'high' ? 'text-rose-600' :
                  report.priority === 'medium' ? 'text-amber-600' : 'text-slate-600'
                }`}>
                  {report.priority}
                </span>
              </div>
              <div>
                <span className="font-medium">Status:</span>
                <span className={`ml-2 capitalize ${
                  report.status === 'resolved' ? 'text-emerald-600' :
                  report.status === 'investigating' ? 'text-blue-600' : 'text-amber-600'
                }`}>
                  {report.status}
                </span>
              </div>
              <div>
                <span className="font-medium">Category:</span>
                <span className="ml-2 capitalize">{report.category}</span>
              </div>
              <div>
                <span className="font-medium">Reporter:</span>
                <span className="ml-2">{report.reporter}</span>
              </div>
              <div>
                <span className="font-medium">Report Date:</span>
                <span className="ml-2">{report.reportDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
