<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        
        @vite(['resources/css/app.css', 'resources/js/app.js'])        
    </head>
    <style>
        html, body {
            margin: 0px;
            padding: 0px;
            background: #FFF;
        }

        body {
            padding: 20px;
            display: flex;
        }
    </style>
    <body id="app">
        <root-vue></root-vue>
    </body>
</html>