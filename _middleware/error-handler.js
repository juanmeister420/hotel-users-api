module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            // wszelki error
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        case err.name === 'UnauthorizedError':
            // Brak autoryzacji JWT
            return res.status(401).json({ message: 'Brak-autoryzacji' });
        default:
            return res.status(500).json({ message: err.message });
    }
}