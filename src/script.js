function onSignIn(googleUser){
    var profile = googleUser.getBasicProfile();
    $(".loginUI").css("display","none");
    $(".data").css("display","block");
}

function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function(){
        alert("Signed Out Successfully.");

        $(".loginUI").css("display","block");
        $(".data").css("display","none");
    });    
}