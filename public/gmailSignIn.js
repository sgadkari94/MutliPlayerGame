let loginForm = document.getElementById('loginForm');
let btnLogin = document.getElementById('btnLogin');

function onSignIn(googleUser){
    let profile = googleUser.getBasicProfile();
    let name = profile.getName();
    let email = profile.getEmail();
    localStorage.setItem('player', name);

    var url = '/leaderBoard';
   $.ajax({
    url: url,
    type: 'POST',
    data: {'player': name },
    success: function(html)
    { 
 },

});

    // loginForm.submit()

}