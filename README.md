# Data Engineering Take-Home Challenge

Welcome to the FastCommerce Data Engineering Challenge!

## Overview
You'll be building a data pipeline for an e-commerce company that processes orders, manages inventory, and generates analytics. This challenge should take 4-6 hours to complete.

## What's Provided
- **Sample Data**: Representative datasets in `Evaluation-Files/`
- **Challenge Instructions**: Detailed requirements in `challenge_instructions.md`
- **Data Generator**: Script to create additional test data if needed

## Your Task
Design and implement a data pipeline solution using your preferred technology stack. You have complete freedom in:
- Architecture design
- Technology choices (Python, Node.js, SQL databases, etc.)
- Folder structure and organization
- Implementation approach

## Getting Started

### 🍴 **Step 1: Fork This Repository**
1. Click the "Fork" button at the top of this GitHub repository
2. Clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/lifi-data-engineer-challenge.git
   cd lifi-data-engineer-challenge
   ```
3. Create a new branch for your solution:
   ```bash
   git checkout -b solution
   ```

### 📋 **Step 2: Complete the Challenge**
1. Read through `challenge_instructions.md` carefully
2. Explore the sample data to understand the structure
3. Design your solution architecture
4. Implement your pipeline
5. Document your approach and decisions

### 📤 **Step 3: Submit Your Solution**
1. Commit your work to your solution branch:
   ```bash
   git add .
   git commit -m "Complete data engineering challenge"
   git push origin solution
   ```
2. Create a pull request from your `solution` branch to your `main` branch
3. Share the link to your forked repository for evaluation

## Sample Data Overview

### 📊 **Sample Data for Development**
- **1,000 orders** across 30 days (scalable to 10K+ orders/day requirement)
- **50 products** with full catalog information  
- **50 inventory records** across multiple warehouses
- **Multiple channels**: web, mobile, API
- **Various order statuses**: confirmed, pending, cancelled

### 📁 **Files Provided**
```
Evaluation-Files/
├── orders_stream.jsonl          # 1,000 orders in JSONL format (~372KB)
├── inventory_updates.csv        # 50 inventory records (~4KB) 
├── product_catalog.json         # 50 products with metadata (~8KB)
├── broken_pipeline_code.py      # Bonus debugging challenge
├── data_generator_js.js         # Generate additional test data
└── package_json.json           # Node.js dependencies for generator
```

## Data Formats

### Orders (JSONL)
```json
{
  "order_id": "ORD-123456",
  "customer_id": "CUST-789", 
  "timestamp": "2024-01-15T10:30:00Z",
  "channel": "web",
  "items": [
    {
      "product_id": "PROD-001",
      "quantity": 2,
      "unit_price": 29.99
    }
  ],
  "shipping_address": {
    "country": "US",
    "state": "CA",
    "city": "San Francisco"  
  },
  "status": "confirmed"
}
```

### Inventory (CSV)
```csv
product_id,available_quantity,warehouse_location,last_updated
PROD-001,150,WH-SF,2024-01-15T09:00:00Z
PROD-002,75,WH-NY,2024-01-15T08:45:00Z
```

### Product Catalog (JSON)
```json
[
  {
    "product_id": "PROD-001",
    "category": "Electronics",
    "brand": "TechCorp", 
    "price": 299.99,
    "launch_date": "2023-06-15T00:00:00.000Z",
    "description": "High-performance wireless headphones"
  }
]
```

## Key Requirements Summary

### 🔧 **Part 1: Data Pipeline (40%)**
- Ingest streaming orders and batch inventory updates
- Enrich orders with product catalog data
- Handle schema evolution and data validation
- Ensure exactly-once processing

### 📊 **Part 2: Data Quality & Monitoring (25%)**
- Implement data completeness and business rule validation
- Build anomaly detection for unusual patterns
- Create pipeline health monitoring
- Set up alerting for data quality issues

### 📈 **Part 3: Analytics & Reporting (25%)**
- Daily revenue by channel and region
- Top products and customer insights  
- Inventory analysis and low-stock alerts
- Operational metrics and performance tracking

### 🚀 **Part 4: Production Readiness (10%)**
- Design for 10x scalability
- Address deployment and security concerns
- Plan for failure recovery and monitoring
- Document operational procedures

### 🎯 **Bonus: Code Review (+10%)**
- Debug and fix `broken_pipeline_code.py`
- Improve code quality and add error handling
- Document all issues found and fixes made

## Submission Guidelines

### 📋 **How to Submit**
1. **Fork this repository** and work on your `solution` branch
2. **Commit all your work** with clear commit messages
3. **Create a pull request** from `solution` to `main` in your fork
4. **Share your forked repository URL** for evaluation
5. **Ensure your solution runs** with clear setup instructions

### 📁 **What to Include**
1. **Working Code**: Complete pipeline implementation
2. **Documentation**: Architecture overview and setup instructions  
3. **Analysis**: Performance considerations and design decisions
4. **Tests**: Validation of your solution
5. **README**: Clear instructions on how to run your solution

### What We're Looking For
- **Technical Excellence**: Clean, scalable, maintainable code
- **Problem Solving**: Complete solution addressing all requirements
- **Communication**: Clear documentation and decision justification
- **Production Mindset**: Considerations for scale, monitoring, and reliability

## Time Management Tips
- **1 hour**: Requirements analysis and architecture design
- **2-3 hours**: Core pipeline implementation
- **1 hour**: Data quality and monitoring  
- **1 hour**: Analytics queries and documentation

## Questions?
If anything is unclear, make reasonable assumptions and document them. We're interested in seeing your thought process and engineering judgment.

**Good luck!** 🚀

---

*This challenge tests real-world data engineering skills including pipeline design, data quality, analytics, and production readiness.*
