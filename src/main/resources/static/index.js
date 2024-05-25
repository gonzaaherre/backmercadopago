const mp = new MercadoPago('TEST-fad4162a-3c89-4217-a1fa-10956a4f1fa4', {
        locale: 'es-AR'
    });

    const MP = async () => {
        try {
            let miArticulo = {};
            miArticulo.title = 'Producto de ejemplo';
            miArticulo.quantity = 1;
            miArticulo.unit_price = 100.0;

            const response = await fetch('/apiMp', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(miArticulo)
            });

            const preference = await response.text();
            createCheckoutButton(preference);
            console.log("preferencia: " + preference);
        } catch (e) {
            alert("error: " + e);
        }
    };

    const createCheckoutButton = (preferenceId_OK) => {
        const bricksBuilder = mp.bricks();
        const generateButton = async () => {
            if (window.checkoutButton) window.checkoutButton.unmount();
            bricksBuilder.create("wallet", "wallet_container", {
                initialization: {
                    preferenceId: preferenceId_OK,
                },
            });
            generateButton();
        }
        generateButton();
    };

// Llama a la función MP para iniciar el proceso
