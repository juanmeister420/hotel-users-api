const jwt = require('express-jwt');
const { secret } = require('config.json');
const db = require('../helpers/db');

module.exports = authorize;

function authorize() {
    return [
        // Algorytm Json Web Token
        jwt({ secret, algorithms: ['HS256'] }),

        async (req, res, next) => {
            // identyfikacja użytkownika przy pomocy Tokena JWT
            const user = await db.User.findByPk(req.user.sub);

            // Czy użytkownik figuruje w bazie?
            if (!user)
                return res.status(401).json({ message: 'Brak-autoryzacji' });

            // Autoryzacja uzyskana
            req.user = user.get();
            next();
        }
    ];
}