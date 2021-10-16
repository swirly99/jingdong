<?php
    include('./library/conn.php');

    $username = $_REQUEST['username'];

    $sql = "select * from users where username='$username'";

    $result = $conn->query($sql);

    $conn->close();

    if($result->num_rows>0){
        echo '{"msg":"用户名已存在","has":true,"success":1}';
    }else{
        echo '{"msg":"用户名可以使用","has":false,"success":1}';
    }
?>