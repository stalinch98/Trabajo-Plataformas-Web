process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/trabajo';
} else {
    urlDB = 'mongodb+srv://cocoa_user:NphBBLAA2dJbjGby@cluster0.l27k0.mongodb.net/trabajo'
}

process.env.URLDB = urlDB;