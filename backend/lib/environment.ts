enum Environments {
    local_windows = 'win',
    dev_server = 'dev',
    prod_server = 'prod'
}

class Environment {
    private environment: String;

    constructor(environment: String) {
        this.environment = environment;
    }

    getPort(): Number {
        if (this.environment === Environments.prod_server) {
            return 9000;
        } else {
            return 3001;
        }
    }

    getDBName(): String {
        if (this.environment === Environments.prod_server) {
            return 'db_health_counter_prod';
        } else {
            return 'db_health_counter_dev';
        }
    }
}

export default new Environment(Environments.local_windows);
