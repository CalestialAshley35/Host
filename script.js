document.getElementById('hostingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const websiteName = document.getElementById('websiteName').value;
    const htmlCode = document.getElementById('htmlCode').value;
    const cssCode = document.getElementById('cssCode').value;
    const jsCode = document.getElementById('jsCode').value;
    
    const output = document.getElementById('output');
    output.innerHTML = `
        <h2>Hosted Website: ${websiteName}</h2>
        <iframe srcdoc="
            <html>
                <head>
                    <style>${cssCode}</style>
                </head>
                <body>
                    ${htmlCode}
                    <script>${jsCode}<\/script>
                </body>
            </html>
        " width="100%" height="500px"></iframe>
    `;
});
