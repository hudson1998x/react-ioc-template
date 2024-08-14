<?php

    require_once('vendor/autoload.php');
    
    use Hudsxn\IocCore\Application;
    use Hudsxn\IocCore\Frontend\ReactApplication;

    $app = new Application("src", "web", function() {
        
        ReactApplication::withApplication('/', 'app.js', 'app.css', ['public']);

        ReactApplication::Serve(explode('?', $_SERVER['REQUEST_URI'])[0]);

    }); 
