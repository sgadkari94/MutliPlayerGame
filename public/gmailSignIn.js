let loginForm = document.getElementById('loginForm');
let btnLogin = document.getElementById('btnLogin');

function onSignIn(googleUser){
    let profile = googleUser.getBasicProfile;
    alert(googleUser.Pt);
    alert(googleUser.Pt.yu);
    //let image = profile.getImageUrl();
    let emailAddress = googleUser.Pt.yu;
    let name = googleUser.Pt.Ad
    alert(emailAddress);
    alert(name);

    loginForm.submit();

}