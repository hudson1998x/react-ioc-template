<?php

    require_once('vendor/autoload.php');
    
    use Hudsxn\IocCore\Application;

    // this will be the UI that makes everything happen

    $app = new Application("src", "cli", function() {
        
    }, $argv); 
