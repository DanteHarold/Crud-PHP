<?php

function connect($db){
    try{
        $conn = new PDO("mysql:host=localhost; dbname=$db; charset=utf8",'root','99753');
        return $conn;
    }catch(PDOException $e){
        echo "Error " . $e->getMessage(); 
    }
}

?>