# FastCommerce Data Pipeline Challenge

## Scenario
FastCommerce is a growing e-commerce platform processing thousands of orders daily across web, mobile, and API channels. They need a robust data pipeline that can handle real-time order processing, inventory management, and business analytics.

## Business Requirements

### Current Pain Points
- Order data arrives from multiple channels with slight schema variations
- Inventory updates come in batches every hour but need near real-time processing
- Business teams need daily reports but often wait hours for data
- No visibility into data quality issues until reports look wrong
- System cannot handle traffic spikes during sales events

### Success Metrics
- Process 10,000+ orders per day reliably
- Generate business reports within 15 minutes of day end
- Detect and alert on data quality issues automatically
- Support 10x growth in data volume

## Data Sources

You'll work with three main data sources provided in `sample_data/`:

### 1. Order Stream (`orders_stream.jsonl`)
Real-time order events in JSON Lines format:
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

### 2. Inventory Updates (`inventory_updates.csv`)
Hourly batch updates of product availability:
```csv
product_id,available_quantity,warehouse_location,last_updated
PROD-001,150,WH-SF,2024-01-15T09:00:00Z
PROD-002,75,WH-NY,2024-01-15T08:45:00Z
```

### 3. Product Catalog (`product_catalog.json`)
Static product information including categories, pricing, and metadata.

## Technical Requirements

### Part 1: Data Pipeline (40%)
Build a pipeline that:
- Ingests streaming order data (simulate real-time processing)
- Processes batch inventory updates  
- Enriches orders with product catalog data
- Handles schema evolution and data validation
- Stores both raw and processed data

**Key Considerations:**
- How do you ensure exactly-once processing?
- What happens when data arrives late or out of order?
- How do you handle schema changes gracefully?

### Part 2: Data Quality & Monitoring (25%)
Implement quality checks and monitoring for:
- Data completeness (missing required fields)
- Business rule validation (order totals, valid product IDs)
- Anomaly detection (unusual patterns, spikes)
- Pipeline health monitoring (throughput, latency, errors)

**Key Considerations:**
- What constitutes "bad" data and how do you handle it?
- How do you monitor pipeline performance?
- What alerts would you set up for production?

### Part 3: Analytics & Reporting (25%)
Create queries/reports that answer:
- Daily revenue by channel and region
- Top products by sales volume and revenue
- Inventory turnover rates and low-stock alerts  
- Customer purchase patterns
- Operational metrics (order processing times, error rates)

**Key Considerations:**
- How do you optimize queries for large datasets?
- What aggregations do you pre-compute vs calculate on demand?
- How do you handle historical vs real-time analytics?

### Part 4: Production Readiness (10%)
Address scalability and operational concerns:
- How does your solution scale with 10x data volume?
- What's your deployment and testing strategy?
- How do you handle failures and recovery?
- What security considerations are important?

## Deliverables

### 1. Working Code
- Complete pipeline implementation
- Clear setup and run instructions
- Well-documented and organized code

### 2. Documentation  
- Architecture overview with diagrams
- Design decisions and trade-offs
- Assumptions made and why
- How to run tests and validate the solution

### 3. Analysis
- Sample output from your analytics queries
- Discussion of performance optimizations
- Production deployment considerations
- Areas for future improvement

## Technology Guidelines

### Encouraged Technologies
- **Languages**: Python, JavaScript/Node.js, SQL
- **Databases**: PostgreSQL, MySQL, SQLite (for simplicity)
- **Processing**: Pandas, Apache Spark (if relevant)
- **Storage**: Local files, S3-compatible storage
- **Containerization**: Docker (optional but appreciated)

### What We're NOT Looking For
- Complex distributed systems unless justified
- Over-engineered solutions for the scale provided
- Proprietary cloud services (keep it runnable locally)

## Evaluation Criteria

### Technical Implementation (60%)
- **Architecture**: Is the design scalable and maintainable?
- **Code Quality**: Clean, readable, well-structured code
- **Data Engineering Best Practices**: Proper error handling, idempotency, monitoring

### Problem Solving (25%)
- **Completeness**: Does the solution address all requirements?
- **Quality**: Are data quality issues handled appropriately?
- **Performance**: Are there optimizations for scale?

### Communication (15%)
- **Documentation**: Can someone else understand and run your solution?
- **Decision Making**: Are architectural choices well-justified?
- **Trade-offs**: Clear discussion of what was prioritized and why

## Time Management Tips
- **1 hour**: Requirements analysis and architecture design
- **2-3 hours**: Core pipeline implementation  
- **1 hour**: Data quality and monitoring
- **1 hour**: Analytics queries and documentation

## Part 5: Code Review & Debugging (Bonus - 10 points)

### Debugging Challenge
The previous data engineer left behind this Python pipeline code that's supposed to process orders and calculate daily metrics. However, it has several bugs and issues. As part of your submission, please:

1. **Identify and fix all bugs** in the code below
2. **Improve the code quality** and add proper error handling
3. **Document what was wrong** and explain your fixes

```python
import pandas as pd
import json
from datetime import datetime

class OrderProcessor:
    def __init__(self, orders_file):
        self.orders_file = orders_file
        self.processed_orders = []
        
    def load_orders(self):
        # Load orders from JSONL file
        orders = []
        with open(self.orders_file, 'r') as f:
            for line in f:
                order = json.loads(line)
                orders.append(order)
        return orders
    
    def calculate_order_total(self, items):
        # Calculate total for an order
        total = 0
        for item in items:
            total += item['quantity'] * item['unit_price']
        return total
    
    def process_orders(self):
        orders = self.load_orders()
        
        for order in orders:
            # Calculate order total
            order_total = self.calculate_order_total(order['items'])
            
            # Add processed timestamp
            order['processed_at'] = datetime.now()
            order['order_total'] = order_total
            
            # Only process confirmed orders
            if order['status'] == 'confirmed':
                self.processed_orders.append(order)
    
    def generate_daily_report(self):
        # Convert to DataFrame for analysis
        df = pd.DataFrame(self.processed_orders)
        
        # Parse timestamp
        df['order_date'] = pd.to_datetime(df['timestamp']).dt.date
        
        # Group by date and channel
        daily_stats = df.groupby(['order_date', 'channel']).agg({
            'order_total': ['sum', 'count', 'mean'],
            'customer_id': 'nunique'
        })
        
        return daily_stats
    
    def get_top_customers(self, limit=10):
        df = pd.DataFrame(self.processed_orders)
        
        # Calculate customer totals
        customer_totals = df.groupby('customer_id')['order_total'].sum()
        
        # Return top customers
        return customer_totals.sort_values(ascending=False).head(limit)
    
    def save_results(self, output_file):
        # Save processed orders to JSON
        with open(output_file, 'w') as f:
            json.dump(self.processed_orders, f)

# Usage
if __name__ == "__main__":
    processor = OrderProcessor('orders_stream.jsonl')
    processor.process_orders()
    
    # Generate reports
    daily_report = processor.generate_daily_report()
    print(daily_report)
    
    top_customers = processor.get_top_customers()
    print(top_customers)
    
    # Save results
    processor.save_results('processed_orders.json')
```

**Instructions:**
- Create a `DEBUGGING.md` file documenting all issues found
- Provide the corrected version of the code
- Add appropriate error handling and logging
- Include unit tests for the key functions

## Bonus Points (Optional)
- Real-time streaming implementation (+5)
- Advanced monitoring dashboards (+3)
- Machine learning integration (anomaly detection, recommendations) (+3)
- Infrastructure as Code (+2)
- Comprehensive test suite (+2)
- **Code debugging and improvement** (+10)

## Questions?
If anything is unclear, make reasonable assumptions and document them. We're interested in seeing your thought process and engineering judgment.

Good luck!