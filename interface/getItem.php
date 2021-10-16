<?php
    include('./library/conn.php');

    $id = $_REQUEST['id']; // 接受一个id

    $sql = "select * from product where id = $id";

    $res = $conn->query($sql);

    $conn->close();

    $row = $res->fetch_assoc();

    $json = json_encode($row);

    echo $json;
?>