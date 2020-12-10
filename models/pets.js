
const pool = require('../lib/utils/pool.js')


module.exports = class Pet {
    id;
    type;
    name;
    ownerId;

    constructor(row) {
        this.id = String(row.id);
        this.type = row.type;
        this.name = row.name;
        this.ownerId = String(row.owner_id);
    }

    static async insert({ type, name, ownerId }) {
        const { rows } = await pool.query(
            'INSERT INTO pets (type, name, owner_id) VALUES ($1, $2, $3) RETURNING *',
            [type, name, ownerId]
        );
        return new Pet(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM pets');
        return rows.map(row => new Pet(row));
    }

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM pets WHERE id=$1', [id]);
        if (!rows[0]) throw new Error(`No Pet with id ${id}`);
        return new Pet(rows[0]);
    }

    static async update(id, { type, name, ownerId }) {
        const { rows } = await pool.query('UPDATE pets SET type=$1, name=$2, owner_id=$3 WHERE id = $4 RETURNING *', [type, name, ownerId, id]);
        return new Pet(rows[0]);
    }
    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM pets WHERE id=$1 RETURNING *', [id]
        );
        return new Pet(rows[0]);
    }
};
