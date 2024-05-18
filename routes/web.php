<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

Route::get('/',             fn() => view('main-app'))->name('index');
Route::get('/cpc',          fn() => view('main-app'))->name('cpc');
Route::get('/ctr',          fn() => view('main-app'))->name('ctr');
Route::get('/statistics',   fn() => view('main-app'))->name('statistics');
Route::get('/outsiders',    fn() => view('main-app'))->name('outsiders');
Route::get('/constructor',  fn() => view('main-app'))->name('constructor');
Route::get('/adimages',     fn() => view('main-app'))->name('adImages');

Route::get('/telegram-analistics/{number}', function() {
    return view('main-app');
})->name('analistics.telegram.page');

Route::get('/yandex-direct-info', function(Request $request) {
    // logger($request->period);

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
                "Cost",
                "CampaignType"
            ],

            "ReportName" : "test_otchet",
            "ReportType": "CAMPAIGN_PERFORMANCE_REPORT",
            "DateRangeType" : "' . $request->period . '",
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

Route::get('/yandex-direct-cost', function() {
    $dateToday = date('Y-m-d', time());
    $dateStart = explode('-', $dateToday)[0] . '-01' . '-01';

    $ReportsURL = 'https://api.direct.yandex.com/json/v5/reports';

    // OAuth-токен пользователя, от имени которого будут выполняться запросы
    $token = 'y0_AgAAAABT-UwxAAZAOQAAAAEA2YPLAAAMYYqB_uFJspxfKYad38plb8j-_Q';

    // Логин клиента рекламного агентства
    // Обязательный параметр, если запросы выполняются от имени рекламного агентства
    $clientLogin = 'artfabric-int';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $ReportsURL);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS,'{
        "method" : "get",
        "params" : {
            
            "SelectionCriteria" : {
                "DateFrom" : "' . $dateStart . '",
                "DateTo" : "' . $dateToday . '"
            },

            "FieldNames" : [
                "Date",
                "Cost"
            ],

            "ReportName" : "cost_otchet_new",
            "ReportType": "CAMPAIGN_PERFORMANCE_REPORT",
            "DateRangeType" : "CUSTOM_DATE",
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
        // 'Content-Type: application/json; charset=utf-8',
    ];

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $server_output = curl_exec($ch);
    $http_code = curl_getinfo($ch/*, CURLINFO_HTTP_CODE*/);
    // dump($http_code);
    curl_close($ch);

    // dump($server_output);
    return($server_output);
});

Route::get('/yandex-direct-images', function() {
    $ReportsURL = 'https://api.direct.yandex.com/json/v5/adimages';

    // OAuth-токен пользователя, от имени которого будут выполняться запросы
    $token = 'y0_AgAAAABT-UwxAAZAOQAAAAEA2YPLAAAMYYqB_uFJspxfKYad38plb8j-_Q';

    // Логин клиента рекламного агентства
    // Обязательный параметр, если запросы выполняются от имени рекламного агентства
    $clientLogin = 'artfabric-int';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $ReportsURL);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS,'{
        "method": "get",
        "params": {
            "SelectionCriteria": {
                "Associated": "YES"
            },
            "FieldNames": [
                "AdImageHash", 
                "OriginalUrl", 
                "PreviewUrl", 
                "Name"
            ],
            "Page": {
                "Limit": 10000,
                "Offset": 0
            }
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
        // 'Content-Type: application/json; charset=utf-8',
    ];

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $server_output = curl_exec($ch);
    $http_code = curl_getinfo($ch/*, CURLINFO_HTTP_CODE*/);
    // dump($http_code);
    // logger($http_code);
    curl_close($ch);
   
    // logger($server_output);
    // dump($server_output);
    return($server_output);
});

Route::get('/yandex-direct-campaigns', function() {
    $ReportsURL = 'https://api.direct.yandex.com/json/v5/campaigns';

    // OAuth-токен пользователя, от имени которого будут выполняться запросы
    $token = 'y0_AgAAAABT-UwxAAZAOQAAAAEA2YPLAAAMYYqB_uFJspxfKYad38plb8j-_Q';

    // Логин клиента рекламного агентства
    // Обязательный параметр, если запросы выполняются от имени рекламного агентства
    $clientLogin = 'artfabric-int';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $ReportsURL);
    curl_setopt($ch, CURLOPT_POST, 1);

    curl_setopt($ch, CURLOPT_POSTFIELDS,'{
        "method": "get",
        "params": {
            "SelectionCriteria": {
                "States": [
                    "ARCHIVED", 
                    "CONVERTED", 
                    "ENDED", 
                    "OFF", 
                    "ON", 
                    "SUSPENDED"
                ]
            },
            "FieldNames": [
                "Id", 
                "Name", 
                "StatusClarification", 
                "Type"
            ]
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
        // 'Content-Type: application/json; charset=utf-8',
    ];

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $server_output = curl_exec($ch);
    $http_code = curl_getinfo($ch/*, CURLINFO_HTTP_CODE*/);
    // dump($http_code);
    // logger($http_code);
    curl_close($ch);
   
    // logger($server_output);
    // dump($server_output);
    return($server_output);
});

Route::get('/yandex-direct-groups', function() {
    $ReportsURL = 'https://api.direct.yandex.com/json/v5/adgroups';

    // OAuth-токен пользователя, от имени которого будут выполняться запросы
    $token = 'y0_AgAAAABT-UwxAAZAOQAAAAEA2YPLAAAMYYqB_uFJspxfKYad38plb8j-_Q';

    // Логин клиента рекламного агентства
    // Обязательный параметр, если запросы выполняются от имени рекламного агентства
    $clientLogin = 'artfabric-int';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $ReportsURL);
    curl_setopt($ch, CURLOPT_POST, 1);

    curl_setopt($ch, CURLOPT_POSTFIELDS,'{
        "method": "get",
        "params": {
            "SelectionCriteria": {
                "CampaignIds": [108028751]
            },
            "FieldNames": [
                "CampaignId", 
                "Id", 
                "Name", 
                "NegativeKeywords", 
                "NegativeKeywordSharedSetIds", 
                "RegionIds", 
                "RestrictedRegionIds", 
                "ServingStatus", 
                "Status", 
                "Subtype", 
                "TrackingParams", 
                "Type"
            ]
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
        // 'Content-Type: application/json; charset=utf-8',
    ];

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $server_output = curl_exec($ch);
    $http_code = curl_getinfo($ch/*, CURLINFO_HTTP_CODE*/);
    // dump($http_code);
    // logger($http_code);
    curl_close($ch);
   
    // logger($server_output);
    // dump($server_output);
    return($server_output);
});

Route::get('/yandex-direct-campaigns-groups', function() {
    // OAuth-токен пользователя, от имени которого будут выполняться запросы
    $token = 'y0_AgAAAABT-UwxAAZAOQAAAAEA2YPLAAAMYYqB_uFJspxfKYad38plb8j-_Q';

    // Логин клиента рекламного агентства
    // Обязательный параметр, если запросы выполняются от имени рекламного агентства
    $clientLogin = 'artfabric-int';

    $campaignsURL = 'https://api.direct.yandex.com/json/v5/campaigns';
    $groupsURL = 'https://api.direct.yandex.com/json/v5/adgroups';

    $ch = curl_init();
    $headers = [
        'POST /json/v5/ads/ HTTP/1.1',
        'Host: api.direct.yandex.com',
        'Authorization: Bearer ' . $token,
        'Accept-Language: ru',
        'Client-Login: ' . $clientLogin,
        'ProcessingMode: auto',
        // 'Content-Type: application/json; charset=utf-8',
    ];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    curl_setopt($ch, CURLOPT_URL, $campaignsURL);
    curl_setopt($ch, CURLOPT_POSTFIELDS,'{
        "method": "get",
        "params": {
            "SelectionCriteria": {
                "States": [
                    "CONVERTED", 
                    "ENDED", 
                    "OFF", 
                    "ON", 
                    "SUSPENDED"
                ]
            },
            "FieldNames": [
                "Id"
            ]
        }
    }');  //Post Fields


    $server_output = curl_exec($ch);
    $http_code = curl_getinfo($ch/*, CURLINFO_HTTP_CODE*/);

    // logger($http_code);
    $json = json_decode($server_output);
    $idsArray = $json?->result?->Campaigns; //$json?->result?->Campaigns;
    $ids = [];

    foreach($idsArray as $key => $value) {
        array_push($ids, $value->Id);
    }

    $ids = array_slice($ids, 50, 10);
    $idsStr = implode(', ', $ids);
    logger($idsStr);

    curl_setopt($ch, CURLOPT_URL, $groupsURL);
    curl_setopt($ch, CURLOPT_POSTFIELDS,'{
        "method": "get",
        "params": {
            "SelectionCriteria": {
                "CampaignIds": [' . $idsStr . ']
            },
            "FieldNames": [
                "CampaignId", 
                "Id", 
                "Name", 
                "Type"
            ]
        }
    }');  //Post Fields

    $server_output = curl_exec($ch);
    // logger($server_output);
    $http_code = curl_getinfo($ch/*, CURLINFO_HTTP_CODE*/);


    curl_close($ch);
    return($server_output);
});

Route::get('/yandex-direct-campaigns-ads', function(Request $request) {
    // OAuth-токен пользователя, от имени которого будут выполняться запросы
    $token = 'y0_AgAAAABT-UwxAAZAOQAAAAEA2YPLAAAMYYqB_uFJspxfKYad38plb8j-_Q';

    // Логин клиента рекламного агентства
    // Обязательный параметр, если запросы выполняются от имени рекламного агентства
    $clientLogin = 'artfabric-int';

    $campaignsURL = 'https://api.direct.yandex.com/json/v5/campaigns';
    $adsURL = 'https://api.direct.yandex.com/json/v5/ads';

    $ch = curl_init();
    $headers = [
        'POST /json/v5/ads/ HTTP/1.1',
        'Host: api.direct.yandex.com',
        'Authorization: Bearer ' . $token,
        'Accept-Language: ru',
        'Client-Login: ' . $clientLogin,
        'ProcessingMode: auto',
        // 'Content-Type: application/json; charset=utf-8',
    ];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    curl_setopt($ch, CURLOPT_URL, $campaignsURL);
    curl_setopt($ch, CURLOPT_POSTFIELDS,'{
        "method": "get",
        "params": {
            "SelectionCriteria": {
                "States": [
                    "CONVERTED", 
                    "ENDED", 
                    "OFF", 
                    "ON", 
                    "SUSPENDED"
                ]
            },
            "FieldNames": [
                "Id"
            ]
        }
    }');  //Post Fields


    $server_output = curl_exec($ch);
    $http_code = curl_getinfo($ch/*, CURLINFO_HTTP_CODE*/);

    // logger($http_code);
    $json = json_decode($server_output);
    $idsArray = $json?->result?->Campaigns; //$json?->result?->Campaigns;
    $ids = [];

    foreach($idsArray as $key => $value) {
        array_push($ids, $value->Id);
    }

    $ids = 
        isset($request->page) ? 
        array_slice($ids, ($request->page - 1) * 10, 10) : 
        array_slice($ids, 0, 10);

    $idsStr = implode(', ', $ids);
    // logger($idsStr);

    curl_setopt($ch, CURLOPT_URL, $adsURL);
    curl_setopt($ch, CURLOPT_POSTFIELDS,'{
        "method": "get",
        "params": {
            "SelectionCriteria": {
                "CampaignIds": [' . $idsStr . ']
            },
            "FieldNames": [
                "AdGroupId", 
                "CampaignId", 
                "Id", 
                "State", 
                "StatusClarification", 
                "Type", 
                "Subtype"
            ],
            "TextAdFieldNames" : [
                "AdImageHash",
                "DisplayDomain",
                "Href",
                "SitelinkSetId",
                "Text",
                "Title",
                "Title2",
                "Mobile",
                "DisplayUrlPath",
                "AdImageModeration",
                "SitelinksModeration",
                "VideoExtension"
            ]
        }
    }');  //Post Fields

    $server_output = curl_exec($ch);
    // logger($server_output);
    $http_code = curl_getinfo($ch/*, CURLINFO_HTTP_CODE*/);


    curl_close($ch);
    return($server_output);
});

Route::get('/yandex-direct-campaign-ads', function(Request $request) {
    $token = 'y0_AgAAAABT-UwxAAZAOQAAAAEA2YPLAAAMYYqB_uFJspxfKYad38plb8j-_Q';
    $clientLogin = 'artfabric-int';
    $adsURL = 'https://api.direct.yandex.com/json/v5/ads';

    $ch = curl_init();
    $headers = [
        'POST /json/v5/ads/ HTTP/1.1',
        'Host: api.direct.yandex.com',
        'Authorization: Bearer ' . $token,
        'Accept-Language: ru',
        'Client-Login: ' . $clientLogin,
        'ProcessingMode: auto',
        // 'Content-Type: application/json; charset=utf-8',
    ];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $server_output = curl_exec($ch);
    $http_code = curl_getinfo($ch/*, CURLINFO_HTTP_CODE*/);

    $ids = [];
    array_push($ids, $request->Id);

    $idsStr = implode(', ', $ids);
    // logger($idsStr);

    curl_setopt($ch, CURLOPT_URL, $adsURL);
    curl_setopt($ch, CURLOPT_POSTFIELDS,'{
        "method": "get",
        "params": {
            "SelectionCriteria": {
                "CampaignIds": [' . $idsStr . ']
            },
            "FieldNames": [
                "AdGroupId", 
                "CampaignId", 
                "Id", 
                "State", 
                "StatusClarification", 
                "Type", 
                "Subtype"
            ],
            "TextAdFieldNames" : [
                "AdImageHash",
                "DisplayDomain",
                "Href",
                "SitelinkSetId",
                "Text",
                "Title",
                "Title2",
                "Mobile",
                "DisplayUrlPath",
                "AdImageModeration",
                "SitelinksModeration",
                "VideoExtension"
            ]
        }
    }');  //Post Fields

    $server_output = curl_exec($ch);
    $http_code = curl_getinfo($ch/*, CURLINFO_HTTP_CODE*/);

    curl_close($ch);
    return($server_output);
});

// Route::get('/yandex-direct-caimpaigns', function() {
//     // $ReportsURL = 'https://api.direct.yandex.com/json/v5/adimages';
//     // $ReportsURL = 'https://api.direct.yandex.com/json/v5/ads';
//     $ReportsURL = 'https://api.direct.yandex.com/json/v5/adgroups';
//     // $ReportsURL = 'https://api.direct.yandex.com/json/v5/campaigns';



//     // OAuth-токен пользователя, от имени которого будут выполняться запросы
//     $token = 'y0_AgAAAABT-UwxAAZAOQAAAAEA2YPLAAAMYYqB_uFJspxfKYad38plb8j-_Q';

//     // Логин клиента рекламного агентства
//     // Обязательный параметр, если запросы выполняются от имени рекламного агентства
//     $clientLogin = 'artfabric-int';

//     $ch = curl_init();
//     curl_setopt($ch, CURLOPT_URL, $ReportsURL);
//     curl_setopt($ch, CURLOPT_POST, 1);
//     // curl_setopt($ch, CURLOPT_POSTFIELDS,'{
//     //     "method": "get",
//     //     "params": {
//     //         "SelectionCriteria": {
//     //             "Associated": "YES"
//     //         },
//     //         "FieldNames": [
//     //             "AdImageHash", 
//     //             "OriginalUrl", 
//     //             "PreviewUrl", 
//     //             "Name"
//     //         ],
//     //         "Page": {
//     //             "Limit": 100,
//     //             "Offset": 0
//     //         }
//     //     }
//     // }');  //Post Fields


//     // curl_setopt($ch, CURLOPT_POSTFIELDS,'{
//     //     "method": "get",
//     //     "params": {
//     //         "SelectionCriteria": {
//     //             "CampaignIds": [109344130]
//     //         },
//     //         "FieldNames": [
//     //             "AdCategories", 
//     //             "AgeLabel", 
//     //             "AdGroupId", 
//     //             "CampaignId", 
//     //             "Id", 
//     //             "State", 
//     //             "Status", 
//     //             "StatusClarification", 
//     //             "Type", 
//     //             "Subtype"
//     //         ]
//     //     }
//     // }');  //Post Fields

//     // curl_setopt($ch, CURLOPT_POSTFIELDS,'{
//     //     "method": "get",
//     //     "params": {
//     //         "SelectionCriteria": {
//     //             "CampaignIds": [109344130]
//     //         },
//     //         "FieldNames": [
//     //             "CampaignId", 
//     //             "Id", 
//     //             "Name", 
//     //             "NegativeKeywords", 
//     //             "NegativeKeywordSharedSetIds", 
//     //             "RegionIds", 
//     //             "RestrictedRegionIds", 
//     //             "ServingStatus", 
//     //             "Status", 
//     //             "Subtype", 
//     //             "TrackingParams", 
//     //             "Type"
//     //         ]
//     //     }
//     // }');  //Post Fields

//     // curl_setopt($ch, CURLOPT_POSTFIELDS,'{
//     //     "method": "get",
//     //     "params": {
//     //         "SelectionCriteria": {
//     //             "States": [
//     //                 "ON"
//     //             ]
//     //         },
//     //         "FieldNames": [
//     //             "Id", 
//     //             "Name", 
//     //             "StatusClarification", 
//     //             "Type"
//     //         ]
//     //     }
//     // }');  //Post Fields

//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

//     $headers = [
//         'POST /json/v5/ads/ HTTP/1.1',
//         'Host: api.direct.yandex.com',
//         'Authorization: Bearer ' . $token,
//         'Accept-Language: ru',
//         'Client-Login: ' . $clientLogin,
//         'ProcessingMode: auto',
//         // 'Content-Type: application/json; charset=utf-8',
//     ];

//     curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

//     $server_output = curl_exec($ch);
//     $http_code = curl_getinfo($ch/*, CURLINFO_HTTP_CODE*/);
//     // dump($http_code);
//     // logger($http_code);
//     curl_close($ch);
   
//     logger($server_output);
//     // dump($server_output);
//     return($server_output);
// });

Route::get('/groups-list', function() {
    $groups = DB::table('Groups')
    ->get();

    return response()->json([
        "server_answer" => "success",
        "groups_list"   => $groups,
    ]);
});

Route::post('/group-add', function(Request $request) {
    try {
        $newGroupId = DB::table('Groups')->insertGetId([
            'groupName' => $request->groupName,
        ]);

        return response()->json([
            "server_answer" => "success",
            "group_id"      => $newGroupId,
            'groupName'     => $request->groupName,
        ]);
    } catch (Exception $e) {
        return response()->json([ 
            "server_answer" => "error", 
            "error_text" => $e, 
        ]);
    }
});

Route::post('/group-rename', function(Request $request) {
    try {
        DB::table('Groups')
        ->where('groupId', $request->groupId)
        ->update(['groupName' => $request->groupName]);

        return response()->json([
            "server_answer" => "success",
            'groupName'     => $request->groupName,
        ]);
    } catch (Exception $e) {
        return response()->json([ 
            "server_answer" => "error", 
            "error_text" => $e, 
        ]);
    }
});

Route::post('/group-remove', function(Request $request) {
    try {
        DB::table('Groups')
        ->where('groupId', $request->groupId)
        ->delete();

        return response()->json([ 
            "server_answer" => "success", 
        ]);
    } catch (Exception $e) {
        return response()->json([ 
            "server_answer" => "error", 
            "error_text" => $e, 
        ]);
    }
});

Route::post('/group-add-to-group', function(Request $request) {
    try {
        DB::table('Groups')
        ->where('groupId', $request->groupId)
        ->update(['parentGroupId' => $request->parentGroupId]);

        return response()->json([ 
            "server_answer" => "success", 
            'parentGroupId' => $request->parentGroupId, 
        ]);
    } catch (Exception $e) {
        return response()->json([ 
            "server_answer" => "error", 
            "error_text" => $e, 
        ]);
    }
});

Route::post('/group-remove-from-group', function(Request $request) {
    try {
        DB::table('Groups')
        ->where('groupId', $request->groupId)
        ->update(['parentGroupId' => -1]);

        return response()->json([ 
            "server_answer" => "success", 
        ]);
    } catch (Exception $e) {
        return response()->json([ 
            "server_answer" => "error", 
            "error_text" => $e, 
        ]);
    }
});

Route::post('/group-set-order', function(Request $request) {
    try {
        $ordersList = $request->ordersList;

        // logger($ordersList);

        foreach($ordersList as $key => $value) {
            DB::table('Groups')
              ->where('groupId', $key)
              ->update(['groupOrder' => $value]);
        }

        return response()->json([
            "server_answer" => "success",
        ]);
    } catch (Exception $e) {
        return response()->json([ 
            "server_answer" => "error", 
            "error_text" => $e, 
        ]);
    }
});

Route::post('/campaign-add-to-group', function(Request $request) {
    try {
        DB::table('GroupsCampaigns')
        ->where('campaignId', $request->campaignId)
        ->delete();

        DB::table('GroupsCampaigns')->insert([
            'campaignId' => $request->campaignId,
            'groupId'    => $request->groupId,
        ]);

        return response()->json([ 
            "server_answer" => "success", 
        ]);
    } catch (Exception $e) {
        return response()->json([ 
            "server_answer" => "error", 
            "error_text" => $e, 
        ]);
    }
});

Route::post('/campaign-remove-from-group', function(Request $request) {
    try {
        DB::table('GroupsCampaigns')
        ->where('campaignId', $request->campaignId)
        ->delete();

        return response()->json([ 
            "server_answer" => "success", 
        ]);
    } catch (Exception $e) {
        return response()->json([ 
            "server_answer" => "error", 
            "error_text" => $e, 
        ]);
    }
});

Route::get('/campaign-group-links', function() {
    try {
        $links = DB::table('GroupsCampaigns')
        ->get();

        return response()->json([ 
            "server_answer" => "success", 
            "links_list"    => $links,
        ]);
    } catch (Exception $e) {
        return response()->json([ 
            "server_answer" => "error", 
            "error_text" => $e, 
        ]);
    }
});