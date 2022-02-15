<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON; charset: utf-8;');
    require("adatok.php");
    $conn = new PDO("mysql:host=$dbhost;dbname=$dbname;", $dbuser, $dbpass);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $conn->exec("SET NAMES utf8");
    // a frontendről érkezett adatok fogadása
    $data = json_decode(file_get_contents("php://input"));

    $id = $data->id;
    /*
    $nev = $data->nev;
    $klan = $data->klan;
    $nem = $data->nem;
    $suly = $data->suly;
    $magassag = $data->magassag;
    */
    $table = $data->table;
    $values = $data->values;
    $str = '';
    foreach($values as $field => $value)
    {
       $str .= $field.'='.$value.',';
    }
    $str = rtrim($str, ',');
    if ($conn->exec("UPDATE $table SET $str WHERE ID=$id"))
    {
        $result = array(
            'error' => '',
            'message' => 'Rekord módosítva!'
        );
    }
    else
    {
        $result = array(
            'error' => $conn->errorInfo(),
            'message' => 'Hiba az adatbázis művelet során!'
        );
    }
    
    echo json_encode($result);
?>