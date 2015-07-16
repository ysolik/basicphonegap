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
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var channel = 'anjunabeats';
        app.getPlaylist(channel);
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
                $.each(data.items, function(i, item){
                    console.log(item);
                    var playlistId = item.contentDetails.relatedPlaylists.uploads;
                    app.getVideos(playlistId, 10);
                });
            }
        );
    },
    
    getVideos: function(id, maxResults){
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems",
            {
                part: "snippet",
                maxResults: maxResults,
                playlistId: id,
                key: 'AIzaSyAgBjj1jU9DUClk44iX-mJuX_iKSDem2lM'
            },
            function(data){
                $.each(data.items, function(i, item){
                    var id = item.snippet.resourceId.videoId;        
                    var title = item.snippet.title;
                    var thumb = item.snippet.thumbnails.default.url;
                    $("#vidlist").append('<li videoId="'+id+'"><img src="'+thumb+'"><h3>'+title+'</h3></li>');
                    $('#vidlist').listview('refresh');
                });       
            }
        );
    }
};
