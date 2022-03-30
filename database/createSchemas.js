import db from "./createConnection.js";
export default async () => {
    const isInDeleteMode = true;

    if(isInDeleteMode) {
        db.exec(`DROP TABLE IF EXISTS users;`);
    }

    db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname VARCHAR(80),
        middlename VARCHAR(80),
        lastname VARCHAR(80)
    );`);

    if(isInDeleteMode) {
        await db.run(`INSERT INTO users (firstname, middlename, lastname) VALUES ('Thor', 'Find', 'Andersen')`);
        db.run(`INSERT INTO users (firstname, middlename, lastname) VALUES ('Alexander', 'Christian Haubro', 'Jacobsen')`);
    }
    console.log("Created Schemas");
}