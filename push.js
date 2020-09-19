const webPush = require('web-push')

var vapidKeys = {
    "publicKey":"BBpuSUlz65uEgJU6gVXMDllRTFD27QVfxAdPMJ2Zw_zK09nvj2OYoFt2f6A8otzgygBJRqw3GNL2Ht-UcJIgiLg",
    "privateKey":"dJ-0ShxoEXwxSUJycQmcVcitgAb2K-TvOyEDAes61h4"
}

webPush.setVapidDetails(
    'mailto:irmanpermana.lu@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cLIXpJOb3QQ:APA91bEZ3OuoSF-HU38cEnvsd8U9EAs5OjxRCa3VzdC1Y2vicwGCMDjE6mOEIXRTirZV_RXdWIkIAu29cQ1Xb9K5W2YXQA-6emcJ9rh3n5olzHDtsOgPg38AlNw4Dac9QvA0iHJ3EU3Y",
    "keys": {
        "p256dh": "BCOta4Ip1NO96/g6J058q18ABawLqHjNZ5Xl9j257SCMZsk/UIitYHq1AUY4W+Dbcws4AAXFhvyLVEQGmwhyQg4=",
        "auth": "2ssOXLzTDYSYhYdMGpdI+w=="
    }
}

var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!'

var options = {
    gcmAPIKey: '353410677565',
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)