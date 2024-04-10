<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('main-app');
});

Route::get('/yandex-direct-info', function () {
    $ReportsURL = 'https://api.direct.yandex.com/json/v5/reports';

    // OAuth-токен пользователя, от имени которого будут выполняться запросы
    $token = 'y0_AgAAAABT-UwxAAZAOQAAAAEA2YPLAAAMYYqB_uFJspxfKYad38plb8j-_Q';

    // Логин клиента рекламного агентства
    // Обязательный параметр, если запросы выполняются от имени рекламного агентства
    $clientLogin = 'artfabric-int';

    // $headers = [
    //     // OAuth-токен. Использование слова Bearer обязательно
    //     "Authorization : Bearer {$token}",
    //     // Логин клиента рекламного агентства
    //     "Client-Login : {$clientLogin}",
    //     // Язык ответных сообщений
    //     "Accept-Language : ru",
    //     // Режим формирования отчета
    //     "processingMode : auto"
    //     // Формат денежных значений в отчете
    //     // "returnMoneyInMicros : false",
    //     // Не выводить в отчете строку с названием отчета и диапазоном дат
    //     // "skipReportHeader : true",
    //     // Не выводить в отчете строку с названиями полей
    //     // "skipColumnHeader : true",
    //     // Не выводить в отчете строку с количеством строк статистики
    //     // "skipReportSummary : true"
    // ];
    
    // $body = [
    //     "params" => [
    //         "SelectionCriteria" => [
    //             // "DateFrom" => "2024-04-04",
    //             // "DateTo" => "2024-04-04"
    //         ],
    //         // "FieldNames" => [
    //         //     "Date",
    //         //     "CampaignName",
    //         //     "LocationOfPresenceName",
    //         //     "Impressions",
    //         //     "Clicks",
    //         //     "Cost"
    //         // ],
    //         "FieldNames" => [
    //             // "CampaignId", 
    //             // "CampaignType", 
    //             "CampaignName", 
    //             "Clicks", 
    //             "Impressions", 
    //             "Cost"
    //         ],
    //         "ReportName" => "test_otchet",
    //         "ReportType"=> "CAMPAIGN_PERFORMANCE_REPORT",
    //         // "DateRangeType" => "CUSTOM_DATE",
    //         // "DateRangeType" => "YESTERDAY",
    //         // "DateRangeType" => "LAST_WEEK",
    //         "DateRangeType" => "THIS_MONTH",
    //         "Format" => "TSV",
    //         "IncludeVAT" => "YES",
    //         "IncludeDiscount" => "NO"
    //     ]
    // ];


    // // use key 'http' even if you send the request to https://...
    // $options = [
    //     'http' => [
    //         'method' => 'POST',
    //         'header' => implode("\r\n", $headers),
    //         'content' => http_build_query($body),
    //     ],
    // ];

    // $context = stream_context_create($options);
    // $result = file_get_contents($ReportsURL, false, $context);

    // if ($result === false) {
    //     /* Handle error */
    // }

    // dd($result);


    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $ReportsURL);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS,'{
        "method" : "get",
        "params" : {
            
            "SelectionCriteria" : {
            },

            "FieldNames" : [
                "CampaignId",
                "CampaignName", 
                "Clicks", 
                "Impressions", 
                "Cost"
            ],

            "ReportName" : "test_otchet",
            "ReportType": "CAMPAIGN_PERFORMANCE_REPORT",
            "DateRangeType" : "THIS_MONTH",
            "Format" : "TSV",
            "IncludeVAT" : "YES",
            "IncludeDiscount" : "NO"
        }
    }');  //Post Fields

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $headers = [
        'POST /json/v5/ads/ HTTP/1.1',
        'Host: api.direct.yandex.com',
        'Authorization: Bearer ' . $token,
        'Accept-Language: ru',
        'Client-Login: ' . $clientLogin,
        'ProcessingMode: auto',
        'Content-Type: application/json; charset=utf-8',
    ];

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $server_output = curl_exec($ch);
    $http_code = curl_getinfo($ch/*, CURLINFO_HTTP_CODE*/);
    // dump($http_code);
    curl_close($ch);

    // dump($server_output);
    return($server_output);
});
