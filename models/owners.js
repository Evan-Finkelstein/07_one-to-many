
const pool = require('../lib/utils/pool.js')


module.exports = class Owner {
    id;
    name;
    job;
    description;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.job = row.job;
        this.description = row.description;
    }

    static async insert({ name, job, description }) {
        const { rows } = await pool.query(
            'INSERT INTO owners (name, job, description) VALUES ($1, $2, $3) RETURNING *',
            [name, job, description]
        );
        return new Owner(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM owners');
        return rows.map(row => new Owner(row));
    }

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM owners WHERE id=$1', [id]);
        if (!rows[0]) throw new Error(`No Owner with id ${id}`);
        return new Owner(rows[0]);
    }

    static async update(id, { name, job, description }) {
        const { rows } = await pool.query('UPDATE owners SET name=$1, job=$2, description=$3 WHERE id = $4 RETURNING *', [name, job, description, id]);
        return new Owner(rows[0]);
    }
    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM owners WHERE id=$1 RETURNING *', [id]
        );
        return new Owner(rows[0]);
    }
};
