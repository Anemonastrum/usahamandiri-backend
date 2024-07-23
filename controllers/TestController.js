export const testAPI = (req, res) => {
  res.status(200).send(`
        <html>
            <head>
                <title>API Test</title>
                <style>
                    body {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        font-family: Arial, sans-serif;
                        background-color: #f0f0f0;
                    }
                    h1 {
                        color: #333;
                    }
                    img {
                        max-width: 250px;
                        height: auto;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <h1>API is working!</h1>
                <img src="
https://cdn.usahamandirimagelang.com/rds.heic" alt="Test Image" />
            </body>
        </html>
    `);
};
