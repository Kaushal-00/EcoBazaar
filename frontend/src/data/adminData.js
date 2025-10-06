// src/data/adminData.js
export const mockUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "customer",
    status: "active",
    joinDate: "2024-01-15",
    totalOrders: 12,
    totalSpent: 458.99,
    location: "New York, USA"
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@greentech.com",
    role: "seller",
    status: "active",
    joinDate: "2023-11-08",
    totalProducts: 25,
    totalRevenue: 15420.50,
    location: "California, USA"
  },
  {
    id: "3",
    name: "Carol Martinez",
    email: "carol@ecolife.com",
    role: "customer",
    status: "pending",
    joinDate: "2024-03-20",
    totalOrders: 3,
    totalSpent: 89.97,
    location: "Texas, USA"
  },
  {
    id: "4",
    name: "David Chen",
    email: "david@solarplus.com",
    role: "seller",
    status: "active",
    joinDate: "2023-09-12",
    totalProducts: 18,
    totalRevenue: 9850.25,
    location: "Washington, USA"
  },
  {
    id: "5",
    name: "Eva Rodriguez",
    email: "eva@example.com",
    role: "customer",
    status: "suspended",
    joinDate: "2024-02-05",
    totalOrders: 8,
    totalSpent: 234.56,
    location: "Florida, USA"
  }
];

export const mockReports = [
  {
    id: "1",
    type: "technical",
    title: "Payment Gateway Issue",
    description: "Users unable to complete checkout with credit cards",
    status: "open",
    priority: "high",
    reporter: "alice@example.com",
    reportDate: "2024-09-15",
    category: "payment"
  },
  {
    id: "2",
    type: "content",
    title: "Inappropriate Product Listing",
    description: "Product contains misleading eco-friendly claims",
    status: "investigating",
    priority: "medium",
    reporter: "bob@example.com",
    reportDate: "2024-09-14",
    category: "product"
  },
  {
    id: "3",
    type: "user",
    title: "Fake Seller Account",
    description: "Seller account appears to be using stolen identity",
    status: "resolved",
    priority: "high",
    reporter: "carol@example.com",
    reportDate: "2024-09-10",
    category: "fraud"
  },
  {
    id: "4",
    type: "technical",
    title: "Search Function Not Working",
    description: "Search returns no results for valid product names",
    status: "open",
    priority: "medium",
    reporter: "david@example.com",
    reportDate: "2024-09-13",
    category: "search"
  }
];

export const mockPlatformAnalytics = {
  totalUsers: 12547,
  totalSellers: 842,
  totalCustomers: 11705,
  totalRevenue: 1250000,
  totalOrders: 8934,
  avgOrderValue: 139.87,
  carbonSaved: 15600,
  monthlyGrowth: {
    users: 12.5,
    revenue: 18.2,
    orders: 15.8
  },
  userDistribution: [
    { type: "Customers", count: 11705, percentage: 93.3 },
    { type: "Sellers", count: 842, percentage: 6.7 }
  ],
  salesData: [
    { month: "Jan", customers: 8500, sellers: 650 },
    { month: "Feb", customers: 9200, sellers: 720 },
    { month: "Mar", customers: 9800, sellers: 780 },
    { month: "Apr", customers: 10500, sellers: 800 },
    { month: "May", customers: 11200, sellers: 820 },
    { month: "Jun", customers: 11705, sellers: 842 }
  ],
  categoryPerformance: [
    { category: "Electronics", revenue: 450000, percentage: 36 },
    { category: "Home & Garden", revenue: 312500, percentage: 25 },
    { category: "Personal Care", revenue: 225000, percentage: 18 },
    { category: "Clothing", revenue: 175000, percentage: 14 },
    { category: "Fitness", revenue: 87500, percentage: 7 }
  ]
};
