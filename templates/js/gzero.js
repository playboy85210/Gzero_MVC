$(document).ready(function(e) {
    alert();
    // The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
    $('#calendar').fullCalendar({
        googleCalendarApiKey: 'AIzaSyDrcHpZQx1U7lOBemO7FS0MZbNai_3nIlU',
        dayClick: function(date, jsEvent, view) {
            requestXmlPOST3('calendar_op.php', 'pdisplay=display_add_event', 'calendar_form', '#calendar_form');
        },
        events: {
            googleCalendarId: 'playboy85210@gmail.com',
        },

    });
});
var OAUTH2_CLIENT_ID = '630213373382-349k4vml2k4pv3089291476lai9m62c1.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
    'https://www.googleapis.com/auth/youtube'
];

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {
    gapi.auth.init(function() {
        window.setTimeout(checkAuth, 1);
    });
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
    gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: true
    }, handleAuthResult);
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
        // Authorization was successful. Hide authorization prompts and show
        // content that should be visible after authorization succeeds.
        $('.pre-auth').hide();
        $('.post-auth').show();
        loadAPIClientInterfaces();
    } else {
        // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
        // client flow. The current function is called when that flow completes.
        $('#login-link').click(function() {
            gapi.auth.authorize({
                client_id: OAUTH2_CLIENT_ID,
                scope: OAUTH2_SCOPES,
                immediate: false
            }, handleAuthResult);
        });
    }
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api

function loadAPIClientInterfaces() {
    gapi.client.load('youtube', 'v3', function() {
        handleAPILoaded();
    });
}
// Define some variables used to remember state.
var playlistId, channelId;

// After the API loads, call a function to enable the playlist creation form.
function handleAPILoaded() {
    enableForm();
}

// Enable the form for creating a playlist.
function enableForm() {
    $('#playlist-button').attr('disabled', false);
}

// Create a private playlist.
function createPlaylist() {
    var request = gapi.client.youtube.playlists.insert({
        playlistId: 'FLfoGGbxO0UYy0cE4hH0FokA',
        part: 'snippet'
    });
    request.execute(function(response) {
        var result = response.result;
        if (result) {
            playlistId = result.id;
            $('#playlist-id').val(playlistId);
            $('#playlist-title').html(result.snippet.title);
            $('#playlist-description').html(result.snippet.description);
        } else {
            $('#status').html('Could not create playlist');
        }
    });
}

// Add a video ID specified in the form to the playlist.
function addVideoToPlaylist() {
    addToPlaylist($('#video-id').val());
}

// Add a video to a playlist. The "startPos" and "endPos" values let you
// start and stop the video at specific times when the video is played as
// part of the playlist. However, these values are not set in this example.
function addToPlaylist(id, startPos, endPos) {
    var details = {
        videoId: id,
        kind: 'youtube#video'
    }
    if (startPos != undefined) {
        details['startAt'] = startPos;
    }
    if (endPos != undefined) {
        details['endAt'] = endPos;
    }
    var request = gapi.client.youtube.playlistItems.insert({
        part: 'snippet',
        resource: {
            snippet: {
                playlistId: playlistId,
                resourceId: details
            }
        }
    });
    request.execute(function(response) {
        $('#status').html('<pre>' + JSON.stringify(response.result) + '</pre>');
    });
}