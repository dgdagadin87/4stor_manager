<!DOCTYPE HTML>
<html lang="ru">
    <head>
        <title>4stor - войти</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta content="ie=edge" http-equiv="x-ua-compatible">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="http://allfont.ru/allfont.css?fonts=pt-sans" rel="stylesheet" type="text/css" />
        <link href="resources/css/style.css" rel="stylesheet"/>
        <link href="resources/css/ie.hack.css" rel="stylesheet"/>
        <!--[if IE]>
        <link href="resources/css/ie.css" rel="stylesheet"/>
        <![endif]-->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
        <script type="text/javascript">
            var functionObject = {
                isEmpty: function(value) {
                    return (value === null || value === undefined || value === '') ? true : false;
                },
                clearErrors: function(){
                    $('#errors').hide();
                },
                showErrors: function(errors){
                    var errorString = '';
                    $.each(errors, function(key, error){
                        errorString += '<div>'+error+'</div>';
                    });
                    $('#errors').html(errorString);
                    $('#errors').show();
                },
                afterSuccess: function(data, textStatus, jqXHR){
                    var success = data.success || false;
                    var message = data.message || 'Ошибка';
                    if (!success) {
                        this.showErrors([message]);
                        return false;
                    }
                    window.location.href = '/';
                },
                afterError: function(jqXHR, textStatus, errorThrown){
                    console.log(errorThrown);
                },
                afterComplete: function(jqXHR, textStatus){
                    $('#submit').removeAttr('disabled');
                    $('#reset').removeAttr('disabled');;
                }
            };
            $(document).ready(function() {
                $('#submit').click(function(event) {
                    var login = $('#login').val();
                    var password = $('#password').val();
                    
                    functionObject.clearErrors();
                    
                    if (functionObject.isEmpty(login) || functionObject.isEmpty(password)) {
                        functionObject.showErrors(['Введите логин и пароль']);
                        return false;
                    }
 
                    $('#submit').attr('disabled', 'disabled');
                    $('#reset').attr('disabled', 'disabled');
 
                    var queryConfig = {
                        url: '/index.php?mode=login',
                        type: 'POST',
                        async: true,
                        cache: false,
                        dataType: 'json',
                        data: {
                            login: login,
                            pass: password
                        },
                        headers: {},
                        success: function(data, textStatus, jqXHR){
                            functionObject.afterSuccess(data, textStatus, jqXHR);
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            functionObject.afterError(jqXHR, textStatus, errorThrown);
                        },
                        complete: function(jqXHR, textStatus){
                            functionObject.afterComplete(jqXHR, textStatus);
                        }
                    };
                    $.ajax(queryConfig);
                    
                });
                $('#reset').click(function(event) {
                    $('#login').val('');
                    $('#password').val('');
                });
}           );
        </script>
    </head>
    <body>
        <div class="fs--login-container">
            <div class="fs--login-center">
                <div class="fs--login-block">
                    <div class="fs--login-header">
                        Войти в систему
                    </div>
                    <div id="errors" class="errors" style="display:none;"></div>
                    <div class="controls-container">
                        <div class="login">
                            <label>Логин</label>
                            <input type="text" id="login" name="app-login" value="" placeholder="Введите логин" />
                        </div>
                        <div class="password">
                            <label>Пароль</label>
                            <input type="password" id="password" name="app-password" value="" placeholder="Введите пароль" />
                        </div>
                        <div class="buttons">
                            <button id="submit">войти</button>
                            <button id="reset">очистить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>