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