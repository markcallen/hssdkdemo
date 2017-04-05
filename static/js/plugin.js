$(document).ready(function() {
    hsp.init({
        useTheme: true
    });
    hsp.bind('sendtoapp', function(message){
      sendToAppHandler(message);
   });

   function sendToAppHandler(message) {
     var messageId = "messageId=" + encodeURIComponent(message.post.id);
     var datetime  = "&datetime=" + encodeURIComponent(message.post.datetime);
     var message   = "&message=" + encodeURIComponent(message.post.content.body);
     var handler = publicHostname + '/hs_plugin_handler.html?' + messageId + datetime + message;
 
     hsp.showCustomPopup(handler, 'App Plugin popup');
   }
});
