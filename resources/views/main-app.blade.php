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
        @font-face {
            font-family: 'Arial'; 
            src: local('Arial'), url(/fonts/arial/arialmt.ttf); 
        }

        @font-face {
            font-family: 'Roboto'; 
            src: local('Roboto'), url(/fonts/roboto/Roboto-Light.ttf); 
        }

        html, body {
            font-family: 'Arial', Arial, sans-serif;
            /* font-family: "Roboto", sans-serif; */
            font-size: 16px;
            margin: 0px;
            padding: 0px;
            background: #F1F2F2;
        }

        body {
            padding: 0px;
            margin: 0px;
            display: flex;
            justify-content: center
        }
    </style>
    <body id="app">
        <root-vue></root-vue>
    </body>
</html>