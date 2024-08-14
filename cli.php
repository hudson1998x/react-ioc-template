<?php

    require_once('vendor/autoload.php');
    
    use Hudsxn\IocCore\Application;

    // all cli commands should come through here. 

    $app = new Application("src", "cli", function() {
        
    }, $argv); 
