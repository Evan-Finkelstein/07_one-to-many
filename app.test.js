const fs = require('fs');
const request = require('supertest');
const app = require('./index');
const Owner = require('./models/owners');
const Pet = require('./models/pets');
const pool = require('./lib/utils/pool');


describe('app tests', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    })
    afterAll(() => {
        return pool.end();
    });

    it('create an owner', async () => {
        const response = await request(app)
            .post('/owners')
            .send({
                name: 'Bill',
                job: 'plumber',
                description: 'depressed'
            });
        expect(response.body).toEqual({
            id: '1',
            name: 'Bill',
            job: 'plumber',
            description: 'depressed'
        })
    })

    it('finds an owner by id and associated pets via GET', async () => {
        const owner = await Owner.insert({
            name: 'Bill',
            job: 'plumber',
            description: 'depressed'
        });

        const pets = await Promise.all([
            { type: 'hippo', name: 'hiposterous', ownerId: owner.id },
            { type: 'cheese', name: 'fred', ownerId: owner.id },
            { type: 'mirror', name: 'bill', ownerId: owner.id }
        ].map(pet => Pet.insert(pet)));

        const res = await request(app)
            .get(`/owners/${owner.id}`);

        expect(res.body).toEqual({
            ...owner,
            pets: expect.arrayContaining(pets)
        });
    });
    it('finds all owners', async () => {
        const owner = await Owner.insert({
            name: 'Bill',
            job: 'plumber',
            description: 'depressed'
        });
        const response = await request(app)
            .get('/owners');
        expect(response.body).toEqual([owner]);

    })

    it('updates an owner', async () => {
        const owner = await Owner.insert({
            name: 'Bill',
            job: 'plumber',
            description: 'depressed'
        });
        const response = await request(app)
            .put(`/owners/${owner.id}`)
            .send({
                name: 'Fred',
                job: 'murderer',
                description: 'happy'
            })
        expect(response.body).toEqual({
            name: 'Fred',
            id: owner.id,
            job: 'murderer',
            description: 'happy'
        })



    });


    it('deletes an owner', async () => {
        const owner = await Owner.insert({
            name: 'Fred',
            job: 'murderer',
            description: 'happy'
        })
        const response = await request(app)
            .delete(`/owners/${owner.id}`);
        expect(response.body).toEqual(owner);
    });

    it('create a pet', async () => {
        const owner = await Owner.insert({
            name: 'Bill',
            job: 'plumber',
            description: 'depressed'
        });

        const response = await request(app)
            .post('/pets')
            .send({
                type: 'dragon',
                name: 'phil',
                ownerId: owner.id

            });
        expect(response.body).toEqual({
            id: '1',
            type: 'dragon',
            name: 'phil',
            ownerId: owner.id
        })
    })

    it('finds a pet by id', async () => {
        const owner = await Owner.insert({
            name: 'Bill',
            job: 'plumber',
            description: 'depressed'
        });
        const pet = await Pet.insert({
            type: 'dragon',
            name: 'phil',
            ownerId: owner.id
        });
        const response = await request(app)
            .get(`/pets/${pet.id}`);
        expect(response.body).toEqual(pet);

    })
    it('finds all pets', async () => {
        const owner = await Owner.insert({
            name: 'Bill',
            job: 'plumber',
            description: 'depressed'
        });
        const pet = await Pet.insert({
            type: 'dragon',
            name: 'phil',
            ownerId: owner.id
        });
        const response = await request(app)
            .get('/pets');
        expect(response.body).toEqual([pet]);

    })

    it('updates a pet', async () => {
        const owner = await Owner.insert({
            name: 'Bill',
            job: 'plumber',
            description: 'depressed'
        });
        const pet = await Pet.insert({
            type: 'dragon',
            name: 'phil',
            ownerId: owner.id
        });
        const response = await request(app)
            .put(`/pets/${pet.id}`)
            .send({
                type: 'tree',
                name: 'bill',
                ownerId: owner.id
            })
        expect(response.body).toEqual({
            type: 'tree',
            id: pet.id,
            name: 'bill',
            ownerId: owner.id
        })



    });


    it('deletes a pet', async () => {
        const owner = await Owner.insert({
            name: 'Bill',
            job: 'plumber',
            description: 'depressed'
        });
        const pet = await Pet.insert({
            type: 'dragon',
            name: 'phil',
            ownerId: owner.id
        });

        const response = await request(app)
            .delete(`/pets/${pet.id}`);
        expect(response.body).toEqual(pet);
    });
});



