//登录状态

function checkLoginStatus(){
    
    chrome.storage.sync.get(["status"],function(date){
        if(date.status&&date.status=='yes'){
            $('#changeColor').hide()
            $('#changeColor2').show()
        }else{
            $('#changeColor2').hide()
            $('#changeColor').show()
        }
    })
    
}
$(function(){
    //初始化检测登录状态
    checkLoginStatus();
    //加密解密
    function Encrypt(word){
        var key = CryptoJS.enc.Utf8.parse("qq948443643");
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    }
    function Decrypt(word){
        var key = CryptoJS.enc.Utf8.parse("qq948443643");
        var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }  
    
    //登录按钮事件
    $('#login_submit').on('click',function(){
        var data = {
            password:Encrypt($('#password').val())
        }
        if(data.password == '3tPACXP11OuL9CMgfn1DaQ=='){
            // localStorage.setItem('status','yes')
            chrome.storage.sync.set({'status':'yes'})
        }else{
            $('.alert-danger').css('visibility','visible')
            $('#password').val(null)
            setTimeout(function(){
                $('.alert-danger').css('visibility','hidden')
            },2000)
        }
        checkLoginStatus()
    })
    //退出登录
    
    $('#logout_submit').on('click',function(){
        chrome.storage.sync.remove(["status"],function(){
            $('#password').val(null)
            checkLoginStatus()
        })
        // localStorage.removeItem('status')
        
    })
   
})