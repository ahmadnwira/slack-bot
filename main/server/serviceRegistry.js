class ServiceRegistry {
    constructor() {
        this.services = [];
        this.timeOut = 30;
    }

    add(intent, ip, port) {
        const serviceID = intent + ip + port;

        if (!this.services[serviceID]) {
            this.services[serviceID] = {};
            this.services[serviceID].intent = intent;
            this.services[serviceID].ip = ip;
            this.services[serviceID].port = port;
        }
        this.removeIdle();
        return;
    }

    remove(intent, ip, port) {
        const serviceID = intent + ip + port;
        delete this.services[serviceID];
        return;
    }

    get(intent) {
        for(let key in this.services) {
            if(this.services[key].intent == intent) {
                return this.services[key];
            }
        }
    }

    removeIdle() {
        this.services.forEach((service, index, obj) => {
            const current = Math.floor(new Date() / 1000);
            if (service.timestamp + this.timeOut < current) {
                obj.splice(index, 1);
                console.log('removed service', this.services);
            }
        });
        return;
    }
}

const registry = new ServiceRegistry();

module.exports = ServiceRegistry;