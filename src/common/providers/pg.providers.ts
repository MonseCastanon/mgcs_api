import { Client } from "pg";

export const pgProvider = {
    provide: 'POSTGRES_CONNECTION',
    useFactory: async () => {
        const client = new Client({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'Mon140104',
            database:'GIDS6081'
        });

        await client.connect();

        return client;
    }
}

/*
import { createConnection } from "net"

export const mysqlProvider = {
    provide: 'MYSQL_CONNECTION',
    useFactory: () => {
        const connection = createConnection({
            host: 'localhost',
            port: 33007,
            user: '',
            password: '',
            database:''
        });

        return connection;
    }
}
*/