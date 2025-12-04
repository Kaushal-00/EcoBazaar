# **EcoBazaarX – Carbon Footprint Aware Shopping Assistant**

### **Version 1.0 • Completed as part of Infosys Springboard Internship 6.0 (Aug 6, 2025 – Oct 10, 2025)**

---

## 🌿 **Overview**

- **EcoBazaarX** is an eco-conscious shopping platform designed to make **carbon-aware purchasing** simple, transparent, and impactful.
Developed using **React + Bootstrap (Frontend)** and **Spring Boot + Maven (Backend)**, the platform integrates sustainability metrics directly into the shopping experience.

- This project was built during the **Infosys Springboard Internship 6.0**, following enterprise-grade standards with a scalable, modular, and deployment-ready architecture.

---

## **Project Structure**

- Below is the professional and scalable folder structure recommended for your repository:

```
EcoBazaar/
│
├── frontend/                     # React Frontend
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── assets/               # Images, icons, SVG charts
│   │   ├── components/           # Reusable components
│   │   │   ├── charts/           # Custom CSS/SVG charts
│   │   │   ├── cards/            # Reusable UI cards
│   │   │   └── layout/           # Navbar, Sidebar, Footer
│   │   ├── pages/                # Role-based pages
│   │   │   ├── customer/
│   │   │   │   ├── Dashboard.js
│   │   │   │   ├── Cart.js
│   │   │   │   └── Profile.js
│   │   │   ├── seller/
│   │   │   │   ├── Dashboard.js
│   │   │   │   └── Profile.js
│   │   │   └── admin/
│   │   │       ├── Dashboard.js
│   │   │       └── Profile.js
│   │   ├── context/              # Context API for auth, cart, role mgmt
│   │   ├── hooks/                # Custom hooks
│   │   ├── services/             # API services (future backend integration)
│   │   ├── utils/                # Defensive programming & helpers
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
├── backend/                      # Spring Boot Backend (future-ready)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/ecobazaar/
│   │   │   │       ├── controller/      # API controllers
│   │   │   │       ├── model/           # Entity classes
│   │   │   │       ├── repository/      # JPA repositories
│   │   │   │       ├── service/         # Business logic
│   │   │   │       └── EcoBazaarApp.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── data.sql (optional)
│   │   └── test/
│   ├── pom.xml
│   └── README.md
│
├── docs/                         # Reports, PPT, diagrams
│   ├── architecture/
│   ├── screenshots/
│   └── report/
│
├── .gitignore
└── README.md                     # Main project documentation
```

---

## **Abstract**

- EcoBazaarX introduces an environmentally responsible e-commerce system that:
  - Displays **carbon footprints** for every product.
  - Uses role-specific dashboards (Customer, Seller, Admin).
  - Offers product lifecycle management, analytics, and sustainability insights.
  - Utilizes lightweight **CSS/SVG visualizations**.
  - Ensures secure, responsive, accessible user experiences.

- This platform promotes sustainability and transparency while enhancing e-commerce decision-making.

---

## **Problem Statement**

- Traditional e-commerce systems lack:

  - Visibility into the **environmental impact** of products
  - Tools for sellers to showcase **eco-friendly product attributes**
  - Proper sustainability reporting for administrators
  - Carbon-aware cart or checkout systems

- This results in uninformed decisions, missed branding opportunities, and weak sustainability tracking.

---

## **Proposed Solution**

- EcoBazaarX solves these gaps by:

  - Displaying carbon footprints for each product
  - Adding eco-badges & category-based sustainability filters
  - Providing real-time dashboards for all roles
  - Implementing secure role-based access control
  - Delivering optimized charts without heavy dependencies
  - Applying defensive programming & scalable design

---

## **What Makes EcoBazaarX Unique**

- Full integration of sustainability into the shopping workflow
- Real-time dashboards for Customer, Seller, and Admin
- Lightweight custom visualizations (CSS/SVG)
- Carbon-aware cart system
- Production-ready architecture
- Cloud deployment-friendly setup

---

## **Modules & Features**

### Customer Module

* Dashboard with carbon visibility
* Product browsing with sustainability filters
* Carbon-aware cart & checkout
* Profile, orders, notifications

### Seller Module

* KPI dashboard (revenue, units sold, conversions)
* CRUD product operations
* Inventory tracking
* Store branding & insights

### Admin Module

* Global platform KPIs
* Carbon analytics
* User management (approvals, suspensions)
* Issue reporting & workflow management

---

## **Tech Stack**

### **Frontend**

* React.js (Hooks, Context API)
* Bootstrap + Tailwind CSS
* Custom SVG/CSS-based charts

### **Backend**

* Spring Boot
* Maven 3.5.5
* MySQL database

---

## **Executive Summary**

EcoBazaarX provides:

* Multi-role support (customer, seller, admin)
* Sustainability-focused shopping features
* Scalable architecture
* Secure routing and user management
* Clean UI with optimized performance

The system is **fully deployment-ready** and suitable for enterprise integration.

---

## **System Architecture**

### **Routing Overview**

```
Public Routes:
  /, /login, /register

Customer:
  /customer/dashboard
  /customer/cart
  /customer/profile

Seller:
  /seller/dashboard
  /seller/profile

Admin:
  /admin/dashboard
  /admin/profile
```

---

### **Data Models**

**Product:**
`id, name, price, reviews, image, carbonFootprint, stock, revenue, conversionRate`

**User:**
`id, name, email, role, status, joinDate, orders/products, revenue/spent`

---

## **Feature Implementation**

### Customer

* Eco-footprint display
* Carbon-aware cart
* Checkout flow
* History & notifications

### Seller

* KPI analytics
* Product CRUD
* Inventory & insights

### Admin

* Global KPIs
* User management
* Issue reporting system

---

## **Quality Assurance**

* Component rendering tests
* UX validation
* Performance optimization
* Navigation stability checks

---

## **Security Implementation**

* Role-based access control
* Input sanitization
* Error boundaries
* Defensive programming patterns
* Audit trails & logs

---

## **Results & Impact**

* Customers → transparency & better choices
* Sellers → performance analytics & branding
* Admins → complete platform oversight
* Businesses → sustainability-focused innovation

---

## **Challenges & Solutions**

| **Challenge**           | **Solution**                 |
| ----------------------- | ---------------------------- |
| Runtime errors          | Safe coercion helpers        |
| Modal issues            | Responsive dialogs           |
| Chart dependency issues | Custom CSS/SVG charts        |
| Design consistency      | Tailwind-based design system |

---

## **Future Enhancements**

* Full backend API integration
* Real payment gateway
* Cloud deployment (AWS/GCP)
* Mobile app (React Native / Flutter)
* Advanced analytics dashboard

---

## **How to Run the Project**

### **Frontend Setup**

```bash
cd frontend
npm install
npm start
```

### **Backend Setup**

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**Frontend:** [http://localhost:3000](http://localhost:3000)
**Backend:** [http://localhost:8080](http://localhost:8080)

---

## **Deployment Readiness**

* Component-based architecture
* Error handling and fallback UI
* Scalable folder structure
* Future-proof API layer

---

## **Conclusion**

- EcoBazaarX stands as:

  - A technically strong and scalable system
  - An eco-conscious and future-ready platform
  - An industry-standard internship project
  - A foundation for next-generation sustainable commerce

- The project excels in usability, performance, security, and environmental impact — demonstrating end-to-end excellence in modern web development.

---
