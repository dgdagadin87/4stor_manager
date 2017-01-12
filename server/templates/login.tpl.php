<!DOCTYPE HTML>
<html lang="ru">
    <head>
        <title>4stor - войти</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta content="ie=edge" http-equiv="x-ua-compatible">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="resources/css/style.css" rel="stylesheet"/>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
        <script type="text/javascript">
            var functionObject = {
                isEmpty: function(value) {
                    return (value === null || value === undefined || value === '') ? true : false;
                },
                clearErrors: function(){
                    $('#errors').hide();
                },
                showErrors: function(){
                    $('#errors').show();
                }
            };
            $(document).ready(function() {
                $('#submit').click(function(event) {
                    var login = $('#login').val();
                    var password = $('#password').val();
                    
                    functionObject.clearErrors();
                    
                    if (functionObject.isEmpty(login) || functionObject.isEmpty(password)) {
                        functionObject.showErrors();
                        return false;
                    }
                });
                $('#reset').click(function(event) {
                    alert("reset");
                });
}           );
        </script>
    </head>
    <body>
        <div class="login-container">
            <div id="errors" class="errors" style="display:none;">
                <span>Введите логин и пароль</span>
            </div>
            <div class="height-saver">
                <p class="login">
                    <label>Логин</label>
                    <input type="text" id="login" name="login" value="" />
                </p>
                <p class="pass">
                    <label>Пароль</label>
                    <input type="password" id="password" name="password" value="" />
                </p>
            </div>
            <p class="buttons">
                <button id="submit">войти</button>
                <button id="reset">очистить</button>
            </p>
        </div>
    </body>
</html>