
const ui = new firebaseui.auth.AuthUI(auth);
let login = document.querySelector('.login');

const setupLoginButton = () =>{
    ui.start("#loginUI",{
        callbacks:{
           signInSuccessWithAuthResult: function(authResult,redirectURL){
            console.log(authResult);
            return false;
           }
        },
        signINFLOW: "popup",
        signInOptions:[firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    })
}

setupLoginButton();