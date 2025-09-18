const fs = require('fs');
const path = require('path');

class DataGenerator {
    constructor() {
        this.categories = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'];
        this.brands = ['TechCorp', 'StyleCo', 'HomeGoods', 'SportsPro', 'ReadMore'];
        this.channels = ['web', 'mobile', 'api'];
        this.statuses = ['confirmed', 'pending', 'cancelled'];
        this.warehouses = ['WH-SF', 'WH-NY', 'WH-CHI', 'WH-MIA'];
        this.states = {
            'CA': ['San Francisco', 'Los Angeles', 'San Diego'],
            'NY': ['New York', 'Albany', 'Buffalo'], 
            'TX': ['Houston', 'Dallas', 'Austin'],
            'FL': ['Miami', 'Tampa', 'Orlando'],
            'IL': ['Chicago', 'Springfield', 'Rockford']
        };
        
        this.products = this.generateProducts(50);
    }

    generateProducts(count) {
        const products = [];
        for (let i = 1; i <= count; i++) {
            products.push({
                product_id: `PROD-${i.toString().padStart(3, '0')}`,
                category: this.randomChoice(this.categories),
                brand: this.randomChoice(this.brands),
                price: Math.round((Math.random() * 290 + 10) * 100) / 100,
                launch_date: this.randomDate(365)
            });
        }
        return products;
    }

    generateOrders(count = 10000) {
        const orders = [];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        for (let i = 1; i <= count; i++) {
            const orderTime = new Date(startDate.getTime() + 
                Math.random() * 30 * 24 * 60 * 60 * 1000);
            
            const state = this.randomChoice(Object.keys(this.states));
            const numItems = Math.floor(Math.random() * 5) + 1;
            const items = [];

            for (let j = 0; j < numItems; j++) {
                const product = this.randomChoice(this.products);
                items.push({
                    product_id: product.product_id,
                    quantity: Math.floor(Math.random() * 3) + 1,
                    unit_price: product.price
                });
            }

            orders.push({
                order_id: `ORD-${i.toString().padStart(6, '0')}`,
                customer_id: `CUST-${Math.floor(Math.random() * 5000) + 1}`,
                timestamp: orderTime.toISOString(),
                channel: this.randomChoice(this.channels),
                items: items,
                shipping_address: {
                    country: 'US',
                    state: state,
                    city: this.randomChoice(this.states[state])
                },
                status: this.randomChoice(this.statuses)
            });
        }

        // Write to JSONL file
        const ordersFile = path.join(__dirname, 'orders_stream.jsonl');
        const ordersData = orders.map(order => JSON.stringify(order)).join('\n');
        fs.writeFileSync(ordersFile, ordersData);
        
        console.log(`Generated ${count} orders in ${ordersFile}`);
        return orders;
    }

    generateInventory() {
        const inventory = this.products.map(product => ({
            product_id: product.product_id,
            available_quantity: Math.floor(Math.random() * 500),
            warehouse_location: this.randomChoice(this.warehouses),
            last_updated: this.randomDate(1)
        }));

        // Write to CSV
        const inventoryFile = path.join(__dirname, 'inventory_updates.csv');
        const header = 'product_id,available_quantity,warehouse_location,last_updated\n';
        const rows = inventory.map(row => 
            `${row.product_id},${row.available_quantity},${row.warehouse_location},${row.last_updated}`
        ).join('\n');
        
        fs.writeFileSync(inventoryFile, header + rows);
        
        console.log(`Generated inventory data in ${inventoryFile}`);
        return inventory;
    }

    generateProductCatalog() {
        // Write as JSON (candidates can convert to Parquet if needed)
        const catalogFile = path.join(__dirname, 'product_catalog.json');
        fs.writeFileSync(catalogFile, JSON.stringify(this.products, null, 2));
        
        console.log(`Generated product catalog in ${catalogFile}`);
        console.log('Note: Convert to Parquet format as needed for your solution');
        return this.products;
    }

    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    randomDate(daysBack) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
        return date.toISOString();
    }
}

// Generate all sample data
if (require.main === module) {
    const generator = new DataGenerator();
    generator.generateOrders(1000);  // Reasonable size for testing
    generator.generateInventory();
    generator.generateProductCatalog();
    console.log('\nSample data generation complete!');
    console.log('Files created:');
    console.log('- orders_stream.jsonl (1,000 orders)');
    console.log('- inventory_updates.csv (50 products)');
    console.log('- product_catalog.json (50 products)');
}

module.exports = DataGenerator;