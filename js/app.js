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
        if(localStorage.channel == null || localStorage.channel == ''){
            $("#popupDialog").popup('open');
        }
        else{
            var channel = localStorage.getItem('channel');
        }
        
        app.getPlaylist(channel);
        
        $(document).on('click', '#vidlist li', function(){
            app.showVideo($(this).attr('videoid'));               
        });
        
        $(document).on('click', '#channelBtnOK', function(){
            var channel = $('#channelName').val();    
            app.setChannel(channel);            
            app.getPlaylist(channel);
        });
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
    },

    showVideo: function(id){
        $('#logo').hide();
        var output = '<iframe width="100%" height="250" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe>';
        $('#showVideo').html(output);
    },
    
    setChannel: function(channel){
        localStorage.setItem('channel', channel);
    }
};
