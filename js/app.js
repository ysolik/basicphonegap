var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('onDeviceReady');
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var channel = 'anjunabeats';
        console.log('received');
        getPlaylist(channel);
    },
    
    getPlaylist: function(channel){
        $('#vidlist').html('');
        $.get(
            "https://www.googleapis.com/youtube/v3/channels",
            {
                part: 'contentDetails',
                forUsername: channel,
                key: 'AIzaSyAgBjj1jU9DUClk44iX-mJuX_iKSDem2lM'
            },
            function(data){
                console.log(data);
            }
        );
    }
};
