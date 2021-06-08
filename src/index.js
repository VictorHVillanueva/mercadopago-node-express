const express = require('express');
const app = express();

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-2011480228021203-060802-07d8baef3cda1e78db3bbc5a2e4f4680-772046034'
});

//middleware
app.use(express.urlencoded({extended:false}) )

//routes
app.post('/checkout', (req, res) => {
    console.log(req.body);
    //res.send('post desde checkout');
    // Crea un objeto de preferencia
    let preference = {
        items: [
            {
                title: 'Mi producto',
                unit_price: 100,
                quantity: 1,
            }
        ]
    };
    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.redirect(response.body.init_point)
        }).catch(function (error) {
            console.log(error);
        });
        
})

//server
app.listen(3000, () => {
    console.log('Server on port 3000');
})

